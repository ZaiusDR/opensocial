import React from "react"

import loadable from "@loadable/component"
import { Layout, Row, Col, BackTop } from "antd"

import PageHeader from "./PageHeader"

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "antd/dist/antd.css"
import "../styles/App.css"

const Loader = loadable(() => import("react-loader-spinner"))
const InfiniteScroll = loadable(() => import("react-infinite-scroll-component"))
const Select = loadable(() => import("react-select"))

const HeaderCarousel = loadable(() => import("./HeaderCarousel"))
const Project = loadable(() => import("./Project"))

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
      sortedBy: null,
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

  render() {
    return (
      <div className="App">
        <Layout style={{ alignItems: "center", backgroundColor: "#F1F1E6" }}>
          <PageHeader />
          <Content
            className="site-layout"
            style={{ width: "100%", maxWidth: "980px", minHeight: "100vh" }}
          >
            <HeaderCarousel style={{ width: "100%" }} />
            <Row
              style={{ paddingLeft: "4px", paddingRight: "4px" }}
              align={"middle"}
              gutter={{ xs: 8, sm: 16, md: 24 }}
            >
              <Col
                span={14}
                xs={10}
                md={14}
                style={{ fontSize: "calc(15px + 1.5vw)" }}
              >
                <b>Project List:</b>
              </Col>
              <Col
                span={10}
                xs={14}
                md={10}
                style={{ textAlignLast: "center" }}
              >
                <Select
                  onChange={this.onSortBy}
                  options={sort_by}
                  isClearable={true}
                  isSearchable={false}
                  placeholder="Sort by..."
                />
              </Col>
            </Row>
            {this.state.projects.length > 0 ? (
              <InfiniteScroll
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
          </Content>
        </Layout>
      </div>
    )
  }
}

export default App
