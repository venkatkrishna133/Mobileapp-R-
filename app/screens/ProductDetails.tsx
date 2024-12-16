import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity, Linking,Image } from 'react-native';
import Toast from 'react-native-toast-message';

const ProductDetails = ({ route }: any) => {
  const { product } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const handlePayment = async (provider: string) => {
    setModalVisible(false);

    const upiUrl = `upi://pay?pa=venkatzine@oksbi&pn=VR-Groups&mc=1234&tid=123456789012345&tr=${product.id}&tn=Payment for ${product.title}&am=${1}&cu=INR`;

    try {
      if (await Linking.canOpenURL(upiUrl)) {
        await Linking.openURL(upiUrl);
        Toast.show({
          type: 'success',
          text1: 'Payment Initiated',
          text2: `Opening ${provider}...`,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: `${provider} Not Available`,
          text2: 'Please install the app or choose another method.',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Payment Failed',
        text2: 'An unknown error occurred',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.title}</Text>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>Price: ₹{product.price}</Text>

      <Button title="Buy Now" onPress={() => setModalVisible(true)} />

      {/* Payment Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Payment Method</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handlePayment('Google Pay')}>
              <Text style={styles.modalButtonText}>Google Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handlePayment('PhonePe')}>
              <Text style={styles.modalButtonText}>PhonePe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handlePayment('Paytm')}>
              <Text style={styles.modalButtonText}>Paytm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handlePayment('Custom UPI')}>
              <Text style={styles.modalButtonText}>Enter UPI ID</Text>
            </TouchableOpacity>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ProductDetails;
