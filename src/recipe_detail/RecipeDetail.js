import React, { Component } from 'react';
import $ from 'jquery';
import { Chip } from 'material-ui';
import './RecipeDetail.css';
import { siteRoot, hostname, version } from '../env';

class RecipeDetail extends Component {
   constructor() {
      super();
      this.state = {
         title: '',
         tags: [],
         description: '',
         ingredients: '',
         directions: ''
      }
   }

   componentDidMount() {
      const id = this.props.match.params.number;

      $.get(`http://${hostname}${siteRoot}services/recipe_detail.php?v=${version}&id=` + id, (response) => {
         this.setState({
            title: response.title,
            tags: response.tags,
            description: response.description,
            ingredients: response.ingredients || '',
            directions: response.directions || ''
         })
      }).fail(() => {
         alert('Could not fetch the recipe list');
      })
   }

   render() {
      const chipStyles = {
         chip: {
            margin: 4,
         },
         wrapper: {
            display: 'flex',
            flexWrap: 'wrap',
         },
      };

      const tagChips = this.state.tags.length >= 0
         ? this.state.tags.map((tag) => {
               return (
                  <Chip style={chipStyles.chip} key={tag.replace(' ', '')} >
                     {tag}
                  </Chip>
               )
           })
         : null;

      const ingredients = this.state.ingredients.length > 0
         ? this.state.ingredients.split(/\r\n/).map((line, index) => {
               return <span key={index}>{line}<br /></span>
           })
         : null;

      const directions = this.state.directions.split(/\r\n/).map((line, index) => {
         return <p key={index}>{line}</p>
      });

      return (
         <div className="recipe-detail-page">
            <div className="recipe-detail">
               <div className="recipe-detail-title">
                  {this.state.title}
               </div>
               <div style={chipStyles.wrapper} className="recipe-detail-tags recipe-detail-section">
                  <div className="recipe-detail-label">Tags:</div> {tagChips}
               </div>
               <div className="recipe-detail-section">
                  <span className="recipe-detail-label">Description:</span> {this.state.description}
               </div>
               <div className="recipe-detail-section">
                  <div className="recipe-detail-label">Ingredients:</div>
                  <div>
                     {ingredients}
                  </div>
               </div>
               <div className="recipe-detail-section">
                  <div className="recipe-detail-label">Directions:</div>
                  <div>
                     {directions}
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default RecipeDetail;