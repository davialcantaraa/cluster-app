import { ReactElement } from "react";
import { TextEditorTipTap } from "~/components/ui/text-editor-tiptap";
import { AppLayout } from "~/layouts/app-layout";
import type { NextPageWithLayout } from "~/types/global";

const AppPage: NextPageWithLayout = () => {
  return (
    <main className="flex justify-center">
      <div className="min-w-4xl max-w-4xl">
        <TextEditorTipTap />
      </div>
    </main>
  );
};

AppPage.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};

export default AppPage;
