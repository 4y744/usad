//Import assets
import logo from "../../assets/images/logo.png";

//Import React hooks
import { useState, useRef, useContext } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts";

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

    return (
        <nav className="bg-zinc-900 drop-shadow-md fixed top-0 z-10 w-full">
            {/* Big screen navbar */}
            <div className="md:flex hidden p-2">
                <div className="flex justify-start items-center xl:flex-1 flex-2">
                    <NavLogo />
                    <NavLink url="/" text="Home" />
                    <NavLink url="/browse" text="Browse" />
                    <NavLink url="/create" text="Create" />
                    <NavLink url="/about" text="About" />
                </div>

                <div className="flex justify-center items-center flex-1 px-2">
                    <NavSearch />
                </div>

                <div className="flex justify-end items-center flex-1">
                    {logged ? <ProfileLink username={username}/> : 
                    <NavLink url="/signin" text="Sign in"/>}
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
                transition-height duration-300 ease-in-out">

                    <DropdownLink onclick={toggleNavbar} url="/" text="Home"/>
                    <DropdownLink onclick={toggleNavbar} url="/browse" text="Browse"/>
                    <DropdownLink onclick={toggleNavbar} url="/create" text="Create"/>
                    <DropdownLink onclick={toggleNavbar} url="/about" text="About"/>

                    <hr className="h-1 w-full my-2 border-1 border-zinc-200" />

                    {logged ? <ProfileLink username={username}/> : 
                    <DropdownLink onclick={toggleNavbar} url="/signin" text="Sign in"/>}

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

const NavSearch = () => (
    <form className="focus-within:outline outline-offset-2 outline-2 outline-green-600 
    bg-zinc-800 p-1 rounded-md text-zinc-500 font-inter flex w-full md:w-60 lg:w-80">
        <label htmlFor="searchbar">
            <i className="fa-solid fa-magnifying-glass aspect-square p-2"></i>
        </label>
        <input className="outline-none bg-transparent w-full text-white"
            id="searchbar" type="text" placeholder="Type here..."/>
        <button className="bg-green-700 hover:bg-green-600 transition:background 
        duration-100 ease-in-out text-zinc-200 py-1 px-3 ml-auto rounded-md shadow-sm">
            Search
        </button>
    </form>
);

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

const ProfileLink = (props: { username: string }) => (
    <Link to="" className="text-zinc-200 py-1 px-3 mx-1 rounded-md hover:bg-green-600 active:bg-green-600 
	transition-background duration-100 active:outline outline-offset-2 outline-2 outline-green-600">
        {props.username}
    </Link>
)
