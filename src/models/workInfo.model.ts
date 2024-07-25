import { JobModeType } from "../enums/jobModeType.enum";
import { WorkInfoType } from "../enums/workInfoType.enum";

export class WorkInfoModel {
    id: string;
    user: string;
    type: WorkInfoType;
    jobMode: JobModeType;
    title: string;
    name: string;
    from: string;
    to: string;
    desc: string;
    address: {
        city: string
        country: string
        details: string
    };
    imageURL: string;
    uploadingImage: boolean;
    base64Image: string;
}