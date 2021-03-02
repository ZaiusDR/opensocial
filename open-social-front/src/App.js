import React from 'react';
import loadable from '@loadable/component'

import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const InfiniteScroll = loadable(() => import('react-infinite-scroll-component'));
const Loader = loadable(() => import('react-loader-spinner'));
const Project = loadable(() => import('./Project'));
const Select = loadable(() => import ('react-select'));



const api_url = 'https://01ruue3xk0.execute-api.eu-west-1.amazonaws.com/dev/projects';
const sort_by = [
  { value: 'total_commits', label: 'Total Commits' }
]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      hasMore: false,
      nextKey: null,
      sortedBy: null
    }
    this.onSortBy = this.onSortBy.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.sortedBy !== prevState.sortedBy) {
      this.fetchData();
    }
  }

  fetchData = () => {
    fetch(this.buildUrl())
      .then(response => response.json())
      .then(response_json => this.setState({
       projects: this.state.projects.concat(response_json.projects),
       hasMore: !!response_json.page_identifier,
       nextKey: response_json.page_identifier
     }))
     .catch(error => console.error(error));
  }

  onSortBy(value) {
    if (value) {
      this.setState({sortedBy: value['value'], projects: [], nextKey: null, hasMore: false});
    } else {
      this.setState({sortedBy: null, projects: [], nextKey: null, hasMore: false});
    }
  }

  buildUrl = () => {
    let queryParams = {};
    if (this.state.nextKey) {
      queryParams['page'] = JSON.stringify(this.state.nextKey);
    }
    if (this.state.sortedBy) {
      queryParams['sorted_by'] = this.state.sortedBy;
    }
    return `${api_url}?${new URLSearchParams(queryParams).toString()}`;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="Header-image" src={'logo192.png'} alt={'site-logo'}/>
          <div className="Header-text">
            <h1>Open Social</h1>
            <h2>Humanitarian Open Source projects Aggregator</h2>
          </div>
        </header>
        <main>
          <div className="Sorted-by">
            <label className="Form-label"><b>Sorted By: </b></label>
            <Select
              onChange={this.onSortBy}
              options={sort_by}
              isClearable={true}
            />
          </div>
          {this.state.projects.length > 0 ?
            <div>
              <InfiniteScroll
                dataLength={this.state.projects.length}
                next={this.fetchData}
                hasMore={this.state.hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {this.state.projects.map((project) => (
                    <Project key={project.full_name} project={project}/>
                  )
                )}
              </InfiniteScroll>
            </div> :
            <Loader type="ThreeDots" color="#DCDCDC" height={80} width={80}/>
          }
        </main>
      </div>
    );
  }
}

export default App;
