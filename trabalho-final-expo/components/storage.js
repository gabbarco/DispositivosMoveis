import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'theme';

export const getTheme = async () => {
    try {
        const theme = await AsyncStorage.getItem(THEME_KEY);
        return theme || 'light';
    } catch (error) {
        console.error('Erro ao obter tema do AsyncStorage:', error);
        return 'light';
    }
};

export const setTheme = async (theme) => {
    try {
        await AsyncStorage.setItem(THEME_KEY, theme);
    } catch (error) {
        console.error('Erro ao definir tema no AsyncStorage:', error);
    }
};

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
