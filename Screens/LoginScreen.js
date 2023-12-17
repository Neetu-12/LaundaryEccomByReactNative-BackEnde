import {KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handledLogin = async () => {
    const user = {
      email: email,
      password: password
    }
    axios.post('http://localhost:8000/user/userLogin', user).then((result) => {
      // AsyncStorage is an unencrypted, asynchronous, persistent, key-value storage system that is global to the app. It should be used instead of LocalStorage , login k time pr read hoga data or token create hota h only.
      
      let createdToken = result.data.token;
      AsyncStorage.setItem("authToken", createdToken);
      // navigation.navigate("Home");
      setEmail("");
      setPassword("");
      navigation.navigate("Home");
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center", marginTop: 99 }}>
          <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>Login to your Account</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30, padding: 10 }}>
            <Feather name="mail" size={24} color="gray" />
            <TextInput value={email} onChangeText={(e) => setEmail(e)} style={{ color: "gray", marginVertical: 10, width: 300 }} placeholder='Enter email' />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30, padding: 10 }}>
            <AntDesign name="lock1" size={24} color="gray" />
            <TextInput value={password} onChangeText={(e) => setPassword(e)} style={{ color: "gray", marginVertical: 10, width: 300 }} placeholder='Enter password' />
          </View>
        </View>

        <View style={{ marginTop: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text>Keep me logged in</Text>
          <Text style={{ color: "#007FFF", fontWeight: 500 }}> Forget password</Text>
        </View>

        <View style={{ marginTop: 80 }} />

        <Pressable style={{ width: 200, backgroundColor: "#FEBE10", borderRadius: 6, padding: 15, margin: "auto", marginRight: "auto" }}>
          <Text onPress={handledLogin} style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>Login</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 15 }}>
          <Text style={{ textAlign: "center", fontSize: 15, color: "gray" }}>Don't have an account ? Sign Up</Text>
        </Pressable>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

export default LoginScreen

const styles = StyleSheet.create({})