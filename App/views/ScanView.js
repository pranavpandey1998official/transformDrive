import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, Button } from 'react-native-elements';

const styles = StyleSheet.create({
	spinner: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	errorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	errorText: {
		margin: 10,
		fontSize: 14
	}
})

export default class ScanView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			hasCameraPermission: null,
		};
	}

	async componentDidMount() {
		this.getPermissionsAsync();
	}

	getPermissionsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	};

	handleBarCodeScanned = ({ type, data }) => {
		this.props.navigation.navigate('Ticket', { data });
	};

	render() {
		const { hasCameraPermission, scanned } = this.state;

		if (hasCameraPermission === null) {
			return <ActivityIndicator size='large' style={styles.spinner} />;
		}
		if (hasCameraPermission === false) {
			return (
				<View style={styles.errorContainer}>
					<MaterialIcons name='error-outline' size={100} color={'grey'} />
					<Text style={styles.errorText}>Looks Like You didn't grant permissions to use Camera</Text>
					<Button
						title='Request Again'
						type="outline"
						onPress={this.getPermissionsAsync}
					/>
				</View>
			)
		}
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'flex-end',
				}}>
				<BarCodeScanner
					onBarCodeScanned={this.handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
				/>
			</View>
		);
	}
}