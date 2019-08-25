import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import {
	Ionicons, AntDesign, FontAwesome, Entypo,
	MaterialCommunityIcons
} from '@expo/vector-icons';
import { Provider } from 'react-redux';

import store from './lib/createStore';
import Navigation from './lib/Navigation';
import init from '../App/actions/init';

import SignInView from './views/SignInView';
import ScanView from './views/ScanView';
import RouteView from './views/RouteView';
import StaticsView from './views/StaticsView';
import SettingsView from './views/SettingsView';
import TicketView from './views/TicketView';
import CreateRouteView from './views/CreateRouteView';
import StopsNamingView from './views/StopsNamingView';
import AppLoadingView from './views/AppLoadingView';
import SignUpView from './views/SignUpView';
import SelectRouteView from './views/SelectRouteView';

import * as Font from 'expo-font';

const ScanStack = createStackNavigator({
	ScanView: {
		screen: ScanView,
		navigationOptions: () => ({
			header: null
		})
	},
	Ticket: {
		screen: TicketView,
		navigationOptions: () => ({
			title: 'Ticket'
		}),
		headerTitleStyle: {
			fontFamily: 'open-sans'
		}
	}
}, {

	});

ScanStack.navigationOptions = ({ navigation }) => {
	let tabBarVisible = true;
	if (navigation.state.index > 0) {
		tabBarVisible = false;
	}

	return {
		tabBarVisible,
	};
}


const RouteStack = createStackNavigator({
	RouteView: {
		screen: RouteView,
		navigationOptions: () => ({
			header: null
		})
	},
	CreateRouteView: {
		screen: CreateRouteView,
		navigationOptions: () => ({
			header: null
		})
	},
	StopsNamingView: {
		screen: StopsNamingView,
		navigationOptions: () => ({
			header: null
		})
	},
	SelectRouteView: {
		screen: SelectRouteView,
		navigationOptions: () => ({
			header: null
		})
	},

}, {
		navigationOptions: ({ navigation }) => {
			let tabBarVisible = true;
			if (navigation.state.index > 0) {
				tabBarVisible = false;
			}

			return {
				tabBarVisible,
			};
		}
	})


const AppStack = createBottomTabNavigator({
	Route: RouteStack,
	Scan: ScanStack,
	Statics: StaticsView,
}, {
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				let Icon;
				if (routeName === 'Statics') {
					Icon = <Entypo name='line-graph' size={25} color={tintColor} />;

				} else if (routeName === 'Scan') {
					Icon = <MaterialCommunityIcons name='qrcode-scan' size={25} color={tintColor} />;
				} else if (routeName === 'Route') {
					Icon = <MaterialCommunityIcons name='routes' size={25} color={tintColor} />;
				} else if (routeName === 'Settings') {
					Icon = <Ionicons name='ios-settings' size={25} color={tintColor} />
				}
				return Icon;
			},
		}),
		tabBarOptions: {
			activeTintColor: 'tomato',
			inactiveTintColor: 'gray',
			showIcon: true
		},
	});

const AuthStack = createStackNavigator({
	SignIn: {
		screen: SignInView,
		navigationOptions: () => ({
			header: null
		})
	},
	SignUpView: {
		screen: SignUpView,
		navigationOptions: () => ({
			title: 'Sign Up',
			headerTitleStyle: {
				fontFamily: 'open-sans'
			}
		})
	}
}
)

const App = createAppContainer(createSwitchNavigator(
	{
		AppLoading: AppLoadingView,
		App: AppStack,
		Auth: AuthStack,
	},
	{
		initialRouteName: 'AppLoading',
	}
));

export default class Root extends React.Component {
	constructor(props) {
		super(props);
		this.init();
	}

	init = async() => {
		await Font.loadAsync({
			Montserrat: require('./statics/Montserrat-Regular.ttf'),
			'open-sans': require('./statics/OpenSans.ttf')
		});
		store.dispatch(init());
	}

	render() {
		return <Provider store={store}>
			<App
				ref={(navigatorRef) => {
					Navigation.setTopLevelNavigator(navigatorRef);
				}}
			/>
		</Provider>
	}
}