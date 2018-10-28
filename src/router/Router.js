import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipeList from '../recipe_list/RecipeList';
import RecipeDetail from '../recipe_detail/RecipeDetail';
import Admin from '../admin/Admin';

import { siteRoot } from '../env';

const Router = () => {
   return (
      <main>
         <Switch>
            <Route exact path='/' component={RecipeList}/>
            <Route exact path={siteRoot + 'index.html'} component={RecipeList}/>
            <Route path={siteRoot + 'detail/:number'} component={RecipeDetail}/>
            <Route path={siteRoot + 'admin'} component={Admin} />
         </Switch>
      </main>
   )
};

export default Router