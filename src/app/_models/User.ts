import { Jednostka } from './Jednostka';

export interface User {
    id: number;
    username: string;
    email: string;
    telefon: string;
    instytucjaNazwa: string;
    instytucjaSymbol: string;
    instytucjaRodzaj: string;
    utworzony: Date;
    ostatniaAktywnosc: Date;
    jednostki?: Jednostka[];
}
