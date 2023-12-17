import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Dimensions, SafeAreaView, FlatList, Image } from 'react-native';
import React from 'react';
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AddToCarts = () => {
  const [SelectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [DeliveryDays, setDeliveryDays] = useState([]);
  const [userAddress, setUserAddress] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [orderByUser, setorderByUser] = useState("");
  const navigation = useNavigation();
  // const { width, height } = Dimensions.get('screen');

  const deliveryDays = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tommorrow",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 PM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "2",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];

  useEffect(() => {
    let perform = async () => {
      let cookieCheck = await AsyncStorage.getItem("authToken");
      if (!!cookieCheck) {
        axios.get("http://localhost:8000/user", {
          headers: {
            seingtoken: cookieCheck
          }
        }).then((result) => {
          setorderByUser(result.data.cart);
          // console.log(result.data.cart.quantity * result.data.cart.price);
          setUserAddress(result.data.addresses);
          setSelectedData(result.data.cart.image);
        }).catch((err) => {
          console.log(err);
        });
      }
      else {
        navigation.navigate("Login");
      }
    }
    perform();
  }, []);

  let proceedToBilling = async () => {
    let cookieCheck = await AsyncStorage.getItem("authToken");
    let productsRender = { SelectedDate, selectedTime, DeliveryDays }
    console.log(SelectedDate, selectedTime, DeliveryDays);

    if (!!cookieCheck) {
      axios.post("http://localhost:8000/user/billingDetails", productsRender, {
        headers: {
          seingtoken: cookieCheck
        }
      }).then((result) => {
        navigation.navigate("Billing")
      }).catch((err) => {
        console.log(err);
      });
    }
    else {
      res.send("Something went wrong in cart inserting time.")
    }

  }

  console.log(selectedTime, SelectedDate, DeliveryDays);
  return (
    <>
      <SafeAreaView>
        <Text style={{ marginBottom: 10, fontSize: 15 }}> Youser's Address </Text>
        <Text style={{ borderWidth: 1.8, borderColor: "gray", margin: 10, height: 40, borderRadius: 7, textAlign: "center", padding: 10, fontSize: 16, color: "gray" }}>{userAddress}</Text>
        <Text style={{ fontSize: 16, fontWeight: "400", marginHorizontal: 10 }}>Pick Up Date</Text>

        <HorizontalDatepicker
          // mode="gregorian"
          // startDate={new Date("2023-12-01")}
          endDate={new Date("2024-01-31")}
          // initialSelectedDate={new Date("2024-12-13")}
          // onSelectedDateChange={(date) => setSelectedDate(date)}
          onSelectedDateChange={(date) => setSelectedDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay() + 10}`)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />

        <Text style={{ fontSize: 16, fontWeight: "400", marginHorizontal: 10 }}>Select Time</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {times.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedTime(item.time)}
              style={selectedTime.includes(item.time) ?
                {
                  margin: 10, borderRadius: 7, padding: 15, borderColor: "red", borderWidth: 2.8
                } :
                {
                  margin: 10, borderRadius: 7, padding: 15, borderColor: "gray", borderWidth: 2.8
                }}
            >
              <Text>{item.time}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={{ fontSize: 16, fontWeight: "400", marginHorizontal: 10 }}>Delivery Days</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryDays.map((item, index) => (
            <Pressable key={index}
              onPress={() => setDeliveryDays(item.name)}
              style={DeliveryDays.includes(item.name) ?
                {
                  margin: 10, borderRadius: 7, padding: 15, borderColor: "red", borderWidth: 2.8
                } :
                {
                  margin: 10, borderRadius: 7, padding: 15, borderColor: "gray", borderWidth: 2.8
                }}
            >
              <Text>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Pressable style={{ backgroundColor: "#088F8F", padding: 18, marginBottom: 30, margin: 15, borderRadius: 7, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 1 }}>
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>{selectedTime} || {DeliveryDays} </Text>
            <Text style={{ fontSize: 16, fontWeight: "400", color: "white", marginVertical: 10 }}>pickUp {SelectedDate}  </Text>
          </View>

          <Pressable >
            <Text onPress={() => proceedToBilling()} style={{ fontSize: 17, fontWeight: "600", color: "white", backgroundColor: "red", padding: 8 }}>Proceed to Billing</Text>
          </Pressable>
        </Pressable>

        <Text>Your Ordered Items</Text>
        <FlatList
          data={orderByUser}
          // horizontal showsHorizontalScrollIndicator={false}
          renderItem={(item) => {
            // console.log(item.item);
            return (
              <View style={{
                padding: 5,
                borderRadius: 4,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                backgroundColor: "white"
              }}>
                <Image source={{ uri: item.item.image }} style={{ height: 100, width: 100 }} />
                <View style={{ marginHorizontal: "auto" }}>
                  <Text style={{ fontSize: 17, fontWeight: "bold" }}>{item.item.name}</Text>
                  <Text style={{ fontSize: 17 }} >${item.item.price}</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                  <Text style={{ fontSize: 17, fontWeight: "bold" }}>item price</Text>
                  <Text style={{ fontSize: 17 }} >{`${item.item.price} X ${item.item.quantity} = ${(item.item.price) * (item.item.quantity)}`}</Text>
                </View>
              </View>
            )
          }}

        />
        {/* </View> */}
      </SafeAreaView>
    </>
  )
}

export default AddToCarts;

const styles = StyleSheet.create({});