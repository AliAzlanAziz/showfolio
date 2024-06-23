import { JobModeType } from "../enums/jobModeType.enum";
import { WorkInfoType } from "../enums/workInfoType.enum";

export class WorkInfoModel {
    id: string;
    user: string;
    type: WorkInfoType;
    jobMode: JobModeType;
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
    imageUrl: string;
    uploadingImage: boolean;
    base64Image: string;
}