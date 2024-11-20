export type Litige =
    {
        TypeDuLitige: string;
        DateLitige: Date;
        DateEcheanceLitige: Date;
        ContratId: number;
        FactureId: number;
    }

export type Prorogation =
    {
        DateEcheanceApresProrogation: Date;
        ContratId: number;
        FactureId: number;
        MotifProrogation: string;
        TypeProrogation: string;
        Echeance: Date;
    };

export type Limit =
    {
        contratId: number;
        dateDemande: Date;

        dateLimite: Date;
        dateDerniereDemande: Date;
        delaiDemande: number;
        modePaiement: string;
    };