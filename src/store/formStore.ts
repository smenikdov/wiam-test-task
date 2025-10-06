import { makeAutoObservable } from 'mobx';
import { MALE } from '../constants';
import { LOAN_AMOUNT, LOAN_TERM } from '../constants';
import type { IFormData } from '../types';

class FormStore {
    formData: IFormData = {
        phone: '',
        firstName: '',
        lastName: '',
        gender: MALE,
        workPlace: '',
        address: '',
        loanAmount: LOAN_AMOUNT.MIN,
        loanTerm: LOAN_TERM.MIN,
    };

    constructor() {
        makeAutoObservable(this);
    }

    setFormData(data: Partial<IFormData>): void {
        this.formData = { ...this.formData, ...data };
    }

    get isPersonalDataValid(): boolean {
        return !!(this.formData.phone && this.formData.firstName && this.formData.lastName && this.formData.gender);
    }

    get isAddressDataValid(): boolean {
        return !!(this.formData.workPlace && this.formData.address);
    }
}

export const formStore = new FormStore();
