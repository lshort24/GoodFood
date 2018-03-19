import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, RaisedButton } from "material-ui";
import FontIcon from 'material-ui/FontIcon';
import muiThemeable from "material-ui/styles/muiThemeable";

class SearchBox extends Component {
   constructor(props) {
      super(props);
      this.state = {
         value: this.props.value
      }
   }

   handleChange = (e, value) => {
      this.setState({
         value: value
      })
   };

   handleSearchClick = () => {
      this.props.onChange(this.state.value);
   };

   handleClear = () => {
      this.setState({
         value: ''
      });
      this.props.onChange('');
   };

   render() {
      const styles = {
         control: {
            display: 'inline-block',
         },
         clearIcon: {
            position: 'absolute',
            bottom: '7px',
            right: 0,
            color: this.props.muiTheme.textField.hintColor
         },
         searchInputStyle: {
            paddingRight: '24px'
         },
         searchControlWrapper: {
            position: 'relative',
            display: 'inline-block',
            marginRight: '10px'
         },
      };

      return <div style={styles.control}>
         <div style={styles.searchControlWrapper}>
            <TextField
               floatingLabelText="Keywords"
               inputStyle={styles.inputStyle}
               onChange={this.handleChange}
               value={this.state.value}
            />
            <FontIcon
               className="material-icons"
               onClick={this.handleClear}
               style={styles.clearIcon}
            >
               clear
            </FontIcon>
         </div>
         <RaisedButton onClick={this.handleSearchClick}>
            Search
         </RaisedButton>
      </div>
   }
}

SearchBox.propTypes = {
   value: PropTypes.string,
   onChange: PropTypes.func,
   style: PropTypes.object
};

export default muiThemeable() (SearchBox);