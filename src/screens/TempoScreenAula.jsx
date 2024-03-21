import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

const API_KEY = "547210dcda1c34b8926ea3960324bcb7"; //peguem a de vocês
const CITY_NAME = "Joinville"; //peguem a de vocês

export default function TempoScreenAula(){
    const [temperatura, setTemperatura] = useState('');

    useEffect(() =>{
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
    }, []);

    return(
        <View style={styles.container}>
      <Text variant="bodyLarge">Tempo em {CITY_NAME}</Text>
      {tempoData && (
        <Card style={styles.card}>
          <Card.Title title="Detalhes do Tempo" />
          <Card.Content>
            <Text>Temperatura: {temperatura.main.temp}°C</Text>
          </Card.Content>
        </Card>
      )}
    </View>
    )
}