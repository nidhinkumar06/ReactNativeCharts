import React, { Component } from 'react';
import Gauge from './src/components/Gauge-chart';
// import AreaChartExample from './src/components/AreaChartExample';
// import BarChartExample from './src/components/BarChartExample';
// import YAxisExample from './src/components/Yaxis-example';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import GaugeExample from './src/components/GaugeExample';


export default class App extends Component {
  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>
      //     AreaChartExample
      //   </Text>
      // //   {/* <Text style={styles.welcome}>
      // //     BarChartExample
      // //   </Text>
      // //   <BarChartExample /> */}
      //   </View>
      <View style = {styles.container}>
        <Text style={styles.welcome}>AreaChart</Text>
              <Gauge  currentValue = {200} />
          {/* <AreaChartExample /> */}
          {/* <BarChartExample/> */}
         {/* <Text style={styles.welcome}>BarChart</Text> */}
         {/* <YAxisExample /> */}

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
});
