//Import React Router hooks
import { Link } from "react-router-dom"

//Import assets
import firebase from "../../assets/images/logos/firebase.png"
import react from "../../assets/images/logos/react.png"
import vite from "../../assets/images/logos/vite.png"
import tailwind from "../../assets/images/logos/tailwind.png"

//Import i18n hooks
import { useTranslation } from "react-i18next"

export const Footer = () => {

    const {t} = useTranslation();

    return (
        <footer className="bg-zinc-900 w-full flex flex-col items-center justify-center text-white py-5">

            <div className="grid grid-cols-3">

                <div className="flex flex-col md:mx-8 mx-4">

                    <FooterHeading
                    text={t("project")}/>

                    <FooterAnchor
                    url="https://github.com/4y744/USAD" 
                    text="GitHub"/>

                    <FooterLink
                    url="https://github.com/4y744/usad/blob/main/README.md" 
                    text={t("documentation")}/>

                    <FooterLink
                    url="/about" 
                    text={t("about")}/>

                </div>

                <div className="flex flex-col md:mx-8 mx-4">

                    <FooterHeading
                    text={t("legal")}/>

                    <FooterAnchor
                    url="https://www.gnu.org/licenses/gpl-3.0.html" 
                    text="GNU GPLv3"/>

                    <FooterAnchor
                    url="https://github.com/4y744/USAD/blob/main/LICENSE" 
                    text={t("license")}/>

                    <FooterLink
                    url="/terms-of-use" 
                    text={t("tos")}/>

                </div>

                <div className="flex flex-col md:mx-8 mx-4">

                    <FooterHeading
                    text={t("poweredby")}/>

                    <FooterAnchorWithImage
                    text="React"
                    url="https://react.dev"
                    image={react} alt="React"/>

                    <FooterAnchorWithImage
                    text="Firebase"
                    url="https://firebase.google.com/"
                    image={firebase} alt="Firebase"/>

                    <FooterAnchorWithImage
                    text="Tailwind"
                    url="https://tailwindcss.com/"
                    image={tailwind} alt="TailwindCSS"/>

                    <FooterAnchorWithImage
                    text="Vite"
                    url="https://vitejs.dev/"
                    image={vite} alt="Vite"/>

                </div>
                
            </div>

            <div className="w-[95%] h-[1px] my-2 bg-zinc-700"/>

            <div className="flex">

                <h1 className="md:text-sm text-xs text-center">
                    {t("copyright")} {"(C)"} 2024 USAD, {t("all-rights-reserved")}.
                </h1>

            </div>

        </footer>
    )
}

const FooterHeading = (props : {text: string}) => (

    <h1 className="md:text-lg sm:text-base text-sm font-medium my-1">
        {props.text}
    </h1>

)

const FooterLink = (props : {url: string, text: string}) => (

    <Link className="text-zinc-400 hover:underline 
    my-1 md:text-sm text-xs" 
    to={props.url}>
        {props.text}
    </Link>

)

const FooterAnchor = (props: {url: string, text: string}) => (

    <a href={props.url}
    className="text-zinc-400 hover:underline 
    my-1 md:text-sm text-xs"
    target="_blank">
        {props.text}
    </a>

)

const FooterAnchorWithImage = (props : {text: string, url: string, image: string, alt: string}) => (

    <a className="flex justify-start items-center gap-1
    text-zinc-400 hover:underline my-1 md:text-sm text-xs"
    href={props.url}>

        <h2>{props.text}</h2>

        <img className="md:w-5 w-4" 
        src={props.image} 
        alt={props.alt}/>

    </a>
)