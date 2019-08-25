import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Input, Button, Text, SocialIcon, Divider } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-navigation';
import { COLOR_YELLOW } from '../constants/colors';
import { signUpRequest } from '../actions/auth';

const styles = StyleSheet.create({

    label: {
        //fontFamily: 'Roboto',
        color: 'black',
        fontSize: 20,
        fontWeight: '300'
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    submitButton: {
        marginHorizontal: 20,
        backgroundColor: COLOR_YELLOW
    }
});

export default class SignUpView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phoneNumber: '',
            email: '',
            password: ''
        }
    }

    submit = async() => {
        const { name, phoneNumber, email, password } = this.state;
        if(!name.trim() || !phoneNumber.trim() || !email.trim() || !password.trim()){
            return;
        }
        signUpRequest({
            name,
            phoneNumber,
            email,
            password
        })
    }

    render() {
        const { name, phoneNumber, email, password } = this.state;
        return (
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
            >
                <SafeAreaView forceInset={{ bottom: 'never' }}>

                    <Input
                        placeholder='Email'
                        nativeID='email'
                        label='Email'
                        labelStyle={styles.label}
                        inputContainerStyle={styles.input}
                        containerStyle={{ marginVertical: 10 }}
                        onChangeText={(text) => this.setState({ email: text })}
                        value={email}
                    />

                    <Input
                        placeholder='Phone Number'
                        id='phoneNumber'
                        label='Phone Number'
                        labelStyle={styles.label}
                        inputContainerStyle={styles.input}
                        containerStyle={{ marginVertical: 10 }}
                        onChangeText={(text) => this.setState({ phoneNumber: text })}
                        value={phoneNumber}
                    />
                    <Input
                        placeholder='Name'
                        id='name'
                        label='Name'
                        labelStyle={styles.label}
                        inputContainerStyle={styles.input}
                        containerStyle={{ marginVertical: 10 }}
                        onChangeText={(text) => this.setState({ name: text })}
                        value={name}
                    />
                    <Input
                        placeholder='Password'
                        id='password'
                        textContentType='password'
                        label='Password'
                        labelStyle={styles.label}
                        inputContainerStyle={styles.input}
                        containerStyle={{ marginVertical: 10 }}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={password}
                        secureTextEntry={true}
                    />
                    <Button 
                        containerStyle={styles.submitButton}
                        title='submit'
                        onPress={this.submit}    
                    />
                </SafeAreaView>
            </KeyboardAwareScrollView>
        );
    }
}
