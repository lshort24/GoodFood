import React, { Component } from 'react';
import { AppBar } from 'material-ui';
import { Route } from 'react-router-dom';
import Router from './router/Router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {

      }
   }

   render() {
      const style = {
         appBar: {
            backgroundColor: '#222222'
         }
      };

      return (
         <MuiThemeProvider>
            <div>
               <Route render={({history}) => (
                  <AppBar
                     title="Good Food"
                     showMenuIconButton={false}
                     style={style.appBar}
                     onTitleClick={() => {history.push('/')}}
                     titleStyle={{cursor: 'pointer'}}
                  />
               )} />
               <Router />
            </div>
         </MuiThemeProvider>
      );
   }
}

export default App;