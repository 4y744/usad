import { MutableRefObject, SelectHTMLAttributes, useRef, useState } from "react"

export const CodeEditor = ({code} : {code: MutableRefObject<string>}) => {

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


    const checkIntegrity = () => {

        if(editorRef.current!.innerHTML == ""){
            editorRef.current!.blur();
            editorRef.current!.innerHTML = "<li></li>"
        }
    }

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

    const [selectedFont, setSelectedFont] = useState("font-inter");

    const [scale, setScale] = useState(100);

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
        <div className="bg-zinc-800 rounded-md shadow-md
        flex flex-col gap-5 p-4">

            <div className="bg-zinc-900 rounded-md shadow-md
            flex p-2">
                <select className="bg-zinc-800 rounded-md shadow-md
                active:outline ouline-2 outline-green-600
                hover:bg-zinc-700 px-4 py-2" id="operators"
                onChange={(event) => setSelectedFont(event.target.value)} 
                defaultValue={"font-fira"}>
                    <option value="font-inter">
                        Inter
                    </option>
                    <option value="font-fira">
                        Fira Code
                    </option>
                    <option value="font-monospace">
                        Monospace
                    </option>
                </select>

                <div className="bg-zinc-800 rounded-md shadow-md
                flex justify-center items-center ml-auto">
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