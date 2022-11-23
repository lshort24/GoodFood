import React, { Component } from 'react';

class RecipeCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {title: ''};
    }

    render() {
        return (
            <div style={{paddingTop: 60}}>
                <h3>Create a new Recipe</h3>
                <form>
                    <label>Recipe Title:</label>
                    <input
                        onChange={event => this.setState({title: event.target.value})}
                        value={this.state.value}

                    />
                </form>
            </div>
        )
    }
}

export default RecipeCreate;