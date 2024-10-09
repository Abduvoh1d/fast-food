import {Button, Form, FormProps, Input} from "antd";
import {Link, useNavigate} from "react-router-dom";
import Auth from "@src/store/auth";
import {ILogin} from "@src/interface/interface";
import {observer} from "mobx-react-lite";

function Login() {
    const navigate = useNavigate();

    const onFinish: FormProps<ILogin>['onFinish'] = async (values:ILogin) => {
        console.log('Success:', values);
        await Auth.login(values, navigate);
    };

    return (
        <div
            style={{
                backgroundImage: 'url("https://png.pngtree.com/thumb_back/fh260/background/20231008/pngtree-assorted-fast-food-varieties-displayed-on-a-textured-gray-table-image_13609478.png")',
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
                className={'relative p-10 min-[300px]:w-[350px] sm:w-[450px] h-[400px] rounded-2xl backdrop-blur-sm'}
            >
                {/* Background Blur */}
                <div
                    className="absolute inset-0 bg-orange-300 bg-opacity-50 backdrop-blur-sm rounded-2xl"
                    style={{
                        zIndex: -10,
                    }}
                />
                <p className={'text-4xl text-center font-medium mb-5 z-10'}>Login</p>
                <Form
                    name="basic"
                    layout="vertical"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<ILogin>
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please enter your username!'}]}
                    >
                        <Input className={'h-[40px]'}/>
                    </Form.Item>

                    <Form.Item<ILogin>
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
                <p className={'text-center'}>You do not have account <Link to={'/register'}
                                                                           className={'text-white ml-1'}>Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default observer(Login);