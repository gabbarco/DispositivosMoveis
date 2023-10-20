import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, ScrollView} from 'react-native';

import ExemploCamera from './exemplos/Camera';
import ExemploLocation from './exemplos/Location';
import ExemploDeviceMotion from './exemplos/DeviceMotion';
import ExemploSharing from './exemplos/Sharing';


export default function App() {
    return (
        <ImageBackground
            source={require('./assets/card-mapa-mundi.jpg')} // Caminho para a imagem de fundo
            style={styles.container}
			resetScrollToCoords={{ x: 0, y: 0 }}
        >
            <ExemploLocation />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'contain',
		position: 'relative',
    },
});
