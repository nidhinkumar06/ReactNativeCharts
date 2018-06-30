/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Gauge from './Gauge';

export default class GaugeExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>GaugeExample</Text>
        <Gauge
          size={200}
          currentValue={5}
          needleSharp={true}
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
