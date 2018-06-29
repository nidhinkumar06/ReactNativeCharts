/* @flow */

import React, { PureComponent } from 'react';
import AreaChart from './AreaChart';
import Grid from './Grid';
import XAxis from './x-axis';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import dateFns from 'date-fns';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class AreaChartExample extends PureComponent {
  render() {
    const data = [
      {
        value: 50,
        date: dateFns.setHours(new Date(2018, 0, 0), 6),
      },
      {
        value: 30,
        date: dateFns.setHours(new Date(2018, 0, 0), 21),
      },
      {
        value: 10,
        date: dateFns.setHours(new Date(2018, 0, 0), 9),
      },
      {
        value: 90,
        date: dateFns.setHours(new Date(2018, 0, 0), 17),
      },
      {
        value: 45,
        date: dateFns.setHours(new Date(2018, 0, 0), 15),
      },
  ]
    return (
      <View style={{height: 200, padding: 20}}>
        <AreaChart
          style = {{flex: 1}}
          data = {data}
          yAccessor = { ({item}) => item.value }
          xAccessor = { ({item}) => item.date }
          contentInset = {{top: 10, bottom: 10}}
          svg = {{fill: 'rgba(134, 65, 244, 0.5)'}}
          curve = {shape.curveLinear}
          >
          <Grid />
        </AreaChart>
        <XAxis
          data = {data}
          svg = {{
            fill: 'black',
            fontSize: 8,
            fontWeight: 'bold',
            rotation: 20,
            originY: 30,
            y: 5,
          }}
          xAccessor = { ({item}) => item.date }
          scale = {scale.scaleTime}
          numberOfTicks = {6}
          style = {{
            marginHorizontal: -15,
            height: 20,
          }}
          contentInset = {{left: 10, right: 25}}
          formatLabel = { (value) => dateFns.format(value, 'HH:mm') }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
