import { View } from "react-native"; // importei do native
import { Card, Text } from "react-native-paper"; // importei do native paper
import styles from "../config/styles";
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "547210dcda1c34b8926ea3960324bcb7"; //peguem a de vocês
const CITY_NAME = "Yakutsk"; //peguem a de vocês

export default function TempoScreen() {
  const [tempoData, setTempoData] = useState(null);

  useEffect(() => {
    const fetchTempo = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`;

      // Faça a requisição usando Axios
      try {
        const response = await axios.get(url);
        console.log(response.data);
        // // A resposta está disponível no objeto response.data

        setTempoData(response.data);
      } catch (error) {
        // Trate o erro
        console.error("There was an error!", error);
      }
    };
    fetchTempo();
  }, []); // array vazio no final de useEffect simula simboliza que a função será executada apenas uma vez, quando o componente for montado

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">Tempo em {CITY_NAME}</Text>
      {tempoData && (
        <Card style={styles.card}>
          <Card.Title title="Detalhes do Tempo" />
          <Card.Content>
            <Text>Temperatura: {tempoData.main.temp}°C</Text>
            <Text>Sensação térmica: {tempoData.main.feels_like}°C</Text>
            <Text>Temperatura mínima: {tempoData.main.temp_min}°C</Text>
            <Text>Temperatura máxima: {tempoData.main.temp_max}°C</Text>
            <Text>Pressão: {tempoData.main.pressure} hPa</Text>
            <Text>Umidade: {tempoData.main.humidity}%</Text>
            <Text>Visibilidade: {tempoData.visibility / 1000} km</Text>
            <Text>Vento: {tempoData.wind.speed} m/s</Text>
            <Text>Descrição: {tempoData.weather[0].description}</Text> 
          </Card.Content>
        </Card>
      )}
    </View>
  );
}
