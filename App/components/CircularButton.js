import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        borderRadius: 50,
        height: 50,
        width: 50
    }
})

const CircularButton = (props) => {

    return(
        <TouchableOpacity
            style={[styles.container, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </TouchableOpacity>
    )
}

export default CircularButton;