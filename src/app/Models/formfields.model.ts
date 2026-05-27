export interface CustomerData {
    id: number | string,
    name: string;
    email: string;
    address: {
        city: string;
        state: string;
        pincode: number | string;
    }
    status: string;
}