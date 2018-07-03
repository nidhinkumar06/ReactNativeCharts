import React, { Component } from "react";
import { Text,View } from "react-native";
import Svg, { G, Circle, Line, Polygon, Use, Defs, Path } from "react-native-svg";
import PieChart from './pie-chart';

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
    for (let i = 0; i <= 270; i += opts.tickInterval) {
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
    // let needleValue = (360 * opts.currentValue / 270);
    let x1 = opts.cX,
      y1 = opts.cY - opts.needleWidth / 2,
      x2 = opts.cX,
      y2 = opts.cY + opts.needleWidth / 2,
      x3 = opts.diameter,
      y3 = opts.cY,
      needleAngle = (opts.currentValue > 0 ) ? (opts.currentValue > 270 ? 270 : opts.currentValue) : 0;
      // needleAngle = 360 * opts.currentValue / 270;

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
    let circumference =Math.PI * radius;
    opts = Object.assign(opts, {
      cX,
      cY,
      radius,
      diameter,
      circumference
    });

    const data = [10, 10, 10, 10, 10, 10]
    const colors = ['#7d899a', '#5b6678', '#ffc900', '#ec9f37', '#ff6c3d', '#f22720']
    const pieData = data
    .filter(value => value > 0)
    .map((value, index) => ({
      value,
      svg:{
        fill: colors[index],
        onPress: () => console.log('press', index),
      },
      key: `pie-${index}`
    }))

    return (
      <View>
        <Svg
          className={opts.className}
          style = {{zIndex: 1}}
          height={size}
          width={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <Defs>{this.defineTick(opts)}</Defs>
          <G transform={`rotate(135 ${cX} ${cY})`}>
            {this.renderDial(opts)}
            {/* {this.renderTicks(opts)} */}
            {/* {this.renderProgress(opts)} */}
            {this.renderNeedle(opts)}
            {this.renderText(opts)}
          </G>
        </Svg>
        <PieChart style={[{height: 160, position: 'relative', bottom: 180, zIndex: 0}]}
          data={pieData}
          startAngle={ -Math.PI * 0.768 }
          endAngle={ Math.PI * 0.770 }
        />
      </View>

    );
  }
}

Gauge.defaultProps = {
  size: 200,

  dialWidth: 10,
  dialColor: "#262c42",


  tickLength: 10,
  tickWidth: 4,
  tickColor: "blue",
  tickInterval: 45,

  maximumValue: 100,
  currentValue: 25,
  progressWidth: 20,
  progressColor: "blue",
  // progressRoundedEdge: true,
  downProgressColor: "red",
  progressFont: "Serif",
  progressFontSize: "40",

  needle: true,
  needleBaseSize: 8,
  needleBaseColor: "#b5b7b4",
  needleWidth: 12,
  needleSharp: true,
  needleColor: "#262c42"
};
