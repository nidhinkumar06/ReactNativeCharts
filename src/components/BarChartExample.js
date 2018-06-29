/* @flow */

import React, { PureComponent } from 'react';
import BarChart from './BarChart/bar-chart';
import XAxis from './x-axis';
import * as scale from 'd3-scale';
import {
  View,
  StyleSheet,
} from 'react-native';

export default class BarChartExample extends PureComponent {
  render() {
    const data = [14, 80, 100, 55, 30]
    return (
      <View style={styles.container}>
        <BarChart
          style = {{flex: 1}}
          data = {data}
          gridMin = {0}
          svg = {{fill: 'rgb(134, 65, 244)'}}
        />
        <XAxis
          style = {{marginTop: 10}}
          data = {data}
          scale = {scale.scaleBand}
          formatLabel = {(value, index) => index}
          labelStyle = {{color: 'black'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    padding: 20,
  },
});
