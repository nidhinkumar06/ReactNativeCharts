import React, { Component } from 'react';
import AreaChartExample from './src/components/AreaChartExample';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import GaugeExample from './src/components/GaugeExample';


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Charts
        </Text>
        {/* <AreaChartExample /> */}
        <GaugeExample />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
