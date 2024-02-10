//Import assets
import logo from "../../assets/images/logo.png";

//Import React hooks
import { useState, useRef, useContext } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { useTranslation } from "react-i18next";

//Import localization
// import i18n from "../locale/config";
// import { useTranslation } from "react-i18next"

export const Navbar = () => {
    //TODO: ADD LOLCALIZATION
    //const change = () => i18n.changeLanguage("bg");
    //const { t } = useTranslation();

    //Mobile navbar event handler
    const [navToggled, setNavToggled] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleNavbar = () => {
        setNavToggled(!navToggled);
    };

    const {username, logged} = useContext(AuthContext)

    const {t} = useTranslation();

    return (
        <nav className="bg-zinc-900 shadow-md sticky top-0 z-10 w-full
        select-none">
            {/* Big screen navbar */}
            <div className="md:flex hidden p-2">
                <div className="flex justify-start items-center xl:flex-1 flex-2">
                    <NavLogo />
                    <NavLink url="/" text={t("home")} />
                    <NavLink url="/browse" text={t("browse")} />
                    <NavLink url="/create" text={t("create")} />
                    <NavLink url="/about" text={t("about")} />
                </div>

                <div className="flex justify-center items-center flex-1 px-2">
                    <NavSearch />
                </div>

                <div className="flex justify-end items-center flex-1">
                    <LanguageToggle/>
                    {logged ? <NavLink url="/dashboard" text={username}/> : 
                    <NavLink url="/signin" text={t("signin")}/>}
                </div>
            </div>

            {/* Mobile navbar */}
            <div className="md:hidden flex flex-col">
                <div className="flex p-3">
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

                    <DropdownLink onclick={toggleNavbar} url="/" text={t("home")}/>
                    <DropdownLink onclick={toggleNavbar} url="/browse" text={t("browse")}/>
                    <DropdownLink onclick={toggleNavbar} url="/create" text={t("create")}/>
                    <DropdownLink onclick={toggleNavbar} url="/about" text={t("about")}/>

                    <hr className="h-1 w-full my-2 border-1 border-zinc-200" />

                    {logged ? <DropdownLink onclick={toggleNavbar} url="/dashboard" text={username}/> : 
                    <DropdownLink onclick={toggleNavbar} url="/signin" text={t("signin")}/>}

                    {/* Empty space, because margins or vertical paddings are not affected by height */}
                    <div className="w-full py-1"></div>
                </div>
            </div>
        </nav>
    );
};

const NavLogo = () => (
    <Link to="" className="w-10 mx-2">
        <img className="h-10 w-10" src={logo} alt="Can't load logo" />
    </Link>
);

const NavLink = (props: { url: string; text: string }) => (
    <Link className="text-zinc-200 py-1 px-3 mx-1 rounded-md hover:bg-green-600 active:bg-green-600 
	transition-background duration-100 active:outline outline-offset-2 outline-2 outline-green-600"
    to={props.url}>
        {props.text}
    </Link>
);

const NavSearch = () => {

    const {t} = useTranslation();

    return (
        <form className="focus-within:outline outline-offset-2 outline-2 outline-green-600 
        bg-zinc-800 p-1 rounded-md text-zinc-500 font-inter flex w-full md:w-60 lg:w-80">
            <label htmlFor="searchbar">
                <i className="fa-solid fa-magnifying-glass aspect-square p-2"></i>
            </label>
            <input className="outline-none bg-transparent w-full text-white"
                id="searchbar" type="text" placeholder={`${t("typehere")}...`}/>
            <button className="bg-green-700 hover:bg-green-600 transition:background 
            duration-100 ease-in-out text-zinc-200 py-1 px-3 ml-auto rounded-md shadow-sm">
                {t("search")}...
            </button>
        </form>
    )
};

const NavToggle = (props: { toggle: () => void }) => (
    <button onClick={props.toggle} className="flex md:hidden justify-center items-center flex-col 
	aspect-square rounded-md active:outline outline-2 outline-green-600 hover:bg-zinc-800">
        <div className="rounded-md w-5 h-0.5 mx-2 my-0.5 bg-zinc-300" />
        <div className="rounded-md w-5 h-0.5 mx-2 my-0.5 bg-zinc-300" />
        <div className="rounded-md w-5 h-0.5 mx-2 my-0.5 bg-zinc-300" />
    </button>
);

const DropdownLink = (props: {url: string, text: string, onclick: () => void;}) => (
    <Link className="text-zinc-200 font-inter py-1 px-3 my-1 w-full rounded-md text-base hover:bg-green-600
	active:bg-green-600 transition-background duration-100 active:outline outline-offset-2 outline-2 outline-green-600"
    to={props.url} onClick={props.onclick}>
        {props.text}
    </Link>
)

const LanguageToggle = () => {

    const {t, i18n} = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    }

    return (
        <div className="bg-zinc-800 rounded-md shadow-md
        flex">

            <button className={`rounded-md
            ${i18n.language == "bg" && "bg-green-600"}
            hover:bg-green-600
            active:outline outline-2 outline-green-600 outline-offset-2
            py-2 px-3 text-white text-sm`}
            onClick={() => changeLanguage("bg")}>
                BG
            </button>

            <button className={`rounded-md
            ${i18n.language == "en" && "bg-green-600"}
            hover:bg-green-600
            active:outline outline-2 outline-green-600 outline-offset-2
            py-2 px-3 text-white text-sm`}
            onClick={() => changeLanguage("en")}>
                EN
            </button>

        </div>
    )
}
