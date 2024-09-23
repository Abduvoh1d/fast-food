import axios from 'axios';

const api = axios.create({
    baseURL: 'http://51.20.10.41:8080/',
    timeout: 30000,
    withCredentials: true, // cookie'larni birga yuborish uchun
});

// Access tokenni olish va har bir so'rovga qo'shish uchun interseptor
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken'); // access tokenni localStorage'dan olish
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`; // access tokenni headerga qo'shish
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Javobda xato bo'lsa, tokenni yangilash uchun interseptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Agar xato 401 bo'lsa va bu yangilangan token so'rovi bo'lmasa:
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // refresh token yordamida yangi access token olish
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('http://51.20.10.41:8080/auth/refresh', {
                    token: refreshToken,
                });

                // Yangi access tokenni saqlash
                const newAccessToken = response.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);

                // Oldingi so'rovni yangi token bilan qayta yuborish
                api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (err) {
                // Agar refresh token ham ishlamasa, foydalanuvchini tizimdan chiqaring yoki boshqa amallarni bajaring
                console.log('Refresh token ishlamadi');
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
