import { SendAsync } from '@/axios';
import { iFeature } from '@/pages/apps/stores/features/[featureId]';
import { Tab } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';

const ThemeConfig = () => {
    const [FeatureData, setFeatureData] = useState<iFeature[]>([]);
    const [themeData, setThemeData] = useState<iFeature | null>(null);

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
            setFeatureData(res);

            setThemeData(res.find((feature: iFeature) => feature.featureName == 'Theme Config'));
        });
    }, []);
    return (
        <div className="space-y-8 pt-5">
            <div className="grid h-[85vh] grid-cols-1 gap-6 lg:grid-cols-1">
                {/* Simple Tabs */}
                <div className="panel" id="simple">
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

                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeConfig;
