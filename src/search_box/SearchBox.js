import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";

const styles = {
   clearIcon: {
      position: 'absolute',
      bottom: '7px'
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

const SearchBox = (props) => {
   const [value, setValue] = React.useState('');

   const handleChange = (event) => {
      const value = event.target.value;
      setValue(value);
   };

   const handleKeyPress = (ev) => {
      if (ev.key === 'Enter') {
         ev.preventDefault();
         props.onChange(value);
      }
   };

   /*
   const handleClear = () => {
      setValue('');
      props.onChange('');
   };
*/
   //const clearIcon = this.state.showClearIcon && <Clear style={styles.clearIcon} onClick={this.handleClear} />;
   return (
      <div style={styles.control}>
         <div style={styles.searchControlWrapper}>
            <TextField
                aria-label="Search"
                placeholder="Search"
                variant="outlined"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                value={value}
                InputProps={{
                   startAdornment: (
                       <InputAdornment position="start">
                          <Search />
                       </InputAdornment>
                   ),
                }}
            />
            {/*clearIcon*/}
         </div>
      </div>
   )
}

SearchBox.propTypes = {
   value: PropTypes.string,
   onChange: PropTypes.func,
   style: PropTypes.object
};

export default withStyles(styles) (SearchBox);