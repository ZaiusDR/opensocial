import React from 'react';
import LazyLoad from 'react-lazyload';
import './App.css';
import loadable from '@loadable/component'
import Project from './Project';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const ReactList = loadable(() => import('react-list'));
const Loader = loadable(() => import('react-loader-spinner'));


const api_url = 'https://01ruue3xk0.execute-api.eu-west-1.amazonaws.com/dev/projects';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null
    }
  }

  componentDidMount() {
    fetch(api_url)
      .then(response => response.json())
      .then(response_json => this.setState({projects: response_json.projects}))
      .catch(error => console.error(error));
  }



  render() {
    return (
      <div className="App">
        <div>
          <header className="App-header">
            <img className="Header-image" src={'logo192.png'} alt={'site-logo'}/>
            <p>Open Social</p>
          </header>
        </div>
        <div>
            {this.state.projects ?
              <div>
                <ReactList
                  itemRenderer={(index, key) => {
                    return <LazyLoad height={500}>
                      <Project key={key} project={this.state.projects[index]}/>
                    </LazyLoad>
                  }}
                  length={this.state.projects.length}
                  type={'simple'}
                  pageSize={5}
                >
                </ReactList>
              </div> :
              <Loader type="ThreeDots" color="#DCDCDC" height={80} width={80}/>
            }
        </div>
      </div>
    );
  }
}

export default App;
