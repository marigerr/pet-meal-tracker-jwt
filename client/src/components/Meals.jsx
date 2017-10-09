import React from 'react';
import axios from 'axios';
import ReactPaginate from './pagination/PaginationBoxView';
// import Track from './Track.jsx';
import MealTable from './MealTable.jsx';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token'); 

export default class Meals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mealList: '',
      modalClassNames: 'modal',
      editName: '',
      editAmount: '',
      editId: '',
      data: [],
      offset: 0,
      perPage: 8,
    };
  }
  componentDidMount() {
    document.title = 'Tracker - Meals';
    this.loadMealsFromServer();
  }

  getPaginatedItems(items) {
    return items.slice(this.state.offset, this.state.offset + this.state.perPage);
  }

  loadMealsFromServer() {
    axios.get('/api/meals').then((result) => {
      console.log(result);
      if (result.data.message === 'unauthorized') {
        console.log('you need to log in');
        // window.location.href = '/api/auth';
      } else {
        this.setState({
          wholeDataset: result.data,
        });
        const currentData = this.getPaginatedItems(result.data);
        this.setState({
          data: currentData,
          pageCount: Math.ceil(result.data.length / this.state.perPage),
        }, () => console.log(this.state));
      }
    });
  }

  handlePageClick(data) {
    console.log(this.state);
    const selected = data.selected;
    const offset = Math.ceil(selected * this.state.perPage);

    this.setState({
      offset,
    }, () => {
      console.log(this.state);
      const currentData = this.getPaginatedItems(this.state.wholeDataset);
      this.setState({
        data: currentData,
      });
    });
  }

  render() {
    return (
      <div>

        {this.state.data &&
          <div>
            <h2 className='title'>Meals</h2>
            <MealTable data={this.state.data} />
            <nav className="pagination" role="navigation" aria-label="pagination">
              <ReactPaginate previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={<a href="">...</a>}
                breakClassName={'break-me'}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick.bind(this)}
                containerClassName={'pagination-list'}
                subContainerClassName={'pages pagination'}
                activeClassName={'is-current'}
                previousClassName={'pagination-previous'}
                nextClassName={'pagination-next'}
                pageLinkClassName={'pagination-link'}
              />
            </nav>
          </div>
        }
      </div>
    );
  }
}
