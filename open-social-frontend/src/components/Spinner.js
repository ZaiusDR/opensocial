import React from "react"
import { Col, Row, Spin } from "antd"

const Spinner = () => {
  return (
    <Row align="middle" justify="center">
      <Col>
        <Spin size="large" />
      </Col>
    </Row>
  )
}

export default Spinner
