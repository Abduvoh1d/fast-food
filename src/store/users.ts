import { makeAutoObservable, runInAction } from "mobx";
import { AxiosResponse } from "axios";
import api from "@api/api";
import { IUserTable } from "@pages/admin/user/User";

class Users {
    users: IUserTable[] | null = null;
    user: IUserTable | null = null;
    isLoading = false;
    error: string | null = null;

    constructor() {
        // Ensure the store is observable
        makeAutoObservable(this);
    }

    setLoading = (state: boolean) => {
        this.isLoading = state;
    };

    setError = (error: string | null) => {
        this.error = error;
    };

    mapUserData = (data: IUserTable[]): IUserTable[] => {
        return data.map((item) => ({
            id: item.id,
            username: item.username,
            email: item.email,
            role: item.role,
            deleted: item.deleted,
        }));
    };

    getAllUsers = async (): Promise<IUserTable[] | void> => {
        this.setLoading(true);
        try {
            const response = await api.get("admin/user/");
            const data = response.data;

            runInAction(() => {
                this.users = this.mapUserData(data);
            });

            return data;
        } catch (error) {
            runInAction(() => {
                this.setError(error instanceof Error ? error.message : String(error));
            });
        } finally {
            this.setLoading(false);
        }
    };


    getUser = async (id: number) => {
        this.setLoading(true);
        try {
            const response: AxiosResponse<IUserTable> = await api.get(`admin/user/${id}`);
            runInAction(() => {
                this.user = response.data;
            });
        } catch (error) {
            runInAction(() => {
                this.setError(error instanceof Error ? error.message : String(error));
            });
        } finally {
            this.setLoading(false);
        }
    };

    addAdminRole = async (id: number) => {
        this.setLoading(true);
        try {
            const response = await api.post(`admin/user/addAdmin/${id}/`);
            alert(response.data);
        } catch (error) {
            runInAction(() => {
                this.setError(error instanceof Error ? error.message : String(error));
            });
        } finally {
            this.setLoading(false);
        }
    };

    deleteUser = async (id: number) => {
        this.setLoading(true);
        try {
            const response = await api.delete(`admin/user/${id}`);
            alert(response.data);
        } catch (error) {
            runInAction(() => {
                this.setError(error instanceof Error ? error.message : String(error));
            });
        } finally {
            this.setLoading(false);
        }
    };

    restone = async (id: number) => {
        this.setLoading(true);
        try {
            const response = await api.put(`admin/user/restore/${id}`);
            alert(response.data);
        } catch (error) {
            runInAction(() => {
                this.setError(error instanceof Error ? error.message : String(error));
            });
        } finally {
            this.setLoading(false);
        }
    };
}

const UserStore = new Users();
export default UserStore;
