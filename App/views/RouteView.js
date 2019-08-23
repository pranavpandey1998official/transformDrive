import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import MapViewComponent, { Polyline, Marker } from 'react-native-maps';
import { connect } from 'react-redux';

import { WIDTH, HEIGHT } from '../constants/Dimensions';
import { COLOR_GREEN  } from '../constants/colors';
const styles = StyleSheet.create({
	map: {
		height: HEIGHT*4/5,
		width: WIDTH
	},
	button: {
		margin: 10,
		marginHorizontal: 30
	}
})

class RouteView extends React.Component {

	renderMarker = () => {
		const { stops } = this.props.route;
		if(!stops) return null;

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
		if(!path) return null;
		return (
			<Polyline
				strokeColor={COLOR_GREEN}
				strokeWidth={6}
				coordinates={path}
			/>
		);
	}

	render() {
		return (
			<View>
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
				<View>
					<Button
						containerStyle={styles.button}
						onPress={() => { this.props.navigation.navigate('CreateRouteView') }}
						title='Create New Route'
					/>
					<Button
						containerStyle={styles.button}
						onPress={() => { this.props.navigation.navigate('SelectRouteView') }}
						title='Select From existing Route'
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		route: state.route
	}
} 
export default connect(mapStateToProps)(RouteView);