import { IConstructorCounter, IConstructorItem } from "./types";

export const padOrderNumber = (num: number): string => {
    return String(num).padStart(6, '0');
}

export const calcConstructorCounter = (bun: string, items: IConstructorItem[]): IConstructorCounter => {
    let counter: IConstructorCounter = {};
    if (bun) {
        counter[bun] = 2;
    }
    items.forEach(i => {
        const id = i.id;
        if (counter[id] === undefined) {
            counter[id] = 1;
        } else {
            counter[id]++;
        }
    })
    return counter;
}
