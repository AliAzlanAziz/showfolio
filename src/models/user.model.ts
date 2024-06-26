export class UserModel {
    id: string;
    name: string;
    email: string;
    username: string;
    position: string;
    phone: string;
    uploadingImage: boolean;
    base64Image: string;
    desc: string;
    fb: string;
    ig: string;
    yt: string;
    gh: string;
    tw: string;
    li: string;
    web: string;
    address: {
        city: string;
        country: string;
        details: string;
    };
    languages: [
        {
            name: string;
            skillLevel: string;
        }
    ];
    toWork: boolean;
    toHire: boolean;
    public: boolean;
    paidDate: Date;
    subsType: number;
    code: string;
}