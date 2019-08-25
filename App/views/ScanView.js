import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Text, Button } from 'react-native-elements';

import CircularButton from '../components/CircularButton';
import { POST } from '../lib/Api';
import { connect } from 'react-redux';
import { updateUser } from '../actions/user';
import { COLOR_GREEN } from '../constants/colors';
import { WIDTH, HEIGHT } from '../constants/Dimensions';


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
	},
	check: {
		position: 'absolute',
		top: HEIGHT / 2,
		right: WIDTH / 2,
		backgroundColor: COLOR_GREEN,
		padding: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
})

class ScanView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			hasCameraPermission: null,
			scanned: false
		};
	}

	async componentDidMount() {
		this.getPermissionsAsync();
	}

	getPermissionsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	};

	handleBarCodeScanned = async ({ data }) => {
		const { userId, updateUser, navigation } = this.props;
		try {
			const ticket = JSON.parse(data);
			const user = await POST('tickets/book', {
				ticketId: ticket._id,
				billAmount: ticket.billAmount,
				userId,
			})
			this.setState((preState) => {
				if (preState.scanned) return {};
				updateUser(user);
				navigation.navigate('Ticket', { ticket });
				return {
					scanned: true
				}
			})

		} catch (e) {
			console.log('barcode_scan', e);
		}
	}

	handleRescanPress = () => {
		this.setState({ scanned: false })
	}

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
					onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
				/>
				{scanned ?
					<CircularButton
						onPress={this.handleRescanPress}
						style={styles.check}
					>
						<AntDesign size={25} name='reload1' color='white' />
					</CircularButton> :
					null
				}
			</View>
		);
	}
}

mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id
	}
}

mapDispatchToProps = (dispatch) => {
	return {
		updateUser: (user) => dispatch(updateUser(user))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ScanView);