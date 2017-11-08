import React from 'react';
import PropTypes from 'prop-types';
import Track from './Track.jsx';
import Stats from './Stats.jsx';
import Meals from './Meals.jsx';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  reRenderSiblings() {
    this.setState({
      updateSibling: "update",
    })
  }

  render() {
    return (
      <div className="columns">
        <div className="column is-one-third-desktop">
          <Track reRenderSiblings={() => this.reRenderSiblings()} />
        </div>
        <div className="column is-one-third-desktop">
          <Stats update={this.state.updateSibling}/>
        </div>
        <div className="column is-one-third-desktop">
          <Meals update={this.state.updateSibling}/>
        </div>
      </div>
    );
  }
}
