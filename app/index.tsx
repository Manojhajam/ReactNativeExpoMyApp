import { Link } from "expo-router";
import { View, Text } from "react-native";

const Index = () => {
  return <View style={{
    backgroundColor: "red",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  
  }}>
    <Text style={{ fontSize: 30, fontWeight: "700", color: "white" }}>Hello Welcome to Coder</Text>
    <Link href={"/about"}>Go to about</Link>
  </View>;
};

export default Index;
