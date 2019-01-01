import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from "material-ui";
import { Clear } from "material-ui-icons";
import muiThemeable from "material-ui/styles/muiThemeable";

class SearchBox extends Component {
   constructor(props) {
      super(props);
      this.state = {
         value: this.props.value,
         showClearIcon: false
      }
   }

   handleChange = (e, value) => {
      this.setState({
         value: value,
         showClearIcon: value.length > 0
      })
   };

   handleKeyPress = (ev) => {
      if (ev.key === 'Enter') {
         ev.preventDefault();
         this.props.onChange(this.state.value);
      }
   };

   handleClear = () => {
      this.setState({
         value: ''
      });
      this.props.onChange('');
   };

   render() {
      const styles = {
         clearIcon: {
            position: 'absolute',
            bottom: '7px',
            color: this.props.muiTheme.textField.hintColor
         },
         searchInputStyle: {
            paddingRight: '24px'
         },
         searchControlWrapper: {
            position: 'relative',
            display: 'inline-block',
            marginRight: '24px'
         },
      };

      const clearIcon = this.state.showClearIcon && <Clear style={styles.clearIcon} onClick={this.handleClear} />;
      return <div style={styles.control}>
         <div style={styles.searchControlWrapper}>
            <TextField
               floatingLabelText="Search by keywords"
               inputStyle={styles.inputStyle}
               onChange={this.handleChange}
               onKeyPress={this.handleKeyPress}
               value={this.state.value}
            />
            {clearIcon}
         </div>
      </div>
   }
}

SearchBox.propTypes = {
   value: PropTypes.string,
   onChange: PropTypes.func,
   style: PropTypes.object
};

export default muiThemeable() (SearchBox);