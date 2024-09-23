import {ICategory} from "@src/interface/interface";
import {makeAutoObservable, runInAction} from "mobx";
import api from "@api/api";

class category {
    category: ICategory[] | null = localStorage.getItem("category") ? JSON.parse(localStorage.getItem("category")!) : null
    error: string | null = null
    isLoading: boolean = false

    constructor() {
        makeAutoObservable(this);
    }

    async getCategories() {
        runInAction(() => {
            this.isLoading = true
        })
        try {
            const response = await api.get('category')
            localStorage.setItem('category', JSON.stringify(response.data))
            runInAction(() => {
                this.category = response.data
            })
        } catch (e) {
            runInAction(() => {
                this.error = `${e}`;
                this.isLoading = false
            })
        }finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

}

const Category = new category()
export default Category