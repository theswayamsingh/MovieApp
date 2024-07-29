import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function DetailsScreen({ route }) {
  const { show } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{show.name}</Text>
      {show.image && <Image source={{ uri: show.image.medium }} style={styles.image} />}
      <Text style={styles.summary}>{show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'No summary available'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  summary: {
    color: '#ccc',
    fontSize: 16,
  },
});
