/* eslint-disable react-hooks/rules-of-hooks */
import { getHotkeyHandler } from "@mantine/hooks";
import {
  Remirror,
  useEditorEvent,
  useRemirror,
  useRemirrorContext,
} from "@remirror/react";
import { useDebounceFn, useMount, useUpdateEffect } from "ahooks";
import { useRouter } from "next/router";
import { useCallback } from "react";
import {
  BoldExtension,
  BulletListExtension,
  CodeExtension,
  HeadingExtension,
  MentionExtension,
  OrderedListExtension,
  ShortcutsExtension,
  TaskListExtension,
} from "remirror/extensions";
import { useDocument } from "~/providers/document-provider";
import { useWindowProvider } from "~/providers/window-provider";
import { IDocument } from "~/types/document";
import { Suggestor } from "./suggestor";

interface TextEditorProps {
  incomingDocument: IDocument;
}

export const Editor = ({ incomingDocument }: TextEditorProps) => {
  const { titleRef, handleUpdateTitle } = useDocument(incomingDocument);
  const { chain, getRootProps, commands } = useRemirrorContext();
  const { hotkeys, toggleSidebar, isSidebarVisible } = useWindowProvider();
  const router = useRouter();
  const { run: handleEditorFocus } = useDebounceFn(
    () => {
      titleRef.current?.focus();
    },
    {
      wait: 500,
    }
  );

  useMount(() => {
    if (titleRef.current) {
      if (incomingDocument.title) {
        titleRef.current.innerText = incomingDocument.title;
        chain.toggleBold().focus("end").run();
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
    handleUpdateTitle();
  }

  useUpdateEffect(() => {
    handleUpdatePageDocument();
  }, [router.asPath]);

  function handleUpdatePageDocument() {
    if (incomingDocument.title === null) {
      if (titleRef.current) {
        titleRef.current.innerText = "";
        commands.resetContent();
        titleRef.current.setAttribute("data-placeholder", "Untitled");
        if (isSidebarVisible) toggleSidebar();
        handleEditorFocus();
      }
    } else {
      if (titleRef.current) {
        if (incomingDocument.title) {
          titleRef.current.innerText = incomingDocument.title;
          chain.toggleBold().focus("end").run();
        } else {
          titleRef.current.setAttribute("data-placeholder", "Untitled");
          titleRef.current.focus();
        }
      }
      commands.setContent(incomingDocument.content);
      chain.toggleBold().focus("end").run();
    }
  }

  const handleEvent = useCallback((event: any) => {
    console.log("Event triggered", event);
    return false;
  }, []);

  useEditorEvent("textInput", handleEvent);

  return (
    <>
      <div className="xl:prose-md prose prose-sm mx-20 mt-20 w-fit dark:prose-invert sm:prose-base lg:prose-lg focus:outline-none prose-p:my-0">
        <h1
          ref={titleRef}
          contentEditable
          onInput={titleChangeHandler}
          onKeyDown={getHotkeyHandler([
            ["Enter", () => chain.toggleBold().focus("end").run()],
            ...hotkeys,
          ])}
          className="before:text-mauve-11 before-pointer-events-none cursor-text before:absolute before:opacity-50 before:content-[attr(data-placeholder)] focus:outline-none"
        />
      </div>
      <div {...getRootProps()} />
    </>
  );
};

const allUsers = [
  { id: "joe", label: "Joe" },
  { id: "sue", label: "Sue" },
  { id: "pat", label: "Pat" },
  { id: "tom", label: "Tom" },
  { id: "jim", label: "Jim" },
];

// mention.addHandler("onChange", (value) => {
//   console.log(value);
// });

export const TextEditor = ({ incomingDocument }: TextEditorProps) => {
  const { manager, state } = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new BulletListExtension(),
      new OrderedListExtension(),
      new TaskListExtension(),
      new HeadingExtension(),
      new ShortcutsExtension(),
      new MentionExtension({
        mentionTag: "h1",
        markOverride: {},
        matchers: [
          { name: "at", char: "@", matchOffset: 0 },
          {
            name: "tag",
            char: "/",
            matchOffset: 0,
          },
        ],
      }),
      new CodeExtension(),
    ],
    content: incomingDocument.content,
    selection: "start",
    stringHandler: "html",
  });

  return (
    <div className="flex min-w-4xl max-w-4xl cursor-text flex-col">
      <Remirror
        manager={manager}
        initialContent={state}
        classNames={[
          "prose prose-h1:text-4xl dark:prose-invert prose-p:my-0 prose-sm sm:prose-base lg:prose-lg xl:prose-md m-2 focus:outline-none mx-20 mb-8",
        ]}
      >
        <Editor incomingDocument={incomingDocument} />
        <Suggestor allUsers={allUsers} />
      </Remirror>
    </div>
  );
};
