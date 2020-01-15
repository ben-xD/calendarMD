import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

interface Props {

}

const NoInternet: React.FC<Props> = () => {
    return (
        <LinearGradient style={styles.container} colors={['#FF6B60', '#FF6B60', '#FFB528']}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Oh no!</Text>
                <Text style={styles.subtitle}>Looks like you're not connected to the internet</Text>
                <Button containerStyle={{ marginTop: 16 }} title="Steal the internet back"></Button>
            </View>
        </LinearGradient>
    )
}

export default NoInternet

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        padding: 32
    },
    title: {
        color: 'white',
        fontSize: 48,
        textAlign: 'center'
    },
    subtitle: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center'
    }
})