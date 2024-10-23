import {observer} from "mobx-react-lite";
import {Button, Drawer, Form, Space, Table, TableProps} from "antd";
import {ICategory} from "@src/interface/interface";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import CategoryStore from "@src/store/category";
import {HiOutlinePencil} from "react-icons/hi";
import {AutoForm, IForm} from "@src/components/auto-form";
import Exel from "@src/components/exel";
import {ErrorToast, SuccessToast} from "@src/components/toastify/Toastify";
import {MdOutlineDone} from "react-icons/md";
import {IoCloseSharp} from "react-icons/io5";
import {useRouterPush} from "@hooks/use-router-push";
import {useLocationParams} from "@hooks/use-location-params";
import {useCallback} from "react";

const Category = observer(() => {
    const {push} = useRouterPush()
    const {query} = useLocationParams()
    const queryClient = useQueryClient();
    const [form] = Form.useForm();
    // const [loading, setLoading] = useState(false);

    const showDrawer = () => {
        push({
            query: {
                ...query,
                add: true as boolean
            }
        })
    };

    const onClose = () => {
        push({
            query: {
                ...query,
                add: undefined,
                edite: undefined,
                categoryId: undefined
            }
        })
    };

    const onFinish = useCallback((values: Record<string, any>) => {
        console.log(values)
    //     // Yuklangan fayllar ro‘yxati va documentId larni olish
    //     console.log(values);
    //
    //     const imageId = get(values, "image[0].id", undefined);
    //
    //     const formData = {
    //         ...values,
    //         image: imageId, // Post qilayotganda faqat documentId larni yuborish
    //     };
    //
    //     update(values.name , values.description , formData);
    //
    }, []);


    const {data: categories, isFetching, isSuccess} = useQuery({
        queryKey: ['Categories'],
        queryFn: CategoryStore.getCategories
    });

    // const {mutate: updateCategoryMutation, error: updateError} = useMutation({
    //     mutationKey: ['deleteCategory'],
    //     mutationFn: (id: number , data) => CategoryStore.updateCategory(id , data),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(['Categories']).then();
    //         SuccessToast('Delete Category')
    //     },
    //     onError: () => {
    //         ErrorToast(updateError as string)
    //     }
    // })

    const {mutate: deleteCategoryMutation, error: deleteError} = useMutation({
        mutationFn: (id: number) => CategoryStore.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['Categories']).then();
            SuccessToast('Delete Category')
        },
        onError: () => {
            ErrorToast(deleteError as string)
        }
    })

    // const {mutate: update} = useMutation(
    //     ({name , description , data}: {name: string , description: string , data: any}) => {
    //         return api.post(`/admin/category/?name=${name}&description=${description}`, {data});
    //     },
    //     {
    //         onSuccess: () => {
    //             queryClient.invalidateQueries(["products"]);
    //             SuccessToast("All ok!");
    //         },
    //         onError: () => {
    //             ErrorToast("Error!");
    //         },
    //     }
    // );

    const {mutate: restoreCategoryMutation, error: restoreError} = useMutation({
        mutationFn: (id: number) => CategoryStore.restoreCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['Categories']).then();
            SuccessToast('Restore Category')
        },
        onError: () => {
            ErrorToast(restoreError as string)
        }
    })

    function editeCategory(id: number) {
        push({
            query: {
                ...query,
                categoryId: id,
                edite: true as boolean
            }
        })
    }

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
            render: (_: any, item: ICategory) => (
                <div className="flex items-center gap-3">
                    <button className="p-3 border-2 border-gray-500 text-gray-500 rounded-full"
                            onClick={() => editeCategory(item.id)}>
                        <HiOutlinePencil/>
                    </button>

                    {item.deleted ? (
                        <button className="p-3 border-2 rounded-full border-green-500 text-green-500" onClick={() => {
                            restoreCategoryMutation(item.id as number)
                        }}>
                            <MdOutlineDone className="size-[18px]"/>
                        </button>
                    ) : (
                        <button className="p-3 border-2 rounded-full border-red-500 text-red-500" onClick={() => {
                            deleteCategoryMutation(item.id)
                        }}>
                            <IoCloseSharp className="size-[18px]"/>
                        </button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className={'flex justify-between items-center gap-3 mb-3'}>
                <p className={'text-2xl font-bold'}>Categories</p>
                <div className={'flex gap-3'}>
                    <Exel name={'CategoryTable'} className={'p-3 border-2 border-gray-300 rounded-md'}
                          iconClassName={'text-gray-500'}/>
                    <Button type={'primary'} className={'py-5'} onClick={showDrawer}>+</Button>
                </div>
            </div>
            <Table<ICategory>
                id={'CategoryTable'}
                columns={columns}
                dataSource={
                    isSuccess && Array.isArray(categories) ? categories.map(item => ({...item, key: item.id})) : []
                }
                size="large"
                pagination={false}
                loading={isFetching}
                scroll={{x: 1000, y: 500}}
            />

            <Drawer title="Basic Drawer" onClose={onClose} open={Boolean(query.add) || Boolean(query.edite)} width={600}
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="primary" htmlType={'submit'} onClick={() => form.submit()}>
                                {query.categoryId ? 'Update' : 'Add'}
                            </Button>
                        </Space>
                    }>
                <AutoForm props={[
                    {
                        name: 'name',
                        label: 'Category Name',
                        type: 'input',
                        required: true,
                        placeholder: 'Enter category name',
                    },
                    {
                        name: 'description',
                        label: 'Description',
                        type: 'textarea',
                        rows: 4,
                        placeholder: 'Enter description',
                    },
                    {
                        name: 'upload',
                        label: 'Upload Image',
                        type: 'upload',
                        required: true,
                    },
                ] as IForm[]} form={form} layout={'vertical'} onFinish={onFinish}/>
            </Drawer>
        </div>
    );
})

export default Category;