import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, TextInput } from 'react-native';
import MapViewComponent, { Polyline, Marker } from 'react-native-maps';
import { Input } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import {
	Ionicons, AntDesign, FontAwesome, Entypo, MaterialIcons,
	MaterialCommunityIcons
} from '@expo/vector-icons';
import { connect } from 'react-redux';

import { POST } from '../lib/Api';
import { COLOR_RED, COLOR_GREEN, COLOR_GREY, COLOR_DARK_GREY } from '../constants/colors';
import { WIDTH } from '../constants/Dimensions';
import { updateUserRoute } from '../actions/user';


const styles = StyleSheet.create({
	map: {
		...StyleSheet.absoluteFill
	},
	textInput: {
		color: COLOR_DARK_GREY,
		flex: 1
	},
	textInputContainer: {
		position: 'absolute',
		top: 30,
		left: 12,
		backgroundColor: 'white',
		width: WIDTH - 25,
		padding: 10,
		borderRadius: 50,
		flexDirection: 'row'
	},
	icon: {
		marginHorizontal: 10
	}

})

class StopsNamingView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			text: '',
			stopIndex: 0,
			stops: []
		}
		this.mapRef = React.createRef();
		this.noStops = props.STOPS.length - 1;
	}

	handleTextChange = (text) => {
		this.setState({ text });
	}

	handleCheckPress = async () => {
		const { stopIndex, text, stops } = this.state;
		const { STOPS, path, updateUserRoute, navigation } = this.props;

		if (!text.trim()) return;

			const stop = {
				coordinate: STOPS[stopIndex],
				name: text
			}
			const newStops = [...stops, stop];
			this.setState({
				stopIndex: stopIndex + 1,
				text: '',
				stops: newStops
			})
		if (stopIndex < this.noStops) {
			return this.moveCamera(STOPS[stopIndex + 1])
		}
		try {
			const data = await POST('routes',
				{
					route: {
						stops: newStops,
						path
					}
				}
			)
			await updateUserRoute(data._id);
			navigation.navigate('RouteView');
		} catch (e) {
			console.log('post_route', e)
		}

	}

	moveCamera = (coordinate) => {
		this.mapRef.animateCamera({
			center: coordinate,
		}, {
				duration: 500
			})
	}

	handleMarkerPress = () => {
		const { stopIndex } = this.state;

		this.mapRef.animateCamera({
			center: coordinate,
		}, {
				duration: 500
			})
	}

	renderMarker = () => {
		const { STOPS } = this.props;
		return (
			<>
				{STOPS.map((item, index) => (
					<Marker
						key={index}
						coordinate={item}
					/>
				))}
			</>
		)
	}

	renderPath = () => {
		const { path } = this.props
		return (
			<Polyline
				strokeColor={COLOR_GREEN}
				strokeWidth={6}
				coordinates={path}
			/>
		);
	}

	renderTextInput = () => {
		const { text } = this.state
		return (
			<TextInput
				style={styles.textInput}
				value={text}
				onChangeText={this.handleTextChange}
			/>
		)
	}

	render() {
		const { text } = this.state
		return (
			<>
				<MapViewComponent
					ref={ref => this.mapRef = ref}
					style={styles.map}
					initialRegion={{
						latitude: 23.1893472,
						longitude: 72.628909,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
					showsUserLocation={true}
					zoomEnabled={false}
					zoomControlEnabled={false}
				>
					{this.renderPath()}
					{this.renderMarker()}
				</MapViewComponent >
				<View style={styles.textInputContainer}>
					<FontAwesome name="map-marker" size={25} color={COLOR_DARK_GREY} style={styles.icon} />
					<TextInput
						style={styles.textInput}
						value={text}
						onChangeText={this.handleTextChange}
					/>
					<MaterialCommunityIcons name={'check-decagram'} style={styles.icon} color={COLOR_GREEN} size={25} onPress={this.handleCheckPress} />
				</View>
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		path: state.createRoute.path,
		STOPS: state.createRoute.stops
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserRoute: (params) => dispatch(updateUserRoute(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StopsNamingView);
