import {makeAutoObservable, runInAction} from "mobx";
import {IBasket, IOrderItemDTO} from "@src/interface/interface";
import api from "@api/api";
import {AxiosResponse} from "axios";

class BasketStore {
    basket: IOrderItemDTO[] | null = null;
    error: string | null = null;
    isLoading: boolean = false;
    totalProducts: number = 0;
    totalPrice: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    loading(boolean: boolean): void {
        runInAction((): void => {
            this.isLoading = boolean;
        })
    }

    async getBaket(): Promise<void> {
        this.loading(true)
        try {
            const response: AxiosResponse<IBasket> = await api.get("category/orderItems");
            runInAction(() => {
                this.basket = response.data.orderItemDTOS;
                this.totalProducts = response.data.count
                this.totalPrice = response.data.price
                this.error = null;
            });
        } catch (e) {
            runInAction((): void => {
                this.error = `${e}`;
            });
            this.loading(false)
        } finally {
            this.loading(false)
        }
    }

    async fetchBasket(url: string): Promise<void> {
        this.loading(true)
        try {
            const response: AxiosResponse<IBasket> = await api.post(url);
            runInAction((): void => {
                this.basket = response.data.orderItemDTOS;
                this.totalProducts = response.data.count
                this.totalPrice = response.data.price
                this.error = null;
            });
        } catch (e) {
            runInAction((): void => {
                this.error = `${e}`;
            });
            this.loading(false)
        } finally {
            this.loading(false)
        }
    }


    async addBasket(productId: number): Promise<void> {
        this.fetchBasket(`category/addOrderItem/?productId=${productId}`).then();
    }

    async plus(productId: number): Promise<void> {
        this.fetchBasket(`category/addOrderItem/?productId=${productId}`).then();
    }

    async minus(productId: number): Promise<void> {
        this.fetchBasket(`category/minusOrderItem/?productId=${productId}`).then();
    }
}

const Basket = new BasketStore();
export default Basket;