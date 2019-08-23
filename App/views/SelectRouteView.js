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

import { COLOR_RED, COLOR_GREEN, COLOR_GREY, COLOR_DARK_GREY } from '../constants/colors';
import { WIDTH } from '../constants/Dimensions';
import CircularButton from '../components/CircularButton';
import { updateUserRoute } from '../actions/user';

import { GET, POST } from '../lib/Api';

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFill
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

})

class SelectRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            routes: [],
            marker: [],
            routeId: null
        }
    }

    async componentDidMount() {
        try {
            const routes = await GET('routes');
            this.setState({routes})
        } catch(e){
            console.log('get-routes', e);
        }
    }

    onPressForward = async() => {
        const { routeId } = this.state;
        const { navigation, updateUserRoute } =this.props;
        if(!routeId) return;
        await updateUserRoute(routeId);
        navigation.navigate('RouteView')
    }

    handlePathPress = (id, stops) => {
        this.setState({routeId: id, marker: stops})
    }

    renderMarker = () => {
        const { marker } = this.state;
        return (
            <>
                {marker.map((item, index) => (
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
        const { routes } = this.state
        if(!routes) return null;
        return (
            <>
            {routes.map((item) => (
                <Polyline 
                    key={item._id}
                    strokeColor={COLOR_GREEN}
                    strokeWidth={6}
                    coordinates={item.route.path}
                    tappable={true}
                    onPress={() => this.handlePathPress(item._id,item.route.stops)}
                />
            ))}
            </>
        );
    }

    render() {
        const { routeId } = this.state
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
                    zoomControlEnabled={false}
                >
                    {this.renderPath()}
                    {this.renderMarker()}
                </MapViewComponent >
                <CircularButton
					onPress={this.onPressForward}
					style={[styles.check, !routeId && { backgroundColor: COLOR_GREY}]}
				>

					<Ionicons size={25} name='md-checkmark' color='white' />
				</CircularButton>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserRoute: (params) => dispatch(updateUserRoute(params))
    }
}

export default connect(null, mapDispatchToProps)(SelectRoute);
