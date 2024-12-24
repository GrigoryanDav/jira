import { Avatar, Form, Input, Select, Space } from "antd";
import { ISSUE_OPTIONS, ISSUE_PRIORITY_OPTIONS } from "../../../../core/utils/issues";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../../../state-managment/slices/allUsers";
import { getUserById } from "../../../../core/helpers/getUserById";
import Editor from "../../Editor";



const ModalForm = ({ form, onFinish, task }) => {
    const dispatch = useDispatch()
    const { users } = useSelector((store) => store.allUsers)
    const { userData } = useSelector((store) => store.userProfile.authUserInfo)


    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch])

    // If task has an owner, use that, otherwise use current user's data
    const ownerData = task?.owner ? getUserById(task.owner, users) : userData


    return (
        <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
                label='Issue Name'
                name='issueName'
                rules={[
                    {
                        required: true,
                        message: 'Please input Issue Name'
                    }
                ]}
            >
                <Input type="text" placeholder="Issue Name" />
            </Form.Item>

            <Form.Item
                label='Issue Type'
                name='type'
                rules={[
                    {
                        required: true,
                        message: 'Please input Issue Type'
                    }
                ]}
            >
                <Select placeholder='Issue Type'>
                    {
                        Object.values(ISSUE_OPTIONS).map(({ value, icon, label }) => {
                            return (
                                <Select.Option value={value} key={value}>
                                    <Space>
                                        {icon}
                                        <span>{label}</span>
                                    </Space>
                                </Select.Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>

            <Form.Item
                name='description'
                label='Description'
                rules={[
                    {
                        required: true,
                        message: 'Please input Issue Description'
                    }
                ]}
            >
                <Editor />
            </Form.Item>

            <Form.Item
                name='priority'
                label='Priority'
                rules={[
                    {
                        required: true,
                        message: 'Please Select Priority'
                    }
                ]}
            >
                <Select placeholder='Priority'>
                    {
                        Object.values(ISSUE_PRIORITY_OPTIONS).map(({ value, icon, label }) => {
                            return (
                                <Select.Option value={value} key={value}>
                                    <Space>
                                        {icon}
                                        <span>{label}</span>
                                    </Space>
                                </Select.Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>

            <Form.Item
                name='assignTo'
                label='Assign To'
                rules={[
                    {
                        required: true,
                        message: 'Please select a user to assign the issue'
                    }
                ]}
            >
                <Select placeholder='Select a user' dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}>
                    {
                        users && users.length > 0 ? (
                            users.map(({ uid, firstName, lastName, imgUrl }) => (
                                <Select.Option value={uid} key={uid}>
                                    <Space>
                                        {imgUrl && <Avatar src={imgUrl} alt="user image" style={{ width: 24, height: 24, borderRadius: '50%' }} />}
                                        <span>{`${firstName} ${lastName}`}</span>
                                    </Space>
                                </Select.Option>
                            ))
                        ) : (
                            <Select.Option disabled>No users available</Select.Option>
                        )
                    }
                </Select>
            </Form.Item>

            <Form.Item
                name="owner"
                label="Owner"
                initialValue={ownerData?.uid}
                rules={[
                    {
                        required: true,
                        message: "Please select an owner of issue"
                    }
                ]}
            >
                <Select placeholder="Select a user" disabled>
                    <Select.Option value={ownerData?.uid} key={ownerData?.uid}>
                        <Space>
                            {ownerData?.imgUrl && (
                                <Avatar
                                    src={ownerData?.imgUrl}
                                    alt="user image"
                                    style={{ width: 24, height: 24, borderRadius: "50%" }}
                                />
                            )}
                            <span>{`${ownerData?.firstName} ${ownerData?.lastName}`}</span>
                        </Space>
                    </Select.Option>
                </Select>
            </Form.Item>
        </Form>
    )
}


export default ModalForm