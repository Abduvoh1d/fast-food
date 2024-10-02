import {ILogin, IUser} from "@src/interface/interface";
import {makeAutoObservable, runInAction} from "mobx";
import api from "@api/api";
import {message} from "antd";

class auth {
    user: IUser | null = null;
    error: string | null = null;
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async login(data: ILogin, navigate: any) {
        runInAction(() => {
            this.isLoading = true;
        });

        try {
            const response = await api.post('auth/login', data);

            runInAction(() => {
                this.error = null;
                this.user = response.data;
            });

            if (response.status === 200) {
                localStorage.setItem('accessToken', (response.data.tokens.accessToken));
                localStorage.setItem('refreshToken', (response.data.tokens.refreshToken));
                message.success('Login successfully');
                navigate('/')
            }
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

    checkLogin(navigate: any): void{
        runInAction(() => {
            this.isLoading = true;
        })
        const token = localStorage.getItem('accessToken');

        if (!token) {
            navigate('/login')
        }
    }
}

const Auth = new auth();
export default Auth;