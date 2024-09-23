import { Button, Form, FormProps, Input } from "antd";
import {Link} from "react-router-dom";

export default function Register() {
    type FieldType = {
        userName: string;
        password: string;
        email: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
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
                className={'relative p-10 min-[300px]:w-[350px] sm:w-[450px] h-[500px] rounded-2xl bg-orange-300 bg-opacity-80'}
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
                    <Form.Item<FieldType>
                        label="Username"
                        name="userName"
                        rules={[{required: true, message: 'Please enter your username!'}]}
                    >
                        <Input className={'h-[40px]'}/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{required: true, message: 'Please enter your username!'}]}
                    >
                        <Input type={'email'} className={'h-[40px]'}/>
                    </Form.Item>

                    <Form.Item<FieldType>
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
                <p className={'text-center'}>You have account <Link to={'/login'} className={'text-white ml-1'}>Login</Link></p>
            </div>
        </div>
    );
}
