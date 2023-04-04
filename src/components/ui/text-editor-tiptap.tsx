import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDocument } from "~/providers/document-provider";
import { IDocument } from "~/types/document";

const CustomDocument = Document.extend({
  content: "heading block*",
});

interface TextEditorTipTapProps {
  document: IDocument;
}

export const TextEditorTipTap = ({ document }: TextEditorTipTapProps) => {
  const { handleDocumentInputChange } = useDocument(document);

  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        emptyEditorClass:
          "cursor-text before:content-[attr(data-placeholder)] before:absolute  before:text-mauve-11 before:opacity-50 before-pointer-events-none",
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Untitled";
          }
          return "";
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-p:my-0 prose-sm sm:prose-base lg:prose-lg xl:prose-md m-2 focus:outline-none !m-20",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      handleDocumentInputChange(html);
    },
    content: document.content,
  });

  return (
    <EditorContent editor={editor} className="placeho placeholder-slate-500" />
  );
};
