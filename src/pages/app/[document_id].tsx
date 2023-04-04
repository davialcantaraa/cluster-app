import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import { TextEditorTipTap } from "~/components/ui/text-editor-tiptap";
import { AppLayout } from "~/layouts/app-layout";
import { UUIDSchema } from "~/lib/validation/utils";
import { supabase } from "~/services/supabase";
import { IDocument } from "~/types/document";
import { NextPageWithLayout } from "~/types/global";

interface DocumentPageProps {
  document: IDocument;
}

const DocumentPage: NextPageWithLayout = ({ document }: DocumentPageProps) => {
  return (
    <main className="flex justify-center">
      <div className="min-w-4xl max-w-4xl">
        <TextEditorTipTap document={document} />
      </div>
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
