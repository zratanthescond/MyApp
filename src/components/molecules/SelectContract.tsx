import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAcheteur, getIndividu } from "@/services/Individu/individu";
import Dropdown from "@/components/atoms/Dropdown";
import { useTheme } from "@/theme";
import useContract from "@/contexts/auth/useContract";
import getMycontract from "@/services/Contrats/getByuser";
import { Text } from "react-native";
import { set } from "zod";

export default function SelectContract({ setModalVisible, modalVisible, lastContractId }: { setModalVisible: React.Dispatch<React.SetStateAction<boolean>>, modalVisible: boolean, lastContractId?: number }) {
    const { fonts, colors, layout, backgrounds, gutters, borders } = useTheme();
    const contract = useQuery({
        queryKey: ["contract"],
        queryFn: () => getMycontract(),
    });
    const [contractList, setContractList] = useState([]);
    const { setContractId, setContractMontant, setContractReference } = useContract();

    useEffect(() => {
        setContractList([]);

        if (contract.data) {

            contract.data.map((contract) => {
                setContractList((prevList) => [
                    ...prevList,
                    { key: contract.contratId, value: contract.referenceContrat },
                ]);
            });
        }
    }, [contract.data]);

    const textStyle = [
        fonts.gray800,
        fonts.bold,
        { paddingVertical: 10 },
        { paddingHorizontal: 5 },
    ];

    return (

        contract.data && (
            <>
                <Dropdown
                    style={{}}
                    data={contractList}
                    setSelected={(val: number) => {

                        setContractId(val),
                            setContractMontant(contract.data.find(x => x.contratId == val)?.montantContrat)
                        setContractReference(contract.data.find(x => x.contratId == val)?.referenceContrat)

                    }
                    }

                    save="key"
                    search={true}
                />

            </>
        )

    )

}



