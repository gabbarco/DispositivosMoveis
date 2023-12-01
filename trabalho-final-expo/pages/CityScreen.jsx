import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Share } from 'react-native';
import { saveCityToHistory } from '../components/storage';
import { getTheme, setTheme } from '../components/storage';

const CityScreen = ({ route }) => {
    const { cityName, latitude, longitude } = route.params;
    const [weatherData, setWeatherData] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
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
        const fetchWeatherData = async () => {
            try {
                if (cityName != undefined) {
                    const response = await fetch(`https://api.hgbrasil.com/weather?key=e5fa5931&city_name=${cityName}`);
                    const data = await response.json();

                    if (data && data.results) {
                        setWeatherData(data.results);
                        saveCityToHistory(data.results.city);
                    }
                } else {
                    const response = await fetch(`https://api.hgbrasil.com/weather?key=e5fa5931&lat=${latitude}&lon=${longitude}&user_ip=remote`)
                    const data = await response.json();

                    if (data && data.results) {
                        setWeatherData(data.results);
                        saveCityToHistory(data.results.city);
                    }
                }
            } catch (error) {
                console.error('Erro na busca dos dados da API:', error);
            }
        };

        fetchWeatherData();
    }, [cityName]);

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const shareWeather = async () => {
        if (weatherData) {
            try {
                const shareOptions = {
                    title: `Previsão do Tempo em ${weatherData.city}`,
                    message: `Cidade: ${weatherData.city}, Temperatura: ${weatherData.temp}°C, ${weatherData.description}`,
                };
                await Share.share(shareOptions);
            } catch (error) {
                console.error('Erro ao compartilhar:', error);
            }
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: theme === 'light' ? '#f8f8f8' : '#333',
            color: theme === 'light' ? '#000' : '#fff',
        },
        shareButton: {
            position: 'absolute',
            top: 16,
            right: 16,
            padding: 10,
            borderRadius: 5,
            backgroundColor: '#4CAF50',
        },
        shareButtonText: {
            color: 'white',
            fontWeight: 'bold',
        },
        themeButton: {
            position: 'absolute',
            top: 16,
            right: 300,
            padding: 10,
            borderRadius: 5,
            backgroundColor: '#4CAF50',
        },
        cityName: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
            color: theme === 'light' ? '#000' : '#fff',
        },
        temperature: {
            fontSize: 36,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
            color: theme === 'light' ? '#333' : '#fff',
        },
        description: {
            fontSize: 18,
            marginBottom: 20,
            textAlign: 'center',
            color: theme === 'light' ? '#555' : '#fff',
        },
        weatherIcon: {
            width: 100,
            height: 100,
            marginLeft: 140,
        },
        forecastContainer: {
            flexDirection: 'column',
            justifyContent: 'space-around',
            width: '100%',
        },
        forecastDay: {
            alignItems: 'center',
            backgroundColor: theme === 'light' ? '#fff' : '#333',
            borderRadius: 8,
            marginHorizontal: 5,
            elevation: 10,
        },
        forecastDayText: {
            fontSize: 14,
            color: theme === 'light' ? '#444' : '#fff',
            marginBottom: 5,
        },
        loadingText: {
            fontSize: 14,
            color: theme === 'light' ? '#444' : '#fff',
        }
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.shareButton} onPress={shareWeather}>
                <Text style={styles.shareButtonText}>🔗</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
                <Text style={styles.shareButtonText}>🌓</Text>
            </TouchableOpacity>
            {weatherData ? (
                <>
                    <Text style={styles.cityName}>{weatherData.city}</Text>
                    <Text style={styles.temperature}>{weatherData.temp}°C</Text>
                    <Text style={styles.description}>{weatherData.description}</Text>
                    <Image
                        source={{ uri: `https://assets.hgbrasil.com/weather/images/${weatherData.img_id}.png` }}
                        style={styles.weatherIcon}
                    />
                    <ScrollView
                        vertical
                        contentContainerStyle={styles.forecastContainer}
                        showsVerticalScrollIndicator={true}
                    >
                        {weatherData.forecast.map(day => (
                            <TouchableOpacity
                                key={day.date}
                                style={[styles.forecastDay, selectedDay === day.date && styles.selectedDay]}
                                onPress={() => handleDayClick(day.date)}
                            >
                                <Text style={styles.forecastDayText}>{day.weekday}</Text>
                                <Text style={styles.forecastDayText}>{day.max}°C</Text>
                                <Text style={styles.forecastDayText}>{day.min}°C</Text>
                                <Text style={styles.forecastDayText}>{day.description}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </>
            ) : (
                <Text style={styles.loadingText}>Carregando...</Text>
            )}
        </View>
    );
};

export default CityScreen;
