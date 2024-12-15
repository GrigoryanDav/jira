import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import { Link } from "react-router-dom";
import { Flex, Button } from "antd";
import AuthProfileDropDown from '../../sheard/AuthProfileDropDown'
import { useSelector } from "react-redux";
import './index.css'


const Header = () => {
    const { authUserInfo: { isAuth, userData } } = useSelector((store) => store.userProfile)
    return (
        <div className="main_header">
            <Flex justify="space-between" align="center">
                <Link to='/'><p className="logo_title">Jira</p></Link>

                <div>
                    {
                        isAuth ? <AuthProfileDropDown userProfileInfo={userData} /> : <Link to={ROUTE_CONSTANTS.LOGIN}><Button>Sign In</Button></Link>
                    }
                </div>
            </Flex>
        </div>
    )
}

export default Header