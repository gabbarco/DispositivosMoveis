import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export default function ElencoPage({ route }) {
  let cast = route.params.cast;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Elenco</Text>
      {cast.map((actor) => (
        <View key={actor.id} style={styles.actorContainer}>
          <Image
            style={styles.actorImage}
            source={{ uri: `https://image.tmdb.org/t/p/w200${actor.profile_path}` }}
          />
          <View style={styles.actorInfo}>
            <Text style={styles.actorName}>{actor.name}</Text>
            <Text style={styles.actorCharacter}>{actor.character}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  actorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  actorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  actorInfo: {
    flex: 1,
  },
  actorName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  actorCharacter: {
    fontSize: 16,
    color: "#888",
  },
});
