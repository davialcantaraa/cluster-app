import dynamic from "next/dynamic";
import { TextEditor } from "~/components/text-editor";
import { PageProps } from "~/types/global";

const DynamicTextEditor = dynamic(() => Promise.resolve(TextEditor), {
  ssr: false,
});

export default function DocumentPage({ searchParams }: PageProps) {
  // const { isSidebarVisible } = useWindowProvider();

  console.log(searchParams);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );

  // return (
  //   <main className={cn("flex justify-center", isSidebarVisible && "sm:ml-64")}>
  //     <DynamicTextEditor incomingDocument={document} />
  //   </main>
  // );
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { document_id } = ctx.query;

//   const parsedDocumentId = UUIDSchema.parse(document_id);

//   const { data: document } = await supabase
//     .from("documents")
//     .select()
//     .eq("id", parsedDocumentId);

//   return {
//     props: {
//       document: document![0],
//     },
//   };
// };
