import React from 'react';
import Auth from '../modules/Auth';
import Addfood from '../components/Addfood.jsx';


class AddfoodPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: ''
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    // const xhr = new XMLHttpRequest();
    // xhr.open('get', '/api/Track');
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // // set the authorization HTTP header
    // xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    // xhr.responseType = 'json';
    // xhr.addEventListener('load', () => {
    //   if (xhr.status === 200) {
    //     this.setState({
    //       secretData: xhr.response.message
    //     });
    //   }
    // });
    // xhr.send();
  }

  /**
   * Render the component.
   */
  render() {
    return (<Addfood />);
    // return (<Track secretData={this.state.secretData} />);
  }

}

export default AddfoodPage;
