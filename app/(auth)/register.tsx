import { registerUser } from "@/api/users";
import { IErrorMessage } from "@/types/error";
import { IAddUserRequest } from "@/types/users";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function RegisterUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<IErrorMessage | string>("");

  const handlePress = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const user: IAddUserRequest = { email, password };
    const response = await registerUser(user);

    if (response?.status === 201) {
      alert("Account created successfully!");
      router.replace("/(auth)/login");
    } else {
      setError(response?.data);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.accentBar} />
          <Text style={styles.eyebrow}>GET STARTED</Text>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Start tracking your gains today</Text>
        </View>

        {/* Fields */}
        <View style={styles.fields}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#bbb"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            {typeof error !== "string" && error.validationErrors?.["email"] && (
              <Text style={{ color: "red" }}>
                {error.validationErrors["email"]}
              </Text>
            )}
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder="Min. 8 characters"
              placeholderTextColor="#bbb"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          {typeof error !== "string" &&
            error.validationErrors?.["password"] && (
              <Text style={{ color: "red" }}>
                {error.validationErrors["password"]}
              </Text>
            )}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>CONFIRM PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder="Repeat your password"
              placeholderTextColor="#bbb"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {typeof error === "string" && (
              <Text style={{ color: "red" }}>{error}</Text>
            )}
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={() => handlePress()}
        >
          <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/(auth)/login">
            <Text style={styles.footerLink}>Sign in</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 28,
    borderWidth: 1,
    borderColor: "#ebebeb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },

  // Header
  header: {
    marginBottom: 28,
  },
  accentBar: {
    width: 36,
    height: 4,
    backgroundColor: "#e52222",
    borderRadius: 2,
    marginBottom: 14,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 3,
    color: "#e52222",
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
  },

  // Fields
  fields: {
    gap: 16,
    marginBottom: 24,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: "#aaa",
  },
  input: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111",
  },

  // Button
  button: {
    backgroundColor: "#e52222",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#ffffff",
  },

  // Footer
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#999",
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#e52222",
  },
});
