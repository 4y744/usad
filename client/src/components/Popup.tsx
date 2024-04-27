import { useEffect, useRef, useState } from "react"
import { PopupType } from "../types";
import { useTranslation } from "react-i18next";

const PopupTypes = {
    confirm: {
        primary: "green-700",
        secondary: "green-600",
        action: "confirm"
    },
    delete: {
        primary: "red-700",
        secondary: "red-600",
        action: "delete"
    }
}

export const Popup = () => {

    const [popup, setPopup] = useState<PopupType | undefined>(undefined);

    const {t} = useTranslation();

    const handlePopup = (event: CustomEventInit<PopupType>) => {

        setPopup(event.detail);

    }

    const handleClick = () => {

        if(popup?.callback){
            popup.callback();
        }

        setPopup(undefined);

    }

    useEffect(() => {

        document.addEventListener("setPopup", handlePopup);

        document.addEventListener("keydown", (event) => {

            if(event.key == "Escape"){
                setPopup(undefined);
            }
            
        })

    }, []);

    if(!popup) return (
        <></>
    )

    return (
        <div className="fixed top-0 left-0
        backdrop-blur-sm h-[100dvh] w-full
        flex justify-center items-center animate-popup-blur">

            <div className="bg-zinc-900 rounded-md shadow-md
            border border-zinc-700 p-4
            flex flex-col gap-2 w-[500px] max-w-[90vw]
            animate-popup-slide">
                
                <div className="flex">

                    <h1 className="lg:text-xl text-lg font-medium">{popup?.title}</h1>

                    <button className="flex justify-center items-center
                    hover:bg-zinc-800 active:bg-zinc-700 rounded-md h-8 w-8
                    ml-auto"
                    onClick={() => setPopup(undefined)}>
                        <i className="fa-solid fa-xmark text-xl"/>
                    </button>

                </div>

                <div>
                    <p className="lg:text-sm text-xs text-zinc-300">
                        {popup?.text}
                    </p>
                </div>

                <div className="flex gap-4 mt-2
                lg:text-base text-sm">

                    <button className={`bg-${PopupTypes[popup.type].primary} rounded-md shadow-md
                    hover:bg-${PopupTypes[popup.type].secondary} transition-background duration-200
                    active:outline outline-2 outline-${PopupTypes[popup.type].secondary} outline-offset-2
                    w-full py-2`}
                    onClick={handleClick}>
                        {t(PopupTypes[popup.type].action)}
                    </button>

                    <button className="bg-zinc-800 rounded-md shadow-md
                    hover:bg-zinc-700 transition-background duration-200
                    active:outline outline-2 outline-zinc-700 outline-offset-2
                    w-full py-2"
                    onClick={() => setPopup(undefined)}>
                        {t("cancel")}
                    </button>

                </div>

            </div>

        </div>
    )
}