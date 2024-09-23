import Footer from "@src/components/Footer";
import Header from "@src/components/Header";
import Category from "@src/store/category";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import Product from "@src/store/product";
import Loading from "@src/components/Loading";
import {Button, Col, Modal, Row} from "antd";
import {priceFormatter} from "@src/utils/util";
import {ICategory, IProduct} from "@src/interface/interface";

const Home = observer(() => {
    const products: IProduct[] | null= toJS(Product.product);
    const categories: ICategory[] | null = toJS(Category.category);
    const [category, setCategory] = useState<ICategory | null>(categories ? categories[0] : null );
    const [basketPrice, setBasketPrice] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    // const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        const fetchCategories = async () => {
            await Category.getCategories();
        };

        const fetchProducts = async () => {
            await Product.getProducts();
        };

        fetchCategories();
        fetchProducts();
    }, []);

    useEffect(() => {
        const totalPrice = products ? products.reduce((total, item) => total + item.price, 0) : 0;
        setBasketPrice(totalPrice);
    }, [products]);

    if (toJS(Product.isLoading) || toJS(Category.isLoading)) {
        return <Loading/>;
    }

    const showModal = (product: any) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-[#F9F9F9]">
            <Header/>
            <div
                className="mx-5 mt-10 pb-2 flex gap-3"
                style={{
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                }}
            >
                {categories?.map((item: ICategory, index: number) => (
                    <div
                        key={index}
                        onClick={() => setCategory(item)}
                        className={`${item.name === category?.name ? 'bg-[#FFAB08] text-white' : 'bg-white'} flex items-center justify-center px-8 py-3 gap-3`}
                        style={{
                            borderRadius: '14px',
                            cursor: 'pointer',
                        }}
                    >
                        <img src={item.path} alt="" width={'20px'}/>
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>

            <section className="max-w-[1200px] m-auto flex gap-3 my-[30px]">
                <Row gutter={16}>
                    <Col sm={8} className={'!px-3'}>
                        <div className={'bg-white rounded-2xl max-h-[500px] overflow-y-auto px-3 py-5'}>
                            <div className={'flex justify-between items-center'}>
                                <p className={'text-[24px] font-[600]'}>Корзина</p>
                                <p className={'px-6 py-1 bg-[#F2F2F3] rounded-xl font-[400]'}>{products ? products.length : 0}</p>
                            </div>
                            <hr className={'my-3'}/>
                            {products ? (
                                <>
                                    {products.map((item) => (
                                        <div key={item.id}
                                             className={'p-4 bg-white rounded-2xl flex items-center justify-between'}>
                                            <div className={'flex items-center justify-start'}>
                                                <img
                                                    src={item.name}
                                                    alt=""
                                                    className={'w-[65px] h-[55px] bg-cover bg-center object-cover rounded-xl'}
                                                />
                                                <div className={'flex flex-col ml-3'}>
                                                    <p className={'text-[18px]'}>{item.name}</p>
                                                    <p className={'font-medium text-[13px] text-gray-400'}>{item.compound.weight} г</p>
                                                    <p className={'font-medium text-[13px]'}>{priceFormatter(item.price)} €</p>
                                                </div>
                                            </div>
                                            <button
                                                className={'bg-[#F2F2F3] mt-2 py-3 rounded-2xl text-[16px] px-5 font-[400] hover:bg-gray-300'}
                                            >
                                                0
                                            </button>
                                        </div>
                                    ))}
                                    <div className={'flex items-center justify-between mt-5 px-5'}>
                                        <p className={'text-[20px] font-medium'}>Итого</p>
                                        <p className={'text-[18px] font-normal'}>{priceFormatter(basketPrice)} €</p>
                                    </div>

                                    <div className={'px-5 mt-[15px]'}>
                                        <Button type={'primary'} className={'w-[100%] py-5 rounded-xl text-[16px]'}>Оформить
                                            заказ</Button>
                                    </div>

                                    <div className={'flex items-center justify-start gap-3 px-5 mt-[10px]'}>
                                        <img src="/bikeIcon.svg" alt=""/>
                                        <p>Бесплатная доставка</p>
                                    </div>
                                </>
                            ) : (
                                <div>No Data</div>
                            )}
                        </div>
                    </Col>

                    <Col sm={16}>
                        <Row gutter={16}>
                            <Col sm={24} className={'text-4xl font-medium mb-5'}>{category?.name}</Col>
                            {products ? (
                                products.map((item) => (
                                    <Col sm={8} key={item.id} className={'px-[20px] pb-[20px]'}>
                                        <div className={'p-2 bg-white rounded-2xl'}>
                                            <img
                                                src={item.image.path}
                                                alt=""
                                                className={'w-[270px] h-[220px] bg-cover bg-center object-cover rounded-2xl'}
                                            />
                                            <p className={'text-[24px] mt-1 font-medium'}>{priceFormatter(item.price)} €</p>
                                            <p className={'text-[16px]'}>{item.name}</p>
                                            <p className={'mt-7 font-medium text-lg text-gray-400'}>{item.compound.weight} г</p>
                                            <button type={'button'} onClick={() => showModal(item)}
                                                    className={'w-[100%] bg-[#F2F2F3] mt-2 py-3 rounded-2xl text-[16px] font-[400] hover:bg-gray-300'}
                                            >
                                                Добавить
                                            </button>
                                        </div>
                                    </Col>
                                ))
                            ) : (
                                <div>No Data</div>
                            )}
                        </Row>
                    </Col>
                </Row>
            </section>

            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                width={'680px'}
                footer={null}  // Removes default Ok and Cancel buttons
            >
                {selectedProduct && (
                    <div className={'flex items-center justify-start gap-5'}>
                        {/* Left section for the title, image, and button */}
                        <div className={'w-[270px] flex flex-col justify-between'}>
                            <p className={'text-[32px] font-medium'}>{selectedProduct.name}</p>
                            <img
                                src={selectedProduct.image.path}
                                alt={selectedProduct.name}
                                className={'w-[100%] h-[220px] object-cover rounded-[16px] mt-3 mb-5'}
                            />
                            <Button
                                type={"primary"}
                                className={'w-full h-[48px] text-[18px] bg-[#FF7F27] hover:bg-[#FF7F27] border-none rounded-[12px]'}
                            >
                                Добавить
                            </Button>
                        </div>

                        {/* Right section for description, compound, and controls */}
                        {/*<div className={'w-[340px] flex flex-col justify-between h-[100%]'}>*/}
                        {/*    /!* Product description *!/*/}
                        {/*    <p className={'font-[500] text-[16px] mb-2'}>{selectedProduct.description}</p>*/}
                        {/*    <p className={'font-[500] text-[18px] mb-1'}>Состав:</p>*/}
                        {/*    {selectedProduct.compound((item, index) => (*/}
                        {/*        <p key={index} className={'font-[400] text-[16px] leading-[24px]'}>{item}</p>*/}
                        {/*    ))}*/}

                        {/*    /!* Weight and price section *!/*/}
                        {/*    <p className={'text-gray-400 mt-3'}>{selectedProduct.weight} г,*/}
                        {/*        ккал {selectedProduct.calories}</p>*/}

                        {/*    /!* Counter and price *!/*/}
                        {/*    <div className={'flex justify-between items-center mt-4'}>*/}
                        {/*        <div className={'flex items-center gap-3 bg-[#F2F2F3] px-4 py-2 rounded-[12px]'}>*/}
                        {/*            <CgMathMinus*/}
                        {/*                className={'cursor-pointer'}*/}
                        {/*                onClick={() => counter > 0 && setCounter(counter - 1)}*/}
                        {/*            />*/}
                        {/*            {counter}*/}
                        {/*            <CgMathPlus*/}
                        {/*                className={'cursor-pointer'}*/}
                        {/*                onClick={() => setCounter(counter + 1)}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*        <p className={'font-bold text-[24px]'}>{selectedProduct.price} ₽</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                )}
            </Modal>


            <Footer/>
        </div>
    );
});

export default Home;
