import {IGetProductByCategory, IProduct} from "@src/interface/interface";
import {makeAutoObservable, runInAction} from "mobx";
import api from "@api/api";
import {AxiosResponse} from "axios";

class Product {
    productByCategory: IGetProductByCategory[] | null = null;
    oneProduct: IProduct | null = null;
    isLoading: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    getAllProducts = async (): Promise<AxiosResponse<IProduct[]>> => {
        return await api.get("admin/product/all");
    }

    async getProducts(categoryId: number = 1): Promise<void> {
        this.isLoading = true;
        try {
            const response: AxiosResponse<IGetProductByCategory[]> = await api.get(`category/get/${categoryId}`);

            runInAction((): void => {
                this.productByCategory = response.data;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || "An error occurred while fetching products.";
            });
        } finally {
            // Ensure loading state is reset after the request finishes
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async getOneProduct(categoryId: number): Promise<void> {
        runInAction((): void => {
            this.isLoading = true;
        })

        try {
            const response: AxiosResponse<IProduct> = await api.get(`/category/product/${categoryId}`);

            runInAction((): void => {
                this.oneProduct = response.data;
            })
        } catch (error: any) {
            runInAction((): void => {
                this.error = error.message || "An error occurred while fetching products.";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    deleteProduct = async (productId: number): Promise<void> => {
        await api.delete(`/admin/produc/${productId}`);
    }

    restoreProduct = async (productId: number): Promise<void> => {
        await api.delete(`/admin/product/restore/${productId}`);
    }
}

export default new Product();
