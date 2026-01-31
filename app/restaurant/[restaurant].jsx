import { useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../config/firebaseConfig";

import Ionicons from "@expo/vector-icons/Ionicons";

const Restaurant = () => {
  const { restaurant } = useLocalSearchParams();
  const flatalistRef = useRef(null);
  const windowWidth = Dimensions.get("window").width;

  const [restaurantData, setRestaurantData] = useState({});
  const [carousalData, setCarousalData] = useState({});
  const [slotsData, setSlotsData] = useState({});

  const [currentIndex, setCurrentindex] = useState(0);

  const handleNextImage = () => {
    const carousalLength = carousalData[0]?.images.length;
    if (currentIndex < carousalLength - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentindex(nextIndex);
      flatalistRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }
    if (currentIndex == carousalLength - 1) {
      const nextIndex = 0;
      setCurrentindex(nextIndex);
      flatalistRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }
  };
  const handlePrevImage = () => {
    const carousalLength = carousalData[0]?.images.length;
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentindex(prevIndex);
      flatalistRef.current.scrollToIndex({ index: prevIndex, animated: true });
    }
    if (currentIndex == 0) {
      const prevIndex = carousalLength - 1;
      setCurrentindex(prevIndex);
      flatalistRef.current.scrollToIndex({ index: prevIndex, animated: true });
    }
  };

  const carousalItem = ({ item }) => {
    return (
      <View style={{ width: windowWidth - 2 }} className="h-64 relative">
        <View
          style={{
            position: "absolute",
            top: "50%",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            right: "6%",
          }}
        >
          <Ionicons
            onPress={handleNextImage}
            name="arrow-forward"
            size={24}
            color="white"
          />
        </View>

        <View
          style={{
            position: "absolute",
            top: "50%",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            left: "5%",
          }}
        >
          <Ionicons
            onPress={handlePrevImage}
            name="arrow-back"
            size={24}
            color="white"
          />
        </View>

        <Image
          source={{ uri: item }}
          style={{
            opacity: 0.5,
            backgroundColor: "black",
            marginRight: 15,
            marginLeft: 15,
            borderRadius: 25,
          }}
          className="h-64"
        />
      </View>
    );
  };

  const getRestaurantData = async () => {
    try {
      const restaurantQuery = query(
        collection(db, "restaurants"),
        where("name", "==", restaurant),
      );
      const restaurantSnapshot = await getDocs(restaurantQuery);

      if (restaurantSnapshot.empty) {
        console.log("No matching restaurant found");
        return;
      }

      for (const doc of restaurantSnapshot.docs) {
        const restaurantData = doc.data();
        setRestaurantData(restaurantData);

        const carousalQuery = query(
          collection(db, "carousal"),
          where("res_id", "==", doc.ref),
        );
        const caurosalSnapshot = await getDocs(carousalQuery);
        const carousalImages = [];

        if (caurosalSnapshot.empty) {
          console.log("No matching carousal found");
          return;
        }

        caurosalSnapshot.forEach((carousalDoc) => {
          carousalImages.push(carousalDoc.data());
        });
        setCarousalData(carousalImages);

        const slotsQuery = query(
          collection(db, "slots"),
          where("ref_id", "==", doc.ref),
        );
        const slotsSnapshot = await getDocs(slotsQuery);
        const slots = [];

        if (slotsSnapshot.empty) {
          console.log("No matching slots found");
          return;
        }

        slotsSnapshot.forEach((slotDoc) => {
          slots.push(slotDoc.data());
        });
        setSlotsData(slots);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  useEffect(() => {
    getRestaurantData();
  }, []);
  console.log(restaurantData, carousalData, slotsData);

  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#2b2b2b" },
        Platform.OS == "android" && { paddingBottom: 60 },
      ]}
    >
      <ScrollView className="h-full">
        <View className="flex-1 my-2 p-2">
          <Text className="text-xl text-[#f49b33] mr-2 font-semibold">
            {restaurant}
          </Text>
          <View className="border-b border-[#f49b33]"></View>
        </View>
        <View>
          <FlatList
            ref={flatalistRef}
            data={carousalData[0]?.images}
            renderItem={carousalItem}
            horizontal
            scrollEnabled={false}
            style={{ borderRadius: 25 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Restaurant;
