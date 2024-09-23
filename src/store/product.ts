import {IProduct} from "@src/interface/interface";
import {makeAutoObservable, runInAction} from "mobx";
import api from "@src/api/api";

class product {
    product: IProduct[] | null = null;
    error: string | null = null;
    isLoading: boolean | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async getProducts() {
        runInAction(() => {
            this.isLoading = true
        })

        try {
            const response: IProduct = await api.get('product/1')
            console.log(response)
            runInAction(() => {
                // this.product = response.data
            })
        } catch (e: unknown) {
            runInAction(() => {
                if (e instanceof Error) {
                    this.error = e.message;
                } else {
                    this.error = String(e);
                }
            })
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }
}

const Product = new product();
export default Product;