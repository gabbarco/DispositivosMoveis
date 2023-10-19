import { useState } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import IconButton from '../components/IconButton';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from "expo-image-manipulator";
import * as Sharing from 'expo-sharing';

const { width, height } = Dimensions.get('window');

export default function ExemploSharing() {
    // Armazena a foto tirada
    const [foto, setFoto] = useState(null);

    async function selecionaFoto() {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if ( !result.canceled ) {
            setFoto(result.assets[0]);
        }
    }

    async function compartilhar() {
        console.log(foto)
        if ( !foto )
            return;

        const imageProc = await ImageManipulator.manipulateAsync(foto.uri);
        await Sharing.shareAsync(imageProc.uri);
    }


    return (
        <View style={styles.container}>
            {/* <Camera ref={camera} style={styles.camera} type={tipoCamera}> */}
            {foto && (
                <View style={styles.photoContainer}>
                    <Image source={{ uri: foto.uri }} width={300} height={300} />
                </View>
            )}
            <View style={styles.buttonContainer}>
                <IconButton name="photo" onPress={selecionaFoto} />
                <IconButton name="share-square-o" onPress={compartilhar} />
            </View>
            {/* </Camera> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: width,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 40,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    photoContainer: {
        flex: 3, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    photo: {

    }
});
