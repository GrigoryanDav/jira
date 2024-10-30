import { Register, Login } from "./pages/auth"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import { ROUTE_CONSTANTS, FIRESTORE_PATH_NAMES } from "./core/utils/constants"
import MainLayout from './components/layouts/Main'
import LoadingWrapper from "./components/sheard/LoadingWrapper"
import Profile from "./pages/profile"
import CabinetLayout from "./components/layouts/Cabinet"
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from "./services/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState, useCallback } from "react"
import { AuthContext } from "./context/authContext"
import './styles/global.css'



const App = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userProfileInfo, setUserProfileInfo] = useState({})

    const handleGetUserData = useCallback(async (uid) => {
        const docRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid)
        const response = await getDoc(docRef)

        if (response.exists()) {
            setUserProfileInfo(response.data())
        }
    }, [])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            user?.uid && handleGetUserData(user.uid)

            setLoading(false)
            setIsAuth(Boolean(user))
        });
    }, [handleGetUserData]);

    return (
        <AuthContext.Provider value={{ isAuth, userProfileInfo, handleGetUserData }}>
            <LoadingWrapper loading={loading}>
                <RouterProvider
                    router={
                        createBrowserRouter(
                            createRoutesFromElements(
                                <Route path="/" element={<MainLayout />}>
                                    <Route path={ROUTE_CONSTANTS.LOGIN} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Login />} />
                                    <Route path={ROUTE_CONSTANTS.REGISTER} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Register />} />

                                    <Route
                                        path={ROUTE_CONSTANTS.CABINET}
                                        element={isAuth ? <CabinetLayout /> : <Navigate to={ROUTE_CONSTANTS.LOGIN} />}
                                    >
                                        <Route
                                            path={ROUTE_CONSTANTS.PROFILE}
                                            element={<Profile />}
                                        />
                                    </Route>
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