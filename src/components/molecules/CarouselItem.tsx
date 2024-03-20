import React, { FC } from 'react';
import { View, FlatList, Dimensions, Text, ImageSourcePropType, Image } from 'react-native';
import Touchable from '@/components/atoms/dashboardAtoms/touchable';
import Contract from '@/services/Contrats/ContratModel';
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from '@/theme';
interface CarouselItemProps {
    data: Contract[];
    currentIndex: number;
    onIndexChanged: (index: number) => void;
}

const { height, width } = Dimensions.get('window');

const CarouselItem: FC<CarouselItemProps> = ({ data, currentIndex, onIndexChanged }) => {
    const itemSpacing = 15;
    const { borders, layout } = useTheme();
    return (
        <View style={{ height: height / 4, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={(e) => {
                    const x = e.nativeEvent.contentOffset.x;
                    onIndexChanged(Math.round(x / width));
                }}
                horizontal
                contentContainerStyle={{ marginLeft:width/10,alignItems: 'center' }}
                
                renderItem={({ item, index }) => {
                    const contract = item as Contract;

                    return (
                        <View
                            key={index}
                            style={[{

                                marginRight: index === data.length - 1 ? 0 : itemSpacing,
                                
                            }]}
                        >
                            <Touchable>
                                <View style={{ alignItems: 'center' }}>
                                    <View >
                                        <LinearGradient
                                            colors={['#1C5585', '#4980A1', '#5D8FAD']}
                                            style={[{ width: width/1.5, height: height / 6 }, borders.rounded_16]}
                                            end={{ x: 0.6, y: 0.8 }}
                                            start={{ x: 1, y: 0.8 }}

                                        >
                                            <View style={[layout.flex_1, layout.col, layout.itemsCenter, layout.justifyAround]}>
                                                <Text style={{ color: 'white', fontFamily: 'Lato', fontWeight: 'normal' }}>Contrat N°: {contract.number}</Text>
                                                <Text style={{ color: 'white', fontFamily: 'Lato', fontWeight: 'bold' }}> {contract.amount} DNT</Text>
                                            </View>
                                        </LinearGradient>




                                    </View>

                                </View>
                            </Touchable>
                        </View>
                    );
                }}
            />

            <View
                style={{
                    flexDirection: 'row',
                    width: width,
                    justifyContent: 'center',
                    alignItems: 'center',
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
                                backgroundColor: currentIndex === index ? '#1C5E85' : 'gray',
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

