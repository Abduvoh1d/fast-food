import { ReactNode, useState } from "react";
import {Link, Outlet, useLocation} from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import {PiBasketDuotone} from "react-icons/pi";
import {Layout, Menu} from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {MdLogout} from "react-icons/md";
import Auth from "@src/store/auth";
import {BiCategory} from "react-icons/bi";
import {IoRestaurantOutline} from "react-icons/io5";

const { Sider } = Layout;

interface AdminLayout {
    id: number;
    title: string;
    icon: ReactNode;
    link: string;
}

function MyLayout() {
    const [collapsed, setCollapsed] = useState(true);
    const location = useLocation();

    const data: AdminLayout[] = [
        {
            id: 1,
            title: "Users",
            icon: <FaUsers />,
            link: '/admin/users'
        },
        {
            id: 2,
            title: "Products",
            icon: <PiBasketDuotone />,
            link: '/admin/products'
        },
        {
            id: 3,
            title: "Category",
            icon: <BiCategory />,
            link: '/admin/category'
        },
        {
            id: 4,
            title: "Restaurants",
            icon: <IoRestaurantOutline />,
            link: '/admin/restaurants'
        }
    ];

    const menuItems = data.map(item => ({
        key: item.link,
        icon: item.icon,
        label: <Link to={item.link}>{item.title}</Link>
    }))

    function logOut() {
        Auth.logOut();
        window.location.reload();
    }

    return (
        <Layout className="min-h-[100vh]">
            <Sider theme={'dark'} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="flex items-center justify-center my-5">
                    <p className={'text-4xl font-bold text-white'}>{!collapsed ? 'Admin' : ''}</p>
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    items={menuItems}
                    selectedKeys={[location.pathname]}
                    className={'font-medium text-md'}
                />
            </Sider>

            <Layout>
                <div className="bg-white h-[80px] px-5 flex justify-between items-center shadow">
                    <div className="flex items-center gap-2 text-3xl font-bold">
                        {collapsed ? (
                            <MenuUnfoldOutlined className="text-xl cursor-pointer" onClick={() => setCollapsed(false)} />
                        ) : (
                            <MenuFoldOutlined className="text-xl cursor-pointer" onClick={() => setCollapsed(true)} />
                        )}
                    </div>
                    <div>
                        <button className={'border-2 py-2 px-5 rounded text-md flex items-center gap-3 font-medium hover:border-black hover:transition-[1s]'} onClick={() => logOut()}>Log out <MdLogout /></button>
                    </div>
                </div>

                <div className="p-5">
                    <Outlet />
                </div>
            </Layout>
        </Layout>
    );
}

export default MyLayout;
