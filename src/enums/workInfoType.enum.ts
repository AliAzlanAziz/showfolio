export enum WorkInfoType {
    EDUCATION = 1,
    EXPERIENCE = 2,
    CERTIFICATE = 3
}

export const isEducation = (type: WorkInfoType): boolean => {
    return type === WorkInfoType.EDUCATION
}

export const isExperience = (type: WorkInfoType): boolean => {
    return type === WorkInfoType.EXPERIENCE
}

export const isCertificate = (type: WorkInfoType): boolean => {
    return type === WorkInfoType.CERTIFICATE
}