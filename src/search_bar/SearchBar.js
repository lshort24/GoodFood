import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import SearchBox from '../search_box/SearchBox';
import AddButton from '../components/AddButton';

import { withStyles } from '@material-ui/styles';

const styles = {
   root: {
      display: 'flex',
      justifyContent: 'space-between',
   }
};

const SearchBar = ({
    classes,
    isSignedIn,
 }) => {

   return (
       <div className={classes.root}>
          <SearchBox />
          {isSignedIn && <AddButton />}
       </div>
   )
};

SearchBar.propTypes = {
   classes: PropTypes.object,
   isSignedIn: PropTypes.bool
};

const mapStateToProps = state => ({
   isSignedIn: state.auth.isSignedIn,
});

export default connect(mapStateToProps)(withStyles(styles) (SearchBar));