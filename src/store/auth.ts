import {ILogin, IUser} from "@src/interface/interface";
import {makeAutoObservable, runInAction} from "mobx";
import api from "@api/api";

class auth {
    user: IUser | null = null;
    error: string | null = null;
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async login(data: ILogin) {
        runInAction(() => {
            this.isLoading = true;
        });

        try {
            const response: ILogin = await api.post('auth/login', data);
            console.log(response);

            runInAction(() => {
                this.error = null;
                // this.user = response.data;
            });
        } catch (e: unknown) {
            runInAction(() => {
                if (e instanceof Error) {
                    this.error = e.message;
                } else {
                    this.error = String(e);
                }
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }


}

const Auth = new auth();
export default Auth;