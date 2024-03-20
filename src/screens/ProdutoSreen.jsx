import { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "../config/styles";

export default function ProdutosScreen() {
  const [produtos, setProdutos] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
 
  const pegarCategorias = async () => {
    const categorias = await fetch("https://dummyjson.com/products/categories");
    const retorno = await categorias.json();
    setCategorias(retorno);
    console.log(retorno);
  };

  useEffect(
    () => {
      
      fetchProducts();
      pegarCategorias();
    },
    [] 
  );

  
  useEffect(
    () => {
      
      fetchProducts();
    },
    [categoria] 
  );

  
  const fetchProducts = async () => {
    let url = "";
    
    if (categoria != "") {
      url = `https://dummyjson.com/products/category/${categoria}`;
    } else {
      url = "https://dummyjson.com/products";
    }
    const response = await fetch(url);
    
    const data = await response.json();

    
    console.log(data.products);

    
    setProdutos(await data.products);
  };

  return (
    <View style={styles.container}>
      {}
      {}
      <Text variant="titleLarge">Produtos</Text>
      <Text variant="bodyMedium">Confira a lista de produtos</Text>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
          >
        {categorias.map((cat) => (
          <Button key={cat} onPress={() => setCategoria(cat)} mode="contained">
            {cat}
          </Button>
        ))}
        <Button onPress={() => setCategoria("")}>Limpar Filtros</Button>
    </View>
        {
          
          produtos.length === 0 ? (
            <Text>Carregando...</Text>
          ) : (
            
            produtos.map((produto) => (
              <View key={produto.id} style={styles.selfStrech}>
                <Text variant="headlineMedium">{produto.title}</Text>
                {}
                <Image
                  
                  source={{ uri: produto.images[0] }}
                  
                  style={{ width: "100%", maxWidth: 480, height: 320 }}
                />
              </View>
            ))
          )
        }
      </ScrollView>
    </View>
  );
}