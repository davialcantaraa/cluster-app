import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const CustomDocument = Document.extend({
  content: "heading block*",
});

export const TextEditorTipTap = () => {
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
    },
  });

  return (
    <EditorContent editor={editor} className="placeho placeholder-slate-500" />
  );
};
