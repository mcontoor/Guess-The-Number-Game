/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const NumberContainer = props => {
    return (
        <View style={styles.numberContainer}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    numberContainer: {
        height: 40,
        width: '40%',
        borderWidth: 2,
        borderColor: Colors.accent,
        padding: 10,
        marginVertical: 10,
        elevation: 3,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
    },
});

export default NumberContainer;
