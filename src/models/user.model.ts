export class UserModel {
    id: string;
    name: string;
    email: string;
    username: string;
    currentPosition: string;
    phone: string;
    uploadingImage: boolean;
    base64Image: string;
    summary: string;
    socials: [
        {
            platform: string;
            link: string
        }
    ];
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
    ]
}