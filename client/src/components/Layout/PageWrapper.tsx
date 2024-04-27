export const PageWrapper = ({children, center} : {children: any, center?: boolean}) => {

    return (
        <div className={`flex ${center ? "items-center" : ""} flex-col gap-5
        w-full p-4 text-white`}>
            {children}
        </div>
    )
}