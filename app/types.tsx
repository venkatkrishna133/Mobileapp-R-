import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  ProductDetails: { product: any };
  About: undefined; // Add params if necessary, e.g., { id: string }
};
