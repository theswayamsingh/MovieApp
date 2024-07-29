import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import SearchScreen from './SearchScreen';

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
      setMovies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Search" onPress={()=>navigation.navigate('Search',{SearchScreen})}/>
      <FlatList
        data={movies}
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
    backgroundColor: '#000',
    padding: 10,
  },
  searchBar: {
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
