import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../App";
import { useTranslation } from "react-i18next";

export const Sidebar = () => {

    const {logged} = useContext(AuthContext);
    const {t} = useTranslation();

    return (
        //This is disgusting, but fuck it we ball.
        <section style={logged ? {visibility: "visible"} : {visibility: "hidden"}} 
        className="bg-zinc-900 shadow-md text-zinc-200 text-xl
        fixed bottom-0
        md:h-[calc(100dvh-56px)] md:w-14 md:hover:w-48 transition-width duration-200 md:pb-1
        h-14 w-full z-20 group overflow-hidden select-none
        flex md:flex-col md:items-start md:justify-end items-center justify-center
        md:border-none border-t border-zinc-700">
            
            <SideLink 
            url="/" 
            faClass="fa-solid fa-house" 
            text={t("home")}/>

            <SideLink 
            url={`/create`} 
            faClass="fa-solid fa-plus" 
            text={t("create")}/>

            <SideLink 
            url="/dashboard" 
            faClass="fa-solid fa-chart-line" 
            text={t("dashboard")}/>

            <SideLink 
            url="/signout" 
            faClass="fa-solid fa-arrow-right-from-bracket" 
            text={t("signout")}/>

        </section>
    )
}

const SideLink = (props : {url: string, faClass: string, text: string}) => (
    <Link to={props.url} className="md:w-[42px] md:mx-[7px] md:group-hover:w-[178px]
    w-[42px] mx-1
    hover:bg-green-600 active:outline outline-2 outline-offset-2 outline-green-600 transition-background duration-100
    rounded-md overflow-hidden
    flex items-center">

        <span className="w-[42px] shrink-0 flex justify-center items-center aspect-square">
            <i className={props.faClass}/>
        </span>

        <span className="ml-2 text-base whitespace-nowrap overflow-hidden">{props.text}</span>

    </Link>
)