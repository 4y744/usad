//Import React hooks
import { useEffect } from "react"

//Import React Router hooks
import { useLocation } from "react-router-dom"

export const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        document.documentElement.scroll({top: 0, behavior: 'smooth'})
    }, [location])

    return <></>
}