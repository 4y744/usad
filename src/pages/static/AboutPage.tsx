//Import components
import { PageWrapper } from "../../components/Layout/PageWrapper";

//Import i18n hooks
import { useTranslation } from "react-i18next";

export const AboutPage = () => {
    const {t} = useTranslation();

    return (
        <PageWrapper>
            <div className="bg-zinc-900 rounded-md shadow-md p-4
            flex flex-col gap-5 mx-4 max-w-[600px]">
                <div className="bg-zinc-800 rounded-md shadow-md p-4">
                    <h1 className="text-xl text-green-600 font-bold">{t("about")}</h1>
                </div>

                <div className="bg-zinc-800 rounded-md shadow-md p-4">
                    <h1 className="text-lg font-medium">USAD</h1>
                    <hr className="my-2"/>
                    <p className="text-sm text-zinc-200"> {t("about1")} </p>
                </div>

                <div className="bg-zinc-800 rounded-md shadow-md p-4">
                    <h1 className="text-lg font-medium">{t("algorithms")}</h1>

                    <hr className="my-2"/>

                    <p className="text-sm text-zinc-200"> {t("about2")} </p>

                    <p className="text-sm text-zinc-200 mt-6"> {t("about3")} </p>

                    <p className="text-sm text-zinc-200 mt-6"> {t("about4")} </p>

                    <p className="text-sm text-zinc-200 mt-6"> {t("about5")} </p>

                    <p className="text-sm text-zinc-200 mt-6"> {t("about6")} </p>

                    <p className="text-sm text-zinc-200 mt-6"> {t("about7")} </p>
                </div>
            </div>
        </PageWrapper>
    )
}
