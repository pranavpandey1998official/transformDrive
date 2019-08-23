import React from 'react';
import { Button, Text, View } from 'react-native';

export default class StaticsView extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>StaticsView</Text>
        </View>
      );
    }
  }