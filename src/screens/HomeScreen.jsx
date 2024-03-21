import { useNavigation } from "@react-navigation/native";
import { Button, View } from "react-native";
import { Image } from "expo-image";
import { Text } from "react-native-paper";
import styles from "../config/styles";
import { useEffect, useState } from "react";

export default function HomeScreen({}) {
  const navigation = useNavigation();

  // declaração de um estado que é uma variável mais elaborada
  const [contador, setContador] = useState(1);

  // função que eu criei pra mostrar o contador
  function mostraValorContador() {
    console.log(contador);
  }

  // função identica a de cima
  const mostraValor = () => {
    console.log(contador);
  };

  // o cara que está escutando a variável stalker
  useEffect(mostraValorContador, [contador]);
  // escuta igual acima
  useEffect(mostraValor, [contador]);

  // faz o mesmo que as duas funções acima
  useEffect(() => {
    console.log(contador);
  }, [contador]);
  
  // faz o mesmo que as duas funções acima
  useEffect(() => {
    console.log("ENTREI");
  }, []);

  return (
    <View style={styles.container}>
      {/* note que aqui estamos usando o TEXT de Native Paper*/}
      {/* ele possui alguns props que podemos usar para melhorar a UI */}
      <Text variant="titleLarge">Inicial</Text>
      <Text variant="bodyMedium">Bem vindo</Text>
      <Image
        source={require("../../assets/icon.png")}
        style={{ width: 200, height: 200 }}
      />
      <Button
        onPress={() => navigation.navigate("SobreScreen")}
        title="Ir para sobre"
      />
      <Button
        onPress={() => setContador(contador + 1)}
        title="aumenta contador"
      />
    </View>
  );
}
