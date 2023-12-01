import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import CityScreen from './pages/CityScreen';
import SearchHistoryScreen from './pages/SearchHistoryScreen';
import LocationScreen from './pages/LocationScreen';
import { getTheme, setTheme } from './components/storage';

const Stack = createStackNavigator();

export default function App() {
    const [cityName, setCityName] = useState('');
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

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" headerShow="false">
                <Stack.Screen name="Página Inicial">
                    {(props) => <HomeScreen {...props} theme={theme} toggleTheme={toggleTheme} />}
                </Stack.Screen>
                <Stack.Screen name="Previsão do Tempo" component={CityScreen} />
                <Stack.Screen name="Histórico de Pesquisa" component={SearchHistoryScreen} />
                <Stack.Screen name="Localização Atual" component={LocationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function HomeScreen({ navigation, theme, toggleTheme }) {
    const [cityName, setCityName] = useState('');

    const navigateToCity = () => {
        navigation.navigate('Previsão do Tempo', { cityName });
    };

    const navigateToHistory = () => {
        navigation.navigate('Histórico de Pesquisa');
    }

    const navigateToLocation = () => {
        navigation.navigate('Localização Atual');
    }

    const isSearchDisabled = cityName.trim() === '';

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            resizeMode: 'contain',
            position: 'relative',
            backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
        },
        content: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
        },
        headerText: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            textShadowColor: 'rgba(0, 0, 0, 0.25)',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 10,
            color: theme === 'light' ? '#333' : '#fff',
        },
        input: {
            height: 40,
            borderColor: theme === 'light' ? 'black' : 'white',
            borderWidth: 1,
            width: '80%',
            marginBottom: 20,
            paddingLeft: 10,
            color: theme === 'light' ? '#000' : '#fff',
        },
        button: {
            marginBottom: 15,
            backgroundColor: '#4CAF50',
            padding: 10,
            borderRadius: 5,
        },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
        },
        disabledButton: {
            opacity: 0.5,
        },
        themeButton: {
            position: 'absolute',
            top: 16,
            right: 300,
            padding: 10,
            borderRadius: 5,
            backgroundColor: '#4CAF50',
        },
        themeButtonText: {
            color: 'white',
            fontWeight: 'bold',
        },
        copyright: {
            textAlign: 'center',
            color: theme === 'light' ? '#333' : '#fff',
            backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
        },
    });

    return (
        <ImageBackground
            source={require('./assets/card-mapa-mundi.jpg')}
            style={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
        >
            <View style={styles.content}>
                <Text style={styles.headerText}> Previsão do Tempo </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome da cidade"
                    placeholderTextColor={theme === 'dark' ? '#fff' : '#999'}
                    value={cityName}
                    onChangeText={setCityName}
                />
                <TouchableOpacity
                    style={[styles.button, isSearchDisabled && styles.disabledButton]}
                    onPress={navigateToCity}
                    disabled={isSearchDisabled}
                >
                    <Text style={styles.buttonText}>Buscar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={navigateToLocation}>
                    <Text style={styles.buttonText}>Buscar por Localização Atual</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={navigateToHistory}>
                    <Text style={styles.buttonText}>Histórico de Pesquisa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.themeButton}
                    onPress={toggleTheme}
                >
                    <Text style={styles.themeButtonText}>🌓</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.copyright}>©️ Gabriel Barco Borges</Text>
        </ImageBackground>
    );
}
