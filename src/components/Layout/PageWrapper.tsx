export const PageWrapper = ({children} : {children: any}) => {

    return (
        <div className='flex justify-center items-center flex-col
        w-full md:my-16 my-8 text-white gap-5'>
            {children}
        </div>
    )
}