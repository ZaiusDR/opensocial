import React from 'react';
import './App.css';
import Project from './Project';

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
        {this.state.projects ?
          <div>
            <header className="App-header">
              <img className="Header-image" src={'logo192.png'} alt={'site-logo'}/>
              <p>Open Social</p>
            </header>
            <div>
              <ul className="Project-list">
                {this.state.projects.map(project =>
                  <Project key={project.full_name} project={project}/>
                )}
              </ul>
            </div>
          </div> :
          null
        }
      </div>
    );
  }
}

export default App;
