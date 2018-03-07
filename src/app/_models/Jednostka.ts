export interface Jednostka {
    id: number;
    parentId: number;
    nazwa: string;
    opis: string;
    symbol: string;
    dataModyfikacji: Date;
    isMain: boolean;
}
