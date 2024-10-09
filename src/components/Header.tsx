import {FaRegUser} from "react-icons/fa";
import {Button, Dropdown, MenuProps, Space, Typography} from "antd";
import {Link} from "react-router-dom";
import Auth from "@src/store/auth";
import {MdOutlineTranslate} from "react-icons/md";
import {useTranslation} from "react-i18next";
import i18n from "../i18n/i18n"
import {useCallback} from "react";
import {useRouterPush} from "@hooks/use-router-push";
import {useLocationParams} from "@hooks/use-location-params";

function Header() {
    const {push} = useRouterPush();
    const {query} = useLocationParams();
    const role = localStorage.getItem('role');
    const {t} = useTranslation();
    const lang: string = (query.lang as string) || "en";

    const items: MenuProps['items'] = [
        {
            // label: <Link to={'/profile'}>Profile</Link>,
            label: <Link to={'/profile'}>{t('hello')}</Link>,
            key: '0',
        },
        {
            label: <Link to={'/login'} onClick={Auth.logOut}>Log out</Link>,
            key: '1',
        }
    ];

    const changeLang = useCallback((lang: string) => {
        i18n.changeLanguage(lang).then();
        push({
            query: {
                ...query,
                lang
            },
        });
    }, [push, query])

    const translateDropDownItems: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div className="flex gap-2 " onClick={() => changeLang('uz')}>
                    <img
                        src="https://cdn.commeta.uz/static/review/static/front/svg/flag/uz.svg"
                        alt=""
                        className="w-[25px] rounded-md bg-cover object-contain"
                    />
                    <Typography.Paragraph className="!mb-0">Uz</Typography.Paragraph>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className="flex gap-2" onClick={() => changeLang('ru')}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/1200px-Flag_of_Russia.svg.png"
                        alt=""
                        className="w-[25px] rounded-md bg-cover object-contain"
                    />
                    <Typography.Paragraph className="!mb-0">Ru</Typography.Paragraph>
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div className="flex gap-2" onClick={() => changeLang('en')}>
                    <img
                        src="https://cdn.commeta.uz/static/review/static/front/svg/flag/en.svg"
                        alt=""
                        className="w-[25px] rounded-md bg-cover object-contain"
                    />
                    <Typography.Paragraph className="!mb-0">En</Typography.Paragraph>
                </div>
            ),
        },
    ];


    return (
        <header>
            <div className={'w-[100%] h-[500px] object-contain'} style={{
                backgroundImage: "url('/ellipse.svg')",
                backgroundSize: "cover",
                backgroundPosition: "top center",
            }}>
                <div className={'flex justify-between items-center max-w-[1200px] m-auto py-5 px-5'}>
                    <div>
                        <img src="/headerLogo.svg" alt="" className={'w-[100px] md:w-[100%]'}/>
                    </div>

                    <div className={'text-white cursor-pointer p-5 flex items-center justify-start gap-3'}>
                        {role ? (
                            <Dropdown
                                className={' text-xl cursor-pointer'}
                                menu={{items}} trigger={['click']}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <FaRegUser/>
                                    </Space>
                                </a>
                            </Dropdown>
                        ) : (
                            <Link to={'/login'}
                                  className={'py-2 px-5 bg-white hover:!bg-opacity-50  hover:scale-105 hover:!text-black hover:!bg-white !bg-opacity-25 border-none h-[40px] rounded-lg'}>
                                Login
                            </Link>
                        )}

                        <Dropdown
                            menu={{items: translateDropDownItems}}
                            placement="bottomLeft"
                            trigger={["click"]}
                            className={'text-white'}
                        >
                            <Button
                                size="large"
                                className="bg-white hover:!bg-opacity-50  hover:scale-105 hover:!text-black hover:!bg-white !bg-opacity-25 border-none h-[40px] flex items-center justify-center"
                            >
                                <MdOutlineTranslate className={'size-5'}/><p className={'text-xl'}>{lang}</p>
                            </Button>
                        </Dropdown>
                    </div>
                </div>

                <div className={'flex flex-col md:flex-row justify-center items-center md:gap-5'}>
                    <div>
                        <img src="/burgerImg.svg" alt="" className={'w-[200px] md:w-[100%]'}/>
                    </div>
                    <div className={'lg:mt-10'}>
                        <Typography className={'flex flex-col justify-center items-center md:items-start'}>
                            <span className={'text-white font-bold  min-[300px]:text-3xl md:text-5xl'} style={{ userSelect: 'none' }}>
                               {t("Only the")}
                            </span>
                            <span className={'text-[#FF5C00] font-bold min-[300px]:text-3xl md:text-5xl'} style={{ userSelect: 'none' }}>
                                {t("juiciest burgers!")}
                            </span>
                        </Typography>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
