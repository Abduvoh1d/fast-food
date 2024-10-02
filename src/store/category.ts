import { ICategory } from "@src/interface/interface";
import { makeAutoObservable, runInAction } from "mobx";
import api from "@api/api";

class Category {
    category: ICategory[] | null = null;
    error: string | null = null;
    isLoading: boolean = false;
    isAuthenticated: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async getCategories() {
        this.isLoading = true;
        try {
            const response = await api.get("category/all");
            runInAction(() => {
                this.category = response.data;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message;
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            })
        }
    }
}

export default new Category();
