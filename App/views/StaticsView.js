import React from 'react';
import { Button, Text, View, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Counter from 'react-native-counter';
import { Divider } from 'react-native-elements';
import sharedStyles from './Styles';
import { COLOR_BLUE, COLOR_GREY, COLOR_RED } from '../constants/colors';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { logoutRequest } from '../actions/auth';

const DURATION = 2000

const styles = StyleSheet.create({
	title: {
		marginTop: 30,
		...sharedStyles.text,
		fontWeight: "400",
		fontSize: 30,
		textAlign: 'center',
		padding: 20,
	},
	headerContainer: {
		margin: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerIcon: {
		padding: 25,
		borderRadius: 40,
		backgroundColor: '#3C2B5E',
		margin: 10
	},
	counterText: {
		fontFamily: 'open-sans',
		fontSize: 40,
		fontWeight: "300",
		color: '#45454d'

	},
	name: {
		textAlign: 'center',
		margin: 5,
		...sharedStyles.text,
		fontWeight: "400",
		fontSize: 20,
		color: COLOR_GREY
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
})
class StaticsView extends React.Component {

	handleLogOut = () => {
		const { logout } = this.props;
		logout();
	}

	render() {
		const { bank, name } = this.props;
		return (
			<ScrollView>
				<SafeAreaView style={styles.header}>
					<Text style={styles.title}>StaticsView</Text>
					<View style={styles.headerContainer}>
						<FontAwesome name='bank' size={40} color='white' style={styles.headerIcon} />
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'center', margin: 5 }}>
						<Text style={styles.counterText}>{bank}.00 INR</Text>
					</View>
					<Text style={styles.name}>{name}</Text>
					<TouchableWithoutFeedback
					>
						<View style={styles.optionContainer}>
							<MaterialCommunityIcons name='bank-transfer' color={COLOR_BLUE} size={40} />
							<Text style={[styles.optionText, { marginLeft: 7}]}>Transfer to bank</Text>
						</View>
					</TouchableWithoutFeedback>
					<Divider />

					<TouchableWithoutFeedback
						onPress={this.handleLogOut}
					>
						<View style={styles.optionContainer}>
							<FontAwesome name='power-off' color={COLOR_RED} size={30} style={{}} />
							<Text style={styles.optionText}>Log Out</Text>
						</View>
					</TouchableWithoutFeedback>
				</SafeAreaView>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		bank: state.auth.user.bank,
		name: state.auth.user.name
	}	
}

const mapDispatchToProps =(dispatch) => {
	return {
		logout : () => dispatch(logoutRequest())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StaticsView);