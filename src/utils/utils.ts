import { IConstructorCounter } from "./types";

export const padOrderNumber = (num: number) : string => {
    return String(num).padStart(6, '0');
}

export const calcConstructorCounter = (bun : string, items: string[]) : IConstructorCounter => {
    let counter : IConstructorCounter = {};
    if (bun) {
        counter[bun] = 2;
    }
    items.forEach(i => {
        if (counter[i] === undefined) {
            counter[i] = 1;
        } else {
            counter[i]++;
        }
    })
    return counter;
}
