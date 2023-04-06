import { getHotkeyHandler } from "@mantine/hooks";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useMount, useUpdateEffect } from "ahooks";
import { useRouter } from "next/router";
import { useDocument } from "~/providers/document-provider";
import { useWindowProvider } from "~/providers/window-provider";
import { IDocument } from "~/types/document";

interface TextEditorTipTapProps {
  incomingDocument: IDocument;
}

export const TextEditorTipTap = ({
  incomingDocument,
}: TextEditorTipTapProps) => {
  const { handleInputChange, handleTitleChange, titleRef, handleUpdateTitle } =
    useDocument(incomingDocument);
  const { hotkeys } = useWindowProvider();
  const router = useRouter();

  useMount(() => {
    if (titleRef.current) {
      if (incomingDocument.title) {
        titleRef.current.innerText = incomingDocument.title;
        editor?.commands.focus("end");
      } else {
        console.log("caindo aqui dentro");
        titleRef.current.setAttribute("data-placeholder", "Untitled");
        titleRef.current.focus();
      }
    }
  });

  useUpdateEffect(() => {
    handleUpdatePageDocument();
  }, [router.asPath]);

  function handleUpdatePageDocument() {
    if (incomingDocument.title === null) {
      if (titleRef.current) {
        titleRef.current.innerText = "";
        titleRef.current.setAttribute("data-placeholder", "Untitled");
        titleRef.current.focus();
      }
    } else {
      if (titleRef.current) {
        if (incomingDocument.title) {
          titleRef.current.innerText = incomingDocument.title;
          editor?.commands.focus("end");
        } else {
          titleRef.current.setAttribute("data-placeholder", "Untitled");
          titleRef.current.focus();
        }
      }
      editor?.commands.setContent(incomingDocument.content);
      editor?.commands.focus("end");
    }
  }

  function titlePlaceholderHandler() {
    if (titleRef.current?.innerText === "") {
      titleRef.current.setAttribute("data-placeholder", "Untitled");
    } else {
      titleRef.current?.removeAttribute("data-placeholder");
    }
  }

  function titleChangeHandler() {
    titlePlaceholderHandler();
    handleUpdateTitle();
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
      Link.configure({
        autolink: false,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
          class: "cursor-pointer",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-h1:text-4xl dark:prose-invert prose-p:my-0 prose-sm sm:prose-base lg:prose-lg xl:prose-md m-2 focus:outline-none mx-20 mb-8",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      handleInputChange(html);
    },
    content: incomingDocument.content,
  });

  return (
    <div className="flex min-w-4xl max-w-4xl cursor-text flex-col">
      <div className="xl:prose-md prose prose-sm mx-20 mt-20 w-fit dark:prose-invert sm:prose-base lg:prose-lg focus:outline-none prose-p:my-0">
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
      <EditorContent editor={editor} onKeyDown={getHotkeyHandler(hotkeys)} />
    </div>
  );
};
