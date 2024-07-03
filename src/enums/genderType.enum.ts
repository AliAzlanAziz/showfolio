export enum GenderType {
    MALE = 'M',
    FEMALE = 'F',
    PREFER_NOT_SAY = 'N'
}

export const isMale = (type: GenderType): boolean => {
    return type === GenderType.MALE
}

export const isFemale = (type: GenderType): boolean => {
    return type === GenderType.FEMALE
}