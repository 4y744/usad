import { Link } from "react-router-dom"

import firebase from "../assets/images/logos/firebase.png"
import react from "../assets/images/logos/react.png"
import vite from "../assets/images/logos/vite.png"
import tailwind from "../assets/images/logos/tailwind.png"

export const Footer = () => (
    <footer className="bg-zinc-900 w-full flex flex-col items-center justify-center text-zinc-300 py-5">
        <div className="sm:w-fit w-full">
            <div className="flex flex-wrap justify-center items-center">

                    <div className="flex flex-col flex-1 md:mx-8 mx-4">
                        <FooterHeading text="Project"/>
                        <FooterAnchor url="https://github.com/4y744/USAD" text="GitHub"/>
                        <FooterLink url="#" text="Documentation"/>
                        <FooterLink url="#" text="About"/>
                    </div>

                    <div className="flex flex-col flex-1 md:mx-8 mx-4">
                        <FooterHeading text="Resources"/>
                        <FooterLink url="#" text="FAQ"/>
                        <FooterLink url="#" text="Tutorial"/>
                        <FooterLink url="#" text="Contact"/>
                    </div>
           
                    <div className="flex flex-col flex-1 md:mx-8 mx-4">
                        <FooterHeading text="Legal"/>
                        <FooterAnchor url="https://www.gnu.org/licenses/gpl-3.0.html" text="GNU GPLv3"/>
                        <FooterAnchor url="#" text="License"/>
                        <FooterLink url="#" text="Terms of use"/>
                    </div>

                    <div className="flex flex-wrap justify-center items-center h-16 mx-4">
                        <h1 className="md:text-lg text-base font-bold mr-2">Powered by</h1>
                        <div className="flex">
                            <LinkImage url="https://react.dev" image={react} alt="React"/>
                            <LinkImage url="https://firebase.google.com/" image={firebase} alt="Firebase"/>
                            <LinkImage url="https://tailwindcss.com/" image={tailwind} alt="TailwindCSS"/>
                            <LinkImage url="https://vitejs.dev/" image={vite} alt="Vite"/>
                        </div>
                    </div>
            </div>
            <div>

            </div>
        </div>
        <div className="w-3/4 h-[1px] my-2 bg-zinc-400"></div>
        <div className="flex">
            <h1 className="md:text-sm text-xs text-center">Copyright {"(C)"} 2024 USAD, All rights reserved.</h1>
        </div>
    </footer>
)

const FooterHeading = (props : {text: string}) => (
    <h1 className="md:text-xl sm:text-lg text-base font-bold my-1">{props.text}</h1>
)

const FooterLink = (props : {url: string, text: string}) => (
    <Link className="text-zinc-400 hover:underline my-1 md:text-base sm:text-sm text-xs" to={props.url}>{props.text}</Link>
)

const FooterAnchor = (props: {url: string, text: string}) => (
    <a className="text-zinc-400 hover:underline my-1 md:text-base sm:text-sm text-xs" href={props.url}>{props.text}</a>
)

const LinkImage = (props : {url: string, image:string, alt:string}) => (
    <a href={props.url} className="flex justify-center items-center mx-1 hover:pb-2 transition-padding duration-100"><img className="md:w-10 w-8" src={props.image} alt={props.alt}/></a>
)