import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Pressable, TextInput, Dimensions, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
// import MultiProducts from '../components/MultiProducts';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [addresses, setaddress] = useState("");
    const [productsRender, setproductsRender] = useState([]);
    const [selectedItems, setselectItems] = useState({ item: 0, price: 0, piece: 0 });


    const { width, height } = Dimensions.get('screen');
    // const products = useSelector((state) => state.product.product);
    useEffect(() => {
        let perform = async () => {
            let cookieCheck = await AsyncStorage.getItem("authToken");
            if (!!cookieCheck) {
                axios.get("http://localhost:8000/user", {
                    headers: {
                        seingtoken: cookieCheck
                    }
                }).then((result) => {
                    setaddress(result.data[0]["addresses"]);
                }).catch((err) => {
                    console.log(err);
                });

                await axios.get("http://localhost:8000/product", {
                    headers: {
                        seingtoken: cookieCheck
                    }
                })
                    .then((result) => {
                        setproductsRender(result.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else {
                navigation.navigate("Login");
            }
        }
        perform();
    }, []);

    let total = () => {
        let item = 0;
        let price = 0;
        let pieces = 0;
        productsRender.map((items) => {
            if (items.quantity > 0) {
                price = price + (items.quantity * items.price);
                item++;
                pieces = pieces + items.quantity;
            }
        })
        setselectItems({ pieces, price, item });
    };

    let addTocart = (index, opr) => {
        if (opr == "+") {
            setproductsRender((productsRender.filter((item, ind) => { // reassign krta h setproductsRender 2nd time use krne pr.
                let tempVar = [];
                if (index == ind) {
                    // console.log(index, "Index item increasing", ind, "Only indexing in going on");
                    item.quantity = item.quantity + 1;
                }
                tempVar.push(item);
                return tempVar;
            })));
        }
        else {
            setproductsRender((productsRender.filter((item, ind) => {
                let tempVar = [];
                if (index == ind) {
                    item.quantity = item.quantity - 1;
                }
                tempVar.push(item);
                return tempVar;
            })));
        }
        total();
    }

    let proceedToPickUp = async () => {
        let cookieCheck = await AsyncStorage.getItem("authToken");
        if (!!cookieCheck) {
            axios.post("http://localhost:8000/cart", productsRender, {
                headers: {
                    seingtoken: cookieCheck
                }
            }).then(() => {
                navigation.navigate("AddToCarts");
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            res.send("Something went wrong in cart inserting time.")
        }
    };

    // console.log(selectedItems);
    
    return (
        <>
            <ScrollView >
                <View style={{ marginTop: -10, padding: 30 }}>
                    <MaterialIcons name="location-on" size={30} color="#fd5c63" style={{ marginLeft: -10 }} />
                    <Text style={{ marginLeft: 15, marginTop: -40, fontWeight: "bold", fontSize: 20 }}>Home</Text>
                    <Text style={{ marginTop: -6, marginLeft: 18 }}>{addresses}</Text>
                </View>
                <Pressable style={{ marginLeft: 320 }}>
                    <Image source={{ uri: "https://lh3.googleusercontent.com/ogw/AKPQZvx8JVFTW8zoGR5xFDdkU3oK_ZHfuUc0f_rzEQauew=s32-c-mo" }}
                        style={{ width: 30, height: 30, borderRadius: 25, marginTop: -55 }}
                    />
                </Pressable>

                <View style={{ padding: 9, margin: 9, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1.9, borderColor: "#C0C0C0", borderRadius: 7, marginTop: -20 }}>
                    <TextInput placeholder='Search items & more...' style={{ borderStyle: "solid" }} />
                    <Feather name="search" size={24} color="#fd5c63" />
                </View>
                <Carousel />
                <Services />

                <Pressable style={{ backgroundColor: "#088F8F", padding: 8, marginBottom: 30, margin: 15, borderRadius: 7, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 1 }}>
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>{selectedItems.item} Items | Pieces {selectedItems.piece} || {selectedItems.price} ₹ </Text>
                        <Text style={{ fontSize: 16, fontWeight: "400", color: "white", marginVertical: 10 }}>Extra charges might apply</Text>
                    </View>

                    <Pressable onPress={() => { proceedToPickUp() }}>
                        <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>Proceed to pickUP</Text>
                    </Pressable>
                </Pressable>

                <View>
                    <FlatList
                        data={productsRender}
                        showsVerticalScrollIndicator={false}
                        renderItem={(item, index) => {
                            return (
                                <View style={{
                                    padding: 5,
                                    borderRadius: 4,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 20,
                                    backgroundColor: "white"
                                }} >
                                    <Image source={{ uri: item.item.image }} style={{ width: 70, height: 70 }} />
                                    <View style={{ marginLeft: "auto", marginRight: "auto" }}>
                                        <Text style={{ fontSize: 15 }}>{item.item.name}</Text>
                                        <Text style={{ fontSize: 15 }}>${item.item.price}</Text>
                                    </View>

                                    {(item.item.quantity == 0) ? (
                                        <Pressable onPress={() => { addTocart(item.index, "+") }} style={{ borderWidth: 1, borderRadius: 7, marginRight: 49, padding: 7, width: 80, flexDirection: "row", justifyContent: "center" }}>
                                            <Text style={{ fontWeight: "bold", color: "#088F8F", fontSize: 17 }}>Add</Text>
                                        </Pressable>
                                    ) : (
                                        <View style={{ flexDirection: "row", marginRight: 30 }}>
                                            <Pressable style={{ borderWidth: 1, borderRadius: 7, marginRight: 10, padding: 6 }}>
                                                <Text onPress={() => { addTocart(item.index, "-") }} style={{ fontWeight: "bold", color: "#088F8F", fontSize: 17 }}>-</Text>
                                            </Pressable>
                                            <Pressable style={{ borderWidth: 1, borderRadius: 7, marginRight: 10, padding: 6 }}>
                                                <Text
                                                    style={{ fontWeight: "bold", color: "#088F8F", fontSize: 17 }}>{item.item.quantity}
                                                </Text>
                                            </Pressable>
                                            <Pressable style={{ borderWidth: 1, borderRadius: 7, marginRight: 10, padding: 6 }}>
                                                <Text onPress={() => { addTocart(item.index, "+") }} style={{ fontWeight: "bold", color: "#088F8F", fontSize: 17 }}>+</Text>
                                            </Pressable>
                                        </View>
                                    )}

                                </View>
                            )
                        }}
                    />
                </View>
            </ScrollView>

            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>Proceed to pickUP</Text>
        </>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({});