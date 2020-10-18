import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from "@material-ui/core";
//import {Autocomplete} from "@material-ui/lab";

class TagPicker extends Component {
   constructor(props) {
      super(props);
      this.state = {
         searchText: ''
      }
   }

   handleAddTag = (tag) => {
      this.setState({
         searchText: ''
      });
      this.refs['autocomplete'].focus();
      this.props.onAddTag(tag);
   };

   handleInput = (searchText) => {
      this.setState({
         searchText: searchText
      })
   };

   render() {
      return (
         <div>
            Tag Picker
            {/*
            <Autocomplete
               //ref='autocomplete'
               floatingLabelText="Filter by tag"
               onNewRequest={this.handleAddTag}
               onUpdateInput={this.handleInput}
               searchText={this.state.searchText}
               style={this.props.style}
               options={this.props.availableTags}
               renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}/>
               */}
         </div>
      );
   }
}

TagPicker.propTypes = {
   availableTags: PropTypes.array,
   onAddTag: PropTypes.func,
   style: PropTypes.object
};

export default TagPicker;