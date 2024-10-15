import {makeAutoObservable} from "mobx";

class Restaurant {

    constructor() {
        makeAutoObservable(this)
    }
}

const RestaurantStore = new Restaurant()
export default RestaurantStore;