import { Link } from "react-router-dom"
import { auth } from "../hooks/firebase"
import { useUser } from "../hooks/auth"
import { useContext } from "react"
import { AuthContext } from "../App"

export const Sidebar = () => {

    const {username, logged} = useContext(AuthContext);

    return (
        <section style={logged ? {visibility: "visible"} : {visibility: "hidden"}} className="fixed bottom-0
        md:h-[calc(100dvh-56px)] md:w-14 md:hover:w-48 transition-width duration-200 md:pb-1
        h-14 w-full z-20 group overflow-hidden
        flex md:flex-col md:items-start md:justify-end items-center justify-center
        bg-zinc-900 text-zinc-200 text-xl
        md:border-none border-t-[4px] border-green-600">
            <SideLink url="" faClass="fa-solid fa-chart-line" text="Dashboard"/>
            <SideLink url="" faClass="fa-regular fa-bookmark" text="Bookmarks"/>
            <SideLink url={`/user/${username}`} faClass="fa-regular fa-user" text="Profile"/>
            <SideLink url="/signout" faClass="fa-solid fa-arrow-right-from-bracket" text="Sign out"/>
            <SideLink url="" faClass="fa-solid fa-gear" text="Settings"/>
        </section>
    )
}

const SideLink = (props : {url: string, faClass: string, text: string}) => (
    <Link to={props.url} className="md:w-[42px] md:mx-[7px] md:group-hover:w-[178px]
    w-[42px] mx-1
    hover:bg-green-600 active:outline outline-2 outline-offset-2 outline-green-600 transition-background duration-100
    rounded-md overflow-hidden
    flex items-center">
        <span className="w-[42px] shrink-0 flex justify-center items-center aspect-square"><i className={props.faClass}></i></span>
        <span className="ml-2 text-base whitespace-nowrap overflow-hidden">{props.text}</span>
    </Link>
)