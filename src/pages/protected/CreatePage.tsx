//Import React hooks
import { useContext, useRef, useState } from "react"

//Import types
import { algorithmDocType, algorithmDraftType } from "../../types";

//Import components
import { CodeEditor } from "../../components/AlgorithmEditor/CodeEditor";
import { PageWrapper } from "../../components/Layout/PageWrapper";
import { Preview } from "../../components/AlgorithmEditor/Preview";
import { InfoEditor } from "../../components/AlgorithmEditor/InfoEditor";
import { InputEditor } from "../../components/AlgorithmEditor/InputEditor";
import { BlockEditor } from "../../components/AlgorithmEditor/BlockEditor";

//Import Firestore hooks
import { usePostAlgorithm } from "../../hooks/firestore";

//Import contexts
import { AuthContext } from "../../contexts";

//Import i18n hooks
import { useTranslation } from "react-i18next";

export const CreatePage = () => {


    const user = useContext(AuthContext);
    
    const algorithmDraft = useRef<algorithmDraftType>({} as algorithmDraftType);

    const {t} = useTranslation();

    const [editorType, setEditorType] = useState<"code" | "block">("block");
    
    const {PostAlgorithm, loading, error} = usePostAlgorithm();

    const handlePost = () => {
        PostAlgorithm({
            author: user.username,
            created: Date.now(),
            ...algorithmDraft.current
        } as algorithmDocType)
    }

    return (
        <PageWrapper>

            <div className="grid grid-cols-1 place-items-center
            gap-5 md:w-5/6 w-[95%]">

                <div className="bg-zinc-900 rounded-md shadow-md
                flex md:flex-row flex-col justify-center items-center
                w-full p-4">
                    <h1 className="md:text-xl text-lg
                    font-semibold text-center p-4">{t("create-an-algorithm")}</h1>
                    
                    <div className="bg-zinc-800 rounded-md shadow-md 
                    flex items-center justify-center gap-5
                    p-4 w-fit md:ml-auto">
                        <h2 className="lg:text-base text-xs">{t("ready-to-post")}</h2>
                        
                        <button className="bg-green-700 rounded-md shadow-md
                        hover:bg-green-600 px-4 py-2
                        active:outline outline-2 outline-green-600 outline-offset-2"
                        onClick={() => handlePost()}>{t("post")}</button>
                    </div>

                </div>

                <div className="bg-zinc-900 rounded-md shadow-md
                grid lg:grid-cols-2 grid-cols-1 gap-5
                p-8 w-full">
                    
                    <InfoEditor
                    draftRef={algorithmDraft}/>

                    <InputEditor
                    draftRef={algorithmDraft}/>
                    
                </div>

                <div className="bg-zinc-900 rounded-md shadow-md 
                p-8 w-full
                flex flex-col gap-5">

                    <div className="bg-zinc-800 rounded-md shadow-md 
                    p-2 w-full
                    flex items-center justify-center flex-wrap gap-3">
                        <h1 className="font-medium">{t("choose-a-way-to-edit")}</h1>

                        <div className="grid grid-cols-2 gap-3">
                            <button className="bg-green-700 rounded-md shadow-md
                            hover:bg-green-600 px-4 py-2
                            active:outline outline-2 outline-green-600 outline-offset-2"
                            onClick={() => setEditorType("code")}>
                                {t("code-editor")}
                            </button>

                            <button className="bg-green-700 rounded-md shadow-md
                            hover:bg-green-600 px-4 py-2
                            active:outline outline-2 outline-green-600 outline-offset-2"
                            onClick={() => setEditorType("block")}>
                                {t("block-editor")}
                            </button>
                        </div>
                    </div>

                    {editorType == "code" ? 
                        <CodeEditor
                        draftRef={algorithmDraft}/> :

                        <BlockEditor
                        draftRef={algorithmDraft}/>
                    }


                </div>
                
                <div className="bg-zinc-900 rounded-md shadow-md
                p-8 w-full">

                    <Preview 
                    draftRef={algorithmDraft}/>

                </div>


            </div>
            
        </PageWrapper>
    )
}