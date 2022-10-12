import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

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

const RideOptionsCard = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            style={tw`flex-row justify-between items-center px-10`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View>
              <Text>{title}</Text>
              <Text>Travel time...</Text>
            </View>
            <Text style={tw`text-xl`}>$99</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
