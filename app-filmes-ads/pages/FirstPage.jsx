// FirstPage.jsx
import { View, Text, StyleSheet, Button } from "react-native";

export default function FirstPage({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Primeira Página
      </Text>
      <Button
        title="Ir para a segunda Tela"
        onPress={() => navigation.navigate("SecondPage")}
      />
    </View>
  )
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})


