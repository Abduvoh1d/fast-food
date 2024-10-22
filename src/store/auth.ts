import {ILogin, IRegister, IRegisterDTO} from "@src/interface/interface";
import {makeAutoObservable, runInAction} from "mobx";
import api from "@api/api";
import {AxiosResponse} from "axios";
import {ErrorToast, SuccessToast} from "@src/components/toastify/Toastify";

class auth {
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
        this.loading(true);
        try {
            const response: AxiosResponse<IRegisterDTO> = await api.post(url, data);

            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.tokens.accessToken);
                localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
                localStorage.setItem('role', response.data.role);

                const role = localStorage.getItem('role');

                if (role === 'ADMIN') {
                    navigate('/admin/users');
                    window.location.reload()
                } else if (role === 'USER') {
                    navigate('/');
                }

                SuccessToast("Xush kelibsiz")
            }
        } catch (e) {
            runInAction((): void => {
                this.error = `${e}`;
                ErrorToast("Xatolik yuz berdi")
            });
        } finally {
            this.loading(false);
        }
    }

    async login(data: ILogin, navigate: any): Promise<void> {
        await this.auth('auth/login', data, navigate)
    }

    async register(data: IRegister, navigate: any): Promise<void> {
        await this.auth('auth/signup', data, navigate)
    }

    logOut(): void {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
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