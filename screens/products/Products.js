import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/header/Header";
import Products from "../../components/products/Products";

const Home = ({ navigation }) => {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <Header title="Products" icons={false} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 15 }}>
            <Products />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
