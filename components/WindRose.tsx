import { site as siteType } from "types";
import React, { useRef, useEffect } from "react";

const WindRose = ({ sites }: { sites: Array<siteType> }) => {
  const canvasRef = useRef(null);

  const cardinalPoints = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];

  const cardinalAngles = {
    N: 270,
    NNE: 292.5,
    NE: 315,
    ENE: 337.5,
    E: 0,
    ESE: 22.5,
    SE: 45,
    SSE: 67.5,
    S: 90,
    SSW: 112.5,
    SW: 135,
    WSW: 157.5,
    W: 180,
    WNW: 202.5,
    NW: 225,
    NNW: 247.5,
  };

  interface roseSite {
    name: string;
    directionFrom: string;
    directionTo: string;
  }

  interface cardinalBin {
    id: number;
    sites: Array<roseSite>;
  }

  /* sites = sites.sort((sa, sb) => (sa.name.length > sb.name.length ? 1 : 0)); */

  const bins: Array<cardinalBin> = [{ id: 1, sites: [] }];

  for (const site of sites) {
    if (!site.windDirection) continue;
    for (const direction of site.windDirection) {
      console.log(direction);
      const siteStartIndex = cardinalPoints.findIndex((cp) => cp === direction.from);
      let siteEndIndex = cardinalPoints.findIndex((cp) => cp === direction.to);
      if (siteEndIndex < siteStartIndex) {
        siteEndIndex += cardinalPoints.length;
      }

      let binPosition = 0;
      for (const bin of bins) {
        binPosition++;
        let collisions = 0;
        for (const binSite of bin.sites) {
          const binSiteStartIndex = cardinalPoints.findIndex((cp) => cp === binSite.directionFrom);
          let binSiteEndIndex = cardinalPoints.findIndex((cp) => cp === binSite.directionTo);
          if (binSiteEndIndex < binSiteStartIndex) {
            binSiteEndIndex += cardinalPoints.length;
          }

          for (var si = siteStartIndex; si <= siteEndIndex; si++) {
            for (var bi = binSiteStartIndex; bi <= binSiteEndIndex; bi++) {
              if (si === bi) {
                collisions++;
              }
            }
          }
        }
        if (collisions >= 2) {
          if (binPosition == bins.length) {
            bins.push({ id: binPosition + 1, sites: [] });
          }
          continue;
        }
        bin.sites.push({ name: site.name, directionFrom: direction.from, directionTo: direction.to });
        break;
      }
    }
  }

  console.log(bins);

  const size = 600;
  const draw = (ctx: any, x: number, y: number) => {
    const center = size / 2;

    /* ctx.fillStyle = "#f5ede2";
     * ctx.beginPath();
     * ctx.arc(center, center, center, 0, 2 * Math.PI);
     * ctx.fill(); */
    ctx.clearRect(0, 0, size, size);
    for (var binIndex = 0; binIndex < bins.length; binIndex++) {
      const bin = bins[binIndex];
      const radiusOffset = 40 * binIndex;
      for (const site of bin.sites) {
        ctx.beginPath();
        /* ctx.moveTo(center, center); */
        ctx.arc(
          center,
          center,
          center - radiusOffset,
          cardinalAngles[site.directionFrom] * (Math.PI / 180),
          cardinalAngles[site.directionTo] * (Math.PI / 180)
        );
        ctx.arc(
          center,
          center,
          center - radiusOffset - 30,
          cardinalAngles[site.directionTo] * (Math.PI / 180),
          cardinalAngles[site.directionFrom] * (Math.PI / 180),
          true // reverses arc direction
        );
        ctx.closePath();
        const hovering = ctx.isPointInPath(x * 2, y * 2);
        ctx.fillStyle = hovering ? "#26867e" : "blue";
        ctx.fill();
        if (hovering) {
          ctx.fillStyle = "white";
          ctx.fillRect(200, size - 200, 150, 75);
          ctx.fillStyle = "black";
          ctx.font = "20px Arial";
          ctx.fillText(site.name, 200, size - 200);
        }
      }
    }
  };

  const onMouseMove = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Get the current mouse position
    var r = canvas.getBoundingClientRect(),
      x = e.clientX - r.left,
      y = e.clientY - r.top;

    draw(ctx, x, y);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    draw(ctx, 0, 0);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={onMouseMove}
      style={{ width: size + "px", height: size + "px" }}
      width={size * 2 + "px"}
      height={size * 2 + "px"}
    />
  );
};

export default WindRose;
