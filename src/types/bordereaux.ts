export type Facture = {
  MontantDocument: number;
  RefFacture: string;
  Echeance: number;
  DateFacture: Date;
  ModeReglement: string;
  TypeDocument: string;
  ContratId: number;
};
export type FormulaireData = {
  MontantTotal: number;
  DateBordereau: Date;
  NombreDocuments: number;
  AnneeBordereau: number;
  ContratId: number;
  Factures: Facture[];
};
