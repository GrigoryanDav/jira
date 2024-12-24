import { Button, Typography, Flex, Avatar } from "antd"
import { useEffect, useState } from "react"
import AddIssueModal from "../../components/sheard/IssueModal/Add"
import EditIssueModal from "../../components/sheard/IssueModal/Edit"
import { useSelector, useDispatch } from "react-redux"
import { fetchIssuesData, changeIssueColumns } from "../../state-managment/slices/issues"
import LoadingWrapper from '../../components/sheard/LoadingWrapper'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { ISSUE_OPTIONS, taskStatuses, ISSUE_PRIORITY_OPTIONS } from "../../core/utils/issues"
import { db } from "../../services/firebase"
import { updateDoc, doc } from "firebase/firestore"
import { FIRESTORE_PATH_NAMES } from "../../core/utils/constants"
import { fetchAllUsers } from "../../state-managment/slices/allUsers"
import { getUserById } from "../../core/helpers/getUserById"
import './index.css'


const { Title, Text } = Typography

const Cabinet = () => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const { data, isLoading } = useSelector((store) => store.issues)
    const { users } = useSelector((store) => store.allUsers)
    const [editModalData, setEditModalData] = useState(null)

    useEffect(() => {
        dispatch(fetchIssuesData())
        dispatch(fetchAllUsers())
    }, [dispatch])

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
    }

    const handleChangeTaskStatus = async (result) => {
        if (result.destination) {
            const { destination, source } = result
            try {
                dispatch(changeIssueColumns({ source, destination }))
                const docRef = doc(db, FIRESTORE_PATH_NAMES.ISSUES, result.draggableId)
                await updateDoc(docRef, {
                    status: destination.droppableId,
                })
            } catch {
                console.log('Error Drag')
            }
        }
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

            <div className="drag_context_container">
                <LoadingWrapper loading={isLoading}>
                    <DragDropContext onDragEnd={handleChangeTaskStatus}>
                        {
                            Object.entries(data).map(([columnId, column]) => {
                                return (
                                    <div className="column_container" key={columnId}>
                                        <div className="column_header">
                                            <Title level={5} type="secondary">
                                                {taskStatuses[columnId].title}
                                                {'  '}
                                                ({column.length})
                                            </Title>
                                        </div>

                                        <div>
                                            <Droppable droppableId={columnId} key={columnId}>
                                                {(provided, snapshot) => {
                                                    return (
                                                        <div
                                                            className="droppable_container"
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                        >
                                                            {
                                                                column.map((item, index) => {
                                                                    const assignedUser = getUserById(item.assignTo, users)
                                                                    return (
                                                                        <Draggable
                                                                            key={item.taskId}
                                                                            draggableId={item.taskId}
                                                                            index={index}
                                                                        >
                                                                            {
                                                                                (provided, snapshot) => {
                                                                                    return (
                                                                                        <div
                                                                                            className="issue_card_container"
                                                                                            {...provided.draggableProps}
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.dragHandleProps}
                                                                                            onClick={() => setEditModalData(item)}
                                                                                        >
                                                                                            <Flex justify="space-between">
                                                                                                <Text>
                                                                                                    {item.issueName}
                                                                                                    {'  '}
                                                                                                    {ISSUE_PRIORITY_OPTIONS[item.priority].icon}
                                                                                                </Text>

                                                                                                <div>
                                                                                                    {ISSUE_OPTIONS[item.type].icon}
                                                                                                </div>
                                                                                            </Flex>

                                                                                            {assignedUser && (
                                                                                                <div className="assigned_user">
                                                                                                    Assigned To:
                                                                                                    {assignedUser.imgUrl && <Avatar
                                                                                                        src={assignedUser.imgUrl}
                                                                                                        alt="user image"
                                                                                                        style={{ width: 24, height: 24, borderRadius: '50%' }}
                                                                                                    />}
                                                                                                    <Text>{`${assignedUser.firstName} ${assignedUser.lastName}`}</Text>
                                                                                                </div>
                                                                                            )}
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            }
                                                                        </Draggable>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    )
                                                }}
                                            </Droppable>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </DragDropContext>
                </LoadingWrapper >
            </div >
        </div >
    )
}

export default Cabinet