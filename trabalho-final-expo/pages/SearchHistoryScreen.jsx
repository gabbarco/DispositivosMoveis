import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getSearchHistory } from '../components/storage';

const SearchHistoryScreen = () => {
    const [searchHistory, setSearchHistory] = useState([]);
    const navigation = useNavigation();

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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Histórico de Pesquisa</Text>
            <FlatList
                data={searchHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleHistoryItemClick(item)}>
                        <View style={styles.historyItem}>
                            <Text>{item}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    historyItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 8,
    },
});

export default SearchHistoryScreen;
