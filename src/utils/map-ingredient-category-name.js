

export const mapIngredientCategoryName = (category, single = false) => {
    switch(category)
    {
        case 'bun':
            return single ? 'Булка' : 'Булки';
        case 'main':
            return single ? 'Начинка' : 'Начинки';
        case 'sauce':
            return single ? 'Соус' : 'Соусы';
        default:
            return 'Другое';
    };
};

export const mapIngredientCategoryId = (category) => {
    return `${category}_id`
};

