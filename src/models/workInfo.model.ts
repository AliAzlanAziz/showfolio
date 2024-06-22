import { WorkInfoType } from "../enums/workInfoType.enum";

export class WorkInfoModel {
    _id: string;
    user: string;
    type: WorkInfoType;
    title: string;
    place_name: string;
    from: string;
    to: string;
    summary: string;
    address: {
        city: string
        country: string
        details: string
    };
    pdf_uploaded: boolean
}