import React from 'react';
import axios from 'axios';

export default class MealTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mealTableRows: [],
    };
  }

  componentDidMount() {
    this.buildRows(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.buildRows(nextProps.data);
    }
  }

  buildRows(data) {
    const mealTableRows = data.map(meal =>
      <tr key={meal._id}>
        <td>{meal.brand}</td>
        <td>{meal.packageportion}</td>
        <td>{Math.round(meal.percentDailyValue * 100)}%</td>
        <td>{new Date(meal.timestamp).toLocaleString([], { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
        <td>
          <button id={meal._id} className='button is-danger is-small' onClick={this.deleteMeal.bind(this)}>Delete</button>
        </td>
      </tr>);
    
    this.setState({
      mealTableRows,
    });
  }


  deleteMeal(event) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');        
    axios.delete('/api/meals', {
      data: { _id: event.target.id },
    }).then((result) => {
      
      
      let mealTableRows = this.state.mealTableRows;
      
      mealTableRows = mealTableRows.filter(row => row.key !== result.data.mealId);
      this.setState({
        mealTableRows,
      });
    });
  }

  render() {
    return (
      <div className="columns">
        <div className="column is-half">
          <table className="table is-narrow is-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Package Portion</th>
                <th>Daily Percent</th>
                <th>Time</th>
                <th />
              </tr>
            </thead>
            <tbody>{this.state.mealTableRows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
