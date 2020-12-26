import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

// Style
import { withStyles } from '@material-ui/styles';
import './RecipeList.css';

// Components
import SearchBar from '../search_bar/SearchBar';

const styles = {
   root: {
      display: 'flex',
      justifyContent: 'space-between',
   },
   recipeList: {
      marginTop: 16,
   },
   emptyResults: {
      backgroundColor: '#ffffff',
      padding: 40,
      textAlign: 'center',
   }
};

const RecipeList = ({
    classes,
    recipes,
}) => {
   const formatRecipeList = (recipes) => {
      if (recipes.length === 0) {
         return (
             <div className={classes.emptyResults}>
                Sorry, there are no recipes that match your search keywords.
             </div>
         )
      }
      return recipes.map((recipe) => {
         const detailLinkUrl = `/detail/${recipe.id}`;
         const photoBaseUrl = '/photos/';

         // Photo
         const photoLink = recipe.photo
            ? <Link to={detailLinkUrl}>
               <img src={photoBaseUrl + recipe.photo} className="recipe-list-item-photo" alt={recipe.title}/>
              </Link>
            : <span>&nbsp;</span>;
         const photo = <div className="recipe-list-item-photo">{photoLink}</div>;

         // Tags
         const recipeTagList = (recipe.tags.length > 0)
            ? <span><strong>Tags:</strong> { recipe.tags.join(', ') }</span>
            : null;

         const summary = <div className="recipe-list-item-summary">
            <div>
               <Link className="recipe-list-item-title" to={detailLinkUrl}>{recipe.title}</Link>
            </div>
            <div>
               {recipe.description}
            </div>
            <div>
               {recipeTagList}
            </div>
         </div>;

         return (
            <div key={recipe.id} className="recipe-list-item">
               {photo}
               {summary}
            </div>
         )
      });
   }

   return (
      <div className="recipe-list-page">
         <SearchBar />
         <div className={classes.recipeList}>
            {formatRecipeList(recipes)}
         </div>
      </div>
   );
}

RecipeList.propTypes = {
   classes: PropTypes.object,
   recipes: PropTypes.arrayOf(PropTypes.object),
}

RecipeList.defaultProps = {
   recipes: [],
}
const mapStateToProps = state => ({
   recipes: state.recipes.recipes,
})

export default connect(mapStateToProps)(
    withStyles(styles)(
        RecipeList
    )
);