import {ICategory} from "@src/interface/interface";
import {makeAutoObservable, runInAction} from "mobx";
import api from "@api/api";
import {AxiosResponse} from "axios";

class Category {
    category: ICategory[] | null = null;
    error: string | null = null;
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    loading(boolean: boolean): void {
        runInAction((): void => {
            this.isLoading = boolean;
        })
    }

    async getCategories(): Promise<void> {
        this.loading(true)
        try {
            const response: AxiosResponse<ICategory[]> = await api.get("category/all");
            runInAction((): ICategory[] => {
                return this.category = response.data;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message;
            });
            this.loading(false)
        } finally {
            this.loading(false)
        }
    }
}

export default new Category();
