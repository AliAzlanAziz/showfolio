export enum SubscriptionReasonType {
    FULL_ACCESS_SUBSCRIPTION = 1,
}

export const isFullAccessSubscription = (type: SubscriptionReasonType): boolean => {
    return type == SubscriptionReasonType.FULL_ACCESS_SUBSCRIPTION
}