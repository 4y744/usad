import { PageWrapper } from "../../components/Layout/PageWrapper";

export const NotFoundPage = () => (
    <PageWrapper>

        <div className="flex justify-center items-center
        text-white bg-zinc-900 w-fit p-8 rounded-md shadow-md">
            <h1 className="text-3xl">404</h1>
            <div className="h-12 w-0.5 mx-2 bg-white"></div>
            <h1 className="text-xl">Page not found</h1>
        </div>

    </PageWrapper>
)
