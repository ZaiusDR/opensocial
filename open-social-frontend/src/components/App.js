import React from "react"

import loadable from "@loadable/component"
import { Layout, Row, Col, BackTop } from "antd"
import { Element } from "react-scroll"
import { InView } from "react-intersection-observer"

import PageHeader from "./PageHeader"

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "antd/dist/antd.css"
import "../styles/App.css"

const Loader = loadable(() => import("react-loader-spinner"))
const InfiniteScroll = loadable(() => import("react-infinite-scroll-component"))
const Select = loadable(() => import("react-select"))

const HeaderCarousel = loadable(() => import("./HeaderCarousel"))
const Project = loadable(() => import("./Project"))
const WhyModal = loadable(() => import("./WhyModal"))

const { Content } = Layout

const api_url = "https://api.open-social.net/projects"
const sort_by = [
  { value: "total_commits", label: "Total Commits" },
  { value: "contributors", label: "Contributors" },
  { value: "rate", label: "Project Rate" },
]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: this.props.initialProjects.internalProjects.projects,
      hasMore: !!this.props.initialProjects.internalProjects.page_identifier,
      nextKey: this.props.initialProjects.internalProjects.page_identifier,
      projectListVisible: false,
      sortedBy: null,
      whyModalOpen: false,
    }
    this.onSortBy = this.onSortBy.bind(this)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.sortedBy !== prevState.sortedBy) {
      this.fetchData()
    }
  }

  fetchData = () => {
    fetch(this.buildUrl())
      .then((response) => response.json())
      .then((response_json) =>
        this.setState({
          projects: this.state.projects.concat(response_json.projects),
          hasMore: !!response_json.page_identifier,
          nextKey: response_json.page_identifier,
        })
      )
      .catch((error) => console.error(error))
  }

  onSortBy(value) {
    if (value) {
      this.setState({
        sortedBy: value["value"],
        projects: [],
        nextKey: null,
        hasMore: false,
      })
    } else {
      this.setState({
        sortedBy: null,
        projects: [],
        nextKey: null,
        hasMore: false,
      })
    }
  }

  onChangeInView = () => {
    this.setState({projectListVisible: !this.state.projectListVisible})
  }

  buildUrl = () => {
    let queryParams = {}
    if (this.state.nextKey) {
      queryParams["page"] = JSON.stringify(this.state.nextKey)
    }
    if (this.state.sortedBy) {
      queryParams["sorted_by"] = this.state.sortedBy
    }
    return `${api_url}?${new URLSearchParams(queryParams).toString()}`
  }

  changeWhyModalVisibility = () => {
    this.setState({whyModalOpen: !this.state.whyModalOpen})
  }

  render() {
    return (
      <Layout data-testid="App" className="App">
        <PageHeader onClick={this.changeWhyModalVisibility}/>
        <Content
          className="site-layout"
          style={{ width: "100%", minHeight: "200vh" }}
        >
          <HeaderCarousel />
          <Row
            style={{ margin: "auto", maxWidth: "768px", padding: "15px", paddingTop: "50px" }}
            align={"middle"}
            justify={"end"}
          >
            <Col
              span={24}
              xs={14}
              md={10}
            >
              <Element name="projects"/>
              <Select
                onChange={this.onSortBy}
                options={sort_by}
                isClearable={true}
                isSearchable={false}
                placeholder="Sort by..."
              />
            </Col>
          </Row>
          <InView as="div" onChange={this.onChangeInView}>
          {this.state.projects.length > 0 && this.state.projectListVisible ? (
            <InfiniteScroll
              className="ProjectsContainer"
              dataLength={this.state.projects.length}
              next={this.fetchData}
              hasMore={this.state.hasMore}
              loader={
                <Loader
                  style={{ textAlign: "center" }}
                  type="ThreeDots"
                  color="#00334E"
                  height={80}
                  width={80}
                />
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {this.state.projects.map((project) => (
                <Project key={project.full_name} project={project} />
              ))}
              <BackTop />
            </InfiniteScroll>
          ) : (
            <Loader
              style={{ textAlign: "center" }}
              type="ThreeDots"
              color="#00334E"
              height={80}
              width={80}
            />
          )}
          </InView>
        </Content>
        <WhyModal
          onClose={this.changeWhyModalVisibility}
          open={this.state.whyModalOpen}
        />
      </Layout>
    )
  }
}

export default App
