//Import components
import { PageWrapper } from "../../components/Layout/PageWrapper";

//Import i18n hooks
import { useTranslation } from "react-i18next";

export const AboutPage = () => {

    const {t} = useTranslation();

    return (
        <PageWrapper>

            <div className="w-full
            bg-zinc-900 rounded-md shadow-md
            border border-zinc-700">

                <h1 className="text-lg font-medium p-4">
                    {t("about")}
                </h1>

            </div>

            <div className="bg-zinc-900 rounded-md shadow-md
            border border-zinc-700
            grid md:grid-cols-2 grid-cols-1">

                <div className="flex flex-col
                border-r border-r-zinc-700">

                    <h1 className="font-medium
                    border-b border-b-zinc-700 p-4">
                        USAD
                    </h1>

                    <div className="p-4">
   
                        <p className="text-zinc-300">
                            {t("about1")}
                        </p>

                    </div>
                                    
                </div>

                <div className="flex flex-col">   

                    <h1 className="font-medium
                    border-b border-b-zinc-700 p-4">{t("algorithms")}</h1>

                    <div className="flex flex-col gap-4
                    text-zinc-300 p-4">
                            
                        <p>
                            {t("about2")}
                        </p>

                        <p>
                            {t("about3")}
                        </p>

                        <p>
                            {t("about4")}
                        </p>

                        <p>
                            {t("about5")}
                        </p>

                        <p>
                            {t("about6")}
                        </p>

                        <p>
                            {t("about7")}
                        </p>

                    </div>

                </div>

            </div>

        </PageWrapper>
    )
}
