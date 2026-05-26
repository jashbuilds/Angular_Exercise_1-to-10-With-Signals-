export interface CustomerData {
    name: string;
    email: string;
    address: {
        city: string;
        state: string;
        pincode: number | string;
    }
}