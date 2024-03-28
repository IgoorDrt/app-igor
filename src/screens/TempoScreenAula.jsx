import { Image } from "expo-image";
import { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import styles from "../config/styles";

export default function TempoScreenAula() {
  const [temperatura, setTemperatura] = useState("");
  const [icone, setIcone] = useState("");
  const [cidade, setCidade] = useState("");

  const fetchTempo = async () => {
    const API = "547210dcda1c34b8926ea3960324bcb7";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API}&units=metric`;

    try {
      const response = await fetch(URL);
      const data = await response.json();
      setTemperatura(data);
      setIcone(data.weather[0].icon);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nome da Cidade"
        value={cidade}
        onChangeText={text => setCidade(text)}
        style={{ marginBottom: 10 }}
      />
      <Button onPress={fetchTempo}>Pesquisar</Button>
      {icone && (
        <>
          <Text
            variant="displayMedium"
            style={{ textAlign: "center", marginVertical: 10 }}
          >
            Temperatura em {cidade}
          </Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${icone}@2x.png`,
            }}
            style={{
              width: 100,
              height: 100,
              backgroundColor: "white",
              borderRadius: 200,
            }}
          />
        </>
      )}
      {temperatura && (
        <View>
          <Text variant="headlineSmall" style={{ marginTop: 20 }}>
            Informações
          </Text>
          <Text>Temperatura: {temperatura?.main?.temp}°C</Text>
          <Text>
            Sensação Térmica: {temperatura?.main?.feels_like}°C
          </Text>
          <Text>
            Temperatura Máxima: {temperatura?.main?.temp_max}°C
          </Text>
          <Text>
            Temperatura Mínima: {temperatura?.main?.temp_min}°C
          </Text>
        </View>
      )}
    </View>
  );
}