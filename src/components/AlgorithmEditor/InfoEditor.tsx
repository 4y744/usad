import { MutableRefObject, useEffect } from "react"
import { algorithmDraftType } from "../../types"
import { useTranslation } from "react-i18next"

export const InfoEditor = ({draftRef} : {draftRef: MutableRefObject<algorithmDraftType>}) => {

    const {t} = useTranslation();

    useEffect(() => {
        draftRef.current.visibility = "public";
    }, [])
    
    return (
        <div className="bg-zinc-800 rounded-md shadow-md
        flex flex-col gap-5 p-4">

            <div className="bg-zinc-900 rounded-md shadow-md
            flex flex-col gap-2 p-4">
                <h1 className="text-lg font-semibold">{t("title")}</h1>
                <input type="text" maxLength={64} 
                spellCheck={false} 
                placeholder={t("enter-title")}
                className="bg-zinc-800 rounded-md shadow-md
                p-2
                focus:outline outline-2 outline-green-600 outline-offset-2"
                onChange={(event) => draftRef.current.title = event.target.value}/>
            </div>

            <div className="bg-zinc-900 rounded-md shadow-md
            flex flex-col gap-2 p-4">
                <h1 className="text-lg font-semibold">{t("description")}</h1>
                <textarea maxLength={1024} spellCheck={false}
                placeholder={t("enter-description")}
                className="bg-zinc-800 rounded-md shadow-md resize-none
                focus:outline outline-2 outline-green-600 outline-offset-2
                p-2 h-60 text-sm"
                onChange={(event) => draftRef.current.description = event.target.value}/>
            </div>

            <div className="bg-zinc-900 rounded-md shadow-md
            flex items-center gap-3 p-4">
                
                <h2 className="font-semibold text-base">{t("visibility")}</h2>
                
                <select className="bg-zinc-800 rounded-md shadow-md
                active:outline ouline-2 outline-green-600
                hover:bg-zinc-700 px-4 py-2 text-sm"
                defaultValue={"public"}
                onChange={(event) => draftRef.current.visibility = event.target.value as "public" | "private"}>

                    <option value="public">
                        {t("public")}
                    </option>
                    <option value="private">
                        {t("private")}
                    </option>

                </select>

                <h2 className="font-semibold text-base">{t("language")}</h2>
                
                <select className="bg-zinc-800 rounded-md shadow-md
                active:outline ouline-2 outline-green-600
                hover:bg-zinc-700 px-4 py-2"
                defaultValue={"public"}
                onChange={(event) => draftRef.current.language = event.target.value}>

                    <option value="BG">
                        {t("BG")}
                    </option>
                    <option value="EN">
                        {t("EN")}
                    </option>

                </select>
            </div>
            
        </div>
    )
}