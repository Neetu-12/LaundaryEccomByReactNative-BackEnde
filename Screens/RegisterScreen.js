import { KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

const RegisterScreen = () => {
    const [name, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [addresses, setaddress] = useState("");

    const navigation = useNavigation();
    const handledRegister = async () => {
        const user = {
            name: name,
            email: email,
            password: password,
            addresses: addresses
        }
        axios.post('http://localhost:8000/user/createAcount', user).then(() => {
            setuserName("");
            setEmail("");
            setPassword("");
            setaddress("");
            navigation.navigate("Login");
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center", marginTop: 99 }}>
                    <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>Register to your Account</Text>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 50, padding: 10 }}>
                        <Ionicons name="person" size={24} color="gray" />
                        <TextInput value={name} onChangeText={(e) => { setuserName(e) }} style={{ color: "gray", marginVertical: 10, width: 300, fontSize: name ? 16 : 16 }} placeholder='Enter user name' />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30, padding: 10 }}>
                        <Feather name="mail" size={24} color="gray" />
                        <TextInput value={email} onChangeText={(text) => setEmail(text)} style={{ color: "gray", marginVertical: 10, width: 300 }} placeholder='Enter email' />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30, padding: 10 }}>
                        <AntDesign name="lock1" size={24} color="gray" />
                        <TextInput value={password} onChangeText={(text) => setPassword(text)} style={{ color: "gray", marginVertical: 10, width: 300 }} placeholder='Enter password' />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30, padding: 10 }}>
                        <FontAwesome5 name="address-card" size={24} color="gray" />
                        <TextInput value={addresses} onChangeText={(text) => setaddress(text)} style={{ color: "gray", marginVertical: 10, width: 300 }} placeholder='Enter address' />
                    </View>
                </View>

                <View style={{ marginTop: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text>Keep me logged in</Text>
                    <Text style={{ color: "#007FFF", fontWeight: 500 }}> Forget password</Text>
                </View>

                <View style={{ marginTop: 80 }} />

                <Pressable style={{ width: 200, backgroundColor: "#FEBE10", borderRadius: 6, padding: 15, margin: "auto", marginRight: "auto" }}>
                    <Text onPress={handledRegister} style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>Register</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Login")} style={{ marginTop: 15 }}>
                    <Text style={{ textAlign: "center", fontSize: 15, color: "gray" }}>Already have an account ? Sign In</Text>
                </Pressable>

            </KeyboardAvoidingView>

        </SafeAreaView>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({})