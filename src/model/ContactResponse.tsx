import IResponse from "./IResponse";

export interface ContactResponse extends IResponse {
    id: number;
    name: string;
    photo: string;
    phone: string;
}