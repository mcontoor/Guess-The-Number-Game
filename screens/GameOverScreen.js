import React from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native';
import Colors from '../constants/colors';

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text>Game Over!</Text>
                <View style={styles.imgContainer}>
                    <Image
                        style={styles.image}
                        //source={require('../assets/success.png')}
                        source={{ uri: 'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/A-Alamy-BXWK5E_vvmkuf.jpg' }}
                    />
                </View>
                <Text>Your number was <Text style={styles.highlight}>{props.userChoice}</Text>, wasn't it?</Text>
                <Text>Took us <Text style={styles.highlight}>{props.numRounds}</Text> tries to figure!</Text>
                <Button title="New Game" onPress={props.onResetGame} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imgContainer: {
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        width: 300,
        height: 300,
        overflow: 'hidden',
        marginVertical: 30,
    },
    highlight: {
        color: Colors.primary,
        fontWeight: 'bold',
    }
});

export default GameOverScreen;