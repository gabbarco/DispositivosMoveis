// FirstPage.jsx
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";

// Pegando a largura da tela
let widthScreen = Dimensions.get("window").width;

let imgServer = "https://image.tmdb.org/t/p/w500";

export default function FilmeItem({ item, navigation }) {

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate("FilmePage", { filme: item })}
    >
      <Image
        source={{ uri: imgServer + item.poster_path }}
        style={styles.poster}
      />

      <Text style={styles.text}>
        {item.title}
      </Text>
    </TouchableOpacity>
  )
}

let widthPoster = (widthScreen - 32 - 24) / 3;

let styles = StyleSheet.create({
  container: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 16,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    width: widthPoster,
    textAlign: "center"
  },
  poster: {
    width: widthPoster,
    height: widthPoster*1.5,
  }
})