//Import React hooks
import { useEffect, useState } from "react";

//Import type
import { AlgorithmType } from './../types/index';

//Import services
import { algorithmsIndex } from "../services/algolia";

export const useQueryAlgorithms = (term: string, page: number) : [AlgorithmType[], boolean, string] => {

    const [algorithms, setAlgorithms] = useState<AlgorithmType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {

        const fetch = async () => {

            setLoading(true);

            try{
    
                const docs = await algorithmsIndex.search<AlgorithmType>(term, {
                    page, 
                    hitsPerPage: 15
                });
                
                setAlgorithms(docs.hits.map((hit) => ({
                    ...hit,
                    score: hit.score || 0,
                    comments: hit.comments || 0,
                    forks: hit.forks || 0,
                    id: hit.objectID
                }) as AlgorithmType));
    
            }
            catch(err){
    
                setError(err as string);
    
            }

            setLoading(false);
    
        }

        fetch();
 
    }, [term, page])

    return [algorithms, loading, error];
}

export const useBrowseAlgorithms = (page: number, language: string) : [AlgorithmType[], boolean, string] => {

    const [algorithms, setAlgorithms] = useState<AlgorithmType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {

        const fetch = async () => {

            setLoading(true);
    
            try{
    
                const docs = await algorithmsIndex.search<AlgorithmType>("", {
                    filters: `language:${language}`,
                    page, 
                    hitsPerPage: 15
                });
    
                setAlgorithms(docs.hits.map((hit) => ({
                    ...hit,
                    score: hit.score || 0,
                    comments: hit.comments || 0,
                    forks: hit.forks || 0,
                    id: hit.objectID
                }) as AlgorithmType))
    
            }
            catch(err){
    
                setError(err as string);
    
            }

            setLoading(false);
    
        }

        fetch();

    }, [page, language])

    return [algorithms, loading, error];
}


