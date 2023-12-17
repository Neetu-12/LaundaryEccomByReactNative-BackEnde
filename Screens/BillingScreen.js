import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AddToCart from './AddToCart'

const BillingScreen = () => {
    const [totalQuantity, setTotalQuantity] = useState("");
    const [totalQuantityValues, setTotalQuantityValues] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userName, setUserName] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [totalPriceOfItems, setTotalPriceOfItems] = useState([]);
    const [totalNoOfItems, setTotalNoOfItems] = useState("");
    // const [SelectedDate, setSelectedDate] = useState("");
    // const [selectedTime, setSelectedTime] = useState([]);
    // const [DeliveryDays, setDeliveryDays] = useState([]);
    useEffect(() => {
        let perform = async () => {
            let cookieCheck = await AsyncStorage.getItem("authToken");
            if (!!cookieCheck) {
                let quantityCount = 0;
                let totalPrice = 0;
                axios.get("http://localhost:8000/user", {
                    headers: {
                        seingtoken: cookieCheck
                    }
                }).then((result) => {
                    setTotalQuantity(result.data.cart.map((item) => {
                        quantityCount = quantityCount + item.quantity
                     }))
                    setTotalQuantityValues(quantityCount);
                    setTotalNoOfItems((result.data.cart).length);
                    setUserName(result.data.name);
                    setTotalPrice(result.data.cart.map((item) => {
                        totalPrice = totalPrice + item.quantity * item.price
                    }));
                    setTotalPriceOfItems(totalPrice);
                    setUserAddress(result.data.addresses);
                }).catch((err) => {
                    console.log(err);
                });
            }
            else {
                navigation.navigate("Billing");
            }
        }
        perform();
    }, []);
    // console.log(totalQuantity);
    return (
        <View style={{ borderWidth: 2.9, borderColor: "#C0C0C0", borderRadius: 17, padding: 20, height: 280, width: 380, margin: 19, fontSize: 10, fontWeight: "bold" }}>
            <Text>Billing Details</Text>
            <View  >
                <Text>_________________________________</Text>
                <Text>User's Information</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginRight: 30 }}>
                    <Text>User's Name </Text>
                    <Text>{userName}</Text>
                </View>
                <Text>Address : {userAddress} </Text>

            </View>
            <View style={{}}>
                <Text>_________________________________</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginRight: 30 }}>
                    <Text >Total Price</Text>
                    <Text> ${totalPriceOfItems}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginRight: 30 }}>
                    <Text>Total No. Of Items </Text>
                    <Text>{totalQuantityValues}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginRight: 30 }}>
                    <Text>Total types of Item </Text>
                    <Text>{totalNoOfItems}</Text>
                </View>
            </View>
            <Text>_______________________________</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginRight: 30 }}>
                <Text>Your Payment </Text>
                <Text> ${totalPriceOfItems}</Text>
            </View>
        </View>
    )
}

export default BillingScreen

const styles = StyleSheet.create({})