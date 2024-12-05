import { useEffect, useState } from "react";
import { Modal, Form, notification } from "antd";
import { db } from "../../../../services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../../../../core/utils/constants";
import { useDispatch } from "react-redux";
import { fetchIssuesData } from "../../../../state-managment/slices/issues";
import ModalForm from "../Form";


const EditIssueModal = ({ isOpen, onClose, data }) => {
    const [buttonLoading, setButtonLoading] = useState(false)
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    useEffect(() => {
        form.setFieldsValue(data)
    }, [data, form])

    const handleEditIssue = async (formData) => {
        setButtonLoading(true)
        try {
            const { taskId } = data
            const issueDocRef = doc(db, FIRESTORE_PATH_NAMES.ISSUES, taskId)
            await updateDoc(issueDocRef, formData)
            notification.success({
                message: 'Issue Data successfully updated'
            })
            dispatch(fetchIssuesData())
            onClose()
        } catch (error) {
            console.log(error)
        } finally {
            setButtonLoading(false)
        }
    }

    return (
        <Modal
            title='Edit Issue'
            open={isOpen}
            width={600}
            onText='Edit Issue'
            centered
            onCancel={onClose}
            onOk={form.submit}
            loading={buttonLoading}
        >
            <ModalForm 
                form={form}
                onFinish={handleEditIssue}
            />
        </Modal>
    )
}

export default EditIssueModal