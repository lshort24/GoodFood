import React from 'react';
import {Switch, Route} from 'react-router-dom';
import RecipeList from '../recipe_list/RecipeList';
import RecipeDetailRoute from '../recipe_detail/RecipeDetailRoute';
import {siteRoot} from '../env';
import RecipeCreate from "../components/RecipeCreate";

const Router = () => {
    return (
        <div role={"main"}>
            <Switch>
                <Route exact path='/' component={RecipeList}/>
                <Route exact path={siteRoot + 'index.html'} component={RecipeList}/>
                <Route path={siteRoot + 'detail/:number'} component={RecipeDetailRoute} />
                <Route path={siteRoot + 'edit'} component={RecipeCreate} />
                <Route path={siteRoot + 'new'} component={RecipeCreate} />
            </Switch>
        </div>
    )
};

export default Router