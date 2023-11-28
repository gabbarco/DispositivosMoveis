import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import CityScreen from './pages/CityScreen';
import SearchHistoryScreen from './pages/SearchHistoryScreen';
import LocationScreen from './pages/LocationScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" headerShow="false">
                <Stack.Screen name="Página Inicial" component={HomeScreen} />
                <Stack.Screen name="Previsão do Tempo" component={CityScreen} />
                <Stack.Screen name="Histórico de Pesquisa" component={SearchHistoryScreen} />
                <Stack.Screen name="Localização Atual" component={LocationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function HomeScreen({ navigation }) {
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
            </View>
            <Text style={styles.copyright}>©️ Gabriel Barco Borges</Text>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'contain',
        position: 'relative',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        width: '80%',
        marginBottom: 20,
        paddingLeft: 10,
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
    copyright: {
        textAlign: 'center'
    }
});