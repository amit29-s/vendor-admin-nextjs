import { SendAsync } from '@/axios';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { iFeature } from '../features/[featureId]';
import { Tab } from '@headlessui/react';

const MainThemeConfigurator = () => {
    const [themeData, setThemeData] = useState<iFeature | null>(null);

    const router = useRouter();

    let { featureId } = router.query;
    if (Array.isArray(featureId)) {
        featureId = featureId[0];
    }

    const fetchAllFeatures = async () => {
        const url = `/feature/getAllFeatures`;
        const Features = await SendAsync<any>({
            url,
            method: 'GET',
        });
        return Features;
    };

    useEffect(() => {
        fetchAllFeatures().then((res) => {
            console.log(res, '<---here is res');
            setThemeData(res.find((feature: iFeature) => feature.featureName == 'Theme Config'));
        });
    }, []);

    return (
        <div>
            <div className="space-y-8 pt-5">
                <div className="grid h-[85vh] grid-cols-1 gap-6 lg:grid-cols-1">
                    <div className="panel">
                        <div className="mb-5">
                            <Tab.Group>
                                <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                    {themeData?.subFeatures.map((item) => (
                                        <Tab as={Fragment}>
                                            {({ selected }) => (
                                                <button
                                                    className={`${
                                                        selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''
                                                    } -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
                                                >
                                                    {item?.name}
                                                </button>
                                            )}
                                        </Tab>
                                    ))}
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel>COMING SOON</Tab.Panel>
                                    <Tab.Panel>COMING SOON</Tab.Panel>
                                    <Tab.Panel>COMING SOON</Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainThemeConfigurator;
