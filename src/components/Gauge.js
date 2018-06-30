import React, { Component } from "react";
import { Text } from "react-native";
import Svg, { G, Circle, Line, Polygon, Use, Defs } from "react-native-svg";

const TICK_ID = "tick";

export default class Gauge extends Component {
  renderDial = opts => {
    return (
      <Circle
        cx={opts.cX}
        cy={opts.cY}
        r={opts.radius}
        fill="none"
        stroke={opts.dialColor}
        strokeWidth={opts.dialWidth}
      />
    );
  };

  defineTick = opts => {
    let tX1 =
      opts.cX + opts.radius - Math.max(opts.dialWidth, opts.progressWidth) / 2;
    let tX2 = tX1 - opts.tickLength;
    return (
      <Line
        id={TICK_ID}
        x1={tX1}
        y1={opts.cY}
        x2={tX2}
        y2={opts.cY}
        stroke={opts.tickColor}
        strokeWidth={opts.tickWidth}
      />
    );
  };

  renderTicks = opts => {
    let tickAngles = [];
    for (let i = 0; i <= 360; i += opts.tickInterval) {
      tickAngles.push(i);
    }
    return (
      <G className="ticks">
        {tickAngles.map((tickAngle, idx) => {
          return (
            <Use
              href={`#${TICK_ID}`}
              key={`tick-${idx}`}
              transform={`rotate(${tickAngle} ${opts.cX} ${opts.cY})`}
            />
          );
        })}
      </G>
    );
  };

  renderProgress = opts => {
    let offset = opts.circumference * (1 - opts.currentValue / 100);

    return (
      <Circle
        cx={opts.cX}
        cy={opts.cY}
        r={opts.radius}
        fill="none"
        stroke={opts.progressColor}
        strokeWidth={opts.progressWidth}
        strokeDasharray={opts.circumference}
        strokeDashoffset={offset}
        strokeLinecap={opts.progressRoundedEdge ? "round" : "butt"}
      />
    );
  };

  renderNeedle = opts => {
    let x1 = opts.cX,
      y1 = opts.cY - opts.needleWidth / 2,
      x2 = opts.cX,
      y2 = opts.cY + opts.needleWidth / 2,
      x3 = opts.diameter,
      y3 = opts.cY,
      needleAngle = 360 * opts.currentValue / 100;

    let needleElm = null;
    if (opts.needleSharp) {
      needleElm = (
        <Polygon
          points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
          fill={opts.needleColor}
        />
      );
    } else {
      needleElm = (
        <Line
          x1={opts.cX}
          y1={opts.cY}
          x2={opts.diameter}
          y2={opts.cY}
          fill="none"
          strokeWidth={opts.needleWidth}
          stroke={opts.needleColor}
        />
      );
    }

    return (
      <G className="needle">
        <G transform={`rotate(${needleAngle} ${opts.cX} ${opts.cY})`}>
          {needleElm}
        </G>
        <Circle
          cx={opts.cX}
          cy={opts.cY}
          r={opts.needleBaseSize}
          fill={opts.needleBaseColor}
        />
      </G>
    );
  };

  renderText = opts => {
    return (
      <Text
        x={opts.cX}
        y={opts.cY + 55}
        fontFamily={opts.progressFont}
        fontSize={opts.progressFontSize}
        transform={`rotate(90 ${opts.cX} ${opts.cY})`}
        textAnchor="middle"
        fill={opts.progressColor}
      >
        {opts.currentValue}
      </Text>
    );
  };

  render() {
    let opts = Object.assign({}, this.props);

    let { size, dialWidth } = opts;

    let cX = size / 2;
    let cY = size / 2;
    let radius = (size - 2 * dialWidth) / 2;
    let diameter = 2 * radius;
    let circumference = 2 * Math.PI * radius;
    opts = Object.assign(opts, {
      cX,
      cY,
      radius,
      diameter,
      circumference
    });

    return (
      <Svg
        className={opts.className}
        height={size}
        width={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <Defs>{this.defineTick(opts)}</Defs>
        <G transform={`rotate(-90 ${cX} ${cY})`}>
          {this.renderDial(opts)}
          {this.renderTicks(opts)}
          {this.renderProgress(opts)}
          {this.renderNeedle(opts)}
          {this.renderText(opts)}
        </G>
      </Svg>
    );
  }
}

Gauge.defaultProps = {
  size: 200,

  dialWidth: 10,
  dialColor: "#eee",

  tickLength: 3,
  tickWidth: 1,
  tickColor: "#cacaca",
  tickInterval: 10,

  maximumValue: 100,
  currentValue: 25,
  progressWidth: 5,
  progressColor: "#3d3d3d",
  progressRoundedEdge: true,
  downProgressColor: "red",
  progressFont: "Serif",
  progressFontSize: "40",

  needle: true,
  needleBaseSize: 5,
  needleBaseColor: "#9d9d9d",
  needleWidth: 2,
  needleSharp: false,
  needleColor: "#8a8a8a"
};
