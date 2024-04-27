
//Import React Router hooks
import { useParams } from "react-router-dom";

//Import Firestore hooks
import { useGetAlgorithm, usePostAlgorithm } from "../../hooks/firestore";

//Import i18n hooks
import { useTranslation } from "react-i18next";

//Import components
import { PageWrapper } from "../../components/Layout/PageWrapper";
import { Viewer } from "../../components/Viewer";
import { Editor } from "../../components/Editor";
import { LoadingPage } from "../static/LoadingPage";
import { NotFoundPage } from "../static/NotFoundPage";

//Import types
import { AlgorithmType } from "../../types";
import { useMemo } from "react";

export const ForkPage = () => {

    const {id} = useParams();
    
    const {t, i18n} = useTranslation();
    
    const [PostAlgorithm] = usePostAlgorithm();

    const [algorithm, loading, error, reload] = useGetAlgorithm(id!);
    
    const handlePost = () => {

        PostAlgorithm({
            title: algorithm.title,
            description: algorithm.description,
            visibility: algorithm.visibility,
            language: algorithm.language,
            editor: algorithm.editor,
            code: algorithm.code,
            input_type: algorithm.input_type,
            inputs: algorithm.inputs,
            fork_of: algorithm.id
        } as AlgorithmType);

    }

    if(loading){

        return (
            <LoadingPage/>
        )

    }

    if(error){

        return (
            <NotFoundPage/>
        )

    }

    return (
        <PageWrapper>

            <div className="flex items-center
            bg-zinc-900 rounded-md shadow-md
            border border-zinc-700 p-4">

                <div className="flex flex-col">

                    <h1 className="flex gap-2
                    font-medium">
                        <span>{t("fork-an-algorithm")}</span>
                        <span className="text-green-700">{algorithm.title}</span>
                    </h1>

                    <span className="text-zinc-300 text-sm">
                        {t("fork-page-message")}
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
            reload={reload}/>

            <Viewer
            algorithm={algorithm}/>

        </PageWrapper>
    )
}