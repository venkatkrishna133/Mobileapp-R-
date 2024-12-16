import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // Adjust path as needed
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import ProductDetails from '../screens/ProductDetails';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ title: 'Product Details' }}
      />
    <Stack.Screen name="About" component={AboutScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
