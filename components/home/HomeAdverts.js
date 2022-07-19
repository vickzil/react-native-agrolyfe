import React from "react";
import { FlatList, View } from "react-native";
import HomeAdvertItem from "./HomeAdvertItem";

const HomeAdverts = () => {
  const adverts = [
    {
      id: 1,
      img: require("../../assets/img/ad1.jpg"),
    },
    {
      id: 2,
      img: require("../../assets/img/ad2.jpg"),
    },
    {
      id: 3,
      img: require("../../assets/img/ad3.jpg"),
    },
    {
      id: 4,
      img: require("../../assets/img/ad4.jpg"),
    },
  ];

  return (
    adverts &&
    adverts?.length && (
      <View style={{ horizontalPadding: 25, marginTop: 10, marginBottom: 50 }}>
        <FlatList
          horizontal
          data={adverts}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => <HomeAdvertItem item={item} key={index} index={index} />}
        />
      </View>
    )
  );
};

export default HomeAdverts;
