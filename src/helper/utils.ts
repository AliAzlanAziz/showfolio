export const getCurrentUTCTime = (): Date => {
    return new Date(new Date().toUTCString())
}