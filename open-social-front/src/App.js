import React from 'react';
import './App.css';
import Project from './Project';
import ReactList from 'react-list';
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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
      .then(projects => this.setState({projects: projects}))
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
            {this.state.projects ?
              <div>
                <ReactList
                  itemRenderer={(index, key) => {
                    return <Project key={key} project={this.state.projects[index]}/>
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
