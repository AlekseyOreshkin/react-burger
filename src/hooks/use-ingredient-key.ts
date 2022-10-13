import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IState {
    [position: number]: {
        [id: string]: string;
    }
}
const initialState: IState = {};
export const useIngredientKey = () => {
    const [state, setState] = useState(initialState);
    const handleUuid = (position: number, id: string): string => {
        let uuid = state[position]?.[id];
        if (uuid) {
            return uuid;
        }
        uuid = uuidv4();
        state[position] = { [id]: uuid };
        setState({ ...state });
        return uuid;
    };
    return { state, handleUuid, setState };
}