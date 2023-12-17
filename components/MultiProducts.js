// WAsted file not used in this project...

import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

const MultiProducts = () => {
    // useEffect(() => {
    //     axios.get("http://localhost:8000/product");
    //     console.log();
    // }, [])

    // let  = ()=>{
    //     axios.get("http://localhost:8000/product",)
    // }
    const [image, setimage] = useState("");
    const [name, setname] = useState("");
    const [price, setprice] = useState("");

    const mulProductsFetch = async () => {
        const user = {
            image: image,
            name: name,
            price: price
        }
        axios.post('http://localhost:8000/user/product', user).then((result) => {
            // AsyncStorage is an unencrypted, asynchronous, persistent, key-value storage system that is global to the app. It should be used instead of LocalStorage , login k time pr read hoga data or token create hota h only.
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <SafeAreaView>
            <Pressable onPress={mulProductsFetch}>
                <Text>MultiProducts</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default MultiProducts

const styles = StyleSheet.create({})