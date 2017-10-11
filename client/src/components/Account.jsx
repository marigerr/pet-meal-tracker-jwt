import React from 'react';
import axios from 'axios';

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      user_email: ''
    };
  }

  componentDidMount() {
    document.title = 'Tracker - Stats';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.get('/api/account').then((result) => {
      this.setState({
        username: result.data.username,
        user_email: result.data.user_email
      })
    });
  }

  render() {
    return (
      <div className="card">
        <div className="card-image">
          {/* <figure className="image is-4by3">
            <img src="" alt="Placeholder image" />
          </figure> */}
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                {/* <img src="" alt="Placeholder image" /> */}
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">Username: {this.state.username}</p>
              <p className="subtitle is-6">Email: {this.state.user_email}</p>
            </div>
          </div>

          <div className="content">

            <time dateTime="2016-1-1">Account Created: </time>
          </div>
        </div>
      </div>
    );
  }
}
