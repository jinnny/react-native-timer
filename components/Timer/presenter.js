import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Button from '../Button';

function formatTime(time) {
    let minutes = Math.floor(time/60);
    time -= minutes * 60
    let seconds = parseInt(time % 60, 10)
    return  `${minutes < 10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}`: seconds}`
}

class Timer extends Component {
    componentWillReceiveProps(nextProps, nextContext) {
        const currentProps = this.props;
        if(!currentProps.isPlaying && nextProps.isPlaying){
        //    start the interval
            const timeInterval = setInterval(() => {
                currentProps.addSecond();
            }, 1000);
            this.setState({
                timeInterval
            });
        } else if(currentProps.isPlaying && !nextProps.isPlaying){
        //    stop the interval
            clearInterval(this.state.timeInterval)
        }
    }

    render(){
        const {
            isPlaying,
            elapsedTime,
            timerDuration,
            startTimer,
            restartTimer,
            addSecond
            } = this.props;
        return (
            <View style={styles.container}>
                <StatusBar barStyle={'light-content'} />
                <View style={styles.upper}>
                    <Text style={styles.time}>{formatTime(timerDuration - elapsedTime)}</Text>
                </View>
                <View style={styles.lower}>
                    {/*플레이 중이 아닐때 */}
                    { !isPlaying && (
                        <Button iconName="play-circle" onPress={startTimer} />
                    )}
                    {/*플레이 중 일때*/}
                    { isPlaying && (
                        <Button iconName="stop-circle" onPress={restartTimer} />
                    )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ce0844'
    },
    upper: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lower: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    time: {
        color: 'white',
        fontSize: 110,
        fontWeight: '100'
    }
})

export default Timer;