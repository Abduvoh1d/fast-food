import {observer} from "mobx-react-lite";
import {Table, TableProps} from "antd";
import UserStore from "@src/store/users";
import {useEffect} from "react";
import {HiOutlinePencil} from "react-icons/hi";
import {IoCloseSharp} from "react-icons/io5";

export interface IUserTable {
    id: number;
    username: string;
    email: string;
    role: string;
    deleted: boolean;
}

function User() {
    useEffect((): void => {
        async function fetchData() {
            UserStore.getAllUsers().then()
        }

        fetchData().then()
    }, []);

    const columns: TableProps<IUserTable>["columns"] = [
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'username',
            className: "font-medium text-[14px]"
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            className: "font-medium text-[14px]"
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            className: "font-medium text-[14px]"
        },
        {
            title: 'Deleted',
            dataIndex: 'deleted',
            key: 'deleted',
            render: (deleted: boolean) => (deleted ? (
                <div
                    className={'border-2 border-red-500 py-1 flex items-center justify-center rounded-xl text-red-500 bg-red-200 text-md w-[100px] font-medium'}>Yes</div>
            ) : (
                <div
                    className={'border-2 border-green-500 py-1 flex items-center justify-center rounded-xl text-green-500 bg-green-200 text-md w-[100px] font-medium'}>No</div>
            )) // Show 'Yes' or 'No'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, item) => (
                <div className={'flex items-center justify-start gap-3'}>
                    <button className={'p-3 border-2 border-gray-500 text-gray-500 rounded-full'}
                            onClick={() => addAdminRole(item.id)}><HiOutlinePencil/>
                    </button>
                    {item.deleted ? (
                        <button className={'p-3 border-2 border-green-500 text-green-500 rounded-full'}><HiOutlinePencil
                            className={'size-[18px]'}/></button>
                    ) : (
                        <button className={'p-3 border-2 border-red-500 text-red-500 rounded-full'}><IoCloseSharp
                            className={'size-[18px]'}/></button>
                    )}
                </div>
            )
        },
    ];

    async function addAdminRole(id: number) {
        UserStore.addAdminRole(id).then()
        UserStore.getAllUsers().then()
    }

    return (
        <div>
            <Table<IUserTable>
                columns={columns}
                dataSource={UserStore.users?.map(item => ({
                    ...item,
                    key: item.id,
                }))}
                pagination={false}
                scroll={{x: '200px', y: '500px'}}
                loading={UserStore.isLoading}
            />
        </div>
    );
}

export default observer(User);

