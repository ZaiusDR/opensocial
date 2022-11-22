import React from "react"

import { Modal } from "antd"
import WhyModalContent from "./WhyModalContent"

const WhyModal = (props) => {
  return(
    <Modal
      data-testid="WhyModal"
      title="Why OpenSocial?"
      onCancel={() => props.onClose()}
      destroyOnClose={true}
      open={props.open}
      footer={null}
    >
      <WhyModalContent/>
    </Modal>
  )
}

export default WhyModal
