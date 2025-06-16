import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const IP = 'http://172.20.10.6';

export function AddUserScreen({ navigation }) {
  const [name, setName] = useState('');

  // Função que envia os dados para o microsserviço
  const handleAddUser = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Digite um nome válido');
      return;
    }
    try {
      await axios.post(`${IP}:3001/users`, { name });
      Alert.alert('Sucesso', 'Usuário criado!');
      setName('');
      navigation.goBack();
    } catch (error) {
      console.log('Erro ao criar usuário:', error.message);
      Alert.alert('Erro', 'Não foi possível criar usuário');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Usuário:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Digite o nome"
      />
      <Button title="Adicionar Usuário" onPress={handleAddUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  label: { fontWeight: 'bold', marginBottom: 8, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
});
