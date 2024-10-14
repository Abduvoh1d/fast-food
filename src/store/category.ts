import { ICategory } from "@src/interface/interface";
import { makeAutoObservable, runInAction } from "mobx";
import api from "@api/api";
import { AxiosResponse } from "axios";

class Category {
    category: ICategory[] | null = null;
    error: string | null = null;
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(state: boolean): void {
        this.isLoading = state;
    }

    async getCategories(): Promise<ICategory[] | void> {
        this.setLoading(true);
        try {
            const response: AxiosResponse<ICategory[]> = await api.get("category/all");

            runInAction(() => {
                this.category = response.data;
                this.error = null;
            });

            return response.data;
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || "Ma'lumot olishda xatolik yuz berdi";
                this.category = null;
            });
        } finally {
            this.setLoading(false);
        }
    }
}

const CategoryStore = new Category();
export default CategoryStore;
