// screens/HomeScreen.tsx
import React,{ useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity ,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import ProductDetails from '../screens/ProductDetails';

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation<HomeScreenProp>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ProductDetails', { product: item })} // Pass product data
>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  item: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HomeScreen;