
export const isValidIngredientsData = ingredientsData => ingredientsData?.length > 0;

export const validBunId = id => typeof(id) === 'string' && id.length > 0;

export const isValidConstructorData = constructorData => validBunId(constructorData?.bun); /*&& constructorData?.ingredients?.length > 0*/ ;

export const isBun = ingredient => ingredient?.type === 'bun';


  