import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DeviceMotion } from 'expo-sensors';

export default function ExemploDeviceMotion() {
    const [orientation, setOrientation] = useState(null);

    useEffect(() => {
        DeviceMotion.addListener((event) => {
            setOrientation(event);
            // console.log(event);
        })
    }, []);

    function radiansToDegrees(radians) {
        return (radians * 180) / Math.PI;
    }


    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>YAW: {radiansToDegrees(orientation?.rotation.alpha)}</Text>
            <Text style={styles.paragraph}>PITCH: {radiansToDegrees(orientation?.rotation.beta)}</Text>
            <Text style={styles.paragraph}>ROLL: {radiansToDegrees(orientation?.rotation.gamma)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
});
