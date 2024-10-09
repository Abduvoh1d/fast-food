import {IAllUsers} from "@src/interface/interface";
import {makeAutoObservable, runInAction, toJS} from "mobx";
import {AxiosResponse} from "axios";
import api from "@api/api";
import {IUserTable} from "@pages/admin/user/User";

class Users {
    users: IUserTable[] | null = null
    user: IAllUsers | null = null
    isLoading: boolean = false
    error: string | null = null

    constructor() {
        makeAutoObservable(this)
    }

    Loading(boolean: boolean): void {
        runInAction((): void => {
            this.isLoading = boolean;
        })
    }

    Error(e: string | null = null): void {
        runInAction((): void => {
            this.error = e;
        })
    }

    mapUser(data: IUserTable[]) {
        return data.map((item) => ({
            id: item.id,
            username: item.username,
            email: item.email,
            role: item.role,
            deleted: item.deleted,
        }));
    }

    async getAllUsers(): Promise<void> {
        this.Loading(true)

        try {
            const response = await api.get("admin/user/");
            runInAction((): void => {
                this.users = this.mapUser(response.data)
            })
            console.log(toJS(this.users))
        } catch (e) {
            this.Error(e as string);
        } finally {
            this.Loading(false)
        }
    }

    async getUser(id: number): Promise<void> {
        this.Loading(true)

        try {
            const response:AxiosResponse<IAllUsers> = await api.get(`admin/user/${id}`);
            console.log(response)
            runInAction((): void => {
                this.user = response.data;
            })
        } catch (e) {
            this.Error(e as string);
        } finally {
            this.Loading(false)
        }
    }

    async addAdminRole(id: number): Promise<void> {
        this.Loading(true)
        try {
            const response = await api.put(`admin/user/addAdmin/${id}`);
            console.log(response)
        }catch (e){
            this.Error(e as string);
        }finally {
            this.Loading(false)
        }
    }
}

const UserStore = new Users()
export default UserStore;