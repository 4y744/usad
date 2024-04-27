//Import React hooks and misc
import { memo, useContext, useRef } from "react";

//Import React Router hooks and misc
import { Link, useParams } from "react-router-dom"

//Import components
import { LoadingPage } from "../static/LoadingPage";
import { PageWrapper } from "../../components/Layout/PageWrapper"
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { NotFoundPage } from "../static/NotFoundPage";

//Import custom hooks
import { useAddVote, useGetAlgorithm, useGetComments, useGetForks, useGetVotes, usePostComment, useRemoveVote } from "../../hooks/firestore";
import { useToast } from "../../hooks/toast";

//Import utils
import { NumberFormatter, TimeFormatter } from "../../utils/formatter";
import { CommentSorter } from "../../utils/sorter";
import { copyToClipboard } from "../../utils/actions";

//Import i18n
import { useTranslation } from "react-i18next";

//Import types
import { AlgorithmType, CommentType, VoteType } from "../../types";

//Import config
import { ROOT_URL } from "../../config";

//Import contexts
import { AuthContext } from "../../App";
import { Viewer } from "../../components/Viewer";

export const AlgorithmPage = () => {

    const {id} = useParams();

    const {t} = useTranslation();

    const {AddToast} = useToast();

    const [algorithm, loading, error] = useGetAlgorithm(id!);

    const handleCopy = () => {

        const url = `${ROOT_URL}/algorithm/${algorithm.id}`;

        copyToClipboard(url);

        AddToast({
            title: t("copied"),
            text: `${url} ${t("copied-text")}`,
            type: "info"
        });

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

            <div className="flex md:flex-row flex-col gap-4 p-4 
            bg-zinc-900 rounded-md shadow-md
            border border-zinc-700">
                
                <div className="flex flex-col gap-1">

                    <div className="flex items-center gap-2">

                        <h1 className="font-medium">
                            {algorithm.title}
                            
                        </h1>
                        
                        <span className="bg-zinc-800 rounded-md shadow-md
                        px-2 py-1 text-xs">
                            {algorithm.language?.toUpperCase()}
                        </span>

                    </div>

                    <div className="flex items-center gap-1
                    text-zinc-300 text-sm">

                        <span>{t("posted-by")} </span>

                        <Link className="font-medium hover:underline"
                        to={`/user/${algorithm.author}`}>
                            {algorithm.author}
                        </Link> 

                        <span>{t("on")} </span>

                        <span className="font-medium">
                            {TimeFormatter.DayMonthYear(algorithm.created)}.
                        </span>

                        {algorithm.fork_of ? (
                            <Link className="text-xs px-1"
                            to={`/algorithm/${algorithm.fork_of}`}>
                                <i className="fa-solid fa-code-fork"/>
                            </Link>
                        ) : (
                            <></>
                        )}

                        <span className="bg-zinc-800 rounded-md shadow-md
                        px-2 py-1 text-xs">
                            {t(`${algorithm.editor}-editor`)}
                        </span>

                    </div>

                </div>

                <div className="flex items-center gap-2 ml-auto">

                    <button className="flex justify-center items-center
                    bg-zinc-800 rounded-md shadow-md hover:bg-zinc-700
                    active:outline outline-2 outline-green-600 outline-offset-2
                    h-10 w-10"
                    onClick={handleCopy}>
                        <i className="fa-solid fa-link"/>
                    </button>

                    <Link className="flex justify-center items-center
                    bg-zinc-800 rounded-md shadow-md hover:bg-zinc-700
                    active:outline outline-2 outline-green-600 outline-offset-2
                    h-10 w-10"
                    to={`/fork/${algorithm.id}`}>
                        <i className="fa-solid fa-code-fork"/>
                    </Link>

                    <VoteManager
                    algorithm={algorithm}/>

                </div>

            </div>

            <Viewer
            algorithm={algorithm}/>

            <div className="flex flex-col gap-2 p-4
            bg-zinc-900 rounded-md shadow-md
            border border-zinc-700">

                <h1 className="font-medium">{t("description")}</h1>

                <p className="text-sm text-zinc-300">{algorithm.description}</p>

            </div>

            <div className="grid md:grid-cols-2 grid-cols-1
            bg-zinc-900 rounded-md shadow-md
            border border-zinc-700">

                <CommentManager
                algorithm={algorithm}/>

                <ForkManager
                algorithm={algorithm}/>
                
            </div>

        </PageWrapper>
    )
}

const VoteManager = memo(({algorithm} : {algorithm: AlgorithmType}) => {

    const {username} = useContext(AuthContext);
        
    const [AddVote] = useAddVote();
    const [RemoveVote] = useRemoveVote();
    
    //I'm doing this to get the vote of the current user and also to avoid
    //weird behaviour with Cloud Fuinctions cold starts.
    const [votes, loading, error, reload] = useGetVotes(algorithm.id);

    const vote = votes.find(vote => vote.author == username);
    const score = votes.filter(vote => vote.type == "upvote").length - votes.filter(vote => vote.type == "downvote").length;
    
    const handleUpvote = () => {

        if(vote?.type == "upvote"){

            RemoveVote(algorithm.id, () => {

                reload(prev => prev.filter(vote => vote.author != username));

            });

        }
        else{

            AddVote(algorithm.id, {type: "upvote"} as VoteType, () => {

                reload(prev => prev.filter(vote => vote.author != username));

                reload(prev => [...prev, {
                    author: username,
                    type: "upvote"
                }]);

            });

        }

    }

    const handleDownvote = () => {

        if(vote?.type == "downvote"){
            
            RemoveVote(algorithm.id, () => {

                reload(prev => prev.filter(vote => vote.author != username));

            });

        }
        else{
   
            AddVote(algorithm.id, {type: "downvote"} as VoteType, () => {

                reload(prev => prev.filter(vote => vote.author != username));

                reload(prev => [...prev, {
                    author: username,
                    type: "downvote"
                }]);

            });

        }

    }

    if(loading){
        
        return (
            <div className="flex justify-center items-center
            bg-zinc-800 shadow-md rounded-md px-4
            w-36 h-10">
                <LoadingSpinner/>
            </div>
        )

    }

    return (
        <div className='grid grid-cols-7 items-center justify-center gap-4
        bg-zinc-800 shadow-md rounded-md px-4
        w-36 h-10'>

            <button className={`${vote?.type == "upvote" ? "text-green-700" : ""}
            text-lg hover:text-green-600 transition-colors duration-100 rounded-md
            col-span-2`}
            onClick={handleUpvote}>
                <i className="fa-solid fa-up-long"/>
            </button>
    
            <span className='font-medium text-center col-span-3'>
                {NumberFormatter.Abbreviation(score)}
            </span>
                
            <button className={`${vote?.type == "downvote" ? "text-red-700" : ""}
            text-lg hover:text-red-600 transition-colors duration-100 rounded-md
            col-span-2`}
            onClick={handleDownvote}>
                <i className="fa-solid fa-down-long"/>
            </button>

        </div>
    )

})

const CommentManager = memo(({algorithm} : {algorithm: AlgorithmType}) => {

    const {t} = useTranslation();

    const auth = useContext(AuthContext);

    const commentRef = useRef<CommentType>({author: auth.username} as CommentType);
    const [PostComment] = usePostComment();

    const [comments, loading, error, reload] = useGetComments({id: algorithm.id});

    const handlePost = () => {

        PostComment(algorithm.id, commentRef.current, () => {

            reload(prev => [...prev, {
                ...commentRef.current,
                created: Date.now()
            }])

        })

    }

    return (
        <div className="flex flex-col
        md:border-r border-r-zinc-700">
            
            <div className="flex flex-col gap-2 p-4
            border-b border-b-zinc-700">

                <h1 className="font-medium">{t("comments")} ({comments.length})</h1>

                <div className="flex items-center">

                    <input className="bg-transparent w-full focus:outline-none"
                    placeholder={t("write-a-comment")}
                    type="text"
                    onChange={(event) => commentRef.current.text = event.target.value}/>
                    
                    <button className="bg-green-700 hover:bg-green-600 rounded-md shadow-md
                    active:outline outline-2 outline-green-600 outline-offset-2
                    px-4 py-2 ml-auto"
                    onClick={handlePost}>
                        Post
                    </button>

                </div>



            </div>

            <div className="h-[300px] overflow-y-scroll">

                {comments
                .sort(CommentSorter["reverse-post-date"])
                .map((comment, index) => (

                    <div className="border-b last:border-none border-b-zinc-700 p-4"
                    key={index}>

                        <div className="flex gap-1
                        text-zinc-300 text-sm">

                            <Link className="hover:underline font-medium"
                            to={`/user/${comment.author}`}>
                                {comment.author}
                            </Link> 

                            {t("on")} 

                            <span className="font-medium">
                                {TimeFormatter.DayMonthYear(comment.created)}.
                            </span>
                        </div>

                        <p className="text-sm mt-2">
                            {comment.text}
                        </p>
                    </div>

                ))}
            </div>

        </div>
    )
})

const ForkManager = memo(({algorithm} : {algorithm: AlgorithmType}) => {

    const [forks, loading, error] = useGetForks(algorithm.id);

    const {t} = useTranslation();

    return (
        <div className="flex flex-col bg-zinc-900
        md:border-none border-t border-t-zinc-700">

            <h1 className="font-medium p-4
            border-b border-b-zinc-700">
                {t("forks")} ({forks.length})
            </h1>

            <div className="h-[300px] overflow-y-scroll">
                {forks.map((fork, index) => (

                    <div className="flex flex-col
                    border-t first:border-none border-t-zinc-700 p-4"
                    key={index}>

                        <div className="flex items-center gap-2">
                                        
                            <Link className="text-sm hover:underline"
                            to={`/algorithm/${fork.id}`}>
                                {fork.title}
                            </Link>

                            <span className="bg-zinc-800 rounded-md shadow-md
                            px-2 py-1 text-xs">
                                {fork.language}
                            </span>
                        </div>

                        <div className="flex items-center gap-1
                        text-xs text-gray-300">

                            <span>{t("postedon")}</span>

                            <span>{TimeFormatter.DayMonthYear(fork.created)}</span>

                            <span>{t("by")}</span>

                            <span>{fork.author}</span>

                        </div>


                    </div>
                ))}
            </div>

        </div>
    )
})
