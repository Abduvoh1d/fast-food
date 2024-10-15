import {observer} from "mobx-react-lite";
import {Button, Drawer, Form, FormProps, Space, Table, TableProps} from "antd";
import {ICategory} from "@src/interface/interface";
import {useQuery} from "@tanstack/react-query";
import CategoryStore from "@src/store/category";
import {HiOutlinePencil} from "react-icons/hi";
import {FaRegTrashCan} from "react-icons/fa6";
import {useState} from "react";
import {AutoForm, IForm} from "@src/components/auto-form";

function Category() {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onFinish: FormProps['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const { data: categories, isLoading, isSuccess } = useQuery({
        queryKey: ['Categories'],
        queryFn: async () => {
            const res = await CategoryStore.getCategories();
            console.log(res);
            return res;
        },
    });

    const columns: TableProps<ICategory>["columns"] = [
        {
            title: "ID",
            dataIndex: "id",
            key: "path",
            className: "font-medium text-[14px]",
        },
        {
            title: "Img",
            dataIndex: "path",
            key: "name",
            className: "font-medium text-[14px]",
            render: (_, item: ICategory) => (
                <img src={item.path} alt={item.name} className="w-[50px] h-[50px] object-cover"/>
            )
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "path",
            className: "font-medium text-[14px]",
        },
        {
            title: "Action",
            key: "action",
            render: () => (
                <div className="flex items-center gap-3">
                    <button className={'p-3 border-2 rounded-[50%] border-gray-400 text-gray-400'}><HiOutlinePencil /></button>
                    <button className={'p-3 border-2 rounded-[50%] border-red-400 text-red-400'}><FaRegTrashCan /></button>
                </div>
            ),
        },
    ];

    const formData: IForm[] = [
        {
            label: 'Category name',
            name: 'name',
            required: true,
            message: 'Enter Category Name!',
            span: 24,
        },
        {
            label: 'Picture',
            name: 'path',
            type: 'upload',
            fileList: 'picture-card',
            required: true,
            message: 'Upload category picture!',
            span: 24
        }
    ] as IForm[];

    return (
        <div>
            <div className={'flex justify-end mb-5'}>
                <Button type={'primary'} onClick={showDrawer}>+</Button>
            </div>
            <Table<ICategory>
                columns={columns}
                dataSource={
                    isSuccess && Array.isArray(categories) ? categories.map(item => ({ ...item, key: item.id })) : []
                }
                size="large"
                pagination={false}
                loading={isLoading}
                scroll={{ x: 1000, y: 500 }}
            />

            <Drawer title="Basic Drawer" onClose={onClose} open={open} width={500} extra={
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
}

export default observer(Category);