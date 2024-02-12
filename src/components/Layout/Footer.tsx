import { Link } from "react-router-dom"

import firebase from "../../assets/images/logos/firebase.png"
import react from "../../assets/images/logos/react.png"
import vite from "../../assets/images/logos/vite.png"
import tailwind from "../../assets/images/logos/tailwind.png"
import { useTranslation } from "react-i18next"

export const Footer = () => {

    const {t} = useTranslation();

    return (
        <footer className="bg-zinc-900 w-full flex flex-col items-center justify-center text-white py-5">
            <div className="sm:w-fit w-full">
                <div className="flex flex-wrap justify-center items-center">

                        <div className="flex flex-col flex-1 md:mx-8 mx-4">
                            <FooterHeading text={t("project")}/>
                            <FooterAnchor url="https://github.com/4y744/USAD" text="GitHub"/>
                            <FooterLink url="#" text={t("documentation")}/>
                            <FooterLink url="/about" text={t("about")}/>
                        </div>

                        <div className="flex flex-col flex-1 md:mx-8 mx-4">
                            <FooterHeading text={t("resources")}/>
                            <FooterLink url="#" text={t("faq")}/>
                            <FooterLink url="#" text={t("tutorial")}/>
                            <FooterLink url="#" text={t("contact")}/>
                        </div>
            
                        <div className="flex flex-col flex-1 md:mx-8 mx-4">
                            <FooterHeading text={t("legal")}/>
                            <FooterAnchor url="https://www.gnu.org/licenses/gpl-3.0.html" text="GNU GPLv3"/>
                            <FooterAnchor url="https://github.com/4y744/USAD/blob/main/LICENSE" text={t("license")}/>
                            <FooterLink url="#" text={t("tos")}/>
                        </div>

                        <div className="flex flex-wrap justify-center items-center h-16 mx-4">
                            <h1 className="md:text-lg text-base font-bold mr-2">{t("poweredby")}</h1>
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
                <h1 className="md:text-sm text-xs text-center">{t("copyright")} {"(C)"} 2024 USAD, {t("all-rights-reserved")}.</h1>
            </div>
        </footer>
    )
}

const FooterHeading = (props : {text: string}) => (
    <h1 className="md:text-xl sm:text-lg text-base font-bold my-1">{props.text}</h1>
)

const FooterLink = (props : {url: string, text: string}) => (
    <Link className="text-zinc-400 hover:underline my-1 md:text-base sm:text-sm text-xs" to={props.url}>{props.text}</Link>
)

const FooterAnchor = (props: {url: string, text: string}) => (
    <a className="text-zinc-400 hover:underline my-1 md:text-base sm:text-sm text-xs" href={props.url} target="_blank">{props.text}</a>
)

const LinkImage = (props : {url: string, image:string, alt:string}) => (
    <a href={props.url} className="flex justify-center items-center mx-1 hover:pb-2 transition-padding duration-100"><img className="md:w-10 w-8" src={props.image} alt={props.alt}/></a>
)