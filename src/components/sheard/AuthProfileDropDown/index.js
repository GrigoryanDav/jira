import { Avatar, Dropdown, Typography, Flex, theme } from 'antd'
import { signOut } from 'firebase/auth'
import { auth } from '../../../services/firebase'
import { useNavigate } from 'react-router-dom'
import { ROUTE_CONSTANTS } from '../../../core/utils/constants'
import './index.css'


const { Text } = Typography
const { useToken } = theme

const AuthProfileDropDown = () => {
    const navigate = useNavigate()
    const { token } = useToken()
    const handleSignOut = async () => {
        try {
            await signOut(auth)
        } catch (e) {
            console.log(e, 'signOut error')
        }
    }
    const items = [
        {
            label: 'Profile',
            key: 0,
            onClick: () => navigate(ROUTE_CONSTANTS.PROFILE)
        },
        {
            label: 'Cabinet',
            key: 1,
        },
        {
            label: 'Logout',
            key: 2,
            onClick: handleSignOut,
        }
    ]

    return (
        <Dropdown
            menu={{ items }}
            trigger={['click']}
            dropdownRender={(menu) => {
                return (
                    <div
                        style={{
                            borderRadius: token.borderRadiusLG,
                            backgroundColor: token.colorBgElevated,
                            boxShadow: token.boxShadowSecondary,
                        }}
                    >
                        <Flex vertical align='center' style={{ padding: token.sizeMS }}>
                            <Avatar src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png" />
                            <Text>John Smith</Text>
                            <Text type='secondary' underline>johnsmith@gmail.com</Text>
                        </Flex>
                        {menu}
                    </div>
                )
            }}
        >
            <Avatar size='large' className='user_profile_avatar'>
                J S
            </Avatar>
        </Dropdown>
    )
}


export default AuthProfileDropDown