import {makeAutoObservable} from "mobx";
import api from "@api/api";
import {IRestorant} from "@src/interface/interface";
import {AxiosResponse} from "axios";

class Restaurant {

    constructor() {
        makeAutoObservable(this)
    }

    getRestaurant = async (): Promise<AxiosResponse<IRestorant[]>> => {
        return await api.get("admin/restaurant/")
    }

    addRestaurant = async (data: IRestorant): Promise<AxiosResponse<IRestorant>> => {
        return await api.post("admin/restaurant/", data)
    }

    deleteRestaurant = async (id: number): Promise<AxiosResponse<IRestorant>> => {
        return await api.delete(`admin/restaurant/${id}`)
    }

    restoreRestaurant = async (id: number): Promise<AxiosResponse<IRestorant>> => {
        return await api.delete(`admin/restaurant/restore/${id}`)
    }

    getOneRestaurant = async (id: number): Promise<AxiosResponse<IRestorant>> => {
        return await api.get(`admin/restaurant/${id}`)
    }

    updateRestaurant = async (id: number, data: IRestorant): Promise<AxiosResponse<IRestorant>> => {
        return await api.put(`admin/restaurant/${id}`, data)
    }
}

const RestaurantStore = new Restaurant()
export default RestaurantStore;