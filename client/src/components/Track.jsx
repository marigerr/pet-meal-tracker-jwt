import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


export default class Track extends React.Component {
  constructor(props, context) {
    super(props, context);

    const utcDateTime = new Date();
    const timezoneoffset = utcDateTime.getTimezoneOffset() / 60;
    let localDateTime = utcDateTime.setHours(utcDateTime.getHours() - timezoneoffset);
    localDateTime = utcDateTime.toISOString().slice(0, -8);

    this.state = {

      name: '',
      localDateTime: localDateTime,
      timezoneoffset: timezoneoffset,

      id: '',
      brandId: '',
      brand: '',
      amount: '0.25',
      openednewpackage: false,
      percentDailyValue: 0,
      foodtypes: [],
      foodtypesOptions: '',
      submittedMessage: false,
      showMessage: false,
      // messageSuccess: 'has-text-success',
      // messageError: 'has-text-warning',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = 'Tracker - track';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.get('/api/track').then((result) => {

      if (result.status !== 200) {
        // handle server errors
      } else if (result.data.length === 0) {
        this.context.router.replace('/addfood');
      } else {
        this.setState({
          foodtypes: result.data,
        });
        const foodtypesOptions = result.data.map(type => <option key={type._id} value={type._id}>{type.brand}</option>);
        this.setState({
          foodtypesOptions,
          brandId: result.data[0]._id,
        });
      }
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const foodtypesArr = this.state.foodtypes;
    const selectedFoodtype = foodtypesArr.find(food => food._id === this.state.brandId);
    axios.post('/api/track', {
      brand: selectedFoodtype.brand,
      amount: this.state.amount,
      percentDailyValue: this.state.amount * selectedFoodtype.packageDailyEquivalent,
      openednewpackage: this.state.openednewpackage,
      localDateTime: this.state.localDateTime,
      timezoneoffset: this.state.timezoneoffset,
    })
      .then((response) => {
        this.setState({
          showMessage: true,
          addedmeal: true,
          addedmealBrand: response.data.meal.brand,
          addedmealPortion: response.data.meal.packageportion,
          addedmealPercentDailyValue: response.data.meal.percentDailyValue,
          addedmealUtcDateTime: response.data.meal.utcDateTime,
        });
        this.props.reRenderSiblings();
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          showMessage: true,
          addedmeal: false,
        });
      });
  }

  feedbackMessage() {
    if (this.state.showMessage) {
      const time = new Date(this.state.addedmealUtcDateTime).toLocaleString([], { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });      
      if (this.state.addedmeal) {
        return (
          <div className="column">
            <article className="show-message message is-success">
              <div className="message-header">
                <p>Meal Added!</p>
                <button onClick={this.closeMessage.bind(this)} className="delete" aria-label="delete"></button>
              </div>
              <div className="message-body">
                <p>{this.state.addedmealBrand} : {this.state.addedmealPortion} package  </p>
                <p>{Math.round(this.state.addedmealPercentDailyValue * 100)}% of daily calories</p>
                <p>{time}</p>
              </div>
            </article>
          </div>
          // <p className='has-text-success show-message'>Meal Successfully added!</p>
        );
      }
      return (
        <div className="column is-half">
          <div className="notification is-danger">
            <button onClick={this.closeMessage.bind(this)} className="delete"></button>
            Error - please try submitting meal again
          </div>
        </div>
        // <p className='has-text-warning show-message'>Error - please submit meal again</p>
      );
    }
    return null;
  }

  closeMessage() {
    this.setState({
      showMessage: false,
      addedmeal: false,
      addedmealBrand: '',
      addedmealPortion: '',
      addedmealPercentDailyValue: '',
      addedmealUtcDateTime: '',      
    });
  }

  render() {
    return (
      <div>
        {this.state.foodtypesOptions &&
          <div>
            <h2 className='title'>Track</h2>

            <form onSubmit={this.handleSubmit} >
              {/* <input type="text" name="id" value={this.state.id} className="input is-hidden" onChange={this.handleChange} />
              <input type="text" name="packageDailyEquivalent" value={this.state.packageDailyEquivalent} className="input is-hidden" onChange={this.handleChange} /> */}
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Select Food Type</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <div className="select">
                        <select name="brandId" value={this.state.brandId} onChange={this.handleChange}>
                          {this.state.foodtypesOptions}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Package Portion</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <div className="select">
                        <select name="amount" value={this.state.amount} onChange={this.handleChange}>
                          <option value="0.10">.10</option>
                          <option value="0.20">.20</option>
                          <option value="0.25">.25</option>
                          <option value="0.30">.30</option>
                          <option value="0.40">.40</option>
                          <option value="0.50">.50</option>
                          <option value="0.60">.60</option>
                          <option value="0.70">.70</option>
                          <option value="0.75">.75</option>
                          <option value="0.80">.80</option>
                          <option value="0.90">.90</option>
                          <option value="1">1</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Time</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input type="datetime-local" value={this.state.localDateTime} name="localDateTime" onChange={this.handleChange} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label checkbox is-normal">Opened New Package</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      {/* <label className="checkbox is-normal"> */}
                      <input className="is-normal" name="openednewpackage" type="checkbox" value={this.state.openednewpackage} onChange={this.handleChange} />
                      {/* </label> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label">
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input className='button is-success' type="submit" value="Submit" />
                    </div>
                  </div>
                </div>
              </div>

            </form >

            {this.feedbackMessage()}

          </div >
        }
      </div >
    );
  }
}

Track.contextTypes = {
  router: PropTypes.object.isRequired
};
