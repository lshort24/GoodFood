import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../search_bar/SearchBar';
import './RecipeList.css';
import { apiHostname, version } from '../env';

/**
 * @typedef    {Object} recipe
 * @property   {string} photo
 *
 * @typedef    {Object} response
 * @property   {Array}  tags
 * @property   {Array}  recipe_list
 *
 */
class RecipeList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         tagFilter: [],
         keywords: '',
         tagList: [],
         recipeList : []
      }
   }

   componentDidMount() {
      document.title = 'Good Food';
      this.getRecipeList('');
   }


   formatRecipeList(recipeList) {
      const filterByTags = this.state.tagFilter.length > 0;

      return recipeList.map((recipe) => {
         if (filterByTags) {
            if (!recipe.tags) {
               return null;
            }

            let match = false;
            this.state.tagFilter.forEach((filterTag) => {
               recipe.tags.forEach((recipeTag) => {
                  if (filterTag === recipeTag) {
                     match = true;
                     return false;
                  }
               });

               if (match) {
                  return false;
               }
            });

            if (!match) {
               return null;
            }
         }

         const detailLinkUrl = `/detail/${recipe.id}`;
         //const detailUrl = `${websiteProtocol}://${websiteHostname}/detail/${recipe.id}`;
         const photoBaseUrl = '/photos/';

         // Photo
         const photoLink = recipe.photo
            ? <Link to={detailLinkUrl}>
               <img src={photoBaseUrl + recipe.photo} className="recipe-list-item-photo" alt={recipe.title}/>
              </Link>
            : <span>&nbsp;</span>;
         const photo = <div className="recipe-list-item-photo">{photoLink}</div>;

         // Tags
         const recipeTagList = (filterByTags && recipe.tags.length > 0)
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

   handleTagUpdate = (tags) => {
      this.setState({
         tagFilter: tags
      });
   };

   handleKeywordUpdate = (keywords) => {
      this.getRecipeList(keywords);
   };

   getRecipeList = (keywords)  => {
      const keywordsParam = keywords ? `&keywords=${keywords}` : '';
      const url = `https://${apiHostname}/services/recipe_list.php?v=${version}${keywordsParam}`;

      fetch(url).then(response => {
         return response.json();
      }).then(data => {
         this.setState({
            tagList: data.tags,
            keywords: keywords,
            recipeList: data.recipe_list
         })
      }).catch(error => {
         console.log("Error", error);
         alert('Could not fetch the recipe list');
      });
   };

   render() {
      return (
         <div className="recipe-list-page">
            <SearchBar onUpdateKeywords={this.handleKeywordUpdate} />
            <div style={{marginTop: 4}}>
               {this.formatRecipeList(this.state.recipeList)}
            </div>
         </div>
      );
   }
}

export default RecipeList;