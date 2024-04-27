//Import React hooks and misc
import { useState, useRef, useContext, MouseEvent } from "react";

//Import React Router hooks and misc
import { Link, useNavigate } from "react-router-dom"

//Import contexts
import { AuthContext } from "../../App";

//Import assets
import logo from "../../assets/images/logo.png";

//Import i18n hooks
import { useTranslation } from "react-i18next";

export const Navbar = () => {

    //Mobile navbar event handler
    const [navToggled, setNavToggled] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleNavbar = () => {
        setNavToggled(!navToggled);
    };

    const {username, logged} = useContext(AuthContext)

    const {t} = useTranslation();

    return (
        <nav className="bg-zinc-900 shadow-md fixed top-0 z-10 w-full
        select-none">
            {/* Big screen navbar */}
            <div className="md:flex hidden p-2">

                <div className="flex justify-start items-center xl:flex-1 flex-2">

                    <NavLogo/>
                    
                    <NavLink
                    url="/"
                    text={t("home")}/>

                    <NavLink
                    url="/browse"
                    text={t("browse")} />

                    <NavLink
                    url="/create"
                    text={t("create")} />

                    <NavLink
                    url="/about"
                    text={t("about")} />

                </div>

                <div className="flex justify-center items-center flex-1 px-2">

                    <NavSearch />

                </div>

                <div className="flex justify-end items-center gap-2 flex-1">

                    <LanguageToggle/>

                    {logged ? (
                        <NavLink url="/dashboard" text={username}/>
                    ) : (
                        <NavLink url="/signin" text={t("signin")}/>
                    )}

                </div>
            </div>


            {/* Mobile navbar */}
            <div className="md:hidden flex flex-col">

                <div className="flex p-2">

                    <div className="flex justify-center items-center">

                        <NavLogo />

                    </div>

                    <div className="flex justify-center items-center w-full px-3">

                        <NavSearch />

                    </div>

                    <div className="flex justify-end items-center">

                        <NavToggle toggle={toggleNavbar} />

                    </div>

                </div>

                {/* Dropdown */}
                <div style={navToggled ? { height: dropdownRef.current?.scrollHeight! } : { height: 0 }}
                ref={dropdownRef} className="flex justify-start items-start overflow-hidden flex-col px-3 
                transition-height duration-200 ease-in-out">

                    <DropdownLink 
                    onclick={toggleNavbar} 
                    text={t("home")}
                    url="/" />

                    <DropdownLink
                    onclick={toggleNavbar}
                    text={t("browse")}
                    url="/browse"/>

                    <DropdownLink
                    onclick={toggleNavbar}
                    text={t("create")}
                    url="/create"/>

                    <DropdownLink
                    onclick={toggleNavbar}
                    text={t("about")}
                    url="/about"/>

                    <hr className="h-1 w-full my-2 border-1 border-zinc-200" />

                    <div className="flex items-center gap-3 w-full">
                        
                        {logged ? (
                        <DropdownLink onclick={toggleNavbar} url="/dashboard" text={username}/>
                        ) : (
                            <DropdownLink onclick={toggleNavbar} url="/signin" text={t("signin")}/>
                        )}

                        <div className="ml-auto">

                            <LanguageToggle/>

                        </div>

                    </div>

                    {/* Empty space, because margins or vertical paddings are not affected by height */}
                    <div className="w-full py-1"/>

                </div>

            </div>

        </nav>
    )
}

const NavLogo = () => {

    return (
        <Link to="" className="w-10 mx-2">

            <img className="h-10 w-10" 
            src={logo}/>

        </Link>
    )
};

const NavLink = (props: { url: string; text: string }) => {

    return (
        <Link className="text-zinc-200 py-1 px-3 mx-1 rounded-md hover:bg-green-600 active:bg-green-600 
        transition-background duration-100 active:outline outline-offset-2 outline-2 outline-green-600"
        to={props.url}>
            {props.text}
        </Link>
    )    
};

const NavSearch = () => {

    const {t} = useTranslation();
    const navigate = useNavigate();

    const query = useRef("");

    const search = (event: MouseEvent<HTMLButtonElement>) => {
        if(query.current != "") navigate(`/search/${query.current}`);
        event.preventDefault();
    }

    return (
        <form className="focus-within:outline outline-offset-2 outline-2 outline-green-600 
        bg-zinc-800 p-1 rounded-md text-zinc-500 font-inter flex w-full md:w-60 lg:w-80">

            <label htmlFor="searchbar">
                <i className="fa-solid fa-magnifying-glass aspect-square p-2"/>
            </label>

            <input className="outline-none bg-transparent w-full text-white"
            id="searchbar" 
            type="text" 
            placeholder={`${t("typehere")}...`}
            onChange={(event) => query.current = event.target.value}
            maxLength={64}/>

            <button className="bg-green-700 hover:bg-green-600 transition-background 
            duration-100 ease-in-out text-zinc-200 py-1 px-3 ml-auto rounded-md shadow-sm
            active:outline outline-2 outline-green-600 outline-offset-2"
            onClick={search}>
                {t("search")}
            </button>

        </form>
    )
};

const NavToggle = (props: { toggle: () => void }) => {

    return (
        <button onClick={props.toggle} className="flex md:hidden justify-center items-center flex-col 
        aspect-square rounded-md active:outline outline-2 outline-green-600 hover:bg-zinc-800">

            <div className="rounded-md w-5 h-0.5 mx-2 my-0.5 bg-zinc-300"/>

            <div className="rounded-md w-5 h-0.5 mx-2 my-0.5 bg-zinc-300"/>

            <div className="rounded-md w-5 h-0.5 mx-2 my-0.5 bg-zinc-300"/>

        </button>
    )
}

const DropdownLink = (props: {url: string, text: string, onclick: () => void;}) => {

    return (
        <Link className="text-zinc-200 font-inter py-1 px-3 my-1 w-full rounded-md text-base hover:bg-green-600
        active:bg-green-600 transition-background duration-100 active:outline outline-offset-2 outline-2 outline-green-600"
        to={props.url} onClick={props.onclick}>
            {props.text}
        </Link>
    )
}

const LanguageToggle = () => {

    const {t, i18n} = useTranslation();

    const changeLanguage = (lang: string) => {
        
        i18n.changeLanguage(lang);

        localStorage.setItem("language", lang);
    }

    return (
        <div className="flex w-fit ml-auto
        rounded-md shadow-md overflow-hidden">

            <button className={`${i18n.language == "bg" ? "bg-green-700 hover:bg-green-600" : "bg-zinc-800 hover:bg-zinc-700"} 
            px-2 py-1`}
            onClick={() => changeLanguage("bg")}>BG</button>

            <button className={`${i18n.language == "en" ? "bg-green-700 hover:bg-green-600" : "bg-zinc-800 hover:bg-zinc-700"}
            px-2 py-1`}
            onClick={() => changeLanguage("en")}>EN</button>
        </div>
    )
}
