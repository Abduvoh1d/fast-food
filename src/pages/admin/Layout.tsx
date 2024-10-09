import { ReactNode, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { PiHandWithdraw } from "react-icons/pi";
import { IoFileTrayFull } from "react-icons/io5";
import { Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Sider } = Layout;

interface AdminLayout {
    id: number;
    title: string;
    icon: ReactNode;
    link: string;
}

function MyLayout() {
    const [collapsed, setCollapsed] = useState(false);
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
            icon: <PiHandWithdraw />,
            link: '/admin/products'
        },
        {
            id: 3,
            title: "Category",
            icon: <IoFileTrayFull />,
            link: '/admin/category'
        }
    ];

    const menuItems = data.map(item => ({
        key: item.link,
        icon: item.icon,
        label: <Link to={item.link}>{item.title}</Link>
    }));

    return (
        <Layout className="min-h-[100vh]">
            <Sider theme={'light'} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="flex items-center justify-center my-5">
                    <p className={'text-4xl font-bold'}>{!collapsed ? 'Admin' : ''}</p>
                </div>

                <Menu
                    theme="light"
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
                        Hello, John
                    </div>
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzCW8ayM9K_iNzX81NSjgpGcl30jDvsTSiIg&s"
                            alt="" className="w-full h-full object-cover" />
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
