import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const LocationScreen = () => {
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permissão de localização negada');
                return;
            }

            const locationData = await Location.getCurrentPositionAsync({});
            setLocation(locationData.coords);
        } catch (error) {
            console.error('Erro ao obter localização:', error);
        }
    };

    const getWeatherForLocation = () => {
        if (location) {
            const { latitude, longitude } = location;
            navigation.navigate('Previsão do Tempo', { latitude, longitude });
        }
    };

    return (
        <View style={styles.container}>
            {location ? (
                <>
                    <Text style={styles.text}>Latitude: {location.latitude}</Text>
                    <Text style={styles.text}>Longitude: {location.longitude}</Text>
                    <TouchableOpacity style={styles.button} onPress={getWeatherForLocation}>
                        <Text style={styles.buttonText}>Obter Previsão do Tempo</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.text}>Obtendo localização...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default LocationScreen;
