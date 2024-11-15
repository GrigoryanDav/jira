import { Modal, Form } from "antd";
import { useState } from "react";


const AddIssueModal = ({ isOpen, onClose }) => {
    const [form] = Form.useForm()
    const [buttonLoading, setButtonLoading] = useState(false)

    const handleClose = () => {
        onClose()
        form.resetFields()
    }

    return (
        <Modal
            title='Create Issue'
            open={isOpen}
            width={600}
            onCancel={handleClose}
            okText="Create Issue"
            onOk={form.submit}
            confirmLoading={buttonLoading}
            centered
        >

        </Modal>
    )
}

export default AddIssueModal