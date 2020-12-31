import axios from 'axios';

export const getRecipes = params => {
    const urlParams = Object.keys(params)
        .reduce((carry, key) => {
            const separator = carry.length ? '&' : '?';
            carry += `${separator}${key}=${params[key]}`;
            return carry;
        }, '');

    return axios.get(`/recipes/recipes.php${urlParams}`, {
        param: {
            limit: 1000
        }
    })
}