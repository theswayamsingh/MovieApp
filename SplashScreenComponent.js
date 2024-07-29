import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default function SplashScreenComponent({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      navigation.replace('Main');
    }, 3000); // Show splash screen for 3 seconds
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('./assets/splash.jpg')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  image: {
    width: 400,
    height: 600,
  },
});
