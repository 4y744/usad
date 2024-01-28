

//Import react hooks
import { useParams } from 'react-router-dom';

import { useGetUser, useGetlAlgorithm } from '../../hooks/firestore.ts';

export const AlgorithmPage = () => {


    const {id} = useParams();
    const algorithm = useGetlAlgorithm(id!);

    if(algorithm.loading) return <>Loading</>

    return (
        <div className='mt-16 w-full text-white
        flex justify-center items-center'>
            <div className='bg-zinc-900'>
                <div className='flex flex-col w-1/2'>
                    <h1 className='text-xl font-bold'>{algorithm.title}</h1>
                    <div className='text-xs text-zinc-300'>
                        <span>Posted by {algorithm.author}</span>
                        <span>Posted by {algorithm.author}</span>
                    </div>
                    <p className=''>{algorithm.description}</p>
                </div>
                <div className='flex'>
                    f
                </div>
            </div>

            {/* <div>
                <h1>{algorithm.title!}</h1>
                <Input inputs={algorithm.inputs!} type={algorithm.input_type!} function={algorithm.function!}></Input>
            </div>
            <div>
                <h1>Описание</h1>
                <p>{algorithm.description}</p>
            </div> */}
        </div>

            

    )
}
