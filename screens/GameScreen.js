/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, Dimensions, FlatList } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateandomNumBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateandomNumBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <Text>#{listLength - itemData.index}</Text>
        <Text>{itemData.item}</Text>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateandomNumBetween(1, 99, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [rounds, setRounds] = useState([initialGuess]);
    const [availableWidth, setAvailableWidth] = useState(Dimensions.get('window').width);
    const [availableHeight, setAvailableHeight] = useState(Dimensions.get('window').height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    const updateLayout = () => {
        setAvailableHeight(Dimensions.get('window').height);
        setAvailableWidth(Dimensions.get('window').width);
    };

    useEffect(() => {
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    })

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert(
                'Are you sure?',
                'It seems you may have provided an incorrect hint',
                [{
                    text: 'Oops',
                    style: 'destructive',
                }],
            )
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        };
        const nextNum = generateandomNumBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNum);
        setRounds(curRounds => [nextNum, ...curRounds]);
    };

    if (availableHeight < 400) {
        return (
            <View>
                <View style={styles.smallscreen}>
                    <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <Button title="HIGHER" onPress={nextGuessHandler.bind(this, 'greater')} />
                </View>
                <FlatList
                    keyExtractor={item => item}
                    data={rounds}
                    renderItem={renderListItem.bind(this, rounds.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
                <Button title="HIGHER" onPress={nextGuessHandler.bind(this, 'greater')} />
            </Card>
            <FlatList
                keyExtractor={item => item}
                data={rounds}
                renderItem={renderListItem.bind(this, rounds.length)}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 300,
        maxWidth: '80%',
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.8
    },
    smallscreen: {
        flexDirection: 'row',
        // width: '80%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
});

export default GameScreen;