
export function isValidIngredientsData(ingredientsData) {
    return ingredientsData?.length > 0;
};
export function isValidConstructorData(constructorData) {
    return constructorData?.bun?.length > 0 /*&& constructorData?.ingredients?.length > 0*/ ;
};
  