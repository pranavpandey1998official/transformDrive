import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import MapViewComponent, { Polyline, Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { WIDTH, HEIGHT } from '../constants/Dimensions';
import { COLOR_GREEN, COLOR_YELLOW, COLOR_BACKGROUNG_DISABLE, COLOR_GREY } from '../constants/colors';

const styles = StyleSheet.create({
	map: {
		height: HEIGHT * 2 / 3,
		width: WIDTH
	},
	button: {
		margin: 10,
		marginHorizontal: 30
	},
	optionContainer: {
		paddingVertical: 20,
		flexDirection: 'row',
		alignItems: 'center'
	},
	optionText: {
		fontFamily: 'open-sans',
		fontSize: 16,
		marginLeft: 20
	},
	header: {
		marginTop: 24,
		marginHorizontal: 30,
	},
	error: {
		fontFamily: 'open-sans',
		fontSize: 16,
		color: COLOR_GREY
	}
})

class RouteView extends React.Component {

	renderMarker = () => {
		const { stops } = this.props.route;
		if (!stops) return null;

		return (
			<>
				{stops.map((item, index) => (
					<Marker
						key={index}
						coordinate={item.coordinate}
						title={item.name}
					/>
				))}
			</>
		)
	}
	renderPath = () => {
		const { path } = this.props.route;
		return (
			<Polyline
				strokeColor={COLOR_GREEN}
				strokeWidth={6}
				coordinates={path}
			/>
		);
	}

	renderMaps = () => {
		const { path } = this.props.route;
		if (!path) {
			return (
				<View style={[styles.map, { justifyContent: 'center', alignItems: 'center', margin: 10 }]}>
					<MaterialIcons name='error' size={40} color={COLOR_GREY} />
					<Text style={styles.error}>Looks like you have not configured any route please either selected one or create your own </Text>
				</View>
			)
		}
		return (
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
				zoomControlEnabled={false}
			>
				{this.renderMarker()}
				{this.renderPath()}
			</MapViewComponent>
		)
	}

	render() {
		return (
			<ScrollView style={{ flex: 1 }}>
				{this.renderMaps()}
				<View style={styles.header}>
					<TouchableWithoutFeedback
						onPress={() => { this.props.navigation.navigate('CreateRouteView') }}
					>
						<View style={styles.optionContainer}>
							<MaterialIcons name='create' color={COLOR_GREEN} size={30} />
							<Text style={styles.optionText}>Create New Route</Text>
						</View>
					</TouchableWithoutFeedback>
					<Divider />
					<TouchableWithoutFeedback
						onPress={() => { this.props.navigation.navigate('SelectRouteView') }}
					>
						<View style={styles.optionContainer}>
							<MaterialCommunityIcons name='cursor-pointer' color={COLOR_YELLOW} size={30} />
							<Text style={styles.optionText}>Select From existing Route</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		route: state.route
	}
}
export default connect(mapStateToProps)(RouteView);