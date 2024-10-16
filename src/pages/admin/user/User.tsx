import { Table, TableProps } from "antd";
import { HiOutlinePencil } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UserStore from "@src/store/users";
import { observer } from "mobx-react-lite";
import Exel from "@src/components/exel";
import { ErrorToast, SuccessToast } from "@src/components/toastify/Toastify";

export interface IUserTable {
    id: number;
    username: string;
    email: string;
    role: string;
    deleted: boolean;
}

function User() {
    const queryClient = useQueryClient();

    const { data, isFetching, isError, error, isSuccess } = useQuery({
        queryKey: ['Users'],
        queryFn: () => UserStore.getAllUsers(),
    });

    const { mutate: addAdminMutation } = useMutation(UserStore.addAdminRole, {
        onSuccess: () => {
            SuccessToast('User added to admin');
            queryClient.invalidateQueries(['Users']);
        },
        onError: () => {
            ErrorToast('Something went wrong');
        }
    });

    const { mutate: deleteUserMutation } = useMutation(UserStore.deleteUser, {
        onSuccess: () => {
            SuccessToast('User successfully deleted');
            queryClient.invalidateQueries(['Users']);
        },
        onError: () => {
            ErrorToast('Something went wrong');
        }
    });

    const { mutate: restoreUserMutation } = useMutation(UserStore.restoreUser, {
        onSuccess: () => {
            SuccessToast('User restored');
            queryClient.invalidateQueries(['Users']);
        },
        onError: () => {
            ErrorToast('Something went wrong');
        },
        useErrorBoundary: true,
    });

    if (isError) {
        ErrorToast(error as string);
    }

    const columns: TableProps<IUserTable>["columns"] = [
        {
            title: "Name",
            dataIndex: "username",
            key: "username",
            className: "font-medium text-[14px]",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            className: "font-medium text-[14px]",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            className: "font-medium text-[14px]",
        },
        {
            title: "Deleted",
            dataIndex: "deleted",
            key: "deleted",
            render: (deleted: boolean) => (
                <div
                    className={`border-2 py-1 flex items-center justify-center rounded-xl text-md w-[100px] font-medium ${
                        deleted
                            ? "border-red-500 text-red-500 bg-red-200"
                            : "border-green-500 text-green-500 bg-green-200"
                    }`}
                >
                    {deleted ? "Yes" : "No"}
                </div>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, item: IUserTable) => (
                <div className="flex items-center gap-3">
                    <button
                        className="p-3 border-2 border-gray-500 text-gray-500 rounded-full"
                        onClick={() => addAdminMutation(item.id)}
                    >
                        <HiOutlinePencil />
                    </button>

                    {item.deleted ? (
                        <button
                            className="p-3 border-2 rounded-full border-green-500 text-green-500"
                            onClick={() => restoreUserMutation(item.id)}
                        >
                            <MdOutlineDone className="size-[18px]" />
                        </button>
                    ) : (
                        <button
                            className="p-3 border-2 rounded-full border-red-500 text-red-500"
                            onClick={() => deleteUserMutation(item.id)}
                        >
                            <IoCloseSharp className="size-[18px]" />
                        </button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div>
            <Exel disable={isFetching} />
            <Table<IUserTable>
                id="UserTable"
                columns={columns}
                dataSource={isSuccess && data ? data.map((item) => ({ ...item, key: item.id })) : []}
                size="large"
                pagination={false}
                loading={isFetching}
                scroll={{ x: 1000, y: 500 }}
            />
        </div>
    );
}

export default observer(User);
