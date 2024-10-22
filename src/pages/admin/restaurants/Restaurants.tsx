import {Button, Drawer, Form, FormProps, Space, Table} from "antd";
import {HiOutlinePencil} from "react-icons/hi";
import {MdOutlineDone} from "react-icons/md";
import {IoCloseSharp} from "react-icons/io5";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import RestaurantStore from "@src/store/restaurant";
import {IRestorant} from "@src/interface/interface";
import {AxiosResponse} from "axios";
import {ColumnType} from "antd/es/table";
import Exel from "@src/components/exel";
import {AutoForm, IForm} from "@src/components/auto-form";
import {ErrorToast, SuccessToast} from "@src/components/toastify/Toastify";
import {useRouterPush} from "@hooks/use-router-push";
import {useLocationParams} from "@hooks/use-location-params";

function Restaurants() {
    const queryClient = useQueryClient();
    const [form] = Form.useForm();
    const {push} = useRouterPush();
    const {query} = useLocationParams();

    const showDrawer = () => {
        push({query: {...query, add: true as boolean}})
    };
    const onClose = () => {
        push({query: {...query, add: undefined, edite: undefined, resId: undefined}})
    };

    const onFinish: FormProps['onFinish'] = (values) => {
        if (query.resId) {
            updateRestaurant({id: Number(query.resId), data: {...values, id: Number(query.resId)}});
            console.log(values);
        } else {
            values.contactNumber = `+${values.contactNumber}`;
            addRestaurant({...values, deleted: false});
        }
        onClose()
    };

    const {data: Restaurants, isFetching, isSuccess} = useQuery({
        queryKey: ['Restaurants'],
        queryFn: (): Promise<AxiosResponse<IRestorant[]>> => RestaurantStore.getRestaurant(),
    });

    const {mutate: addRestaurant, isLoading} = useMutation({
        mutationFn: (data: IRestorant) => RestaurantStore.addRestaurant(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['Restaurants']).then();
            onClose();
            form.resetFields();
            SuccessToast('Add Restaurant');
        },
        onError: (error) => {
            console.error("Error adding restaurant:", error);
        },
    });

    const {mutate: deleteRestaurant} = useMutation({
        mutationFn: (id: number) => RestaurantStore.deleteRestaurant(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['Restaurants']).then();
            SuccessToast('Delete Restaurant');
        },
        onError: (error) => {
            console.error("Error deleting restaurant:", error);
        },
    });

    const {mutate: restoreRestaurant} = useMutation({
        mutationFn: (id: number) => RestaurantStore.restoreRestaurant(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['Restaurants']).then();
            SuccessToast('Restore Restaurant');
        },
        onError: (error) => {
            ErrorToast(error as string);
        }
    });

    const {mutate: getOneRestaurant} = useMutation({
        mutationKey: ['getOneRestaurant'],
        mutationFn: () => RestaurantStore.getOneRestaurant(Number(query.resId)),
        onSuccess: (data) => {
            form.setFieldsValue(data.data);
        },
        onError: (error) => {
            ErrorToast(error as string);
        },
    })

    const {mutate: updateRestaurant} = useMutation({
        mutationFn: (variables: {
            id: number;
            data: IRestorant
        }) => RestaurantStore.updateRestaurant(variables.id, variables.data),
    });

    function editeRestaurant(id: number) {
        push({query: {...query, edite: true as boolean, resId: id}})
        getOneRestaurant();
    }

    const columns: ColumnType<IRestorant>[] = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Contact",
            dataIndex: "contactNumber",
            key: "contactNumber",
        },
        {
            title: "Country",
            dataIndex: ["addressDTO", "country"],
            key: "country",
        },
        {
            title: "Street",
            dataIndex: ["addressDTO", "street"],
            key: "street",
        },
        {
            title: "City",
            dataIndex: ["addressDTO", "city"],
            key: "city",
        },
        {
            title: "Number",
            dataIndex: ["addressDTO", "number"],
            key: "city",
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
            render: (_: any, item: IRestorant) => (
                <div className="flex items-center gap-3">
                    <button className="p-3 border-2 border-gray-500 text-gray-500 rounded-full"
                            onClick={() => editeRestaurant(item.id)}>
                        <HiOutlinePencil/>
                    </button>

                    {item.deleted ? (
                        <button className="p-3 border-2 rounded-full border-green-500 text-green-500"
                                onClick={() => restoreRestaurant(item.id)}>
                            <MdOutlineDone className="size-[18px]"/>
                        </button>
                    ) : (
                        <button className="p-3 border-2 rounded-full border-red-500 text-red-500"
                                onClick={() => deleteRestaurant(item.id)}>
                            <IoCloseSharp className="size-[18px]"/>
                        </button>
                    )}
                </div>
            ),
        },
    ];

    const formData: IForm[] = [
        {
            label: 'Restaurant Name',
            name: 'name',
            required: true,
            message: 'Enter restaurant name!',
            xs: 24,
            md: 12,
        },
        {
            type: 'number',
            label: 'Contact Number',
            name: 'contactNumber',
            minLength: 12,
            maxLength: 12,
            required: true,
            message: 'Enter contact number!',
            xs: 24,
            md: 12,
            className: 'w-full',
        },
        {
            label: 'Country',
            name: ['addressDTO', 'country'],
            required: true,
            message: 'Enter country!',
            xs: 24,
            md: 12,
        },
        {
            label: 'Street',
            name: ['addressDTO', 'street'],
            required: true,
            message: 'Enter street!',
            xs: 24,
            md: 12,
        },
        {
            label: 'City',
            name: ['addressDTO', 'city'],
            required: true,
            message: 'Enter city!',
            xs: 24,
            md: 12,
        },
        {
            type: 'number',
            label: 'Number',
            name: ['addressDTO', 'number'],
            required: true,
            message: 'Enter number!',
            xs: 24,
            md: 12,
            className: 'w-full',
        }
    ];

    return (
        <div>
            <div className="flex justify-between items-center gap-3 mb-3">
                <p className={'text-2xl font-bold'}>Restaurants</p>
                <div className={'flex gap-3'}>
                    <Exel name="RestaurantsTable" className="p-3 border-2 border-gray-300 rounded-md"
                          iconClassName="text-gray-500"/>
                    <Button type="primary" className="py-5" onClick={showDrawer}>
                        +
                    </Button>
                </div>
            </div>

            <Table<IRestorant>
                id="RestaurantsTable"
                columns={columns}
                dataSource={isSuccess ? Restaurants.data.map((item) => ({...item, key: item.addressDTO.number})) : []}
                size="large"
                pagination={false}
                loading={isFetching}
                scroll={{x: 1200, y: 500}}
            />

            <Drawer
                title="Add Restaurant"
                onClose={onClose}
                open={Boolean(query.add) || Boolean(query.edite)}
                width={700}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" htmlType="submit" onClick={() => form.submit()} loading={isLoading}>
                            {query.resId ? "Update" : "Add"}
                        </Button>
                    </Space>
                }
            >
                <AutoForm props={formData} form={form} layout="vertical" onFinish={onFinish}/>
            </Drawer>
        </div>
    );
}

export default Restaurants;
