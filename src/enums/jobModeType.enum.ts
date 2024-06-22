export enum JobModeType {
    ONSITE = 1,
    REMOTE = 2,
    HYBRID = 3
}

export const isRemote = (type: JobModeType): boolean => {
    return type === JobModeType.REMOTE
}

export const isOnsite = (type: JobModeType): boolean => {
    return type === JobModeType.ONSITE
}

export const isHybrid = (type: JobModeType): boolean => {
    return type === JobModeType.HYBRID
}