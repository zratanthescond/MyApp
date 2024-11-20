import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAcheteur, getIndividu } from "@/services/Individu/individu";
import Dropdown from "@/components/atoms/Dropdown";
import { useTheme } from "@/theme";
import useContract from "@/contexts/auth/useContract";

export default function SelectBuyer({ onSelect }) {
    const { contractId } = useContract();
    const { fonts, colors, layout, backgrounds, gutters, borders } = useTheme();
    const acheteur = useQuery({
        queryKey: ["acheteur"],
        queryFn: () => getAcheteur(contractId),
    });
    const [acheteurList, setAcheteurList] = useState([]);
    useEffect(() => {
        setAcheteurList([]);
        if (acheteur.data?.$values) {
            acheteur.data.$values.map((acheteur) => {
                setAcheteurList((prevList) => [
                    ...prevList,
                    { key: acheteur.individuId, value: acheteur.nom },
                ]);
            });
        }
    }, [acheteur.data]);
    const textStyle = [
        fonts.gray800,
        fonts.bold,
        { paddingVertical: 10 },
        { paddingHorizontal: 5 },
    ];

    return (

        acheteur.data && (
            <Dropdown
                style={{}}
                data={acheteurList}
                setSelected={(val: string) => { onSelect(val) }
                }
                save="key"
                search={true}
            />
        )

    )

}



