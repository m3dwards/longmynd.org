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
        } else {
          /* if (site.name !== "Corndon") continue; */
          ctx.font = "20px Arial";
          ctx.fillStyle = "red";
          drawTextAlongArc(
            ctx,
            site.name,
            center,
            center,
            center - radiusOffset - 15,
            calculateMidAngle(cardinalAngles[site.directionFrom], cardinalAngles[site.directionTo]),
            "Arial"
          );
          console.log(site.name);
          console.log(calculateMidAngle(cardinalAngles[site.directionFrom], cardinalAngles[site.directionTo]));
        }
      }
    }
  };
  function calculateMidAngle(start: number, end: number) {
    start += 90;
    end += 90;
    if (start > 359) start = start - 360;
    if (end > 359) end = end - 360;

    let midPoint = 0;
    if (end > start) {
      midPoint = (end - start) / 2 + start;
    } else {
      midPoint = start + (360 - (start - end)) / 2;
    }
    if (midPoint > 359) {
      midPoint = midPoint - 360;
    }
    return midPoint;
  }
  // Arc Length = angle × (Math.PI/180) × radius
  function drawTextAlongArc(
    ctx: any,
    text: string,
    centerX: number,
    centerY: number,
    radius: number,
    startAngle: number,
    fName: string
  ) {
    // text:         The text to be displayed in circular fashion
    // diameter:     The diameter of the circle around which the text will
    //               be displayed (inside or outside)
    // startAngle:   In degrees, Where the text will be shown. 0 degrees
    //               if the top of the circle
    // align:        Positions text to left right or center of startAngle
    // textInside:   true to show inside the diameter. False to show outside
    // inwardFacing: true for base of text facing inward. false for outward
    // fName:        name of font family. Make sure it is loaded
    // fSize:        size of font family. Don't forget to include units
    // kearning:     0 for normal gap between letters. positive or
    //               negative number to expand/compact gap in pixels
    //------------------------------------------------------------------------

    // declare and intialize canvas, reference, and useful variables
    //
    ctx.save();
    const fSize = "14pt";
    const kerning = 0;

    const align = "center";
    var clockwise = 1; // draw clockwise for aligned right. Else Anticlockwise
    startAngle = startAngle * (Math.PI / 180); // convert to radians

    // calculate height of the font. Many ways to do this
    // you can replace with your own!
    var div = document.createElement("div");
    div.innerHTML = text;
    div.style.position = "absolute";
    div.style.top = "-10000px";
    div.style.left = "-10000px";
    div.style.fontFamily = fName;
    div.style.fontSize = fSize;
    document.body.appendChild(div);
    var textHeight = div.offsetHeight;
    document.body.removeChild(div);

    ctx.fillStyle = "red";
    ctx.font = fSize + " " + fName;

    // Setup letters and positioning
    ctx.translate(centerX, centerY); // Move to center
    ctx.textBaseline = "middle"; // Ensure we draw in exact center
    ctx.textAlign = "center"; // Ensure we draw in exact center

    // rotate 50% of total angle for center alignment
    if (align == "center") {
      for (var j = 0; j < text.length; j++) {
        var charWid = ctx.measureText(text[j]).width;
        startAngle += ((charWid + (j == text.length - 1 ? 0 : kerning)) / (radius - textHeight) / 2) * -clockwise;
      }
    }

    // Phew... now rotate into final start position
    ctx.rotate(startAngle);

    // Now for the fun bit: draw, rotate, and repeat
    for (var j = 0; j < text.length; j++) {
      var charWid = ctx.measureText(text[j]).width; // half letter
      // rotate half letter
      ctx.rotate((charWid / 2 / (radius - textHeight)) * clockwise);
      // draw the character at "top" or "bottom"
      // depending on inward or outward facing
      ctx.fillText(text[j], 0, 0 - radius);

      ctx.rotate(((charWid / 2 + kerning) / (radius - textHeight)) * clockwise); // rotate half letter
    }
    ctx.restore();
  }
  /* function getFontSizeToFit(text: string, fontFace: string, maxWidth: number) {
   *   const ctx = document.createElement('canvas').getContext('2d');
   *   ctx.font = `1px ${fontFace}`;
   *   return maxWidth / ctx.measureText(text).width;
   * } */
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
