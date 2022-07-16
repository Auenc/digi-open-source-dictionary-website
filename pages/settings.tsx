import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Settings: NextPage = () => {
  return <h1>Settings!</h1>;
};

export const getStaticProps = async (params: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(params.locale, ["common"])),
    },
  };
};

export default Settings;
