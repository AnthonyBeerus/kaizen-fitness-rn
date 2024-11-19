import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';

const index = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}>
      <Link asChild href={"/modal/second"}>
        <TouchableOpacity>
          <ThemedText>index</ThemedText>
        </TouchableOpacity>
      </Link>
    </ParallaxScrollView>
  );
}

export default index

const styles = StyleSheet.create({})