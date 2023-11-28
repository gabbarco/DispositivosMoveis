import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveCityToHistory = async (cityName) => {
    try {
        const history = await getSearchHistory();
        const updatedHistory = [cityName, ...history];

        await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    } catch (error) {
        console.error('Erro ao salvar histórico de pesquisa:', error);
    }
};

export const getSearchHistory = async () => {
    try {
        const history = await AsyncStorage.getItem('searchHistory');
        return history ? JSON.parse(history) : [];
    } catch (error) {
        console.error('Erro ao obter histórico de pesquisa:', error);
        return [];
    }
};
