import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text, SocialIcon, Divider } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { loginRequest as login } from '../actions/auth';
import { COLOR_BLUE, COLOR_YELLOW, COLOR_RED  } from '../constants/colors';

const styles = StyleSheet.create({
	container: {
		margin: 30,
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center'
	},
	input: {
		borderWidth: 1,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	heading: {
		//fontFamily: 'Roboto'
	},
	label: {
		//fontFamily: 'Roboto',
		color: 'black',
		fontSize: 20,
		fontWeight: '300'

	},
	button: {
		paddingTop: 0,
		minHeight: 50,
	},
	divider: {
		height: 1,
		backgroundColor: 'grey',
		flex: 1,
		transform: [{ translateY: 10 }],
		marginHorizontal: 5
	},
	heading: {
		fontSize: 50,
		//ontFamily: 'Roboto',
		fontWeight: '500',
		marginHorizontal: 45,
		marginVertical: 10
	},
	error: {
		color: COLOR_RED,
		textAlign: 'center',
		fontSize: 16,
		fontWeight: "500"
	}
})
class SignInView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			password: '',
			userName: '',
		}
	}

	handlePassChange = (text) => {
		this.setState({ password: text });
	}

	handleUserNameChange = (text) => {
		this.setState({ userName: text });
	}

	navigateToSignUp = () => {
		const { navigation } = this.props;
		navigation.navigate('SignUpView');
	}

	onSubmit = () => {
		const { password, userName } = this.state;
		const { login } = this.props;
		if(password.trim() === '' || userName.trim() === ''){
			return;
		}
		login({
			password,
			userName
		});
	}

	renderError = () => {
		const {error} = this.props;
		if (!error) {
			return null;
		}
		return <Text style={styles.error}>{error}</Text>
	}

	render() {
		return (
			<KeyboardAwareScrollView contentContainerStyle={{flex: 1}} behavior='position' scrollEnabled={true} keyboardShouldPersistTaps= 'always'
			keyboardDismissMode= 'interactive'>
			<View style={styles.container}>
				<Text style={styles.heading}>TOGETHER</Text>
				<Button
					title="Sign Up"
					raised={true}
					buttonStyle={[styles.button, { backgroundColor: COLOR_YELLOW}]}
					containerStyle={{ margin: 8, marginTop: 30 }}
					onPress={this.navigateToSignUp}
				/>
				<View style={{ flexDirection: 'row' }}>
					<Divider style={styles.divider} />
					<Text>or</Text>
					<Divider style={styles.divider} />
				</View>
				<Input
					placeholder='Email'
					label='Email'
					labelStyle={styles.label}
					inputContainerStyle={styles.input}
					leftIconContainerStyle={styles.icon}
					containerStyle={{ marginVertical: 10 }}
					onChangeText={this.handleUserNameChange}
				/>
				<Input
					placeholder='Password'
					label='Password'
					labelStyle={styles.label}
					inputContainerStyle={styles.input}
					onChangeText={this.handlePassChange}
					secureTextEntry={true}
				/>
				<Button
					title="Login"
					raised={true}
					buttonStyle={styles.button}
					containerStyle={{ margin: 8, marginVertical: 30 }}
					onPress={this.onSubmit}
				/>
				{this.renderError()}
			</View>
			</KeyboardAwareScrollView>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (param) => dispatch(login(param))
	}
}

const mapStateToProps = (state) => {
	return {
		error: state.auth.error
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInView);
