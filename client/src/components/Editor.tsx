import { useTranslation } from "react-i18next";
import { AlgorithmType } from "../types";
import { BlockEditor } from "./BlockEditor/BlockEditor";
import { CodeEditor } from "./CodeEditor";

export const Editor = ({algorithm, reload} : {algorithm: AlgorithmType, reload: (callback: (value: AlgorithmType) => AlgorithmType) => void}) => {

    const {t} = useTranslation();

    return (
        <>
        <div className="grid md:grid-cols-2 grid-cols-1
        bg-zinc-900 rounded-md shadow-md
        border border-zinc-700">

            <div className="
            border-r border-r-zinc-700">

                <h1 className="border-b border-b-zinc-700
                font-medium p-4">
                    {t("information")}
                </h1>

                <div className="flex flex-col gap-2
                p-4 h-[300px]">

                    <span className="text-sm">
                        {t("title")}
                    </span>

                    <input className="bg-zinc-900 px-4 py-2
                    border border-zinc-700 rounded-md
                    focus:outline outline-2 outline-green-600 outline-offset-2"
                    type="text"
                    defaultValue={algorithm.title}
                    placeholder={t("enter-title")}
                    onChange={(event) => reload(prev => ({...prev, title: event.target.value}))}/>

                    <span className="text-sm">
                        {t("description")}
                    </span>
                        
                    <textarea className="bg-zinc-900 px-4 py-2
                    border border-zinc-700 rounded-md text-sm
                    focus:outline outline-2 outline-green-600 outline-offset-2
                    resize-none"
                    defaultValue={algorithm.description}
                    spellCheck={false}
                    placeholder={t("enter-description")}
                    onChange={(event) => reload(prev => ({...prev, description: event.target.value}))}/>

                    <div className="flex gap-4">

                        <div className="flex flex-col gap-2">

                            <h1 className="text-sm">
                                {t("visibility")}
                            </h1>

                            <div className="flex w-fit
                            rounded-md shadow-md overflow-hidden">

                                <button className={`${algorithm.visibility == "public" ? "bg-green-700 hover:bg-green-600" : "bg-zinc-800 hover:bg-zinc-700"}
                                px-2 py-1`}
                                onClick={() => reload(prev => ({...prev, visibility: "public"}))}>
                                    <i className="fa-solid fa-eye"/>
                                </button>
                                    
                                <button className={`${algorithm.visibility == "private" ? "bg-green-700 hover:bg-green-600" : "bg-zinc-800 hover:bg-zinc-700"}
                                px-2 py-1`}
                                onClick={() => reload(prev => ({...prev, visibility: "private"}))}>
                                    <i className="fa-solid fa-eye-slash"/>
                                </button>

                            </div>
                                
                        </div>

                        <div className="flex flex-col gap-2">

                            <h1 className="text-sm">
                                {t("language")}
                            </h1>

                            <div className="flex w-fit
                            rounded-md shadow-md overflow-hidden">

                                <button className={`${algorithm.language == "BG" ? "bg-green-700 hover:bg-green-600" : "bg-zinc-800 hover:bg-zinc-700"}
                                px-2 py-1`}
                                onClick={() => reload(prev => ({...prev, language: "BG"}))}>
                                    BG
                                </button>
                                    
                                <button className={`${algorithm.language == "EN" ? "bg-green-700 hover:bg-green-600" : "bg-zinc-800 hover:bg-zinc-700"}
                                px-2 py-1`}
                                onClick={() => reload(prev => ({...prev, language: "EN"}))}>
                                    EN
                                </button>

                            </div>
                                
                        </div>

                    </div>

                </div>

            </div>

            <div>

                <h1 className="border-b border-b-zinc-700
                font-medium p-4">
                    {t("inputs")}
                </h1>

                <div className="flex flex-col gap-2
                p-4 h-[300px]">

                    <span className="text-sm">
                        {t("input-type")}
                    </span>

                    <div className="flex w-fit
                    rounded-md shadow-md overflow-hidden">

                        <button className={`${algorithm.input_type == "single" ? "bg-green-700 hover:bg-green-600" : "bg-zinc-800 hover:bg-zinc-700"}
                        px-2 py-1`}
                        onClick={() => reload(prev => ({...prev, input_type: "single", inputs: [prev.inputs[0]]}))}>
                            {t("single")}
                        </button>
                                    
                        <button className={`${algorithm.input_type == "multiple" ? "bg-green-700 hover:bg-green-600" : "bg-zinc-800 hover:bg-zinc-700"}
                        px-2 py-1`}
                        onClick={() => reload(prev => ({...prev, input_type: "multiple"}))}>
                            {t("multiple")}
                        </button>

                    </div>

                    <div className="flex items-center">

                        <span className="text-sm">
                            {t("configure-inputs")}
                        </span>

                        <button className={`h-8 w-8 ml-auto
                        bg-zinc-800 rounded-md shadow-md
                        outline-2 outline-green-600 outline-offset-2
                        ${algorithm.input_type == "single" ? "opacity-50" : "hover:bg-zinc-700 active:outline "}`}
                        onClick={() => reload(prev => ({...prev, inputs: [...prev.inputs || [], {label: "", variable: ""}]}))}
                        disabled={algorithm.input_type == "single"}>

                            <i className="fa-solid fa-plus"/>

                        </button>

                    </div>

                    <div className="flex flex-col gap-2
                    h-[160px] overflow-y-scroll p-1">

                        {algorithm.inputs.map((input, index) => (

                            <div className="grid grid-cols-9 gap-2"
                            key={index}>

                                <input className="bg-zinc-900 rounded-md col-span-4
                                border border-zinc-700 px-4 py-2 text-sm
                                focus:outline outline-2 outline-green-600 outline-offset-2"
                                type="text"
                                defaultValue={input.label}
                                placeholder={t("enter-label")}
                                onChange={(event) => reload(prev => ({...prev, inputs: prev.inputs?.map((input, i) => {

                                    if(i == index){
                                        input.label = event.target.value
                                    }

                                    return input;

                                })}))}/>

                                <input className="bg-zinc-900 rounded-md col-span-4
                                border border-zinc-700 px-4 py-2 text-sm
                                focus:outline outline-2 outline-green-600 outline-offset-2"
                                type="text"
                                defaultValue={input.variable}
                                placeholder={t("enter-variable")}
                                onChange={(event) => reload(prev => ({...prev, inputs: prev.inputs?.map((input, i) => {

                                    if(i == index){
                                        input.variable = event.target.value
                                    }

                                    return input;

                                })}))}/>

                                <button className="bg-red-700 hover:bg-red-600 
                                rounded-md shadow-md
                                active:outline outline-2 outline-red-600 outline-offset-2"
                                onClick={() => reload(prev => ({...prev, inputs: prev.inputs?.filter((input, i) => {

                                    if(prev.inputs.length == 1){
                                        return true;
                                    }

                                    return index != i;

                                })}))}>
                                    <i className="fa-solid fa-trash"/>
                                </button>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>

        <div className="bg-zinc-900 rounded-md shadow-md
        border border-zinc-700">

            <div className="flex items-center p-4
            border-b border-b-zinc-700">

                 <h1 className="font-medium">
                    {t("editor")}
                </h1>

                <div className="flex w-fit ml-auto
                rounded-md shadow-md overflow-hidden">

                    <button className={`${algorithm.editor == "code" ? "bg-green-700 hover:bg-green-600" : "bg-zinc-800 hover:bg-zinc-700"}
                    flex items-center gap-2 px-2 py-1`}
                    onClick={() => reload(prev => ({...prev, editor: "code"}))}>

                        <span>{t("code-editor")}</span>

                        <i className="fa-solid fa-code"/>

                    </button>
                                        
                    <button className={`${algorithm.editor == "block" ? "bg-green-700 hover:bg-green-600" : "bg-zinc-800 hover:bg-zinc-700"}
                    flex items-center gap-2 px-2 py-1`}
                    onClick={() => reload(prev => ({...prev, editor: "block"}))}>

                        <span>{t("block-editor")}</span>

                        <i className="fa-solid fa-arrow-pointer"/>

                    </button>

                </div>

            </div>

            <>
                {algorithm.editor == "block" ? (

                    <BlockEditor
                    algorithm={algorithm}
                    reload={reload}/>
                    
                ) : (
                    
                    <CodeEditor
                    algorithm={algorithm}
                    reload={reload}/>
                )}
            </>
                
        </div>
        </>   
    )
}