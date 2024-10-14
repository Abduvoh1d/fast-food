import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "@pages/home/Home";
import Login from "@pages/login/Login";
import {ConfigProvider} from "antd";
import Register from "@pages/login/Register";
import User from "@pages/admin/user/User";
import Layout from "@pages/admin/Layout";
import Products from "@pages/admin/products/Products";
import Category from "@pages/admin/category/Category";
import {observer} from "mobx-react-lite";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient();
    const role = localStorage.getItem('role');
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#FF7020",
                },
            }}
        >
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}/>

                        {!role && (
                            <>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                            </>
                        )}

                        {role === 'ADMIN' ? (
                            <Route path={'/admin'} element={<Layout/>}>
                                <Route path={'users'} element={<User/>}/>
                                <Route path={'products'} element={<Products/>}/>
                                <Route path={'category'} element={<Category/>}/>
                            </Route>
                        ) : (
                            <Route path={'*'} element={<Navigate to={'/login'}/>}/>
                        )}
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </ConfigProvider>
    );
}

export default observer(App);