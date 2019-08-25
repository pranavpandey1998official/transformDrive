import React from 'react';
import { Button, Text, View, StyleSheet, ScrollView } from 'react-native';
import {
	Ionicons, AntDesign, FontAwesome, Entypo, MaterialIcons,
	MaterialCommunityIcons
} from '@expo/vector-icons';
import { COLOR_GREEN, COLOR_RED, COLOR_GREY } from '../constants/colors';
import sharedStyles from './Styles'


const styles = StyleSheet.create({
	container: {
		margin: 25
	},
	headerText: {
		textAlign: 'center',
		fontFamily: 'open-sans',
		fontWeight: '500',
		fontSize: 20
	},
	header: {
		marginVertical: 10,
		flexDirection: 'row', justifyContent: 'space-between',
		alignItems: 'center'
	},
	cost: {
		...sharedStyles.text,
		fontSize: 40,
		fontWeight: '500',
	},
	cash: {
		...sharedStyles.text,
		fontSize: 25,
		fontWeight: '500',
		color: COLOR_RED
	},
	footerText: {
		fontFamily: 'open-sans',
		fontSize: 12,
		color: COLOR_GREY
	}
});
export default class TicketView extends React.Component {

	constructor(props) {
		super(props);
		this.ticket = props.navigation.getParam('ticket');
	}

	render() {

		return (
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={styles.headerText} >Paid SuccessFully</Text>
						<MaterialCommunityIcons size={30} name='check-decagram' color={COLOR_GREEN} />
					</View>
					<Text style={styles.cost}>{this.ticket.billAmount} &#8377; </Text>
					{this.ticket.isCash ? <Text style={styles.cash}>Remember To Collect Cash</Text> :  null }
					<Text style={styles.footerText}>Transaction ID {this.ticket._id}</Text>
				</View>
			</ScrollView>
		);
	}
}