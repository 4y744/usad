//Import React hooks
import { useContext } from "react"

//Import React Router hooks
import { useNavigate, useParams } from "react-router-dom";

//Import types
import { AlgorithmType } from "../../types";

//Import Firestore hooks
import { useEditAlgorithm, useGetAlgorithm} from "../../hooks/firestore";

//Import contexts
import { AuthContext } from "../../App";

//Import i18n hooks
import { useTranslation } from "react-i18next";

//Import components
import { PageWrapper } from "../../components/Layout/PageWrapper";
import { Viewer } from "../../components/Viewer";
import { Editor } from "../../components/Editor";
import { NotFoundPage } from "../static/NotFoundPage";
import { LoadingPage } from "../static/LoadingPage";

export const EditPage = () => {
    
    const {id} = useParams();

    const {username} = useContext(AuthContext);
    
    const {t, i18n} = useTranslation();

    const navigate = useNavigate();
    
    const [algorithm, loading, error, reload] = useGetAlgorithm(id!);

    const [EditAlgorithm] = useEditAlgorithm();
    
    const handleEdit = () => {

        EditAlgorithm(algorithm.id, {
            title: algorithm.title,
            description: algorithm.description,
            visibility: algorithm.visibility,
            language: algorithm.language,
            editor: algorithm.editor,
            code: algorithm.code,
            inputs: algorithm.inputs
        } as AlgorithmType, () => navigate(`/algorithm/${algorithm.id}`));

    }

    if(loading){

        return (
            <LoadingPage/>
        )

    }

    if(error || username != algorithm.author){

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
                        <span>{t("edit-an-algorithm")}</span>
                        <span className="text-green-700">{algorithm.title}</span>
                    </h1>

                    <span className="text-zinc-300 text-sm">
                        {t("edit-page-message")}
                    </span>

                </div>

                <button className="bg-green-700 rounded-md shadow-md
                hover:bg-green-600 px-4 py-2 ml-auto
                active:outline outline-2 outline-green-600 outline-offset-2"
                onClick={handleEdit}>
                    {t("save")}
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