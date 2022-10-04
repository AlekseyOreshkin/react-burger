import React, { createRef } from "react";
import { TIngredientType } from "../utils/types";

export type TCategoryContext = {
    [ref in TIngredientType]: React.RefObject<HTMLParagraphElement>;
};

export const initialCategoryContext : TCategoryContext = 
{
    bun: createRef<HTMLParagraphElement>(),
    main: createRef<HTMLParagraphElement>(),
    sauce: createRef<HTMLParagraphElement>()
};

export const CategoryContext = React.createContext<TCategoryContext>(initialCategoryContext);