export const padOrderNumber = (num: number) : string => {
    return String(num).padStart(6, '0');
}