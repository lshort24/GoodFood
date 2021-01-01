import axios from 'axios';

export const getRecipes = params => {
    return axios.get(`/recipes/recipes.php`, {
        params: {
            ...params,
            limit: 1000
        }
    })
}