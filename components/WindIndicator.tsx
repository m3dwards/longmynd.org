import React, { useRef, useEffect } from "react";

const WindIndicator = (props: { size: number; directions: Array<{ from: string; to: string }> }) => {
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

  const draw = (ctx) => {
    const center = props.size / 2;

    ctx.fillStyle = "#f5ede2";
    ctx.beginPath();
    ctx.arc(center + 2, center + 2, center, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "#26867e";
    for (const direction of props.directions) {
      ctx.beginPath();
      ctx.moveTo(center + 2, center + 2);
      ctx.arc(
        center + 2,
        center + 2,
        center,
        cardinalAngles[direction.from][0] * (Math.PI / 180),
        cardinalAngles[direction.to][1] * (Math.PI / 180)
      );
      ctx.closePath();
      ctx.fill();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    //Our draw come here
    draw(context);
  }, [draw]);

  return <canvas ref={canvasRef} width={props.size + 5 + "px"} height={props.size + 5 + "px"} />;
};

export default WindIndicator;
