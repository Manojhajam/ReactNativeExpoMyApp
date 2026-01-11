import { Link, useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

const Index = () => {
  const router = useRouter();
  return <View className="bg-red-500" style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  
  }}>
    <Text className="text-blue-600" style={{ fontSize: 30, fontWeight: "700" }}>Hello Welcome to Coder</Text>
    <Link className="text-sky-600" href={"/about"}>Go to about</Link>
    <TouchableOpacity onPress={() => router.push("/home")}>
      <Text>Change route</Text>
    </TouchableOpacity>
  </View>;
};

export default Index;
