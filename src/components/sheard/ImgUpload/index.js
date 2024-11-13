import { Upload, Progress } from 'antd';
import { useSelector } from "react-redux";
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types';


const ImgUpload = ({ progress, uploading, handleUpload }) => {
    const { userData: { uid, imgUrl, firstName, lastName } } = useSelector(store => store.userProfile.authUserInfo)

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {uploading ? <Progress type="circle" percent={progress} size={80} /> : <PlusOutlined />}
        </button>
    )

    return (
        <div>
            <Upload
                fileList={[
                    {
                        uid: uid,
                        name: `${firstName} ${lastName}`,
                        status: 'done',
                        url: imgUrl
                    }
                ]}
                customRequest={handleUpload}
                listType="picture-card"
            >
                {uploadButton}
            </Upload>
        </div>
    )
}

ImgUpload.propTypes = {
    progress: PropTypes.number.isRequired,
    uploading: PropTypes.bool.isRequired,
    handleUpload: PropTypes.func.isRequired
}

export default ImgUpload