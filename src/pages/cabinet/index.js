import { Button } from "antd"
import { useState } from "react"


const Cabinet = () => {
    const [showModal, setShowModal] = useState(false)

    const handleOpenModal = () => {
        setShowModal(true)
    }

    return (
        <div>
            <Button type="primary" onClick={handleOpenModal}>
                Create Issue
            </Button>
        </div>
    )
}

export default Cabinet