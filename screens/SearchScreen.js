import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Image, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import axios from 'axios';

export default function SearchScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const searchShows = async () => {
    Keyboard.dismiss()
    try {
      const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a movie..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <Button title="Search" onPress={searchShows} />

      <FlatList
        data={results}
        keyExtractor={(item) => item.show.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { show: item.show })}>
            <View style={styles.movieItem}>
              {item.show.image && (
                <Image source={{ uri: item.show.image.medium }} style={styles.thumbnail} />
              )}
              <View style={styles.movieInfo}>
                <Text style={styles.title}>{item.show.name}</Text>
                <Text style={styles.summary} numberOfLines={3}>{item.show.summary.replace(/<[^>]+>/g, '')}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    color: '#fff',
    backgroundColor: '#333',
  },
  movieItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  thumbnail: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  movieInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summary: {
    color: '#ccc',
  },
});
