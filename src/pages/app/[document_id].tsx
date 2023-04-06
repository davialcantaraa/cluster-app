import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { ReactElement } from "react";
import { TextEditor } from "~/components/text-editor";
import { AppLayout } from "~/layouts/app-layout";
import { cn } from "~/lib/utils";
import { UUIDSchema } from "~/lib/validation/utils";
import { useWindowProvider } from "~/providers/window-provider";
import { supabase } from "~/services/supabase";
import { IDocument } from "~/types/document";
import { NextPageWithLayout } from "~/types/global";

const DynamicTextEditor = dynamic(() => Promise.resolve(TextEditor), {
  ssr: false,
});

interface DocumentPageProps {
  document: IDocument;
}

const DocumentPage: NextPageWithLayout = ({ document }: DocumentPageProps) => {
  const { isSidebarVisible } = useWindowProvider();

  return (
    <main className={cn("flex justify-center", isSidebarVisible && "sm:ml-64")}>
      {/* <TextEditorTipTap incomingDocument={document} /> */}
      <DynamicTextEditor incomingDocument={document} />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { document_id } = ctx.query;

  const parsedDocumentId = UUIDSchema.parse(document_id);

  const { data: document } = await supabase
    .from("documents")
    .select()
    .eq("id", parsedDocumentId);

  return {
    props: {
      document: document![0],
    },
  };
};

DocumentPage.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>;
};

export default DocumentPage;
