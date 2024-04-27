//Import components
import { PageWrapper } from "../../components/Layout/PageWrapper";

//Import i18n hooks
import { useTranslation } from "react-i18next";

export const TermsOfUsePage = () => {

    const {t} = useTranslation();

    return (
        <PageWrapper>
            

            <div className="bg-zinc-900 rounded-md shadow-md
            flex flex-col">

                <div className="p-4 border-b border-b-zinc-700">

                    <h1 className="text-lg font-medium">
                        {t("terms-of-use")}
                    </h1>

                </div>

                <ol className="list-decimal ml-4
                text-zinc-300 marker:text-zinc-300
                flex flex-col gap-4 p-4">

                    <li>{t("tos1")}</li>

                    <li>{t("tos2")}</li>

                    <li>{t("tos3")}</li>

                    <li>{t("tos4")}</li>

                </ol>

                <div className="border-t border-t-zinc-700 p-4">
                    <p className="font-medium">{t("tos-warning")}</p>
                </div>
                
            </div>
            
        </PageWrapper>
    )
}
