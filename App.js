import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, 
  SafeAreaView, FlatList } from 'react-native';

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  

const Item = ({ title }) => (
  <View style={styles2.item}>
    <Text style={styles2.title}>{title}</Text>
  </View>
);
const renderItem = ({ item }) => (
  <Item title={item.title} />
);

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default class App extends Component {

  state = {
    data: [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
    ]
  }

  async componentDidMount() {
    let response = await fetch('https://nestedly.com/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        "email": "alex.ghose@generalassemb.ly", 
        "password": "pokemon123" 
      })
    })
    let token = await response.json();
    token = token.token
    console.log(token)
    response = await fetch('https://nestedly.com/api/contacts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    response = await response.json()
    for (let c of response) {
      console.log("contact name:",c.name)
    }
    this.setState({data: response});
  }



  render() {
    return (
      <SafeAreaView style={styles2.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.title}
      />
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
