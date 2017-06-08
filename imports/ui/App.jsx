import React, { Component } from 'react';
import User from './components/user';
import ReactDOM from 'react-dom';

// App component - represents the whole app
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      followers: []
    };
    this.lookupUser = this.lookupUser.bind(this);
    this.buildFollowerList = this.buildFollowerList.bind(this);
  }

  lookupUser(event){
    let user = event.target.value;
    var self = this;
    Meteor.call('findUser', event.target.value, function(error, result){
     if(error){
       console.log(error)
     } else {
       console.log('client side: ' + result[0]);
       self.buildFollowerList(result[0]);
       console.log("client has next page" + result[1]);
     }
   });
  }

  buildFollowerList(result){
    result = JSON.parse(result);
    var followers = [];
    for(i in result){
      followers.push({login: result[i]['login'], avatar: result[i]['avatar_url'], url: result[i]['html_url']});
    }
    this.setState({
      followers: followers
    });
  }
  render() {
    let users = this.state.followers;
    return (
      <div className="container">
        <header>
          <h1>Github App</h1>
        </header>
        <input type="text" onChange={this.lookupUser} placeholder="Username" />

        <div id="users">
            { users.map(function(follower){
              return <User key={follower.login} login={follower.login} url={follower.url} avatar={follower.avatar} />
            }) }
        </div>
      </div>
    );
  }
}
