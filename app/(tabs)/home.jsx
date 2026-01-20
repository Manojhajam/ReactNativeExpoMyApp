import {
  View,
  Text,
  Platform,
  ScrollView,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import logo from "../../assets/images/dinetimelogo.png";
import { BlurView } from "expo-blur";
import banner from "../../assets/images/homeBanner.png";
import { restaurants } from "../../store/restaurants";

const home = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity className="bg-[#5f5f5f] max-h-64 max-w-xs flex justify-center rounded-lg p-4 mx-4 ">
      <Image
        resizeMethod="cover"
        source={{ uri: item.image }}
        className="h-28 mt-2 mb-1 rounded-lg p-4 mx-4 shadow-md"
      />
      <Text className="text-white text-lg font-bold mb-2">{item.name}</Text>
      <Text className="text-white text-base mb-2">{item.address}</Text>
      <Text className="text-white text-base mb-2">Open: {item.opening}- Close: {item.closing}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[{ backgroundColor: "#2b2b2b" },
    Platform.OS == "android"&& { paddingBottom: 60 }]}>
      <View className="flex items-center py-2">
        <View className="bg-[#5f5f5f] w-11/12 rounded-lg shadow-lg justify-center">
          <View className="flex flex-row items-center">
            <Text
              className={`text-base h-10 ${Platform.OS == "ios" ? "pt-[8px]" : "pt-1"} align-middle text-white ml-2`}
            >
              Welcome to{" "}
            </Text>
            <Image resizeMode="cover" className="w-20 h-12" source={logo} />
          </View>
        </View>
      </View>
      <ScrollView stickyHeaderIndices={[0]}>
        <ImageBackground
          source={banner}
          resizeMode="cover"
          className="mb-4 w-full h-52 bg-[#2b2b2b] items-center justify-center"
        >
          <BlurView intensity={50} className="w-full p-4 shadow-lg" tint="dark">
            <Text className="text-center text-3xl font-bold text-white">
              Dine with your loved ones
            </Text>
          </BlurView>
        </ImageBackground>

        <View className="p-4 bg-[#2b2b2b] flex-row items-center">
          <Text className="text-3xl text-white mr-2 font-semibold">Special Discounts %</Text>
        </View>

        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        ) : (
          <ActivityIndicator animating color={"#fb9b33"} />
        )}
        <View className="p-4 bg-[#2b2b2b] flex-row items-center">
          <Text className="text-3xl text-[#fb9b33] mr-2 font-semibold">Our Restaurants</Text>
        </View>

        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        ) : (
          <ActivityIndicator animating color={"#fb9b33"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
