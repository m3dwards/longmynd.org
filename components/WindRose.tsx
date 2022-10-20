import { site as siteType } from "types";
import React, { useRef, useEffect } from "react";

const WindRose = ({ sites }: { sites: Array<siteType> }) => {
  const canvasRef = useRef(null);

  const cardinalAngles = {
    N: [258.75, 281.25],
    NNE: [281.25, 303.75],
    NE: [303.75, 326.25],
    ENE: [326.25, 348.75],
    E: [348.75, 11.25],
    ESE: [11.25 - 33.75],
    SE: [33.75, 56.25],
    SSE: [56.25, 78.75],
    S: [78.75, 81.25],
    SSW: [81.25, 123.75],
    SW: [123.75, 146.25],
    WSW: [146.25, 168.75],
    W: [168.75, 191.25],
    WNW: [191.25, 213.75],
    NW: [213.75, 236.25],
    NNW: [236.25, 258.75],
  };

  const size = 300;
  const draw = (ctx: any, x: number, y: number) => {
    const center = size / 2;

    /* ctx.fillStyle = "#f5ede2";
     * ctx.beginPath();
     * ctx.arc(center, center, center, 0, 2 * Math.PI);
     * ctx.fill(); */
    ctx.clearRect(0, 0, size, size);
    for (const site of sites) {
      if (!site.windDirection) continue;
      for (const direction of site.windDirection) {
        ctx.beginPath();
        /* ctx.moveTo(center, center); */
        ctx.arc(
          center,
          center,
          center,
          cardinalAngles[direction.from][0] * (Math.PI / 180),
          cardinalAngles[direction.to][1] * (Math.PI / 180)
        );
        ctx.arc(
          center,
          center,
          center - 50,
          cardinalAngles[direction.to][1] * (Math.PI / 180),
          cardinalAngles[direction.from][0] * (Math.PI / 180),
          true
        );
        ctx.closePath();
        ctx.fillStyle = ctx.isPointInPath(x * 2, y * 2) ? "#26867e" : "blue";
        ctx.fill();
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
