import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import MapViewComponent, { Polyline, Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import {
	Ionicons, AntDesign, FontAwesome, Entypo, MaterialIcons,
	MaterialCommunityIcons
} from '@expo/vector-icons';
import { connect } from 'react-redux';

import CircularButton from '../components/CircularButton';
import { COLOR_RED, COLOR_GREEN, COLOR_GREY, COLOR_DARK_GREY } from '../constants/colors';
import { WIDTH } from '../constants/Dimensions';
import { routeNamingInit } from '../actions/createRoute';

const styles = StyleSheet.create({
	map: {
		...StyleSheet.absoluteFill
	},
	backButton: {
		position: 'absolute',
		top: 30,
		left: 12,
		backgroundColor: COLOR_RED,
		padding: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	check: {
		position: 'absolute',
		top: 30,
		right: 12,
		backgroundColor: COLOR_GREEN,
		padding: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	touchIcon: {

		position: 'absolute',
		bottom: 30,
		right: WIDTH / 2 - 25,
		backgroundColor: COLOR_GREEN,
		padding: 12,
		alignItems: 'center',
		justifyContent: 'center',

	},
	crossIcon: {
		position: 'absolute',
		bottom: 30,
		right: WIDTH / 2 - 25,
		backgroundColor: COLOR_RED,
		padding: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	undo: {
		position: 'absolute',
		top: 100,
		left: 12,
		backgroundColor: 'white',
		padding: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	stopSelectionTitle: {
		position: 'absolute',
		top: 30,
		left: 70,
		backgroundColor: COLOR_DARK_GREY,
		padding: 12,
		right: 70,
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
		fontWeight: '400',
		fontSize: 16,
		color: 'white',
		textAlign: 'center'
	}
})

class CreateRouteView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			canDraw: false,
			path: [],
			stops: [],
			isStopSelection: false,
		}
		this.cameraRef = React.createRef();
	}

	componentDidMount() {
		this._getLocationAsync();
	}

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				locationResult: 'Permission to access location was denied',
				location
			});
		}
	}

	toggleDraw = () => {
		this.setState((prevState) => {
			return {
				canDraw: !prevState.canDraw
			}
		})
	}

	getKey = (coordinate) => {
		return (coordinate.latitude + '' + coordinate.longitude);
	}

	onMapPress = ({ nativeEvent }) => {
		const { canDraw, isStopSelection } = this.state;
		if (!canDraw) {
			return null;
		}
		const { coordinate } = nativeEvent
		if(!isStopSelection) {
			return this.setState((prevState) => {
				const { path } = prevState;
				const newpath = [...path];
				newpath.push(coordinate);
				return {
					path: newpath
				}
			})
		}
		this.setState((prevState) => {
			const { stops } = prevState;
			const newstops = [...stops];
			newstops.push(coordinate);
			return {
				stops: newstops
			}
		})
	}

	onUndoPress = () => {
		const { isStopSelection } = this.state;
		if(!isStopSelection) {
			this.setState((prevState) => {
				const { path } = prevState;
				const newpath = [...path];
				newpath.pop();
				return {
					path: newpath
				}
			})
		}
		this.setState((prevState) => {
			const { stops } = prevState;
			if( stops.length == 2) return;
			const newStops = [...stops];
			newStops.pop();
			return {
				stops: newStops
			}
		})
	}

	onPressForward = async() => {
		const { isStopSelection, path, stops } = this.state;
		const { routeNamingInit, navigation } = this.props;

		if(path.length<2){
			return;
		}

		if(!isStopSelection) {
			let newStops = []
			newStops.push(path[0]);
			newStops.push(path[path.length -1]);
			this.cameraRef.animateCamera({
				center: newStops[0],
			}, {
				duration: 1000
			})
			return this.setState({
				stops: newStops,
				isStopSelection: true,
				canDraw: false
			})
		}

		await routeNamingInit({ path, stops });
		navigation.navigate('StopsNamingView');

	}

	onBackPress = () => {
		const { navigation } = this.props;
		const { isStopSelection } = this.state;
		if(!isStopSelection) {
			return navigation.goBack();
		}
		this.setState({
			canDraw: false,
			path: [],
			stops: [],
			isStopSelection: false,
		})
	}

	renderDraw = () => {
		const { canDraw } = this.state;
		if (!canDraw) {
			return (
				<CircularButton
					style={styles.touchIcon}
					onPress={this.toggleDraw}
				>
					<MaterialIcons size={25} name='touch-app' color='white' />
				</CircularButton>
			)
		}
		return (
			<CircularButton
				style={styles.crossIcon}
				onPress={this.toggleDraw}
			>
				<Entypo size={25} name='cross' color='white' />
			</CircularButton>
		)
	}

	renderStopsMarker = () => {
		const { stops } = this.state;
		return(
			<React.Fragment>
				{stops.map((item)=> (<Marker key={this.getKey(item)} coordinate={item}/>))}
			</React.Fragment>
		)
	}

	renderStart = () => {
		const { path } = this.state;
		if (path.length > 0) {
			return (
				<Marker
					coordinate={path[0]}
				>
					<MaterialCommunityIcons name='circle-slice-8' color={COLOR_GREEN} size={15} />
				</Marker>
			)
		}
		return null;
	}

	renderStopSelectionTitle = () => {
		const { isStopSelection } = this.state;
		if(!isStopSelection)
			return null;

		return(
		<Text
			style={styles.stopSelectionTitle}
		>
			Please Mark All The Stops in Your Path 
		</Text>)
	}

	renderOptions = () => {
		const { path } = this.state;
		return (
			<React.Fragment>
				<CircularButton
					onPress={this.onBackPress}
					style={styles.backButton}
				>
					<Ionicons size={25} name='md-arrow-back' color='white' />
				</CircularButton>
				<CircularButton
					onPress={this.onPressForward}
					style={[styles.check, path.length < 2 && { backgroundColor: COLOR_GREY}]}
				>

					<Ionicons size={25} name='md-checkmark' color='white' />
				</CircularButton>
				<CircularButton
					style={styles.undo}
					onPress={this.onUndoPress}
				>
					<AntDesign size={25} name='back' color={COLOR_GREY} />
				</CircularButton>
			</React.Fragment>
		)
	}

	render() {
		const { path, location } = this.state;
		if(location) return null; // TODO: add no location component 		
		return (
			<View style={{ flex: 1 }}>
				<MapViewComponent
					ref={ref => this.cameraRef = ref}
					style={styles.map}
					initialRegion={{
						latitude: 23.1893472,
						longitude: 72.628909,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
					showsUserLocation={true}
					onPress={this.onMapPress}
					zoomEnabled={false}
					zoomControlEnabled={false}
				>
					{this.renderStart()}
					<Polyline
						coordinates={path}
						strokeColor={COLOR_GREEN}
						strokeWidth={6}
					/>
					{this.renderStopsMarker()}
				</MapViewComponent>
				{this.renderStopSelectionTitle()}
				{this.renderOptions()}
				{this.renderDraw()}
			</View>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		routeNamingInit: (params) => dispatch(routeNamingInit(params))
	}
}

export default connect(null, mapDispatchToProps)(CreateRouteView);