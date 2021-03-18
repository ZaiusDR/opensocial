import React from 'react';

import {Layout, Row, Col, BackTop} from 'antd';
import Loader from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import HeaderCarousel from "./HeaderCarousel";
import PageHeader from "./PageHeader";
import Project from "./Project";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'antd/dist/antd.css';
import '../styles/App.css';

const { Content } = Layout;
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
    this.setState({
      projects: this.state.projects.concat(this.props.initialProjects.internalProjects.projects),
      hasMore: !!this.props.initialProjects.internalProjects.page_identifier,
      nextKey: this.props.initialProjects.internalProjects.page_identifier
    })
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
          <PageHeader/>
          <Content className="site-layout" style={{ width: '100%', maxWidth: '980px' }} >
            <HeaderCarousel style={{ width: '100%' }} />
            <Row
              style={{paddingLeft: '4px', paddingRight: '4px'}}
              align={'middle'}
              gutter={{ xs: 8, sm: 16, md: 24}}
            >
              <Col span={14} xs={10} md={14} style={{ fontSize: 'calc(15px + 1.5vw)'}}><b>Project List:</b></Col>
              <Col span={10} xs={14} md={10} style={{ textAlignLast: 'center' }}>
                <Select
                  onChange={this.onSortBy}
                  options={sort_by}
                  isClearable={true}
                  isSearchable={false}
                  placeholder="Sort by..."
                />
              </Col>
            </Row>
              {this.state.projects.length > 0 ?
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
                <BackTop/>
                </InfiniteScroll>
                :
                <Loader type="ThreeDots" color="#DCDCDC" height={80} width={80}/>
              }
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
