import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import ExemploCamera from './exemplos/Camera';
import ExemploLocation from './exemplos/Location';
import ExemploDeviceMotion from './exemplos/DeviceMotion';
import ExemploSharing from './exemplos/Sharing';


export default function App() {
	return (
		<View style={styles.container}>
      <ExemploLocation/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
