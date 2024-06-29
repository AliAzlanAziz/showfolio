export enum SubscriptionType {
    MONTHLY = 1,
    YEARLY = 2,
    NONE = 3
}

export const isMonthly = (type: SubscriptionType): boolean => {
    return type == SubscriptionType.MONTHLY
}

export const isYearly = (type: SubscriptionType): boolean => {
    return type == SubscriptionType.YEARLY
}

export const isNone = (type: SubscriptionType): boolean => {
    return type == SubscriptionType.NONE
}

export const isSubscribed = (type: SubscriptionType): boolean => {
    return isMonthly(type) || isYearly(type);
}