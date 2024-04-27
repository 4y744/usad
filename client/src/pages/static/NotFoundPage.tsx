//Import i18n hooks
import { useTranslation } from "react-i18next";

export const NotFoundPage = () => {

    const {t} = useTranslation();

    return (
        <div className="flex justify-center items-center
        h-[80vh] p-4 w-full">

            <div className="flex justify-center items-center
            border border-zinc-700
            text-white bg-zinc-900 w-fit p-8 rounded-md shadow-md">

                <h1 className="text-3xl">404</h1>

                <div className="h-12 w-0.5 mx-2 bg-white"/>

                <h1 className="text-xl">{t("page-not-found")}</h1>

            </div>

        </div>
    )
}
