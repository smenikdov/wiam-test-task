import { MALE, FEMALE } from '../constants';

export interface IFormData {
    phone: string;
    firstName: string;
    lastName: string;
    gender: typeof MALE | typeof FEMALE | undefined;
    workPlace: string;
    address: string;
    loanAmount: number;
    loanTerm: number;
}

export interface IPlace {
    slug: string;
    name: string;
    url: string;
}
