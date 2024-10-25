import { SendAsync } from "@/axios";

export const fetchAllFeatures = async () => {
    try {     
        const url = `/feature/getAllFeatures`;
        const Features = await SendAsync<any>({
            url,
            method: 'GET',
        });
        return Features;
    } catch (error) {
        throw new Error("Error Occured while Fetching Features")
    }
};