import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import IconButton from '../components/IconButton';

const { width, height } = Dimensions.get('window');

export default function ExemploCamera() {
    // Define se usará a câmera frontal ou traseira
    const [tipoCamera, setTipoCamera] = useState(CameraType.back);
    // Permissão do usuário para usar a Câmera
    const [permissao, solicitaPermissao] = Camera.useCameraPermissions();
    // Armazena a foto tirada
    const [foto, setFoto] = useState(null);

    const camera = useRef();

    if (!permissao) {
        // Permissão da Câmera ainda está sendo carregada
        return <View />;
    }

    if (!permissao.granted) {
        // Permissão da Câmera não foi concedida
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>Nós precisamos de sua permissão para abrir a camera</Text>
                <Button onPress={solicitaPermissao} title="Conceder permissão" />
            </View>
        );
    }

    function mudarTipoCamera() {
        setTipoCamera(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    async function tirarFoto() {
        const fotoTirada = await camera.current.takePictureAsync();
        setFoto(fotoTirada);

        // Porcentagem da imagem pra caber na tela
        // console.log(width/fotoTirada.width)
    }

    function limpaFoto() {
        setFoto(null);
    }

    if ( foto !== null ) {
        return (
            <TouchableOpacity style={styles.photoContainer} onPress={limpaFoto}>
                <Image source={{ uri: foto.uri }} width={(width/foto.width) * foto.width} height={(width/foto.width) * foto.height} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Camera ref={camera} style={styles.camera} type={tipoCamera}>
                <View style={styles.buttonContainer}>
                    <IconButton name="refresh" onPress={mudarTipoCamera} />
                    <IconButton name="camera"  onPress={tirarFoto}/>
                </View>
            </Camera>
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
        flex: 1,
        // backgroundColor: '#ff9900',
        width: width,
    },
    photo: {

    }
});
