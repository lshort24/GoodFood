import React, { Component } from 'react';
import $ from 'jquery';
import SearchBar from '../search_bar/SearchBar';
import { Link } from 'react-router-dom';
import './RecipeList.css';
import { siteRoot, hostname, version } from '../env';

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
   constructor() {
      super();
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

         const detailUrl = `${siteRoot}detail/${recipe.id}`;
         const photoBaseUrl = 'http://shortsrecipes.com/photos/';

         // Photo
         const photoLink = recipe.photo
            ? <Link to={detailUrl} alt={recipe.title}>
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
               <Link className="recipe-list-item-title" to={detailUrl} alt={recipe.title}>{recipe.title}</Link>
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
      const url = `http://${hostname}${siteRoot}services/recipe_list.php?v=${version}${keywordsParam}`;
      $.get(url, (response) => {
         this.setState({
            tagList: response.tags,
            keywords: keywords,
            recipeList: response.recipe_list
         })
      }).fail(() => {
         alert('Could not fetch the recipe list');
      });
   };

   render() {
      return (
         <div className="recipe-list-page">
            <SearchBar
               availableTags={this.state.tagList}
               selectedTags={this.state.tagFilter}
               keywords={this.state.keywords}
               onUpdateTags={this.handleTagUpdate}
               onUpdateKeywords={this.handleKeywordUpdate}
            />
            <div>
               {this.formatRecipeList(this.state.recipeList)}
            </div>
            <div style={{textAlign: 'center'}}>
               <Link to={`${siteRoot}admin`}>Admin</Link>
            </div>
         </div>
      );
   }
}

export default RecipeList;