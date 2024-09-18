import {Col, Row, Typography} from "antd";
import {FaPhoneAlt} from "react-icons/fa";
import {LiaTelegram} from "react-icons/lia";

function Footer() {
    return (
        <div className={'py-20'}>
            <Row gutter={[0, 50]} className={'w-[100%] h-auto px-5 py-14 md:px-10 justify-center'} justify="start">
                <Col xs={24} sm={24} md={24} lg={12} xl={12} className={'flex flex-col justify-between items-center md:items-start h-[100%]'}>
                    <div>
                        <img src="/logo.svg" alt="logo" className={'w-[150px] sm:w-[200px] md:w-[300px]'} />
                    </div>
                    <div className={'text-center md:text-start mt-5'}>
                        <p className={'text-sm'}>© YouMeal, 2022</p>
                        <p className={'text-sm'}>Design: Anastasia Ilina</p>
                    </div>
                </Col>

                <Col xs={24} sm={24} md={12} lg={6} xl={6} className={'text-center md:text-start mt-5'}>
                    <Typography className={'text-2xl font-medium'}>Номер для заказа</Typography>
                    <Typography className={'flex justify-center md:justify-start items-center gap-3 mt-5'}>
                        <FaPhoneAlt />
                        +7(930)833-38-11
                    </Typography>
                </Col>

                <Col xs={24} sm={24} md={12} lg={6} xl={6} className={'text-center md:text-start mt-5'}>
                    <Typography className={'text-2xl font-medium'}>Мы в соцсетях</Typography>
                    <div className={'flex justify-center md:justify-start gap-3 mt-5'}>
                        <div className={'p-3 bg-[#FF7020] rounded-full text-white'}>
                            <LiaTelegram className={'w-[20px] h-[20px]'} />
                        </div>
                        <div className={'p-3 bg-[#FF7020] rounded-full text-white'}>
                            <LiaTelegram className={'w-[20px] h-[20px]'} />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Footer;
