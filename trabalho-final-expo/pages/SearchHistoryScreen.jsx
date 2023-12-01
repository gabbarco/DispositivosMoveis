import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getTheme, setTheme } from '../components/storage';
import { getSearchHistory } from '../components/storage';

const SearchHistoryScreen = () => {
    const [searchHistory, setSearchHistory] = useState([]);
    const navigation = useNavigation();
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
        const fetchHistory = async () => {
            const history = await getSearchHistory();
            setSearchHistory(history);
        };

        fetchHistory();
    }, []);

    const handleHistoryItemClick = (cityName) => {
        navigation.navigate('Previsão do Tempo', { cityName });
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: theme === 'light' ? '#f8f8f8' : '#333',
            color: theme === 'light' ? '#000' : '#fff',
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
        title: {
            marginTop: 60,
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 16,
            color: theme === 'light' ? '#000' : '#fff',
        },
        historyItem: {
            borderBottomWidth: 1,
            borderBottomColor: theme === 'light' ? '#ccc' : '#555',
            paddingVertical: 8,
        },
        historyItemText: {
            color: theme === 'light' ? '#000' : '#fff',
            paddingVertical: 8,
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
                <Text style={styles.buttonText}>🌓</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Histórico de Pesquisa</Text>
            <FlatList
                data={searchHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleHistoryItemClick(item)}>
                        <View style={styles.historyItem}>
                            <Text style={styles.historyItemText}>{item}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default SearchHistoryScreen;
