import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import UsersTable from '@/components/UsersTable';
import Features from '@/components/Features';
import { SendAsync } from '@/axios';
import { useRouter } from 'next/router';
import ThemeConfig from '@/components/ThemeConfig';

export interface iFeature {
    _id: string;
    featureName: string;
    keywordsForSearch: string[];
    description: string;
    enabled: boolean;
    stage: string;
    version: number;
    subFeatures: iSubFeature[];
    route: string;
    owner: string[];
    showInList: boolean;
}

export interface iSubFeature {
    name: string;
    enabled: boolean;
    description: string;
    config: iConfig;
    _id: string;
}

export type iConfig = Record<string, string>;

const Tabs = () => {
    const router = useRouter();
    let { featureId } = router.query;
    if (Array.isArray(featureId)) {
        featureId = featureId[0];
    }
    console.log(featureId, '<--featureId');

    const [FeatureData, setFeatureData] = useState<iFeature[]>([]);
    const [deleteFlag, setDeleteFlag] = useState<boolean>(false);
    const [isTheme, setIsTheme] = useState<boolean>(false);
    const [isMultiStor, setIsMultiStore] = useState(false);

    const dispatch = useDispatch();

    const fetchAllFeatures = async () => {
        const url = `/feature/getAllFeatures`;
        const Features = await SendAsync<any>({
            url,
            method: 'GET',
        });
        return Features;
    };

    const updateManyFeatures = async (FeaturesData: iFeature[]) => {
        const url = `/feature/createManyFeature/${featureId}`;
        try {
            await SendAsync<any>({
                url,
                method: 'POST',
                data: FeaturesData,
            });
        } catch (error) {
            console.log(error, 'Error On Login Page');
        }
    };

    useEffect(() => {
        fetchAllFeatures().then((res) => {
            console.log(res, '<---here is res');
            setFeatureData(res);

            if (res.find((feature: any) => feature.featureName === 'Multi Store')) {
                setIsMultiStore(true);
            }
            if (res.find((feature: any) => feature.featureName === 'Theme Config')) {
                setIsTheme(true);
            }
        });
    }, []);

    useEffect(() => {
        dispatch(setPageTitle('Tabs'));
    }, []);

    const handleVendorSave = async () => {
        // const featureData = await fetchAllFeatures();
        const updatedFeaturedData = FeatureData.filter((feature: iFeature) => feature.enabled).map((feature: iFeature) => ({
            ...feature,
            subFeatures: feature.subFeatures.filter((subFeature) => subFeature.enabled),
        }));
        await updateManyFeatures(updatedFeaturedData);
    };

    return (
        <div>
            <div className="space-y-8 pt-5">
                <div className="grid h-[85vh] grid-cols-1 gap-6 lg:grid-cols-1">
                    {/* Simple Tabs */}
                    <div className="panel" id="simple">
                        {/* <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">Simple Tabs</h5>
                            <div className="flex gap-2">
                                <button type="button" className="btn btn-outline-primary">
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleVendorSave}>
                                    Save
                                </button>
                            </div>
                        </div> */}
                        <div className="mb-5">
                            <Tab.Group>
                                <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${
                                                    selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''
                                                } -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
                                            >
                                                Features
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${
                                                    selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''
                                                } -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
                                            >
                                                Members
                                            </button>
                                        )}
                                    </Tab>

                                    {(isTheme && isMultiStor) && (
                                        <Tab as={Fragment}>
                                            {({ selected }) => (
                                                <button
                                                    className={`${
                                                        selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''
                                                    } -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
                                                >
                                                    Theme Configurator
                                                </button>
                                            )}
                                        </Tab>
                                    )}
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel>
                                        <Features FeatureData={FeatureData} setDeleteFlag={setDeleteFlag} deleteFlag={deleteFlag} setFeatureData={setFeatureData} />
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <UsersTable />
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <ThemeConfig />
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
