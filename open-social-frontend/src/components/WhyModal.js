import React from "react"

import { Modal } from "antd"

const WhyModal = (props) => {
  return(
    <Modal
      data-testid="WhyModal"
      title="Why OpenSocial?"
      onCancel={() => props.onClose()}
      destroyOnClose={true}
      visible={props.open}
      footer={null}
    >
      <p>This is a fake modal</p>
    </Modal>
  )
}

export default WhyModal
