import { useEffect, useRef, useState } from "react"
import { AlgorithmType } from "../types";
import { t } from "i18next";

export const CodeEditor = ({algorithm, reload} : {algorithm: AlgorithmType, reload: (callback: (value: AlgorithmType) => AlgorithmType) => void}) => {

    const editorRef = useRef<HTMLOListElement>(null);

    const [selectedFont, setSelectedFont] = useState("font-fira");
    const [scale, setScale] = useState(100);

    const handleWrite = () => {

        if(editorRef.current!.innerHTML == ""){

            editorRef.current!.blur();

            editorRef.current!.innerHTML = "<li></li>"

        }
    

        reload(prev => ({...prev, code: editorRef.current!.innerText}));
    }

    useEffect(() => {

        editorRef.current!.innerHTML = algorithm.code
        .split("\n")
        .map(line => `<li>${line}</li>`).join("\n");

    }, [algorithm.editor])

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

    return (
        <div className="">

            <div className="flex flex-wrap items-center gap-2 p-2
            border-b border-b-zinc-700">

                <select className="bg-zinc-800 rounded-md
                hover:bg-zinc-700 px-2 h-8"
                onChange={(event) => setSelectedFont(event.target.value)} 
                defaultValue={"font-fira"}>

                    <option value="font-fira">
                        Fira Code
                    </option>

                    <option value="font-inter">
                        Inter
                    </option>

                    <option value="font-jbm">
                        JetBrains Mono
                    </option>

                    <option value="font-monospace">
                        Monospace
                    </option>

                </select>

                <div className="flex justify-center items-center
                bg-zinc-800 rounded-md shadow-md h-8 w-28
                overflow-hidden">

                    <button className="hover:bg-zinc-700 h-8 w-8 mr-auto"
                    onClick={() => {

                        if(scale < 200){

                            setScale(scale + 25)

                        }

                    }}>+</button>

                    <span>{scale}%</span>

                    <button className="hover:bg-zinc-700 h-8 w-8 ml-auto"
                    onClick={() => {
                        
                        if(scale > 50){

                            setScale(scale - 25)

                        }

                    }}>-</button>

                </div>

            </div>

            <div className="border-b border-b-zinc-700 p-4
            text-zinc-300">
                {t("use-post-message")}
            </div>

            <div className={`h-[500px] overflow-auto ${selectedFont} ${getFontSize(scale)}`}>
                <ol className={`
                w-auto h-60 outline-none
                list-decimal relative p-4
                marker:text-gray-300 marker:${getFontSize(scale)}`}
                style={{marginLeft: scale / 2}}
                ref={editorRef}
                suppressContentEditableWarning={true}
                spellCheck={false}
                contentEditable={true}
                onKeyUp={handleWrite}>
                    <li></li>
                </ol>
            </div>

        </div>
    )
}