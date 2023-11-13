// ListaFilmes.jsx

import { View, Text, StyleSheet, FlatList } from 'react-native';

import filmes from "../data/filmes.json";

import FilmeItem from "../components/FilmeItem.jsx";

export default function ListaFilmes({ navigation }) {

  function FilmeItemNavigation ({ item }) {
    return (
      <FilmeItem 
        item={ item } 
        navigation={ navigation } 
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Filmes
      </Text>

      <FlatList
        data={filmes}
        keyExtractor={item => item.id}
        renderItem={FilmeItemNavigation}
        numColumns={3}
      />
    </View>
  )
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})