import { SendAsync } from '@/axios';

export interface iClient {
    _id: string;
    image: string;
    storeName: string;
    base_url: string;
    status: string;
}

export const fetchOrganizationByNameOrBaseUrl = async () => {
    const url = 'http://localhost:8080/ecommerce/v1/organization/getOrganizationByNameOrBaseUrl';
    const body = {
        orgName: 'ParsonsKellogg',
        base_url: 'http://localhost:3009/ecommerce/v1',
    };
    try {
        const res: any = await SendAsync<iClient>({
            url,
            method: 'POST',
            data: body,
        });
        return res;
    } catch (error) {
        console.log(error, 'Error On Login Page');
        throw new Error('Error Occured While Fetching Client');
    }
};
