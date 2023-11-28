import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function FilmePage({ route, navigation }) {
  let filme = route.params.filme;
  let cast = route.params.filme.credits.cast;

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const navigateToElenco = () => {
    navigation.navigate("ElencoPage", { cast });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.poster}
        source={{ uri: `https://image.tmdb.org/t/p/w500${filme.poster_path}` }}
      />
      <Text style={styles.title}>{filme.title}</Text>
      <Text style={styles.overview}>{filme.overview}</Text>
      <Text style={styles.releaseDate}>Data de Lançamento: {formatarData(filme.release_date)}</Text>
      <Text style={styles.runtime}>Duração: {filme.runtime} minutos</Text>
      <Text style={styles.popularity}>Nota: {filme.vote_average} ({filme.vote_count})</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={navigateToElenco}
      >
        <Text style={styles.buttonText}>Ver Elenco</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  poster: {
    width: 300,
    height: 450,
    resizeMode: "cover",
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "center",
  },
  overview: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
  releaseDate: {
    fontSize: 12,
    marginTop: 8,
  },
  runtime: {
    fontSize: 12,
    marginTop: 4,
  },
  popularity: {
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "red",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
