import {FaRegUser} from "react-icons/fa";
import {Typography} from "antd";

function Header() {
    return (
        <div className={'w-[100%] h-[500px] object-contain'} style={{
            backgroundImage: "url('/ellipse.svg')",
            backgroundSize: "cover",
            backgroundPosition: "top center",
        }}>
            <div className={'flex justify-between items-center max-w-[1200px] m-auto py-5 px-5'}>
                <div>
                    <img src="/headerLogo.svg" alt="" className={'w-[100px] md:w-[100%]'}/>
                </div>

                <div className={'text-white cursor-pointer p-5'}>
                    <FaRegUser className={'w-[100%] text-xl'}/>
                </div>
            </div>

            <div className={'flex flex-col md:flex-row justify-center items-center md:gap-5'}>
                <div>
                    <img src="/burgerImg.svg" alt="" className={'w-[200px] md:w-[100%]'}/>
                </div>
                <div className={'lg:mt-10'}>
                    <Typography className={'flex flex-col justify-center items-center md:items-start'}>
                        <span className={'text-white font-bold  min-[300px]:text-3xl md:text-5xl'}>Только самые</span>
                        <span className={'text-[#FF5C00] font-bold min-[300px]:text-3xl md:text-5xl'}>сочные бургеры!</span>
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default Header;
