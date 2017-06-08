import React, { Component, PropTypes } from 'react';


// App component - represents the whole app
export default class User extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (

      <div className="user">
        <a href={this.props.url}>
          <img src={this.props.avatar} alt="" />
          <span>{this.props.login}</span>
        </a>
      </div>
    );
  }
}
