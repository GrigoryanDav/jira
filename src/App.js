import { Register, Login } from "./pages/auth"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import { ROUTE_CONSTANTS, FIRESTORE_PATH_NAMES } from "./core/utils/constants"
import MainLayout from './components/layouts/Main'
import LoadingWrapper from "./components/sheard/LoadingWrapper"
import Cabinet from "./pages/cabinet"
import Profile from "./pages/profile"
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from "./services/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { AuthContext } from "./context/authContext"
import './styles/global.css'



const App = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userProfileInfo, setUserProfileInfo] = useState({})

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            user?.uid && handleGetUserData(user.uid)

            setLoading(false)
            setIsAuth(Boolean(user))
        });
    }, []);

    const handleGetUserData = async (uid) => {
        const docRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid)
        const response = await getDoc(docRef)

        if(response.exists()) {
            setUserProfileInfo(response.data())
        }
    }

    return (
        <AuthContext.Provider value={{ isAuth, userProfileInfo }}>
            <LoadingWrapper loading={loading}>
                <RouterProvider
                    router={
                        createBrowserRouter(
                            createRoutesFromElements(
                                <Route path="/" element={<MainLayout />}>
                                    <Route path={ROUTE_CONSTANTS.LOGIN} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Login />} />
                                    <Route path={ROUTE_CONSTANTS.REGISTER} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Register />} />
                                    <Route path={ROUTE_CONSTANTS.CABINET} element={isAuth ? <Cabinet /> : <Navigate to={ROUTE_CONSTANTS.LOGIN} />} />
                                    <Route path={ROUTE_CONSTANTS.PROFILE} element={isAuth ? <Profile /> : <Navigate to={ROUTE_CONSTANTS.LOGIN} />} />
                                </Route>
                            )
                        )
                    }
                />
            </LoadingWrapper>
        </AuthContext.Provider>
    )
}

export default App