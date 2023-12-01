import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { getTheme, setTheme } from '../components/storage';

const LocationScreen = () => {
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [theme, setAppTheme] = useState('light');

    useEffect(() => {
        getTheme().then((storedTheme) => {
            setAppTheme(storedTheme);
        });
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setAppTheme(newTheme);
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme === 'light' ? '#f8f8f8' : '#333',
            color: theme === 'light' ? '#000' : '#fff',
        },
        containerLocs: {
            alignItems: 'center',
            backgroundColor: theme === 'light' ? '#fff' : '#333',
            borderRadius: 8,
            elevation: 10,
            padding: 15,
        },
        text: {
            fontSize: 18,
            marginBottom: 10,
            color: theme === 'light' ? '#333' : '#fff',
        },
        button: {
            marginTop: 20,
            backgroundColor: '#4CAF50',
            padding: 15,
            borderRadius: 8,
            alignItems: 'center',
        },
        themeButton: {
            position: 'absolute',
            top: 16,
            right: 300,
            padding: 10,
            borderRadius: 5,
            backgroundColor: '#4CAF50',
        },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.containerLocs}>
                <Text style={styles.text}>Latitude: {location?.latitude}</Text>
                <Text style={styles.text}>Longitude: {location?.longitude}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={getWeatherForLocation}>
                <Text style={styles.buttonText}>Obter Previsão do Tempo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
                <Text style={styles.buttonText}>🌓</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LocationScreen;
