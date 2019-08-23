import React from 'react';
import { Button, Text, View } from 'react-native';

export default class AppLoadingView extends React.Component {

	renderItem = () => {
		
	}
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>AppLoadingView</Text>
			</View>
		);
	}
}