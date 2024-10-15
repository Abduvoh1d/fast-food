import {makeAutoObservable} from "mobx";
import {AxiosResponse} from "axios";
import api from "@api/api";
import {IUserTable} from "@pages/admin/user/User";

class Users {
    users: IUserTable[] | null = null;
    user: IUserTable | null = null;
    isLoading = false;
    error: string | null = null;

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
        const response = await api.post(`admin/user/addAdmin/${id}/`);
        alert(response.data)
    };

    deleteUser = async (id: number) => {
        const response = await api.delete(`admin/user/${id}`);
        alert(response.data);
    };

    restoneUser = async (id: number) => {
        const response = await api.put(`admin/user/restore/${id}`);
        alert(response.data);
    };
}

const UserStore = new Users();
export default UserStore;
