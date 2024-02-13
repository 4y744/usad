import { ChangeEvent, Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react"
import { algorithmDraftType, inputType } from "../../types";
import { useTranslation } from "react-i18next";

export const InputEditor = ({draftRef} : {draftRef: MutableRefObject<algorithmDraftType>}) => {

    const [inputType, setInputType] = useState<"single" | "multiple">("multiple");
    const [input, setInput] = useState<inputType[]>([]);

    const {t} = useTranslation();

    useEffect(() => {
        draftRef.current.inputs = input;   
    }, [input])

    useEffect(() => {
        draftRef.current.input_type = inputType;
    }, [inputType])


    return (
        <div className="bg-zinc-800 rounded-md shadow-md
            flex flex-col gap-5 p-4">

            <div className="bg-zinc-900 rounded-md shadow-md px-4 py-2 
            flex flex-wrap justify-center items-center gap-5 p-4">

                <h1 className="text-lg font-semibold">{t("inputs")}</h1>

                <div className="bg-zinc-800 rounded-md shadow-md
                flex gap-1">

                    <button className="rounded-l-md
                    hover:bg-green-600 px-4 py-2
                    active:outline outline-2 outline-green-600 outline-offset-2"
                    onClick={() => setInputType("single")}>
                        {t("single")}
                    </button>

                    <button className="rounded-r-md
                    hover:bg-green-600 px-4 py-2
                    active:outline outline-2 outline-green-600 outline-offset-2"
                    onClick={() => setInputType("multiple")}>
                        {t("multiple")}
                    </button>

                </div>

            </div>

            {inputType == "multiple" 
                ? <BoxInputs setInputs={(data) => setInput(data)}/>
                : <FieldInput setInputs={(data) => setInput(data)}/>
                
            }

        </div>
    )
}


const BoxInputs = ({setInputs} : {setInputs: (data: inputType[]) => void}) => {

    const [inputBoxes, setInputBoxes] = useState<inputType[]>([]);

    const {t} = useTranslation()

    const remove = (id: number) => {
        setInputBoxes(inputBoxes.filter((item) => item.id !== id));
    }

    const add = () => {
        setInputBoxes([
            ...inputBoxes,
            {
                id: Date.now(),
                variable: "",
                label: ""
            }
        ])
    }

    const updateVariable = (str: string, id: number) => {
        setInputBoxes(inputBoxes.map((input) => {
            if(input.id == id) input.variable = str;
            return input;
        }))
    }

    const updateLabel = (str: string, id: number) => {
        setInputBoxes(inputBoxes.map((input) => {
            if(input.id == id) input.label = str;
            return input;
        }))
    }

    useEffect(() => {
        setInputs(inputBoxes);
    }, [inputBoxes])

    return (
        <div className="flex flex-col gap-3">

            <button className="bg-zinc-900 rounded-md shadow-md
            hover:bg-green-600 w-fit px-4 py-2
            active:outline outline-2 outline-green-600 outline-offset-2
            flex items-center justify-center"
            onClick={() => add()}>
                <i className="fa-solid fa-plus pr-2"/>
                <h1>{t("add-new-input")}</h1>
            </button>



            <div className="bg-zinc-900 rounded-md shadow-md
            grid lg:grid-cols-1 gap-5 p-4 max-h-[250px] overflow-auto">
                {
                    inputBoxes.map((input) => (

                    <div className="flex items-center gap-5"
                    key={input.id}>

                        <input className="bg-zinc-800 rounded-md shadow-md
                        focus-within:outline outline-2 outline-green-600 outline-offset-2
                        p-2 w-full text-sm"     
                        placeholder="Enter a variable name"
                        defaultValue={input.variable}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => updateVariable(event.target.value, input.id)}
                        maxLength={16}>
                        </input>

                        <input className="bg-zinc-800 rounded-md shadow-md
                        focus-within:outline outline-2 outline-green-600 outline-offset-2
                        p-2 w-full text-sm"     
                        placeholder="Enter a label"
                        defaultValue={input.label}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => updateLabel(event.target.value, input.id)}
                        maxLength={32}>
                        </input>
                        
                        <button className="bg-red-700 rounded-md shadow-md hover:bg-red-600
                        active:outline outline-2 outline-red-600 outline-offset-2
                        h-8 aspect-square"
                        onClick={() => remove(input.id)}>
                            <i className="fa-solid fa-xmark text-lg"></i>
                        </button>

                    </div> 

                ))}
            </div>
            <p className="text-sm text-pretty text-zinc-300">
                {t("single-input-text")}
                <span className="font-bold text-green-600"> [{t("variable-name")}]</span>.
            </p>
        </div>        
    )
}

const FieldInput = ({setInputs} : {setInputs: (data: inputType[]) => void}) => {

    const [inputField, setInputField] = useState<inputType>({} as inputType);
    
    const {t} = useTranslation();

    const updateVariable = (str: string) => {
        setInputField({
            id: 0,
            variable: str,
            label: inputField.label
        })
    }

    const updateLabel = (str: string) => {
        setInputField({
            id: 0,
            variable: inputField.variable,
            label: str
        })
    }

    useEffect(() => {
        setInputs([inputField]);
    }, [inputField])

    return (
        <div className="flex flex-col">
            <div className="bg-zinc-900 rounded-md shadow-md
            flex gap-5 p-4">

                <input className="bg-zinc-800 rounded-md shadow-md
                focus-within:outline outline-2 outline-green-600 outline-offset-2
                p-2 w-full text-sm"     
                placeholder={t("enter-variable-name")}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateVariable(event.target.value)}
                maxLength={16}>
                </input>

                <input className="bg-zinc-800 rounded-md shadow-md
                focus-within:outline outline-2 outline-green-600 outline-offset-2
                p-2 w-full text-sm"     
                placeholder={t("enter-label")}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateLabel(event.target.value)}
                maxLength={32}>
                </input>


            </div> 
            
            <p className="text-sm text-pretty text-zinc-300 mt-2">
                {t("multiple-input-text")} 
                <span className="font-bold text-green-600">[{t("variable-name")}]</span>
                <span className="font-bold text-red-600">[{t("index")}]</span>.
            </p>
        </div>
    )
}


