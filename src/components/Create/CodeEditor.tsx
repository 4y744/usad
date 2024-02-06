import { MutableRefObject, useRef } from "react"

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

    return (
        <div className="bg-zinc-800 rounded-md shadow-md
        focus-within:outline outline-2 outline-green-600
        overflow-auto font-monospace">
            <ol className="w-auto h-60 outline-none
            ml-8 list-decimal relative p-4
            marker:text-gray-300 marker:text-base"
            ref={editorRef}
            contentEditable={true}
            suppressContentEditableWarning={true}
            spellCheck={false}
            onKeyUp={() => checkIntegrity()}>
                <li></li>
            </ol>
        </div>
    )
}