//Import React hooks
import { useState } from "react";

//Import React Router hooks and misc
import { Link, useParams } from "react-router-dom"

//Import firestore hooks
import { useGetAlgorithm, useGetAlgorithms, useGetUser, useGetComments } from "../../hooks/firestore";

//Import custom hooks
import { useGetImage } from "../../hooks/storage"

//Import components
import { PageWrapper } from "../../components/Layout/PageWrapper";
import { LoadingSpinner } from "../../components/LoadingSpinner"
import { NotFoundPage } from "../static/NotFoundPage";
import { LoadingPage } from "../static/LoadingPage";

//Import utils
import { AlgorithmSorter, CommentSorter } from "../../utils/sorter";
import { TimeFormatter } from "../../utils/formatter";

//Import assets
import blank from "../../assets/images/blank-profile-image.png"

//Import types
import { AlgorithmSortType, AlgorithmType, CommentSortType, CommentType } from "../../types";
import { useTranslation } from "react-i18next";

export const UserPage = () => {

    const {username} = useParams();

    const {t} = useTranslation();

    const [user, userLoading, userError] = useGetUser(username!);

    const [algorithms, algorithmsLoading, algorithmsError] = useGetAlgorithms(username!);

    const score = algorithms
    .map(algorithm => algorithm.score)
    .reduce((acc, score) => acc + score, 0);

    const forkCount = algorithms
    .map((algorithm) => algorithm.forks)
    .reduce((acc, len) => acc + len, 0);

    const [comments, commentsLoading, commentsError] = useGetComments({username});

    const [image, imageLoading] = useGetImage(`pfps/${username!}`);

    if(userLoading){

        return (
            <LoadingPage/>
        )

    }

    if(userError || algorithmsError || commentsError){

        return (
            <NotFoundPage/>
        )

    }

    return (
        <PageWrapper>

            <div className="grid lg:grid-cols-11 grid-cols-4 gap-4">

                <div className="bg-zinc-900 rounded-md shadow-md
                border border-zinc-700
                flex items-center gap-4 p-4 lg:col-span-3 col-span-4">

                    {imageLoading ? (
                        <div className="flex justify-center items-center
                        h-16 w-16 ">
                            <LoadingSpinner/>
                        </div>
                    ) : (
                        <img src={image || blank} alt=""
                        className="rounded-full h-16 w-16 
                        border-2 border-green-700"/>
                    )}

                    <div>
                        <h1 className="text-green-700 text-lg font-medium">
                            {username}
                        </h1>

                        <h2 className="text-zinc-300 text-xs">

                            {TimeFormatter.DayMonthYear(user.created)}

                        </h2>
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

                <div className="lg:col-span-7 col-span-4">

                    <AlgorithmList
                    algorithms={algorithms}
                    loading={algorithmsLoading}/>

                </div>

                <div className="lg:col-span-4 col-span-4">

                    <CommentList
                    comments={comments}
                    loading={commentsLoading}/>

                </div>

            </div>

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

const CommentList = ({comments, loading} : {comments: CommentType[], loading: boolean}) => {

    const [sort, setSort] = useState<CommentSortType>("post-date");

    const {t} = useTranslation();
    
    return (
        <div className="flex flex-col
        bg-zinc-900 rounded-md shadow-md
        border border-zinc-700">

            <div className="flex items-center px-4 py-2
            border-b border-b-zinc-700">

                <h1 className="font-medium">{t("comments")}</h1>

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

            <div className="flex flex-col
            h-[60vh] overflow-y-scroll">

                {loading ? (
                    <div className="flex justify-center items-center mt-4">
                        <LoadingSpinner/>
                    </div>
                ) : (
                    <>
                    {comments
                    .sort(CommentSorter[sort as CommentSortType])
                    .map((comment, index) => (
        
                        <Comment
                        comment={comment}
                        key={index}/>
        
                    ))}
                    </>
                )}

            </div>

        </div>
    )
}

const Comment = ({comment} : {comment: CommentType}) => {

    const [algorithm, loading] = useGetAlgorithm(comment.postId);
    
    return (
        <div className="flex flex-col bg-zinc-900
        border-t first:border-none border-t-zinc-700 px-4 py-2">

            <div className="flex items-center gap-2">
                            
                <Link className="text-sm hover:underline"
                to={`/algorithm/${algorithm.id}`}>

                    {loading ? "..." : algorithm.title}

                </Link>
            
                <span className="bg-zinc-800 rounded-md shadow-md
                px-2 py-1 text-xs">

                    {loading ? "..." : algorithm.language}

                </span>

            </div>

            <span className="text-zinc-300 text-xs">

                {TimeFormatter.DayMonthYear(comment.created)}

            </span>

            <p className="text-xs mt-2">

                {comment.text}

            </p>

        </div>
    )
}

const AlgorithmList = ({algorithms, loading} : {algorithms: AlgorithmType[], loading: boolean}) => {

    const [sort, setSort] = useState<AlgorithmSortType>("post-date");

    const {t} = useTranslation();

    return (
        <div className="flex flex-col
        bg-zinc-900 rounded-md shadow-md
        border border-zinc-700">
            
            <div className="flex items-center px-4 py-2
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

            <div className="flex flex-col
            h-[60vh] overflow-y-scroll">

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
                        algorithm={algorithm}
                        key={index}/>
        
                    ))}
                    </>
                )}

            </div>

        </div>
    )
}

const Algorithm = ({algorithm} : {algorithm: AlgorithmType}) => {

    return (
        <div className="flex flex-col
        border-t first:border-none border-t-zinc-700 p-4">

            <div className="flex items-center gap-2">
                            
                <Link className="text-sm hover:underline"
                to={`/algorithm/${algorithm.id}`}>
                    {algorithm.title}
                </Link>

                <span className="bg-zinc-800 rounded-md shadow-md
                px-2 py-1 text-xs">
                    {algorithm.language}
                </span>
            </div>

            <div className="text-xs text-gray-300">

                {TimeFormatter.DayMonthYear(algorithm.created)}

            </div>

            <div className="flex items-center gap-4">

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

        </div>
    )
};