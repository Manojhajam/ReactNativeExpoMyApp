import { useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../config/firebaseConfig";

const Restaurant = () => {
  const { restaurant } = useLocalSearchParams();

  const [restaurantData, setRestaurantData] = useState({});
  const [carousalData, setCarousalData] = useState({});
  const [slotsData, setSlotsData] = useState({});

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Restaurant;
