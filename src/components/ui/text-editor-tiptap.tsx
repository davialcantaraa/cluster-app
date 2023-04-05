import { getHotkeyHandler } from "@mantine/hooks";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRef } from "react";
import { useDidMount, useOutsideClickRef } from "rooks";
import { useDocument } from "~/providers/document-provider";
import { IDocument } from "~/types/document";

interface TextEditorTipTapProps {
  incomingDocument: IDocument;
}

export const TextEditorTipTap = ({
  incomingDocument,
}: TextEditorTipTapProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [editorRef] = useOutsideClickRef(() => editor?.commands.focus("end"));
  const { handleInputChange, handleTitleChange } =
    useDocument(incomingDocument);

  useDidMount(() => {
    if (titleRef.current) {
      if (incomingDocument.title) {
        titleRef.current.innerText = incomingDocument.title;
        editor?.commands.focus("end");
      } else {
        titleRef.current.setAttribute("data-placeholder", "Untitled");
        titleRef.current.focus();
      }
    }
  });

  function titlePlaceholderHandler() {
    if (titleRef.current?.innerText === "") {
      titleRef.current.setAttribute("data-placeholder", "Untitled");
    } else {
      titleRef.current?.removeAttribute("data-placeholder");
    }
  }

  function titleChangeHandler() {
    titlePlaceholderHandler();
    const title = titleRef.current?.innerText || "";
    handleTitleChange(title);
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: "Start typing...",
        emptyEditorClass:
          "cursor-text before:content-[attr(data-placeholder)] before:absolute before:text-mauve-11 before:opacity-50 before-pointer-events-none",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-h1:text-4xl dark:prose-invert prose-p:my-0 prose-sm sm:prose-base lg:prose-lg xl:prose-md m-2 focus:outline-none mx-20",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      handleInputChange(html);
    },
    content: incomingDocument.content,
  });

  return (
    <div
      className="flex min-w-4xl max-w-4xl cursor-text flex-col"
      ref={editorRef}
    >
      <div className="xl:prose-md prose prose-sm mx-20 mt-20 max-h-[48px] dark:prose-invert sm:prose-base lg:prose-lg focus:outline-none prose-p:my-0">
        <h1
          ref={titleRef}
          contentEditable
          onInput={titleChangeHandler}
          onKeyDown={getHotkeyHandler([
            ["Enter", () => editor?.commands.focus()],
          ])}
          className="before:text-mauve-11 before-pointer-events-none cursor-text before:absolute before:opacity-50 before:content-[attr(data-placeholder)] focus:outline-none"
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};
