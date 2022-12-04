import classNames from "classnames";
import { site as siteType, additionalSite } from "types";
import React, { useRef, useEffect, useState } from "react";
import styles from "./windrose.module.scss";

const WindRose = ({
  sites,
  additionalSites,
  width,
}: {
  sites: Array<siteType>;
  additionalSites: Array<additionalSite>;
  width: number;
}) => {
  const canvasRef = useRef(null);

  const [southEastActiveState, setSouthEastActiveState] = useState(true);
  const [malvernActiveState, setMalvernActiveState] = useState(true);
  const [northWalesActiveState, setNorthWalesActiveState] = useState(true);

  const toggleSouthEastActiveState = () => {
    setSouthEastActiveState(!southEastActiveState);
  };
  const toggleMalvernActiveState = () => {
    setMalvernActiveState(!malvernActiveState);
  };
  const toggleNorthWalesActiveState = () => {
    setNorthWalesActiveState(!northWalesActiveState);
  };

  useEffect(() => {
    updateRose();
  }, [southEastActiveState, malvernActiveState, northWalesActiveState]);

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
    primaryColor: string;
    highlightColor: string;
  }

  interface cardinalBin {
    id: number;
    sites: Array<roseSite>;
  }

  let roseSites = Array<roseSite>();
  const highlightColor = "#555";

  for (const site of sites) {
    if (!site.windDirection) continue;
    for (const direction of site.windDirection) {
      roseSites.push({
        name: site.name,
        directionFrom: direction.from,
        directionTo: direction.to,
        primaryColor: "#66786a",
        highlightColor: highlightColor,
      });
    }
  }
  // "South East Wales HGPC", "Malvern HGC", "North Wales HGPC"
  for (const site of additionalSites) {
    let aPrimaryColor = "";
    console.log(site.clubName);
    switch (site.clubName) {
      case "South East Wales HGPC": {
        if (!southEastActiveState) continue;
        aPrimaryColor = "#1e90ff";
        break;
      }
      case "Malvern HGC": {
        if (!malvernActiveState) continue;
        aPrimaryColor = "#ff5b47";
        break;
      }
      case "North Wales HGPC": {
        if (!northWalesActiveState) continue;
        aPrimaryColor = "#ac5aa0";
        break;
      }
    }
    roseSites.push({
      name: site.siteName,
      directionFrom: site.from,
      directionTo: site.to,
      primaryColor: aPrimaryColor,
      highlightColor: highlightColor,
    });
  }
  roseSites = roseSites.sort((sa, sb) => sb.name.length - sa.name.length);

  const bins: Array<cardinalBin> = [{ id: 1, sites: [] }];

  for (const site of roseSites) {
    const siteStartIndex = cardinalPoints.findIndex((cp) => cp === site.directionFrom);
    let siteEndIndex = cardinalPoints.findIndex((cp) => cp === site.directionTo);
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
      bin.sites.push(site);
      break;
    }
  }

  const size = width;
  const draw = (ctx: any, x: number, y: number) => {
    const center = size / 2;

    /* ctx.fillStyle = "#f5ede2";
     * ctx.beginPath();
     * ctx.arc(center, center, center, 0, 2 * Math.PI);
     * ctx.fill(); */
    ctx.clearRect(0, 0, size, size);
    drawCompassLines(ctx, size);
    drawCompassPoints(ctx, size);
    for (var binIndex = 0; binIndex < bins.length; binIndex++) {
      const bin = bins[binIndex];
      const radiusOffset = 35 * binIndex + 30;
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
        ctx.fillStyle = hovering ? site.highlightColor : site.primaryColor;
        console.log(site.name);
        console.log(site.primaryColor);
        ctx.fill();
        ctx.stroke();
        /* if (hovering) {
         *   ctx.fillStyle = "white";
         *   ctx.fillRect(200, size - 200, 150, 75);
         *   ctx.fillStyle = "black";
         *   ctx.font = "20px verdana, sans-serif";
         *   ctx.fillText(site.name, 200, size - 200);
         * } */
        /* if (site.name !== "Corndon") continue; */
        drawTextAlongArc(
          ctx,
          site.name,
          center,
          center,
          center - radiusOffset - 15,
          calculateMidAngle(cardinalAngles[site.directionFrom], cardinalAngles[site.directionTo]),
          "verdana, sans-serif",
          3 - binIndex > 0 ? 0 : 0
        );
      }
    }
  };
  function drawCompassPoints(ctx: any, size: number) {
    ctx.font = "20px verdana, sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText("N", size / 2 - 7, 15);
    ctx.fillText("E", size - 10, size / 2 + 6);
    ctx.fillText("S", size / 2 - 7, size - 2);
    ctx.fillText("W", 0, size / 2 + 6);
  }
  function drawCompassLines(ctx: any, size: number) {
    ctx.save();
    ctx.translate(size / 2, size / 2); // Move to center
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#555";
    for (let i = 0; i < 16; i++) {
      ctx.rotate((22.5 * Math.PI) / 180);
      ctx.beginPath(); // Start a new path
      ctx.moveTo(0, 3); // Move the pen to (30, 50)
      ctx.lineTo(0, size / 2 - 20); // Draw a line to (150, 100)
      ctx.stroke(); // Render the pat
    }
    ctx.restore();
  }
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
    fName: string,
    kerning: number
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
    const fSize = "11pt";

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

    ctx.fillStyle = "white";
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

  const updateRose = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    draw(ctx, 0, 0);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    draw(ctx, 0, 0);
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseMove={onMouseMove}
        style={{ width: size + "px", height: size + "px" }}
        width={size * 2 + "px"}
        height={size * 2 + "px"}
      />
      <div className={styles.otherClubs}>
        <ul>
          <li
            className={classNames(styles.southEast, { [styles.active]: southEastActiveState })}
            onClick={toggleSouthEastActiveState}
          >
            <div>
              <h3>South East Wales HGPC</h3>
            </div>
          </li>
          <li
            className={classNames(styles.malvern, { [styles.active]: malvernActiveState })}
            onClick={toggleMalvernActiveState}
          >
            <div>
              <h3>Malvern HGC</h3>
            </div>
          </li>
          <li
            className={classNames(styles.northWales, { [styles.active]: northWalesActiveState })}
            onClick={toggleNorthWalesActiveState}
          >
            <div>
              <h3>North Wales HGPC</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WindRose;
