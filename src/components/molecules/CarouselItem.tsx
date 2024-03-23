import React, { FC, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Text,
  ImageSourcePropType,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import Touchable from "@/components/atoms/dashboardAtoms/touchable";
import Contract from "@/services/Contrats/ContratModel";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "@/theme";

interface CarouselItemProps {
  data: Contract[];
  currentIndex: number;
  onIndexChanged: (index: number) => void;
}

const { height, width } = Dimensions.get("window");
const cardWidth = (width * 2) / 3;
const itemsPadding = width / 12;
const CarouselItem: FC<CarouselItemProps> = ({
  data,
  currentIndex,
  onIndexChanged,
}) => {
  const itemSpacing = 15;
  const { borders, layout } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        height: height / 6,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={cardWidth + 20}
        decelerationRate="fast"
        onScroll={(e) => {
          const { x } = e.nativeEvent.contentOffset;
          onIndexChanged(Math.round(x / width));
        }}
        onViewableItemsChanged={(items, changet) => {
          // alert(JSON.stringify(items.viewableItems));
          if (items.viewableItems.length > 0) {
            console.log(items.viewableItems);
            onIndexChanged(items.viewableItems[0].index);
          }
        }}
        viewabilityConfig={{
          waitForInteraction: true,
          // itemVisiblePercentThreshold: 100,
          minimumViewTime: 500,
          viewAreaCoveragePercentThreshold: 95,
        }}
        horizontal
        contentContainerStyle={styles.listWrapper}
        renderItem={({ item, index }) => {
          const contract = item;

          return (
            <LinearGradient
              colors={["#1C5585", "#4980A1", "#5D8FAD"]}
              style={[
                {
                  marginRight: index === data.length - 1 ? 20 : 0,
                  marginLeft: 20,
                  width: width / 1.5,
                  height: height / 6,
                },
                borders.rounded_16,
              ]}
              end={{ x: 0.6, y: 0.8 }}
              start={{ x: 1, y: 0.8 }}
            >
              <View
                style={[
                  layout.flex_1,
                  layout.col,
                  layout.itemsCenter,
                  layout.justifyAround,
                ]}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Lato",
                    fontWeight: "normal",
                  }}
                >
                  Contrat N°: {contract.number}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Lato",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {contract.amount} TND
                </Text>
              </View>
            </LinearGradient>
          );
        }}
      />

      <View
        style={{
          flexDirection: "row",
          width,
          justifyContent: "center",
          alignItems: "center",
          // Ajuster la marge pour les points
        }}
      >
        {data.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: currentIndex === index ? 50 : 8,
                height: currentIndex === index ? 10 : 8,
                borderRadius: currentIndex === index ? 5 : 4,
                backgroundColor: currentIndex === index ? "#1C5E85" : "gray",
                marginLeft: 5,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default CarouselItem;
const styles = StyleSheet.create({
  listWrapper: {
    alignItems: "center",
  },
});
