import {observer} from "mobx-react-lite";
import {Button, Drawer, FormProps, Space, Table} from "antd";
import {AutoForm, IForm} from "@src/components/auto-form";
import useForm from "antd/es/form/hooks/useForm";
import Exel from "@src/components/exel";
import Product from "@src/store/product";
import {IProduct} from "@src/interface/interface";
import {AxiosResponse} from "axios";
import {HiOutlinePencil} from "react-icons/hi";
import {MdOutlineDone} from "react-icons/md";
import {IoCloseSharp} from "react-icons/io5";
import {ColumnGroupType, ColumnType} from "antd/es/table";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ErrorToast, SuccessToast} from "@src/components/toastify/Toastify";
import {useRouterPush} from "@hooks/use-router-push";
import {useLocationParams} from "@hooks/use-location-params";

const Products = observer(function Products() {
    const {push} = useRouterPush();
    const {query} = useLocationParams();
    const queryClient = useQueryClient();
    const [form] = useForm();

    const showDrawer = () => {
        push({query: {...query, add: true as boolean}})
    };

    const onClose = () => {
        push({query: {...query, add: undefined, edite: undefined, productId: undefined}})
        form.resetFields();
    };

    const onFinish: FormProps['onFinish'] = (values) => {
        console.log('Success:', values);
        onClose()
    };

    const {data, isFetching} = useQuery({
        queryKey: ['Products'],
        queryFn: (): Promise<AxiosResponse<IProduct[]>> => Product.getAllProducts(),
    })

    const {mutate: deleteProductMutation, error} = useMutation({
        mutationKey: ['deleteProduct'],
        mutationFn: (id: number) => Product.deleteProduct(id),
        onSuccess: () => {
            SuccessToast('Product successfully deleted');
            queryClient.invalidateQueries(['Products']).then()
        },
        onError: () => {
            ErrorToast(error as string);
        }
    })

    const {mutate: restoreProductMutation} = useMutation({
        mutationKey: ['restoreProduct'],
        mutationFn: (id: number) => Product.restoreProduct(id),
        onSuccess: () => {
            SuccessToast('Product successfully restored');
            queryClient.invalidateQueries(['Products']).then()
        },
        onError: () => {
            ErrorToast('Something went wrong');
        }
    })

    function editeProduct(id: number) {
        push({query: {...query, edite: true as boolean, productId: id}})
    }

    const formData: IForm[] = [
        {
            label: 'Product Name',
            name: "name",
            required: true,
            message: "Enter product name",
            xs: 24,
            md: 12,
        },
        {
            type: "number",
            label: 'Product Price',
            name: "price",
            required: true,
            className: "w-[100%]",
            message: "Enter product price",
            xs: 24,
            md: 12,
        },
        {
            type: "number",
            label: 'Product Weight',
            name: ["compound", "weight"],
            required: true,
            className: "w-[100%]",
            message: "Enter product weight",
            xs: 24,
            md: 12,
        },
        {
            type: "number",
            label: 'Product Calories',
            name: ["compound", "calories"],
            required: true,
            className: "w-[100%]",
            message: "Enter product calories",
            xs: 24,
            md: 12,
        },
        {
            type: "number",
            label: 'Fat',
            name: ["compound", "fat"],
            required: true,
            className: "w-[100%]",
            message: "Enter product Fat",
            xs: 24,
            md: 12,
        },
        {
            type: "number",
            label: 'Protein',
            name: ["compound", "Protein"],
            required: true,
            className: "w-[100%]",
            message: "Enter product Protein",
            xs: 24,
            md: 12,
        },
        {
            type: "textarea",
            label: 'Description',
            name: "description",
            required: true,
            rows: 3,
            className: "w-[100%]",
            message: "Enter product description",
        },
        {
            type: "upload",
            label: "Product Image",
            name: "path",
            required: true,
        }
    ]

    const columns: (ColumnGroupType<IProduct> | ColumnType<IProduct>)[] = [
        {
            title: "Img",
            dataIndex: ["image", "path"],
            key: "name",
            className: "font-medium text-[14px]",
            render: (img: string) => (
                <img src={img} alt={img} className="w-[50px] h-[50px] object-cover"/>
            )
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Weight",
            dataIndex: ["compound", "weight"],
            key: "weight",
        },
        {
            title: "Calories",
            dataIndex: ["compound", "calories"],
            key: "calories",
        },
        {
            title: "Fat",
            dataIndex: ["compound", "fat"],
            key: "fat",
        },
        {
            title: "Protein",
            dataIndex: ["compound", "protein"],
            key: "protein",
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
            dataIndex: "action",
            render: (_: any, item: IProduct) => (
                <div className="flex items-center gap-3">
                    <button className="p-3 border-2 border-gray-500 text-gray-500 rounded-full" onClick={() => editeProduct(item.id)}>
                        <HiOutlinePencil/>
                    </button>

                    {item.deleted ? (
                        <button className="p-3 border-2 rounded-full border-green-500 text-green-500"
                                onClick={() => restoreProductMutation(item.id)}>
                            <MdOutlineDone className="size-[18px]"/>
                        </button>
                    ) : (
                        <button className="p-3 border-2 rounded-full border-red-500 text-red-500"
                                onClick={() => deleteProductMutation(item.id)}>
                            <IoCloseSharp className="size-[18px]"/>
                        </button>
                    )}
                </div>
            ),
        },
    ]
    return (
        <div>
            <div className={'flex justify-between items-center gap-3 mb-3'}>
                <p className={'text-2xl font-bold'}>Products</p>
                <div className={'flex gap-3'}>
                    <Exel name={'ProductTable'} className={'p-3 border-2 border-gray-300 rounded-md'}
                          iconClassName={'text-gray-500'}/>
                    <Button type={'primary'} className={'py-5'} onClick={showDrawer}>+</Button>
                </div>
            </div>
            <Table<IProduct>
                id={'ProductTable'}
                columns={columns}
                dataSource={data ? data.data.map((item) => ({...item, key: item.id})) : []}
                size="large"
                pagination={false}
                loading={isFetching}
                scroll={{x: 1500, y: 500}}
            />

            <Drawer title="Basic Drawer" onClose={onClose} open={Boolean(query.add) || Boolean(query.edite)} width={700} extra={
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" htmlType={'submit'} onClick={() => form.submit()}>
                        OK
                    </Button>
                </Space>
            }>
                <AutoForm props={formData} form={form} layout={'vertical'} onFinish={onFinish}/>
            </Drawer>
        </div>
    );
});

export default Products;
