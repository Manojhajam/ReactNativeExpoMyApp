import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const profile = () => {
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const fetchUseremail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };
    fetchUseremail();
  }, []);

  const handleSignup = () => {
    router.push("/signup");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userEmail");
      setUserEmail(null);
      Alert.alert("Logged out", "You have been logged out successfully!");
      router.push("/signin");
    } catch (error) {
      Alert.alert("Logged Error", "Error while logging out");
      console.log(error);
    }
  };
  return (
    <View className="flex-1 justify-center items-center bg-[#2b2b2b]">
      <Text className="text-xl text-[#f49b33] font-semibold mb-4">
        User profile
      </Text>
      {userEmail ? (
        <>
          <Text className="text-white text-lg mb-6">Email: {userEmail}</Text>
          <TouchableOpacity
            onPress={handleLogout}
            style={{ marginTop: 30 }}
            className="p-2 bg-[#f49b33] text-black rounded-lg "
          >
            <Text className="text-xl font-semibold text-center">Log out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={handleSignup}
            style={{ marginTop: 30 }}
            className="p-2 bg-[#f49b33] text-black rounded-lg "
          >
            <Text className="text-xl font-semibold text-center">Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default profile;
