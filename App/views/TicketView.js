import React from 'react';
import { Button, Text, View } from 'react-native';

export default class TicketView extends React.Component {
	
	constructor(props) {
		super(props);
		this.ticket = props.navigation.getParam('data');
	}
	
	render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{JSON.stringify(this.ticket)}</Text>
        </View>
      );
    }
  }