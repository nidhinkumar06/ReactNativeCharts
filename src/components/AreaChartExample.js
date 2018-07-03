import React, { PureComponent } from 'react';
import AreaChart from './AreaChart';
import Grid from './Grid';
import XAxis from './x-axis';
import YAxis from './y-axis';
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
        value: 20,
        date: dateFns.setHours(new Date(2018, 0, 0), 6),
        label: 'one',
      },
      {
        value: 30,
        date: dateFns.setHours(new Date(2018, 0, 0), 9),
        label: 'two',
      },
      {
        value: 10,
        date: dateFns.setHours(new Date(2018, 0, 0), 13),
        label: 'three',
      },
      {
        value: 90,
        date: dateFns.setHours(new Date(2018, 0, 0), 15),
        label: 'four',
      },
      {
        value: 45,
        date: dateFns.setHours(new Date(2018, 0, 0), 17),
        label: 'five',
      },
  ]

       // const axesSvg = { fontSize: 10, fill: 'blue' };
       // const verticalContentInset = { top: 10, bottom: 10 }
       // const xAxisHeight = 30
       //
       // const contentInset = { top: 20, bottom: 20 }

    return (
      <View style={{height: 200, padding: 20}}>
        <YAxis
            data={ data }
            yAccessor = {({index}) => index }
            contentInset = {{top: 10, bottom: 10}}
            spacing = {0.2}
            formatLabel = {(_, index) => data[index].label}
        />

        <AreaChart
          style = {{flex: 1}}
          data = {data}
          yAccessor = { ({item}) => item.value }
          xAccessor = { ({item}) => item.date }
          contentInset = {{top: 10, bottom: 10}}
          svg = {{fill: 'rgba(134, 65, 244, 0.5)'}}
          curve = {shape.curveNatural}
          >
          <Grid />
        </AreaChart>
        <XAxis
          data = {data}
          svg = {{
            fill: 'black',
            fontSize: 12,
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
