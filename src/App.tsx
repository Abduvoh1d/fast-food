import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "@pages/home/Home";
import Login from "@pages/login/Login";
import {ConfigProvider} from "antd";
import Register from "@pages/login/Register";

function App() {

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#FF7020",
                    },
                }}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes>
                </BrowserRouter>
            </ConfigProvider>
        </>
    )
}

export default App
