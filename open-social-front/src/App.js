import React from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
import loadable from '@loadable/component'

import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const InfiniteScroll = loadable(() => import('react-infinite-scroll-component'));
const Loader = loadable(() => import('react-loader-spinner'));
const Project = loadable(() => import('./Project'));



const api_url = 'https://01ruue3xk0.execute-api.eu-west-1.amazonaws.com/dev/projects';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      hasMore: false,
      nextKey: null
    }
  }

  componentDidMount() {
    this.fetchData()
  };

 fetchData = () => {
   fetch(this.state.nextKey ? `${api_url}?page=${this.state.nextKey}` : api_url)
     .then(response => response.json())
     .then(response_json => this.setState({
       projects: this.state.projects.concat(response_json.projects),
       hasMore: !!response_json.page_identifier,
       nextKey: response_json.page_identifier
     }))
     .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="Header-image" src={'logo192.png'} alt={'site-logo'}/>
          <p>Open Social</p>
        </header>
        <main>
            {this.state.projects.length > 0 ?
              <div>
                <InfiniteScroll
                  dataLength={this.state.projects.length} //This is important field to render the next data
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
