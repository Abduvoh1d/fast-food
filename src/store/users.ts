import {makeAutoObservable} from "mobx";
import {AxiosResponse} from "axios";
import api from "@api/api";
import {IUserTable} from "@pages/admin/user/User";

class Users {
    users: IUserTable[] | null = null;
    user: IUserTable | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    getAllUsers = async (): Promise<IUserTable[] | void> => {
        const response = await api.get("admin/user/");
        return response.data
    };


    getUser = async (id: number) => {
        const response: AxiosResponse<IUserTable> = await api.get(`admin/user/${id}`);
        return response.data
    };

    addAdminRole = async (id: number) => {
        return  await api.post(`admin/user/addAdmin/${id}/`);
    };

    deleteUser = async (id: number) => {
        return  await api.delete(`admin/user/${id}`);;
    };

    restoneUser = async (id: number) => {
        return await api.put(`admin/user/restore/${id}`);
    };
}

const UserStore = new Users();
export default UserStore;
