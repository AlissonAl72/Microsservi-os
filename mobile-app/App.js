import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, FlatList } from 'react-native';
import axios from 'axios';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AddUserScreen } from './adduser';
import { AddTaskScreen } from './addtask';


const Stack = createNativeStackNavigator();

const IP = 'http://192.168.15.11'; // coloque seu IP aqui

// Tela inicial - status dos microsserviços
function HomeScreen({ navigation }) {
  const [userServiceStatus, setUserServiceStatus] = useState('');
  const [taskServiceStatus, setTaskServiceStatus] = useState('');
  
  


useEffect(() => {
  async function fetchStatuses() {
    try {
      await axios.get(`${IP}:3001/users`);
      setUserServiceStatus('✅ Conectado');
    } catch {
      setUserServiceStatus('❌ Erro ao conectar com o User Service');
    }

    try {
      await axios.get(`${IP}:3002/tasks`);
      setTaskServiceStatus('✅ Conectado');
    } catch {
      setTaskServiceStatus('❌ Erro ao conectar com o Task Service');
    }
  }
  fetchStatuses();
}, []);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Status dos Microsserviços</Text>

      <View style={styles.box}>
        <Text style={styles.label}>User Service:</Text>
        <Text>{userServiceStatus}</Text>
        <Button title="Ver Usuários" onPress={() => navigation.navigate('UserList')} />
          <Button title="Adicionar Usuário" onPress={() => navigation.navigate('AddUser')} />
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>Task Service:</Text>
        <Text>{taskServiceStatus}</Text>
        <Button title="Ver Tarefas" onPress={() => navigation.navigate('TaskList')} />
        <Button title="Adicionar Tarefa" onPress={() => navigation.navigate('AddTask')} />
      </View>
    </ScrollView>
  );
}

// Tela de listagem de usuários
function UserListScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${IP}:3001/users`)
      .then(res => setUsers(res.data))
      .catch(() => setUsers([]));
  }, []);

  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>Lista de Usuários</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>{item.name}</Text>}
        ListEmptyComponent={<Text>Nenhum usuário encontrado.</Text>}
      />
    </View>
  );
}

// Tela de listagem de tarefas
function TaskListScreen() {
  const [tasks, setTasks] = useState([]);
  <Button title="Adicionar Tarefa" onPress={() => navigation.navigate('AddTask')} />


  useEffect(() => {
    axios.get(`${IP}:3002/tasks`)
      .then(res => setTasks(res.data))
      .catch(() => setTasks([]));
  }, []);

  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>Lista de Tarefas</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>{item.text}</Text>}
        ListEmptyComponent={<Text>Nenhuma tarefa encontrada.</Text>}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'Usuários' }} />
        <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Tarefas' }} />
        <Stack.Screen name="AddUser" component={AddUserScreen} options={{ title: 'Adicionar Usuário' }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Adicionar Tarefa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  listContainer: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  box: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  listItem: {
    fontSize: 18,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
