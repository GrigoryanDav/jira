import { Button } from "antd"
import { useEffect, useState } from "react"
import AddIssueModal from "../../components/sheard/IssueModal/Add"
import EditIssueModal from "../../components/sheard/IssueModal/Edit"
import { useSelector, useDispatch } from "react-redux"
import { fetchIssuesData } from "../../state-managment/slices/issues"

const Cabinet = () => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const { data, isLoading } = useSelector((store) => store.issues)
    const [editModalData, setEditModalData] = useState(null)

    useEffect(() => {
        dispatch(fetchIssuesData())
    }, [dispatch])

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
    }

    return (
        <div>
            <Button type="primary" onClick={handleOpenModal}>
                Create Issue
            </Button>

            {
                Boolean(editModalData) && (
                    <EditIssueModal 
                        isOpen={Boolean(editModalData)}
                        data={editModalData}
                        onClose={() => setEditModalData(null)}
                    />
                )
            }

            <AddIssueModal onClose={handleClose} isOpen={showModal} />

            <div>
                <ul>
                    {
                        data.map((item) => {
                            return (
                                <li  key={item.taskId} onClick={() => setEditModalData(item)}>
                                    {item.issueName}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Cabinet