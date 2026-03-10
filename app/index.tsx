import { me } from "@/api/auth";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const handlePress = async () => {
    const response = await me();

    if (!response) return;
    if (response.status === 200) {
      alert(response.data.email);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/(auth)/register">
        <Text>Register User</Text>
      </Link>
      <TouchableOpacity onPress={() => handlePress()}>
        <Text>Me</Text>
      </TouchableOpacity>
    </View>
  );
}
