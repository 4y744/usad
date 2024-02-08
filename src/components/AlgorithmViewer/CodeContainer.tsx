import { validateBase64String } from "../../utils/validator"

export const CodeContainer = ({func} : {func: string}) => {

    const colorCodes = [
        {
            string: "for",
            color: "blue"
        },
        {
            string: "while",
            color: "green"
        },
        {
            string: "let",
            color: "red"
        },
        {
            string: "{",
            color: "orange"
        }
    ]
    
    const highlight = (code: string) => {
        colorCodes.forEach((colorCode) => {
            const codeRegex = new RegExp(`${colorCode.string}`, 'g');
            code = code.replace(codeRegex, `<span style="color:${colorCode.color}">${colorCode.string}</span>`);
        })


        return code;
    }

    const lines = highlight(validateBase64String(func)).split("\n");

    return (
        <>
            <h1 className='text-xl font-semibold mb-2'>JavaScript</h1>

            <div className='bg-zinc-900 rounded-md p-4
            flex flex-col h-60 overflow-auto'>

                <ul className="list-decimal ml-8
                marker:text-zinc-300">
                    {lines.map((line, index) => (
                        <li key={index}
                        dangerouslySetInnerHTML={{__html: line}}
                        className="whitespace-pre-wrap"></li>
                    ))}
                </ul>

            </div>
        </>
    )
        
}