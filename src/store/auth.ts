import {ILogin, IRegister, IUser} from "@src/interface/interface";
import {makeAutoObservable, runInAction} from "mobx";
import api from "@api/api";

class auth {
    user: IUser | null = null;
    error: string | null = null;
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    loading(boolean: boolean): void {
        runInAction((): void => {
            this.isLoading = boolean
        })
    }

    async auth(url: string, data: ILogin | IRegister, navigate: any): Promise<void> {
        this.loading(true)
        try {
            const response = await api.post(url, data);
            console.log(response)

            runInAction(() => {
                this.user = response.data;
            });

            if (response.status === 200) {
                localStorage.setItem('accessToken', (response.data.tokens.accessToken));
                localStorage.setItem('refreshToken', (response.data.tokens.refreshToken));
                navigate('/')
            }
        } catch (e) {
            runInAction((): void => {
                this.error = `${e}`
            });
        } finally {
            this.loading(false)
        }
    }

    async login(data: ILogin, navigate: any): Promise<void> {
        this.auth('auth/login', data, navigate).then()
    }

    async register(data: IRegister, navigate: any): Promise<void> {
        this.auth('auth/signup', data, navigate).then()
    }

    checkLogin(navigate: any): void {
        runInAction((): void => {
            this.isLoading = true;
        })
        const token: string | null = localStorage.getItem('accessToken');

        if (!token) {
            navigate('/login')
        }
    }
}

const Auth = new auth();
export default Auth;