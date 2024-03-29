import { MutableRefObject, useRef, useState } from "react"
import { algorithmDraftType } from "../../types";
import { useTranslation } from "react-i18next";

export const CodeEditor = ({draftRef} : {draftRef: MutableRefObject<algorithmDraftType>}) => {

    const editorRef = useRef<HTMLOListElement>(null);

    //TODO

    // const highlight = () => {

    //     const lines = editorRef.current!.innerText?.split('\n') || []; 

    //         for(let i = 0; i < lines.length; i++){

    //             const line = lines[i].split(" ");

    //             for(let k = 0; k < line.length; k++){
    //                 line[k] = `<span class="text-green-600">${line[k]}</span>`
    //             }

    //             lines[i] = `<li>${line.join(" ")}</li>`

    //         }

    //         editorRef.current!.innerHTML = lines.join("");

    // }




    // const handleKeyDown = (event: KeyboardEvent) => {

    //     if(event.key == "Tab")
    //     {
    //         const anchor = document.getSelection()?.anchorNode;
    //         console.log(document.getSelection()?.anchorNode?.parentElement);
    //         event.preventDefault();
    //     }
    // }

    // useEffect(() => {
    //     editorRef.current!.addEventListener("keydown", handleKeyDown)

    // }, [])

    const [selectedFont, setSelectedFont] = useState("font-fira");
    const [scale, setScale] = useState(100);
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    const {t} = useTranslation(); 

    const checkIntegrity = () => {
        setUnsavedChanges(true);

        if(editorRef.current!.innerHTML == ""){
            editorRef.current!.blur();
            editorRef.current!.innerHTML = "<li></li>"
        }
    }

    const getFontSize = (scale: number) => {
        switch(scale)
        {
            case 25:
                return "text-2xs"
            case 50:
                return "text-xs"
            case 75:
                return "text-sm"
            case 100:
                return "text-base"
            case 125:
                return "text-lg"
            case 150:
                return "text-xl"
            case 175:
                return "text-2xl"
            case 200:
                return "text-3xl"
        }
    }

    const save = () => {
        setUnsavedChanges(false);
        if(!editorRef.current!.textContent) return;

        const logRegex = new RegExp(`\\b${"console.log"}\\b`, 'gi');
        const compiledCode = editorRef.current!.textContent.replace(logRegex, "postMessage")

        draftRef.current.function = btoa(compiledCode);
    }

    return (
        <div className="bg-zinc-800 rounded-md shadow-md
        flex flex-col gap-5 p-4">

            <div className="bg-zinc-900 rounded-md shadow-md
            flex flex-wrap items-center
            gap-2 p-2">
                <select className="bg-zinc-800 rounded-md shadow-md
                active:outline ouline-2 outline-green-600
                hover:bg-zinc-700 px-4 py-2"
                onChange={(event) => setSelectedFont(event.target.value)} 
                defaultValue={"font-fira"}>
                    <option value="font-inter">
                        Inter
                    </option>
                    <option value="font-fira">
                        Fira Code
                    </option>
                    <option value="font-jbm">
                        JetBrains Mono
                    </option>
                    <option value="font-monospace">
                        Monospace
                    </option>
                </select>

                <div className="bg-zinc-800 rounded-md shadow-md
                flex justify-center items-center">
                    <button className="hover:bg-zinc-700 rounded-l-md text-lg
                    active:outline ouline-2 outline-green-600
                    h-10 aspect-square"
                    onClick={() => {if(scale < 200) setScale(scale + 25)}}>+</button>

                    <span className="mx-2 w-10 text-center">{scale}%</span>

                    <button className="hover:bg-zinc-700 rounded-r-md text-lg
                    active:outline ouline-2 outline-green-600
                    h-10 aspect-square"
                    onClick={() => {if(scale > 50) setScale(scale - 25)}}>-</button>
                </div>

                <div>
                    {unsavedChanges ? 
                    <span className="text-red-600 text-sm
                    bg-zinc-800 px-4 py-2 rounded-md shadow-md">{t("unsaved-changes")}</span> : 
                    <span className="text-green-600 text-sm
                    bg-zinc-800 px-4 py-2 rounded-md shadow-md">{t("no-unsaved-changes")}</span>}
                </div>

                <button className="bg-green-700 rounded-md shadow-md
                hover:bg-green-600 px-4 py-2 ml-auto
                active:outline outline-2 outline-green-600 outline-offset-2"
                onClick={() => save()}>{t("save")}</button>
            </div>

            <div className={`bg-zinc-900 rounded-md shadow-md
            h-[50vh]
            focus-within:outline outline-2 outline-green-600
            overflow-auto ${selectedFont} ${getFontSize(scale)}`}>
                <ol className={`
                w-auto h-60 outline-none
                list-decimal relative p-4
                marker:text-gray-300 marker:${getFontSize(scale)}`}
                    style={{marginLeft: scale / 2}}
                    ref={editorRef}
                contentEditable={true}
                suppressContentEditableWarning={true}
                spellCheck={false}
                onKeyUp={() => checkIntegrity()}>
                    <li></li>
                </ol>
            </div>

        </div>
    )
}