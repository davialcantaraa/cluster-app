import { ReactElement } from "react";
import { AppLayout } from "~/layouts/app-layout";
import type { NextPageWithLayout } from "~/types/global";

const AppPage: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Protected app</h1>
    </div>
  );
};

AppPage.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};

export default AppPage;
