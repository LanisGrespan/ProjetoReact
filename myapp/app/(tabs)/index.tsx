import { Image, StyleSheet, Platform, Text, View, TextInput, Picker } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [itens, setItens] = useState([]);
  const [filteredItens, setFilteredItens] = useState([]);
  const [finalidade, setFinalidade] = useState('');
  const [tipo, setTipo] = useState('');
  const [valorMin, setValorMin] = useState('');
  const [valorMax, setValorMax] = useState('');
  const [areaTerreno, setAreaTerreno] = useState('');
  const [areaConstruida, setAreaConstruida] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://127.0.0.1:8000/itens');
      setItens(response.data);
      setFilteredItens(response.data); // Iniciar com todos os itens carregados
    };
    fetchData();
  }, []);

  // Função para aplicar os filtros
  const applyFilters = () => {
    let filtered = itens;
    if (finalidade) {
      filtered = filtered.filter(item => item.finalidade === finalidade);
    }
    if (tipo) {
      filtered = filtered.filter(item => item.tipo === tipo);
    }
    if (valorMin) {
      filtered = filtered.filter(item => parseFloat(item.valor_venda) >= parseFloat(valorMin));
    }
    if (valorMax) {
      filtered = filtered.filter(item => parseFloat(item.valor_venda) <= parseFloat(valorMax));
    }
    if (areaTerreno) {
      filtered = filtered.filter(item => parseFloat(item.area_terreno) >= parseFloat(areaTerreno));
    }
    if (areaConstruida) {
      filtered = filtered.filter(item => parseFloat(item.area_construida) >= parseFloat(areaConstruida));
    }
    setFilteredItens(filtered);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Filtros */}
      <View style={styles.filterContainer}>
        <Picker selectedValue={finalidade} onValueChange={(value) => setFinalidade(value)}>
          <Picker.Item label="Selecione a finalidade" value="" />
          <Picker.Item label="Venda" value="VENDA" />
          <Picker.Item label="Locação" value="LOCACAO" />
          <Picker.Item label="Temporada" value="TEMPORADA" />
        </Picker>

        <Picker selectedValue={tipo} onValueChange={(value) => setTipo(value)}>
          <Picker.Item label="Selecione o tipo" value="" />
          <Picker.Item label="Casa" value="CASA" />
          <Picker.Item label="Apartamento" value="APARTAMENTO" />
          <Picker.Item label="Terreno" value="TERRENO" />
          <Picker.Item label="Sala" value="SALA" />
          <Picker.Item label="Barracão" value="BARRACAO" />
          <Picker.Item label="Rancho" value="RANCHO" />
          <Picker.Item label="Chácara" value="CHÁCARA" />
        </Picker>

        <TextInput
          placeholder="Valor mínimo"
          keyboardType="numeric"
          value={valorMin}
          onChangeText={(text) => setValorMin(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Valor máximo"
          keyboardType="numeric"
          value={valorMax}
          onChangeText={(text) => setValorMax(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Metragem do terreno"
          keyboardType="numeric"
          value={areaTerreno}
          onChangeText={(text) => setAreaTerreno(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Área construída"
          keyboardType="numeric"
          value={areaConstruida}
          onChangeText={(text) => setAreaConstruida(text)}
          style={styles.input}
        />

        <Text onPress={applyFilters} style={styles.applyButton}>Aplicar Filtros</Text>
      </View>

      {/* Lista de imóveis filtrados */}
      <FlatList
        data={filteredItens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedView>
            <Image source={{ uri: item.imagem }} style={{ width: 100, height: 100 }} />
            <Text>{item.nome}</Text>
            <Text>Finalidade: {item.finalidade}</Text>
            <Text>Tipo: {item.tipo}</Text>
            <Text>Valor Venda: R$ {item.valor_venda}</Text>
            <Text>Área Terreno: {item.area_terreno} m²</Text>
            <Text>Área Construída: {item.area_construida} m²</Text>
          </ThemedView>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  applyButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
});
