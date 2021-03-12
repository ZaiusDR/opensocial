import React from 'react';
import loadable from '@loadable/component'


import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'antd/dist/antd.css';
import {Layout, Row, Col, Carousel, Image} from 'antd';

const { Header, Content } = Layout;

const InfiniteScroll = loadable(() => import('react-infinite-scroll-component'));
const Loader = loadable(() => import('react-loader-spinner'));
const Project = loadable(() => import('./Project'));
const Select = loadable(() => import ('react-select'));



const api_url = 'https://01ruue3xk0.execute-api.eu-west-1.amazonaws.com/dev/projects';
const sort_by = [
  { value: 'total_commits', label: 'Total Commits' },
  { value: 'contributors', label: 'Contributors' },
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
        <Layout style={{ alignItems: 'center' }}>
          <Header style={{ width: '100%', height: '35vw', padding: 0 }}>
            <Carousel
              style={{ width: '100%', maxHeight: '35vw', overflow: 'hidden' }}
              autoplay
              effect={'fade'}
            >
              <div style={{ maxHeight: 'inherit', transform: 'translateY(50%)' }}>
                <h1 style={{ fontSize: '35px', fontWeight: 'bold', position: 'absolute', top: '30%', left: 0, zIndex: 2}}>
                  <span style={{ background: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: '10px' }} >
                    Welcome to Open Social!!<br/>
                  </span>
                </h1>
                <p style={{ fontSize: '25px', fontWeight: 'bold', position: 'absolute', top: '38%', left: 0, zIndex: 2}}>
                  <span style={{ background: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: '10px' }} >
                    An Humanitarian Open Source Projects Aggregator
                  </span>
                </p>
                <Image style={{ display: 'block', transform: 'translateY(-20%)' }} width={'100%'} preview={false} src={'.images/collaboration-heart-medium.jpg'} alt={'collaboration'} />
              </div>
              <div style={{ maxHeight: 'inherit', transform: 'translateY(50%)' }}>
                <Image style={{ display: 'block', transform: 'translateY(-20%)' }} width={'100%'} preview={false} src={'.images/open-source.jpg'} alt={'open source'} />
              </div>
              <div style={{ maxHeight: 'inherit', transform: 'translateY(50%)' }}>
                <Image style={{ display: 'block', transform: 'translateY(-20%)' }} width={'100%'} preview={false} src={'.images/community.jpg'} alt={'community'} />
              </div>
            </Carousel>
          </Header>
          <Content className="site-layout" style={{ marginTop: 64, maxWidth: '980px' }}>
            <Row
              align={'middle'}
              gutter={{ xs: 8, sm: 16, md: 24}}
            >
              <Col span={10} style={{ fontSize: 'calc(15px + 1.5vw)'}}><b>Project List:</b></Col>
              <Col span={6} style={{ textAlign: 'end'}}><b>Sorted By:</b></Col>
              <Col span={8} style={{ textAlignLast: 'center' }}>
                <Select
                  onChange={this.onSortBy}
                  options={sort_by}
                  isClearable={true}
                  isSearchable={false}
                />
              </Col>
            </Row>
            <Row>
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
            </Row>
          </Content>
          {/*<Footer style={{ position: 'fixed', bottom: 0, zIndex: 1, textAlign: 'center', width: '100%' }}>*/}
          {/*  Open Social*/}
          {/*</Footer>*/}
        </Layout>
      </div>
    );
  }
}

export default App;
