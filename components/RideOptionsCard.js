import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Uber-X-1",
    title: "UberX",
    multiplier: 1, // For Price
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-2",
    title: "UberXL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-3",
    title: "UberX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

// If theres a surge of users price goes up
const SURGE_CHARGE_RATE = 1.0;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute left-5 z-50 pb-5 rounded-full -mt-1`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 w-60 ml-auto mr-auto mb-5 -mt-5 ${
            !selected && "bg-gray-300"
          }`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>

        <Text
          style={tw`absolute left-5 z-50 pb-5 rounded-full -mt-1 ml-76 font-semibold`}
        >
          {travelTimeInformation?.distance?.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
            </View>

            {/* Ride pricing calculations */}
            <Text style={tw`text-xl mt-4`}>
              {new Intl.NumberFormat("en-au", {
                style: "currency",
                currency: "AUD",
              }).format(
                (travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
