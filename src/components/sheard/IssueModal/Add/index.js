import { Modal, Form } from "antd";
import { useState } from "react";
import ModalForm from "../Form";


const AddIssueModal = ({ isOpen, onClose }) => {
    const [form] = Form.useForm()
    const [buttonLoading, setButtonLoading] = useState(false)

    const handleClose = () => {
        onClose()
        form.resetFields()
    }

    const handleCreateIssue = (values) => {
        console.log('handleCreateIssue', values)
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
            <ModalForm form={form} onFinish={handleCreateIssue} />
        </Modal>
    )
}

export default AddIssueModal