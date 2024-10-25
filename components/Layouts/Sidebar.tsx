import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SendAsync } from '@/axios';
import { iFeature } from '@/pages/apps/stores/features/[featureId]';
import { useClient } from '@/utils/client';

const Sidebar = () => {
    const router = useRouter();
    const { clientInfo, features } = useClient();
    console.log(clientInfo, '------', features, '<--features of store');
    const [isMultiStor, setIsMultiStore] = useState(false);
    const [isThemeManger, setIsThemeManager] = useState(false);
    const [FeaturesData, setFeaturesData] = useState<iFeature[]>([]);
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [router.pathname]);

    useEffect(() => {
        if (features.find((feature) => feature.featureName === 'Multi Store')) {
            setIsMultiStore(true);
        }

        if (features.find((feature) => feature.featureName === 'Theme Config')) {
            setIsThemeManager(true);
        }
    }, [features]);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList.add('active');
    };

    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed top-0 bottom-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between px-4 py-3">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <img
                                className="ml-[5px] w-48 flex-none"
                                src="https://storagemedia.corporategear.com/betastoragemedia/1/themeconfiguration/0.9817981384316288/HeaderLogoUrl_2.png?4b044c0f-5487-4873-a5a0-97e832fbb3b7"
                                alt="logo"
                            />
                            {/* <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">{t('Redefine Admin')}</span> */}
                        </Link>

                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto h-5 w-5">
                                <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                        <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
                            <li className="menu nav-item">
                                <Link href={'/dashboard'} className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`}>
                                    <div className="flex items-center">
                                        <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                opacity="0.5"
                                                d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
                                    </div>
                                </Link>
                            </li>

                            {isMultiStor ? (
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'invoice' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('invoice')}>
                                        <div className="flex items-center">
                                            <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    opacity="0.5"
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V6.31673C14.3804 6.60867 15.75 7.83361 15.75 9.5C15.75 9.91421 15.4142 10.25 15 10.25C14.5858 10.25 14.25 9.91421 14.25 9.5C14.25 8.82154 13.6859 8.10339 12.75 7.84748V11.3167C14.3804 11.6087 15.75 12.8336 15.75 14.5C15.75 16.1664 14.3804 17.3913 12.75 17.6833V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.6833C9.61957 17.3913 8.25 16.1664 8.25 14.5C8.25 14.0858 8.58579 13.75 9 13.75C9.41421 13.75 9.75 14.0858 9.75 14.5C9.75 15.1785 10.3141 15.8966 11.25 16.1525V12.6833C9.61957 12.3913 8.25 11.1664 8.25 9.5C8.25 7.83361 9.61957 6.60867 11.25 6.31673V6C11.25 5.58579 11.5858 5.25 12 5.25ZM11.25 7.84748C10.3141 8.10339 9.75 8.82154 9.75 9.5C9.75 10.1785 10.3141 10.8966 11.25 11.1525V7.84748ZM14.25 14.5C14.25 13.8215 13.6859 13.1034 12.75 12.8475V16.1525C13.6859 15.8966 14.25 15.1785 14.25 14.5Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('All Stores')}</span>
                                        </div>

                                        <div className={currentMenu === 'invoice' ? '!rotate-90' : 'rtl:rotate-180'}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'invoice' ? 'auto' : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <li>
                                                <Link href="/apps/stores/list">{t('Stores')}</Link>
                                            </li>
                                           
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            ) : (
                                <li className="menu nav-item">
                                    <Link href={`/apps/stores/features/${clientInfo?._id}`} className={`${currentMenu === 'invoice' ? 'active' : ''} nav-link group w-full`}>
                                        <div className="flex items-center">
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Store')}</span>
                                        </div>
                                    </Link>
                                </li>
                            )}

                            {isThemeManger && !isMultiStor ? (
                                <li className="menu nav-item">
                                    <Link href={`/apps/stores/theme/${clientInfo?._id}`} className={`${currentMenu === 'invoice' ? 'active' : ''} nav-link group w-full`}>
                                        <div className="flex items-center">
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Theme Configurator')}</span>
                                        </div>
                                    </Link>
                                </li>
                            ) : (
                                <></>
                            )}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
