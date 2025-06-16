import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const IP = 'http://192.168.15.8';

export function AddTaskScreen({ navigation }) {
  const [name, setName] = useState('');

  const handleAddTask = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Digite um nome válido');
      return;
    }
    try {
      await axios.post(`${IP}:3001/tasks`, { name });
      Alert.alert('Sucesso', 'Tarefa criada!');
      setName('');
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível criar tarefa');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome da Tarefa:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Digite o nome"
      />
      <Button title="Adicionar Tarefa" onPress={handleAddTask} />
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
