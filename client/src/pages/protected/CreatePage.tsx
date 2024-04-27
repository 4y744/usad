//Import React hooks
import { useState } from "react"

//Import types
import { AlgorithmType } from "../../types";

//Import Firestore hooks
import { usePostAlgorithm } from "../../hooks/firestore";

//Import i18n hooks
import { useTranslation } from "react-i18next";

//Import components
import { PageWrapper } from "../../components/Layout/PageWrapper";
import { Viewer } from "../../components/Viewer";
import { Editor } from "../../components/Editor";

export const CreatePage = () => {
    
    const {t, i18n} = useTranslation();
    
    const [PostAlgorithm] = usePostAlgorithm();
    
    const [algorithm, setAlgorithm] = useState<AlgorithmType>({
        visibility: "public",
        input_type: "multiple",
        language: i18n.language.toUpperCase(),
        editor: "block",
        inputs: [{
            label: "label",
            variable: "var"
        }]
    } as AlgorithmType);
    
    const handlePost = () => {

        PostAlgorithm(algorithm);

    }

    return (
        <PageWrapper>

            <div className="flex items-center
            bg-zinc-900 rounded-md shadow-md
            border border-zinc-700 p-4">

                <div className="flex flex-col">

                    <h1 className="font-medium">
                        {t("create-an-algorithm")}
                    </h1>

                    <span className="text-zinc-300 text-sm">
                        {t("create-page-message")}
                    </span>

                </div>

                <button className="bg-green-700 rounded-md shadow-md
                hover:bg-green-600 px-4 py-2 ml-auto
                active:outline outline-2 outline-green-600 outline-offset-2"
                onClick={handlePost}>
                    {t("post")}
                </button>

            </div>

            <Editor
            algorithm={algorithm}
            reload={(callback: (value: AlgorithmType) => AlgorithmType) => setAlgorithm(callback)}/>

            <Viewer
            algorithm={algorithm}/>

        </PageWrapper>
    )
}