import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { useEffect, useLayoutEffect, useState } from 'react';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useRouter } from 'next/router';
import BlankLayout from '@/components/Layouts/BlankLayout';
import axios from 'axios';
import { SendAsync } from '@/axios';
import { useClient } from '@/utils/client';

const LoginBoxed = () => {

    const { features } = useClient();
    const [blockVendor,setBlockVendor] = useState(false);
    const [values, setValues] = useState<any>({ email: '', password: '' });
    const router = useRouter();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login Boxed'));
    });

    useLayoutEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            router.push('/dashboard');
        }
    }, []);

    useEffect(() => {
        dispatch(setPageTitle('Login Boxed'));
    }, []);

    const handleChange = (event: any) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        if (features.find((feature) => feature.featureName === 'Block Vendor')) {
            setBlockVendor(true);
        }
    }, [features]);

    const submitForm = async (event: any) => {
        event?.preventDefault();
        console.log(blockVendor,'vendor block')
        // if(blockVendor) {
        //     router.push('/pages/error401')
        // } else {
            if (values.email && values.password) {
                const url = '/user/signin';
                try {
                    const res: any = await SendAsync<any>({
                        url,
                        method: 'POST',
                        data: values,
                    });
                    if (res) {
                        localStorage.setItem('user', JSON.stringify(res?.token));
                        router.push('/dashboard');
                    }
                } catch (error) {
                    console.log(error, 'Error On Login Page');
                    alert('Please Enter Valid Email and Password');
                    setValues({ email: '', password: '' });
                }
            } else {
                alert('Please Enter Valid Email and Password');
            }
        // }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[url('/assets/images/map.svg')] bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel m-6 w-full max-w-lg sm:w-[480px]">
                {/* <h2 className="mb-3 text-2xl font-bold">Sign In</h2>
                <p className="mb-7">Enter your email and password to login</p> */}

                <Link href="/" className="main-logo flex shrink-0 items-center">
                    <img
                        className="mx-auto my-4 w-[260px] items-center "
                        src="https://storagemedia.corporategear.com/betastoragemedia/1/themeconfiguration/0.9817981384316288/HeaderLogoUrl_2.png?4b044c0f-5487-4873-a5a0-97e832fbb3b7"
                        alt="logo"
                    />
                    {/* <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">{t('Redefine Admin')}</span> */}
                </Link>
                <form className="space-y-12 rounded-md" onSubmit={submitForm}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" value={values.email} onChange={handleChange} type="email" className="form-input" placeholder="Enter Email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input name="password" value={values.password} onChange={handleChange} id="password" type="password" className="form-input" placeholder="Enter Password" />
                    </div>
                    <div>
                        <label className="cursor-pointer">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="text-white-dark">Remember Me</span>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        SIGN IN
                    </button>
                </form>
            </div>
        </div>
    );
};
LoginBoxed.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default LoginBoxed;
