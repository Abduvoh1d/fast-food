import {Button, Form, FormProps, Input} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {IRegister} from "@src/interface/interface";
import {observer} from "mobx-react-lite";
import Auth from "@src/store/auth";

function Register() {
    const navigate = useNavigate();

    const onFinish: FormProps<IRegister>['onFinish'] = async (values: IRegister): Promise<void> => {
        console.log(values)
        Auth.register(values, navigate).then();
    };

    return (
        <div
            style={{
                backgroundImage: 'url("https://t3.ftcdn.net/jpg/05/89/70/46/360_F_589704609_b84XoVDaeopctL2Iz0lG4IQT86Dzm7xz.jpg")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "100%",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <div
                className={'relative p-10 min-[300px]:w-[350px] sm:w-[450px] h-[500px] rounded-2xl backdrop-blur-sm'}
            >
                {/* Background Blur */}
                <div
                    className="absolute inset-0 bg-orange-300 bg-opacity-50 backdrop-blur-sm rounded-2xl"
                    style={{
                        zIndex: -1,
                    }}
                />
                <p className={'text-4xl text-center font-medium mb-5 z-10'}>Sign up</p>
                <Form
                    name="basic"
                    layout="vertical"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<IRegister>
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please enter your username!'}]}
                    >
                        <Input className={'h-[40px]'}/>
                    </Form.Item>

                    <Form.Item<IRegister>
                        label="Email"
                        name="email"
                        rules={[{required: true, message: 'Please enter your username!'}]}
                    >
                        <Input type={'email'} className={'h-[40px]'}/>
                    </Form.Item>

                    <Form.Item<IRegister>
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please enter your password!'}]}
                    >
                        <Input.Password className={'h-[40px]'}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className={'w-[100%] h-[40px] text-[16px]'}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <p className={'text-center'}>You have account <Link to={'/login'}
                                                                    className={'text-white ml-1'}>Login</Link></p>
            </div>
        </div>
    );
}

export default observer(Register);