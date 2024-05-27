export interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    tel: number;
    email: string;
}

export interface CategoryDTO {
    id: number;
    title: string;
}

export interface VehicleDTO {
    id: number;
    brand: string;
    model: string;
    chassisNumber: string;
    odometer: number;
    basePrice: number;
    kmCost: number;
    imgUrl:string;
    status:string;
    categories: CategoryDTO[];
    uploader: null | UserDTO;
}