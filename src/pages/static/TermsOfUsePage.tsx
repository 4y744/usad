//Import components
import { PageWrapper } from "../../components/Layout/PageWrapper";

//Import i18n hooks
import { useTranslation } from "react-i18next";

export const TermsOfUsePage = () => {

    const {t} = useTranslation();

    return (
        <PageWrapper>
            <div className="bg-zinc-900 rounded-md shadow-md p-4
            flex flex-col gap-5 mx-4">
                <div className="bg-zinc-800 rounded-md shadow-md p-4">
                    <h1 className="text-xl text-green-600 font-bold">{t("terms-of-use")}</h1>
                </div>

                <div className="bg-zinc-800 rounded-md shadow-md p-4">
                    <ol className="list-decimal ml-4 max-w-[600px]
                    text-zinc-100 marker:text-zinc-300
                    flex flex-col gap-2 text-sm">
                        <li>{t("tos1")}</li>
                        <li>{t("tos2")}</li>
                        <li>{t("tos3")}</li>
                        <li>{t("tos4")}</li>
                    </ol>
                </div>

                <div className="bg-zinc-800 rounded-md shadow-md p-4">
                    <p className="font-bold text-green-600 text-sm">{t("tos-warning")}</p>
                </div>
            </div>
        </PageWrapper>
    )
}
