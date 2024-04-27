
//Import React hooks
import { useContext, useRef, useState } from "react";

//Import React Router components
import { Link, useNavigate } from "react-router-dom";

//Import assets
import blank from "../../assets/images/blank-profile-image.png";

//Import hooks
import { useDeleteAlgorithm, useDeleteComment, useEditAlgorithm, useGetAlgorithm, useGetAlgorithms, useGetComments } from "../../hooks/firestore";
import { usePopup } from "../../hooks/popup";
import { useToast } from "../../hooks/toast";
import { useGetImage, useSetImage } from "../../hooks/storage";

//Import utils
import { TimeFormatter } from "../../utils/formatter";
import { AlgorithmSorter, CommentSorter } from "../../utils/sorter";
import { copyToClipboard } from "../../utils/actions";

//Import types
import { AlgorithmSortType, AlgorithmType, CommentSortType, CommentType } from "../../types";

//Import components
import { PageWrapper } from "../../components/Layout/PageWrapper";
import { NotFoundPage } from "../static/NotFoundPage";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Filepicker } from "../../components/Filepicker";

//Import contexts
import { AuthContext } from "../../App";

//Import configs
import { ROOT_URL } from "../../config";
import { useTranslation } from "react-i18next";

export const DashboardPage = () => {

    const {username, email} = useContext(AuthContext);

    const {t} = useTranslation();

    //Gets the current user's algorithms
    const [algorithms, loading, error, reload] = useGetAlgorithms(username);

    //Calculates information to display in InfoBoxes
    const score = algorithms
    .map(algorithm => algorithm.score)
    .reduce((acc, score) => acc + score, 0);

    const forkCount = algorithms
    .map(algorithm => algorithm.forks)
    .reduce((acc, forks) => acc + forks, 0);

    //Get the current user's comments.
    const [comments, commentsLoading, commentsError, reloadComments] = useGetComments({username});

    //Get the current user's pfp.
    const [image, imageLoading, imageError, imageReload] = useGetImage(`pfps/${username}`);

    const filepickerRef = useRef<HTMLInputElement>(null);
    const [UploadImage, uploadLoading] = useSetImage(filepickerRef, `pfps/${username}`, () => imageReload());

    if(error || commentsError){

        return (
            <NotFoundPage/>
        )

    }

    return (
        <PageWrapper>

            <Filepicker
            ref={filepickerRef}/>

            <div className="grid lg:grid-cols-11 grid-cols-4 gap-4">

                <div className="bg-zinc-900 rounded-md shadow-md
                border border-zinc-700
                flex items-center gap-4 p-4 lg:col-span-3 col-span-4">

                    <button onClick={() => UploadImage()}>

                        {imageLoading || uploadLoading ? (
                            <div className="flex justify-center items-center
                            h-16 w-16 ">
                                <LoadingSpinner/>
                            </div>
                        ) : (
                            <img src={image || blank} alt=""
                            className="rounded-full h-16 w-16 
                            border-2 border-green-700"/>
                        )}

                    </button>

                    <div>
                        <h1 className="text-green-700 text-lg font-medium">{username}</h1>

                        <h2 className="text-zinc-300 text-xs">{email}</h2>
                    </div>
                    
                </div>

                <InfoBox
                title={t("algorithms")}
                faClass="fa-solid fa-code"
                count={algorithms.length}/>

                <InfoBox
                title={t("votes")}
                faClass="fa-solid fa-up-long"
                count={score}/>

                <InfoBox
                title={t("comments")}
                faClass="fa-solid fa-message"
                count={comments.length}/>

                <InfoBox
                title={t("forks")}
                faClass="fa-solid fa-code-fork"
                count={forkCount}/>

            </div>

            <AlgorithmList
            algorithms={algorithms}
            loading={loading}
            reload={reload}/>

            <CommentList
            comments={comments}
            loading={commentsLoading}
            reload={reloadComments}/>
            
        </PageWrapper>
        
    )
}

const InfoBox = ({title, faClass, count} : {title: string, faClass: string, count: number}) => {

    return (
        <div className="bg-green-700 rounded-md shadow-md
        flex flex-col justify-center col-span-2
        text-white p-4">
                    
            <h1 className="text-white font-medium text-xl">{title}</h1>
                
            <div className="flex items-center gap-2">

                <i className={`${faClass} text-lg`}/>

                <span className="text-xl">{count}</span>
                        
            </div>

        </div>
    )
}


const AlgorithmList = ({algorithms, loading, reload} : {algorithms: AlgorithmType[], loading: boolean, reload: (callback: (value: AlgorithmType[]) => AlgorithmType[]) => void}) => {

    const [sort, setSort] = useState<AlgorithmSortType>("post-date");

    const {t} = useTranslation();

    return (
        <div className="flex flex-col
        bg-zinc-900 rounded-md shadow-md
        border border-zinc-700">

            <div className="lg:grid hidden grid-cols-10 px-4 py-4
            border-b border-b-zinc-700 font-medium text-sm mr-4">

                <button className="col-span-2 text-start hover:underline"
                onClick={() => setSort(sort != "alphabetical-order" ? "alphabetical-order" : "reverse-alphabetical-order")}>
                    {t("title")}
                </button>

                <button className="text-start hover:underline"
                onClick={() => setSort(sort != "language" ? "language" : "reverse-language")}>
                    {t("language")}
                </button>

                <button className="text-start hover:underline"
                onClick={() => setSort(sort != "post-date" ? "post-date" : "reverse-post-date")}>
                    {t("post-date")}
                </button>

                <button className="text-start hover:underline"
                onClick={() => setSort(sort != "visibility" ? "visibility" : "reverse-visibility")}>
                    {t("visibility")}
                </button>
                    
                <button className="text-start hover:underline"
                onClick={() => setSort(sort != "score" ? "score" : "reverse-score")}>
                    {t("votes")}
                </button>

                <button className="text-start hover:underline"
                onClick={() => setSort(sort != "comments" ? "comments" : "reverse-comments")}>
                    {t("comments")}
                </button>

                <button className="text-start hover:underline"
                onClick={() => setSort(sort != "forks" ? "forks" : "reverse-forks")}>
                    {t("forks")}
                </button>

                <div className="text-start col-span-2">
                    {t("action")}
                </div>

            </div>

            <div className="lg:hidden flex items-center px-4 py-2
            border-b border-b-zinc-700">

                <h1 className="font-medium">{t("algorithms")}</h1>

                <select className="bg-zinc-800 rounded-md
                ml-auto p-2 text-sm"
                onChange={(event) => setSort(event.target.value as AlgorithmSortType)}>

                    <option value="alphabetical-order">
                        {t("alphabetically")}
                    </option>

                    <option value="reverse-alphabetical-order">
                        {t("reverse-alphabetically")}
                    </option>

                    <option value="post-date">
                        {t("post-date")}
                    </option>

                    <option value="reverse-post-date">
                        {t("reverse-post-date")}
                    </option>

                    <option value="language">
                        {t("language")}
                    </option>

                    <option value="reverse-language">
                        {t("reverse-language")}
                    </option>

                    <option value="visibility">
                        {t("visibility")}
                    </option>

                    <option value="reverse-visibility">
                        {t("reverse-visibility")}
                    </option>

                    <option value="votes">
                        {t("votes")}
                    </option>

                    <option value="reverse-votes">
                        {t("reverse-votes")}
                    </option>

                    <option value="comments">
                        {t("comments")}   
                    </option>

                    <option value="reverse-comments">
                        {t("reverse-comments")}
                    </option>

                    <option value="forks">
                        {t("forks")}
                    </option>

                    <option value="reverse-forks">
                        {t("reverse-forks")}
                    </option>

                </select>

            </div>

            <div className="h-[60vh] overflow-y-scroll">

                {loading ? (

                    <div className="flex justify-center items-center mt-4">
                        <LoadingSpinner/>
                    </div>

                ) : (
                    <>
                    {algorithms
                    .sort(AlgorithmSorter[sort])
                    .map((algorithm, index) => (

                        <Algorithm
                        reload={reload}
                        algorithm={algorithm}
                        key={index}/>

                    ))}
                    </>
                )}
                
            </div>

        </div>
    )
}

const Algorithm = ({algorithm, reload} : {algorithm: AlgorithmType, reload: (callback: (value: AlgorithmType[]) => AlgorithmType[]) => void}) => {

    const [EditAlgorithm, editLoading] = useEditAlgorithm();
    const [DeleteAlgorithm, deleteLoading] = useDeleteAlgorithm();

    const {SetPopup} = usePopup();
    const {AddToast} = useToast();

    const navigate = useNavigate();

    const {t} = useTranslation();

    const handleFork = () => {

        SetPopup({
            title: t("fork-message"),
            text: `${t('fork-message-text')} ${algorithm.title}?`,
            type: "confirm",
            callback: () => {

                navigate(`/fork/${algorithm.id}`)

            }
        });
    }

    const handleCopy = () => {

        const url = `${ROOT_URL}/algorithm/${algorithm.id}`;

        copyToClipboard(url);

        AddToast({
            title: t("copied"),
            text: `${url} ${t("copied-text")}`,
            type: "info"
        });

    }

    const handleToggleLock = () => {

        const newVisibility = algorithm.visibility == "public" ? "private" : "public";

        SetPopup({
            title: t("change-visibility"),
            text: `${t("change-visibility")} ${algorithm.title}?`,
            type: "confirm",
            callback: () => {

                EditAlgorithm(algorithm.id, {visibility: newVisibility}, () => {

                    reload(prev => prev.map(alg => {

                        if(alg.id == algorithm.id){
                            alg.visibility = newVisibility;
                        }

                        return alg;
                    }));
                    
                });

            }
        });   

    }

    const handleEdit = () => {

        SetPopup({
            title: t("edit-message"),
            text: `${t("edit-message-text")} ${algorithm.title}?`,
            type: "confirm",
            callback: () => {

                navigate(`/edit/${algorithm.id}`)

            }
        })

    }

    const handleDelete = () => {

        SetPopup({
            title: t("delete-message"),
            text: `${t("delete-message-text")} ${algorithm.title}?`,
            type: "delete",
            callback: () => {

                DeleteAlgorithm(algorithm.id, () => {

                    reload(prev => prev.filter(alg => alg.id != algorithm.id));

                })

            }
        });

    }

    return (
        <div className="lg:grid lg:items-center flex flex-col grid-cols-10
        border-b border-b-zinc-700 px-4 py-2">
                        
            <div className=" lg:grid grid-cols-3 col-span-3 flex gap-2">

                <Link className="col-span-2 text-white
                hover:underline text-sm truncate"
                to={`/algorithm/${algorithm .id}`}>
                    {algorithm.title}   
                </Link>

                <div className="bg-zinc-800 rounded-md shadow-md
                text-xs w-fit px-2 py-1">
                {algorithm.language} 
                </div>

            </div>

            <div className="text-xs text-zinc-300">

                {TimeFormatter.DayMonthYear(algorithm.created)}

            </div>

            <div className="lg:grid grid-cols-4 col-span-4 flex gap-2">

                {algorithm.visibility == "public" ? (

                    <div className="text-green-700 font-medium text-sm">
                        <i className="fa-solid fa-eye text-xs pr-1"/>
                        <span>{t("public")}</span>
                    </div>

                ) : (

                    <div className="text-red-700 font-medium text-sm">
                        <i className="fa-solid fa-eye-slash text-xs pr-1"/>
                        <span>{t("private")}</span>
                    </div>

                )}

                <div className="text-green-700 font-medium text-sm">

                    <i className="fa-solid fa-up-long text-xs pr-1"/>
                    <span>{algorithm.score}</span>

                </div>

                <div className="text-green-700 font-medium text-sm">

                    <i className="fa-solid fa-message text-xs pr-1"/>
                    <span>{algorithm.comments}</span>

                </div>

                <div className="text-green-700 font-medium text-sm">

                    <i className="fa-solid fa-code-fork text-xs pr-1"/>
                    <span>{algorithm.forks}</span>

                </div>

            </div>

            <div className="lg:grid grid-cols-5 col-span-2 flex gap-2 lg:ml-0 ml-auto">

                <ActionButton
                faClass="fa-solid fa-code-fork"
                action={handleFork}/>

                <ActionButton
                faClass="fa-solid fa-link"
                action={handleCopy}/>

                <ActionButton
                faClass={algorithm.visibility == "public" ? "fa-solid fa-lock-open" : "fa-solid fa-lock"}
                action={handleToggleLock}
                disabled={editLoading}/>

                <ActionButton
                faClass="fa-solid fa-pen"
                action={handleEdit}/>

                <ActionButton
                faClass="fa-solid fa-trash"
                action={handleDelete}
                disabled={deleteLoading}/>

            </div>
                        
        </div>
    )
}

const CommentList = ({comments, loading, reload} : {comments: CommentType[], loading: boolean, reload: (callback: (value: CommentType[]) => CommentType[]) => void}) => {

    const [sort, setSort] = useState<CommentSortType>("post-date")

    const {t} = useTranslation();

    return (
        <div className="flex flex-col
        bg-zinc-900 rounded-md shadow-md
        border border-zinc-700">

            <div className="flex items-center px-4 py-2
            border-b border-b-zinc-700">

                <h1 className="font-medium text-sm">{t("comments")}</h1>

                <select className="bg-zinc-800 rounded-md
                ml-auto p-2 text-sm"
                onChange={(event) => setSort(event.target.value as CommentSortType)}>

                    <option value="post-date">
                        {t("post-date")}
                    </option>

                    <option value="reverse-post-date">
                        {t("reverse-post-date")}
                    </option>

                </select>

            </div>

            <div className="h-[60vh] overflow-y-scroll">

                {loading ? (

                    <div className="flex justify-center items-center">
                        <LoadingSpinner/>
                    </div>

                ) : (
                    <>
                    {comments
                    .sort(CommentSorter[sort])
                     .map((comment, index) => (

                        <Comment
                        comment={comment}
                        reload={reload}
                        key={index}/>

                    ))}
                    </>
                )}

            </div>

        </div>
    )
}

const Comment = ({comment, reload} : {comment: CommentType, reload: (callback: (value: CommentType[]) => CommentType[]) => void}) => {

    const {SetPopup} = usePopup();
    
    const [algorithm] = useGetAlgorithm(comment.postId);

    const [DeleteComment, loading] = useDeleteComment();

    const {t} = useTranslation();

    const handleDelete = () => {

        SetPopup({
            title: t("delete-comment-message"),
            text: `${t("delete-comment-message-text")} ${algorithm.title}?`,
            type: "delete",
            callback: () => {

                DeleteComment(algorithm.id, comment.id, () => {

                    reload(prev => prev.filter(com => com.id != comment.id));

                })

            }
        });

    }

    return (
        <div className="flex flex-col
        border-b last:border-none border-b-zinc-700 px-4 py-2">

            <div className="flex items-center gap-2">

                <Link className="text-white
                hover:underline text-sm truncate"
                to={`/algorithm/${algorithm .id}`}>
                    {algorithm.title}
                </Link>

                <span className="bg-zinc-800 rounded-md shadow-md
                text-xs px-2 py-1">
                    {algorithm.language} 
                </span>

                <div className="ml-auto">
                    <ActionButton
                    faClass="fa-solid fa-trash"
                    action={handleDelete}
                    disabled={loading}/>
                </div>

            </div>

            <div className="text-xs text-zinc-300">

                {TimeFormatter.DayMonthYear(comment.created)}

            </div>

            <div className="text-sm mt-2">
                {comment.text}
            </div>
 

        </div>
    )
}

const ActionButton = ({faClass, action, disabled} : {faClass: string, action: () => void, disabled?: boolean}) => {

    return (
        <button className={`bg-zinc-800 rounded-md shadow-md
        h-8 w-8 text-sm transition-background duration-200
        ${disabled ? "opacity-50" : "hover:bg-zinc-700 active:outline outline-2 outline-green-700 outline-offset-2"}`}
        disabled={disabled}
        onClick={action}>
            <i className={faClass}/>
        </button>
    )
}