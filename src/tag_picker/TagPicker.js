import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {AutoComplete} from "material-ui";

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
            <AutoComplete
               ref='autocomplete'
               dataSource={this.props.availableTags}
               filter={AutoComplete.caseInsensitiveFilter}
               floatingLabelText="Filter by tag"
               onNewRequest={this.handleAddTag}
               onUpdateInput={this.handleInput}
               searchText={this.state.searchText}
               style={this.props.style}
            />
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