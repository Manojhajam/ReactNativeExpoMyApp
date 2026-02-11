import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Formik } from "formik";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/dinetimelogo.png";
import entryImg from "../../assets/images/Frame.png";
import validationSchema from "../../utils/authSchema.js";

const Signup = () => {
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();

  const handleGuest = async () => {
    const token = await AsyncStorage.getItem("userEmail");
    if (token) {
      Alert.alert("Already Logged In", "You are already logged in.");
    } else {
      await AsyncStorage.setItem("isGuest", "true");
      router.push("/home");
    }
  };

  const handleSignup = async (values) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      const user = userCredentials.user;
      await setDoc(doc(db, "users", user.uid), {
        email: values.email,
        createdAt: new Date(),
      });
      await AsyncStorage.setItem("userEmail", values.email);
      router.push("/home");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Signup Failed!",
          "This email address is already in use. Pleaase use a different email.",
        );
      } else {
        Alert.alert(
          "Signup Failed!",
          "An unexpected eror occurred. Please try again later.",
        );
      }
    }
  };

  return (
    <SafeAreaView className="bg-[#2b2b2b]">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center">
          <Image source={logo} style={{ width: 200, height: 120 }} />
          <Text className="text-lg text-center text-white font-bold mb-10">
            Let's get you started
          </Text>

          <View className="w-5/6">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View className="w-full">
                  <Text className="text-[#f49b33] mt-4 mb-2">Email</Text>
                  <TextInput
                    className="border border-white text-white rounded"
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    value={values.email}
                    onBlur={handleBlur("email")}
                  />
                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.email}
                    </Text>
                  )}

                  <Text className="text-[#f49b33] mt-4 mb-2">Password</Text>
                  <TextInput
                    className="border border-white text-white rounded"
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    value={values.password}
                    onBlur={handleBlur("password")}
                  />
                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.password}
                    </Text>
                  )}
                  <View>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={{ marginTop: 30 }}
                      className="p-2 bg-[#f49b33] text-black rounded-lg "
                    >
                      <Text className="text-xl font-semibold text-center">
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
            <View>
              <TouchableOpacity
                className="flex flex-row items-center justify-center"
                style={{ marginTop: 20 }}
                onPress={() => router.push("/signin")}
              >
                <Text className="text-white font-semibold">
                  Already a User?{" "}
                </Text>
                <Text className="text-base font-semibold underline text-[#f49b33]">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
            <Text className="text-center text-base font-semibold my-4 text-white">
              <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" /> or{" "}
              <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" />
            </Text>
            <TouchableOpacity
              className="flex flex-row items-center justify-center mt-10"
              style={{ marginTop: 12 }}
              onPress={handleGuest}
            >
              <Text className="text-white font-semibold">Be a </Text>
              <Text className="text-base font-semibold underline text-[#f49b33]">
                Guest User
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1">
          <Image
            source={entryImg}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
