import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreens from '../Screens/LoginScreen';
import RegisterScreens from '../Screens/RegisterScreen';
import HomeScreen from '../Screens/HomeScreen';
import AddToCarts from '../Screens/AddToCart';
import BillingScreen from '../Screens/BillingScreen';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AddToCarts" component={AddToCarts} options={{ headerShown: false }} />
                <Stack.Screen name="Billing" component={BillingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreens} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreens} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigator;

const styles = StyleSheet.create({});