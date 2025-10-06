import { makeAutoObservable, runInAction } from 'mobx';
import type { IPlace } from '../types';
import { fetchWorkPlaces } from '../api/dummyApi';

class WorkPlacesStore {
    places: IPlace[] = [];
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async load() {
        if (this.places.length > 0) {
            return;
        }

        this.isLoading = true;
        try {
            const places = await fetchWorkPlaces();
            runInAction(() => {
                this.places = places;
            });
        } catch (error) {
            console.error('Failed to load work places', error);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
}

export const workPlacesStore = new WorkPlacesStore();
