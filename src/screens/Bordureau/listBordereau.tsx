import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import GrayCard from '@/components/atoms/dashboardAtoms/GrayCard';
import WhiteCard from '@/components/atoms/form/WhiteCard';
import { useTheme } from '@/theme';
import { useQuery } from '@tanstack/react-query';
import listBordereau from '@/services/Bordereaux/listBordereau';
import useContract from '@/contexts/auth/useContract';
import getMycontract from '@/services/Contrats/getByuser';
import AppIcon from '@/components/icons/AppIcons';
import { useNavigation } from '@react-navigation/native';

const ListBordereau = () => {
    const { fonts, layout, gutters, backgrounds, borders } = useTheme();
    const { contractId, referenceContrat } = useContract();
    const navigation = useNavigation();

    const { data, isError, isLoading } = useQuery({
        queryKey: ["bordereau", contractId],
        queryFn: () => listBordereau(contractId),
    });
    const contract = useQuery({
        queryKey: ["contract"],
        queryFn: () => getMycontract(),
    });
    useEffect(() => {
        console.log(data);
    }, [data]);

    if (isLoading) {
        return (
            <GrayCard>
                <WhiteCard>
                    <Text>Chargement des bordereaux...</Text>
                </WhiteCard>
            </GrayCard>
        );
    }

    if (isError) {
        return (
            <GrayCard>
                <WhiteCard>
                    <Text>Erreur lors du chargement des bordereaux.</Text>
                </WhiteCard>
            </GrayCard>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <ScrollView contentContainerStyle={[layout.justifyCenter, gutters.paddingBottom_80]}>
            <GrayCard style={{ flex: 1 }}>
                {data && data.$values.length > 0 ? (
                    data.$values.map((bordereau: any) => (
                        <TouchableWithoutFeedback
                            key={bordereau.bordereauId}

                            onPress={() => navigation.navigate('ListFacture', { bordereauId: bordereau.bordereauId })}
                        >
                            <View key={bordereau.bordereauId} style={styles.ticketContainer}>
                                <View style={[layout.col, layout.justifyBetween, layout.itemsCenter,
                                layout.fullWidth, backgrounds.blue50, gutters.padding_12, borders.rounded_4]}>

                                    <Text style={styles.title}>BORDEREAU DETAILS</Text>
                                </View>

                                <Text style={styles.price}>{bordereau.montantTotal} TND</Text>
                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>Contract Reference:</Text>
                                    <Text style={styles.value}>{referenceContrat}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>Date de Bordereau:</Text>
                                    <Text style={styles.value}>{formatDate(bordereau.dateBordereau)}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>Nombre de Documents:</Text>
                                    <Text style={styles.value}>{bordereau.nombreDocuments}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>Année de Bordereau:</Text>
                                    <Text style={styles.value}>{bordereau.anneeBordereau}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>Statut:</Text>
                                    {
                                        bordereau.statut === 0 ? (
                                            <AppIcon

                                                name={"bookmark-check"}
                                                type={"MaterialCommunityIcons"}
                                                size={40}
                                                color={"green"}

                                            />
                                        ) : bordereau.statut === 2 ? (
                                            <AppIcon
                                                name={"bookmark"}
                                                type={"MaterialCommunityIcons"}
                                                size={40}
                                                color={"orange"}

                                            />
                                        ) : (
                                            <AppIcon
                                                name={"bookmark-remove"}
                                                type={"MaterialCommunityIcons"}
                                                size={40}
                                                color={"red"}

                                            />
                                        )
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    ))
                ) : (
                    <Text>Aucun bordereau trouvé.</Text>
                )}
            </GrayCard>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    ticketContainer: {
        backgroundColor: 'white',
        margin: 10,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,

    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
    },
    label: {
        fontSize: 14,
        color: '#666',
    },
    value: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default ListBordereau;
