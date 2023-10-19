import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Device from 'expo-device';
import * as Location from 'expo-location';

const capitais = [
    { id: 1, name: 'Rio Branco', description: 'Capital do Acre', latitude: -9.971229, longitude: -67.824896 },
    { id: 2, name: 'Maceió', description: 'Capital de Alagoas', latitude: -9.665746, longitude: -35.735462 },
    { id: 3, name: 'Macapá', description: 'Capital do Amapá', latitude: 0.034457, longitude: -51.066564 },
    { id: 4, name: 'Manaus', description: 'Capital do Amazonas', latitude: -3.119027, longitude: -60.021731 },
    { id: 5, name: 'Salvador', description: 'Capital da Bahia', latitude: -12.971598, longitude: -38.501968 },
    { id: 6, name: 'Fortaleza', description: 'Capital do Ceará', latitude: -3.717222, longitude: -38.543056 },
    { id: 7, name: 'Vitória', description: 'Capital do Espírito Santo', latitude: -20.3155, longitude: -40.3128 },
    { id: 8, name: 'Goiânia', description: 'Capital de Goiás', latitude: -16.6864, longitude: -49.2643 },
    { id: 9, name: 'São Luís', description: 'Capital do Maranhão', latitude: -2.53874, longitude: -44.28246 },
    { id: 10, name: 'Cuiabá', description: 'Capital do Mato Grosso', latitude: -15.596, longitude: -56.0939 },
    { id: 11, name: 'Campo Grande', description: 'Capital do Mato Grosso do Sul', latitude: -20.4503, longitude: -54.6467 },
    { id: 12, name: 'Belo Horizonte', description: 'Capital de Minas Gerais', latitude: -19.91, longitude: -43.92 },
    { id: 13, name: 'Belém', description: 'Capital do Pará', latitude: -1.4554, longitude: -48.5044 },
    { id: 14, name: 'João Pessoa', description: 'Capital da Paraíba', latitude: -7.1219, longitude: -34.8829 },
    { id: 15, name: 'Curitiba', description: 'Capital do Paraná', latitude: -25.4195, longitude: -49.2646 },
    { id: 16, name: 'Recife', description: 'Capital de Pernambuco', latitude: -8.0476, longitude: -34.877 },
    { id: 17, name: 'Teresina', description: 'Capital do Piauí', latitude: -5.09194, longitude: -42.80344 },
    { id: 18, name: 'Rio de Janeiro', description: 'Capital do Rio de Janeiro', latitude: -22.9083, longitude: -43.1964 },
    { id: 19, name: 'Natal', description: 'Capital do Rio Grande do Norte', latitude: -5.79447, longitude: -35.211 },
    { id: 20, name: 'Porto Alegre', description: 'Capital do Rio Grande do Sul', latitude: -30.0318, longitude: -51.2065 },
    { id: 21, name: 'Porto Velho', description: 'Capital de Rondônia', latitude: -8.76077, longitude: -63.89991 },
    { id: 22, name: 'Boa Vista', description: 'Capital de Roraima', latitude: 2.8235, longitude: -60.6758 },
    { id: 23, name: 'Florianópolis', description: 'Capital de Santa Catarina', latitude: -27.5954, longitude: -48.548 },
    { id: 24, name: 'São Paulo', description: 'Capital de São Paulo', latitude: -23.5505, longitude: -46.6333 },
    { id: 25, name: 'Aracaju', description: 'Capital de Sergipe', latitude: -10.9472, longitude: -37.0731 },
    { id: 26, name: 'Palmas', description: 'Capital de Tocantins', latitude: -10.1848, longitude: -48.3337 },
];

export default function ExemploLocation() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [radius, setRadius] = useState(0.1); // Valor padrão do raio de busca
    const [userRadius, setUserRadius] = useState('');

    const [nearbyCAPs, setNearbyCAPs] = useState([]);

    useEffect(() => {
        (async () => {
            // Peganod a localização a cada 1 segundos
            setInterval(async () => {
                let _location = await Location.getCurrentPositionAsync({});
                setLocation(_location);
            }, 1000);
        })();
    }, []);

    const findNearbyCAPs = (userLatitude, userLongitude) => {
        if (!userRadius || userRadius.trim() === '') {
            return;
        }

        const searchRadius = parseFloat(userRadius);

        const nearby = capitais.filter((cap) => {
            const distance = calculateDistance(userLatitude, userLongitude, cap.latitude, cap.longitude);
            return distance <= searchRadius;
        });
        setNearbyCAPs(nearby);
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Raio da Terra em quilômetros
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    };

    const handleSearch = () => {
        setUserRadius(userRadius.trim());
        (async () => {
            // Peganod a localização a cada 1 segundos
            let _location = await Location.getCurrentPositionAsync({});
            setLocation(_location);
            if (userRadius) {
                findNearbyCAPs(_location.coords.latitude, _location.coords.longitude);
            }
        })();
    };

    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text style={[styles.paragraph, { fontWeight: 'bold', color: '#ff0000' }]}>{errorMsg}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sectionHeader}>Posição atual:</Text>
            <Text style={styles.paragraph}>Latitude: {location?.coords.latitude}</Text>
            <Text style={styles.paragraph}>Longitude: {location?.coords.longitude}</Text>

            <Text style={styles.sectionHeader}>Definir Raio de Busca (em km):</Text>
            <TextInput
                style={styles.radiusInput}
                value={userRadius}
                onChangeText={(text) => setUserRadius(text)}
                placeholder="Informe o raio"
            />
            <Button title="Buscar" onPress={handleSearch} />

            <Text style={styles.sectionHeader}>Capitais do Brasil mais próximas:</Text>
            <FlatList
                data={nearbyCAPs}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.capItem}>
                        <Text style={styles.capName}>{item.name}</Text>
                        <Text style={styles.capDescription}>{item.description}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    radiusInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 200,
        padding: 8,
        margin: 10,
    },
    capItem: {
        backgroundColor: '#f3f3f3',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        marginRight: 10,
    },
    capName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    capDescription: {
        fontSize: 14,
    },
});