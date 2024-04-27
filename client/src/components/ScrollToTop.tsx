//Import React hooks
import { useEffect } from "react"

//Import React Router hooks
import { useLocation } from "react-router-dom"

export const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {

        window.scrollTo({top: 0});

    }, [location])

    return <></>
}