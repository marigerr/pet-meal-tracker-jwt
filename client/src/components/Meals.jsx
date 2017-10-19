import React from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

export default class Meals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        { Header: 'Brand',
          accessor: 'brand',
          // maxWidth: 100
        },
        { Header: '% Pkg',
          accessor: 'packageportion',
          Cell: cell => Math.round( cell.value * 100 ),
          // maxWidth: 60
        },
        { Header: '% DV',
          accessor: 'percentDailyValue',
          Cell: cell => Math.round( cell.value * 100 ),
          // maxWidth: 60
        },
        { Header: 'Time',
          accessor: 'timestampString',
          Cell: cell => new Date(cell.value).toLocaleString([], { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }),
          // maxWidth: 250
        }, 
        { Header: 'Time Zone offset',
          accessor: 'timezoneoffset',
        },                         
      ],
      defaultPageSize: 10,
    };
  }
  componentDidMount() {
    document.title = 'Tracker - Meals';
    this.loadMealsFromServer();
  }

  loadMealsFromServer() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.get('/api/meals').then((result) => {
      if (result.data.message === 'unauthorized') {
        // error handling
      } else {
        this.setState({
          data: result.data,
        })
      }
    });
  }

  render() {
    return (
      <div className="column">
      {/* <div className="column is-half"> */}
        <ReactTable className="-striped"
          noDataText="No Meals Tracked Yet"
          data={this.state.data}
          columns={this.state.columns}
          defaultPageSize= {this.state.defaultPageSize}
        />
      </div>
    );
  }
}
