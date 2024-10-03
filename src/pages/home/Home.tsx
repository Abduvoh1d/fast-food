import Footer from "@src/components/Footer";
import Header from "@src/components/Header";
import Category from "@src/store/category";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import Product from "@src/store/product";
import Loading from "@src/components/Loading";
import {Button, Col, Form, FormProps, Input, Modal, Row} from "antd";
import {priceFormatter} from "@src/utils/util";
import {HiMiniPlus} from "react-icons/hi2";
import {HiOutlineMinusSm} from "react-icons/hi";
import {ICategory, IGetProductByCategory, IOrderItemDTO} from "@src/interface/interface";
import BasketStore from "@src/store/basket";
import Basket from "@src/store/basket";
import basket from "@src/store/basket";
import {useNavigate} from "react-router-dom";
import Auth from "@src/store/auth";

type modalForm = {
    username: string;
    phoneNumber: number;
};

const Home = observer(() => {
    const [category, setCategory] = useState<ICategory | null>();
    const categories: ICategory[] = toJS(Category.category) || [];
    const navigate = useNavigate();
    const products: IGetProductByCategory[] = toJS(Product.productByCategory) || [];
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            await Product.getProducts(category?.id && category.id);
        };
        fetchData().then();
    }, [category?.id]);

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            await Category.getCategories();
            await BasketStore.getBaket()
        };
        fetchData().then();
    }, []);

    if (Product.isLoading || Category.isLoading || Basket.isLoading) {
        return <Loading/>;
    }

    if (Product.error || Category.error) {
        return <div className="text-red-500">Error: {Product.error || Category.error}</div>;
    }

    const showModal = (id: number): void => {
        Product.getOneProduct(id).then();
        setIsModalOpen(true);
    };

    const handleCancel = (): void => {
        setIsModalOpen(false);
        Product.oneProduct = null;
    };

    const showOrderModal = (): void => {
        setIsOrderModalOpen(true);
    };

    const cancelOrderModal = (): void => {
        setIsOrderModalOpen(false);
    };


    async function plus(productId: number): Promise<void> {
        await Basket.plus(productId)
    }

    async function minus(productId: number): Promise<void> {
        await Basket.minus(productId)
    }

    async function addOnBasket(id: number): Promise<void> {
        Auth.checkLogin(navigate)
        await Basket.addBasket(id)
        setIsModalOpen(false);
    }

    const onFinish: FormProps<modalForm>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    return (
        <div className="bg-[#F9F9F9] min-h-screen">
            <Header/>
            <div className="mx-5 mt-10 pb-2 flex gap-3" style={{overflowX: "auto", whiteSpace: "nowrap"}}>
                {categories.map((item: ICategory) => (
                    <div
                        key={item.id}
                        onClick={() => setCategory(item)}
                        className={`flex items-center justify-center px-8 py-3 gap-3 rounded-full cursor-pointer transition-all duration-300 ${
                            item.name === category?.name ? 'bg-[#FFAB08] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <img src={item.path} alt={item.name} width={'20px'}/>
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>

            <section className="max-w-[1200px] m-auto flex gap-3 my-[30px]">
                <Row gutter={16} className={'w-[100%]'}>
                    <Col sm={8} className="!px-3">
                        <div style={{fontFamily: "Roboto"}}
                             className="rounded-2xl max-h-[500px] w-[100%] overflow-y-auto px-3 py-5 shadow-lg">
                            <div className="flex justify-between items-center">
                                <p className="text-[24px] font-[600]">Корзина</p>
                                <p className="px-6 py-1 bg-[#F2F2F3] rounded-xl font-[400]">{basket.totalProducts}</p>
                            </div>
                            <hr className="my-3"/>
                            {basket.basket && basket.basket.length > 0 ? (
                                <div className="w-[100%]">
                                    {basket.basket.map((item: IOrderItemDTO) => (
                                        <div key={item.id}>
                                            <div className="p-4 rounded-2xl flex items-center justify-between">
                                                <div className="flex items-center w-[250px]">
                                                    <img src={item.imagePath} alt={item.productName}
                                                         className="w-[70px] h-[70px] bg-cover bg-center object-cover rounded-xl"/>
                                                    <div className="flex flex-col ml-3">
                                                        <p className="text-[16px] font-semibold">{item.productName}</p>
                                                        <p className="font-medium text-[13px] text-gray-400">{item.weight} г</p>
                                                        <p className="font-bold text-[16px]">{priceFormatter(item.price)} $</p>
                                                    </div>
                                                </div>
                                                <div
                                                    className="px-4 py-3 rounded-xl bg-[#F2F2F3] flex items-center justify-between gap-3">
                                                    <HiOutlineMinusSm onClick={() => minus(item.productId)}
                                                                      className="cursor-pointer"/>
                                                    {item.count}
                                                    <HiMiniPlus onClick={() => plus(item.productId)}
                                                                className="cursor-pointer"/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-between mt-5 px-5">
                                        <p className="text-[20px] font-medium">Итого</p>
                                        <p className="text-[20px] font-medium">{priceFormatter(basket.totalPrice)} $</p>
                                    </div>
                                    <div className="px-5 mt-[15px]">
                                        <Button onClick={() => showOrderModal()} type="primary"
                                                className="w-[100%] py-5 rounded-xl text-[16px]">Оформить заказ</Button>
                                    </div>
                                    <div className="flex items-center justify-start gap-3 px-5 mt-[10px]">
                                        <img src="/bikeIcon.svg" alt=""/>
                                        <p>Бесплатная доставка</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-gray-500">Корзина пуста</div>
                            )}
                        </div>
                    </Col>
                    <Col sm={16}>
                        <Row>
                            {category ? (
                                <Col span={24} style={{fontFamily: "Roboto"}} className={'text-3xl font-medium mb-5'}>
                                    {category.name}
                                </Col>
                            ) : (
                                <></>
                            )}
                            {products.map((item: IGetProductByCategory) => (
                                <Col sm={8} key={item.id}
                                     className={'px-[10px] pb-[20px] pt-[10px] bg-white rounded-xl shadow-lg'}>
                                    <img src={item.imageDTO.path} alt={item.name}
                                         className="w-[100%] h-[200px] bg-cover bg-center object-cover rounded-xl"/>
                                    <div className="flex flex-col mt-2">
                                        <p className="text-[24px] font-semibold">{priceFormatter(item.price)} $</p>
                                        <p className="font-semibold text-[15px] mb-5">{item.name}</p>
                                        <p className="text-[15px] font-semibold text-gray-500">{item.weight} г</p>
                                        <Button type={'primary'} className="mt-2 w-full text-white"
                                                onClick={() => showModal(item.id)}>
                                            Добавить
                                        </Button>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </section>
            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                width={'680px'}
                footer={null}
                className="custom-modal w-[680px] min-h-[432px] !pb-[20px]"
            >
                {Product.oneProduct && (
                    <div className="flex justify-between items-start gap-8 p-5">
                        {/* Left section: Product name, image, and button */}
                        <div className="w-[270px] h-[380px] flex flex-col items-center justify-between">
                            <p className="text-[22px] font-semibold mb-4">{Product.oneProduct.name}</p>
                            <img
                                src={Product.oneProduct.image.path}
                                alt={Product.oneProduct.name}
                                className="w-full h-[220px] object-cover rounded-lg"
                            />
                            <Button
                                onClick={() => addOnBasket(Product.oneProduct ? Product.oneProduct.id : 0)}
                                type="primary"
                                className="w-full h-[50px] mt-4 bg-[#FF7F27] hover:bg-[#FF7F27] text-white rounded-lg text-lg"
                            >
                                Добавить
                            </Button>
                        </div>

                        {/* Right section for description, ingredients, and price */}
                        <div className="w-[340px] flex flex-col justify-between">
                            <p className="font-medium text-[16px] mb-3">{Product.oneProduct.description}</p>
                            <p className="font-semibold text-[18px] mb-2">Состав:</p>
                            <ul className="list-none mb-6">
                                <li className="text-[16px] text-gray-700 mb-1">{Product.oneProduct.compound.protein}</li>
                                <li className="text-[16px] text-gray-700 mb-1">{Product.oneProduct.compound.fat}</li>
                                <li className="text-[16px] text-gray-700 mb-1">{Product.oneProduct.compound.weight}</li>
                            </ul>
                            <p className="font-semibold text-[24px]">{priceFormatter(Product.oneProduct.price)} $</p>
                        </div>
                    </div>
                )}
            </Modal>
            <Modal
                open={isOrderModalOpen}
                onCancel={cancelOrderModal}
                width={'700px'}
                height={'500px'}
                footer={null}
                modalRender={(modal) => (
                    <div style={{padding: 0}}>
                        {modal}
                    </div>
                )}
            >
                <Row className={'h-[500px]'}>
                    <Col span={12} className={'h-[100%] bg-[#FFAB08] flex justify-center items-center'}>
                        <img src="/zakazModal.svg" alt=""/>
                    </Col>
                    <Col span={12} className={'bg-[#F9F9F9] pt-[50px] px-[20px]'}>
                        <p className={'text-3xl font-sans'}>Доставка</p>
                        <Form
                            name="adress"
                            layout="horizontal"
                            initialValues={{remember: true}}
                            onFinish={onFinish}
                            className={'mt-[20px]'}
                        >
                            <Form.Item<modalForm> name={'username'}>
                                <Input type={'text'} placeholder={'Ваше имя'} className={'h-[40px] rounded-[12px]'}/>
                            </Form.Item>
                            <Form.Item<modalForm> name={'phoneNumber'}>
                                <Input type={'number'} placeholder={'Телефон'} className={'h-[40px] rounded-[12px]'}/>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>
            <Footer/>
        </div>
    );
});

export default Home;
