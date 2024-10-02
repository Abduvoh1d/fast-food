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

    async getBaket(): Promise<void> {
        runInAction(() => {
            this.isLoading = true;
        })
        try {
            const response: AxiosResponse<IBasket> = await api.get("category/orderItems");
            runInAction(() => {
                this.basket = response.data.orderItemDTOS;
                this.totalProducts = response.data.count
                this.totalPrice = response.data.price
                this.error = null;
            });
        } catch (e) {
            runInAction(() => {
                this.error = `${e}`;
                this.isLoading = false;
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            })
        }
    }

    async addBasket(productId: number): Promise<void> {
        runInAction(() => {
            this.isLoading = true;
        })
        try {
            await api.post(`category/addOrderItem/?productId=${productId}`, {productId});
            runInAction(() => {
                this.error = null;
            });
        } catch (e) {
            runInAction(() => {
                this.error = `${e}`;
                this.isLoading = false
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            })
        }
    }

    async plus(productId: number): Promise<void> {
        runInAction(() => {
            this.isLoading = true;
        })
        try {
            const response: AxiosResponse<IBasket> = await api.post(`category/addOrderItem/?productId=${productId}`);
            runInAction(() => {
                this.basket = response.data.orderItemDTOS;
            });
        } catch (e) {
            runInAction(() => {
                this.error = `${e}`;
                this.isLoading = false
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            })
        }
    }

    async minus(productId: number): Promise<void> {
        runInAction(() => {
            this.isLoading = true;
        })
        try {
            const response: AxiosResponse<IBasket> = await api.post(`category/minusOrderItem/?productId=${productId}`);
            console.log(response.data.orderItemDTOS)
            runInAction(() => {
                this.basket = response.data.orderItemDTOS;
            });
        } catch (e) {
            runInAction(() => {
                this.error = `${e}`;
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            })
        }
    }
}

const Basket = new BasketStore();
export default Basket;
