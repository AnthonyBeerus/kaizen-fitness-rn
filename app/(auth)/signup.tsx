import ParallaxScrollView from "@/components/ParallaxScrollView";
import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-paper";

export default function SignupScreen() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const colorScheme = useColorScheme();
  const [text, setText] = React.useState("");
  const buttonBrandColor = colorScheme === "dark" ? "#F04444" : "#075eec";

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView>
        <ParallaxScrollView
          headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}>
          <KeyboardAwareScrollView>
            <ThemedView variant="default" style={styles.header}>
              <Image
                alt="App Logo"
                resizeMode="contain"
                style={styles.headerImg}
                source={require("../../assets/images/brand-logo.png")}
              />

              <ThemedText type="title">
                Sign in to <Text style={{ color: "#F04444" }}>KAIZEN</Text>
              </ThemedText>

              <ThemedText type="subtitle">Stay Hard!</ThemedText>
            </ThemedView>

            <ThemedView variant="default" style={styles.form}>
              {/* <View style={styles.input}>
                  <Text style={styles.inputLabel}>Email address</Text>

                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    keyboardType="email-address"
                    onChangeText={(email) => setForm({ ...form, email })}
                    placeholder="john@example.com"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControl}
                    value={form.email}
                  />
                </View>

                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Password</Text>

                  <TextInput
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    onChangeText={(password) => setForm({ ...form, password })}
                    placeholder="********"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControl}
                    secureTextEntry={true}
                    value={form.password}
                  />
                </View> */}
              <ThemedText style={styles.inputLabel}>Password</ThemedText>
              <ThemedView style={styles.input} variant={"inContainer"}>
                <ThemedTextInput type="password" value={form.password} />
              </ThemedView>
              <ThemedText style={styles.inputLabel}>Email Address</ThemedText>
              <ThemedView style={styles.input} variant={"inContainer"}>
                <ThemedTextInput type="email" />
              </ThemedView>

              <View style={styles.formAction}>
                <ThemedButton
                  variant="primary"
                  title="Sign in"
                  href={"/(tabs)/gym/routine"}
                  onPress={() => {
                    // handle link
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  // handle link
                }}>
                <Text style={styles.formLink}>Forgot password?</Text>
              </TouchableOpacity>
            </ThemedView>
          </KeyboardAwareScrollView>

          <TouchableOpacity
            onPress={() => {
              // handle link
            }}>
            <ThemedText style={styles.formFooter}>
              Don't have an account?{" "}
              <Text style={{ textDecorationLine: "underline" }}>Sign up</Text>
            </ThemedText>
          </TouchableOpacity>
        </ParallaxScrollView>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  /** Header */
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
  },
  headerImg: {
    width: 200,
    height: 80,
    alignSelf: "center",
    marginBottom: 36,
    tintColor: "#F04444",
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 10,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F04444",
    textAlign: "center",
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#F04444",
    borderColor: "#F04444",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
