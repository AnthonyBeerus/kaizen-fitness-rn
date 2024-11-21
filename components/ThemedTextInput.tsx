import { View, Text, TextInputProps, StyleSheet } from "react-native";
import React, { useState } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor';
import { TextInput } from 'react-native-gesture-handler';

export type ThemedTextInputProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
    type?: "default" | "email" | "password" | "search";
};

export function ThemedTextInput({
    style,
    lightColor,
    darkColor,
    type = "default",
}: ThemedTextInputProps) {
    const color = useThemeColor({ light: lightColor , dark: darkColor  }, 'containerBackground');
    const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'fadedText');
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    return (
      
        <TextInput
            placeholderTextColor={textColor}
            clearButtonMode="while-editing"
            autoCapitalize={type === "email" || type === "password" ? "none" : "sentences"}
            autoCorrect={type === "email" || type === "password" ? false : true}
            keyboardType={type === "email" ? "email-address" : type === "password" ? "default" : "default"}
            placeholder= {type==="email" ? "Email address" : type === "password" ? "********" : "Search"}
            value={type === "email" ? form.email : type === "password" ? form.password : ""}
            secureTextEntry={type === "email" ? false : type === "password" ? true : false}
            style={[{ color }, type === "default" || type === "email" || type ==="password" ? styles.default : undefined]}
        />
    );
}


const styles = StyleSheet.create({
  /** Input */
  default: {
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 4,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 4,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
});