import { useParams } from "react-router-dom"

export const UserPage = () => {

    const {uid} = useParams();

    return (
        <div>{uid}</div>
    )
}