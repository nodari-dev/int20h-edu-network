import { LexicalComposer } from "@lexical/react/LexicalComposer";
import * as React from "react";
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext";
import { SharedHistoryContext } from "./context/SharedHistoryContext";
import Editor from "./Editor";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import { TableContext } from "./plugins/TablePlugin";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

interface IProps {
  editable?: boolean;
  onChange: (state) => void;
  state: any;
}

function EditorDeezNuts({ editable = true, onChange, state = undefined }: IProps): JSX.Element {

  const initialConfig = {
    editorState: state,
    namespace: "Playground",
    nodes: [ ...PlaygroundNodes ],
    onError: (error: Error) => {
      throw error;
    },
    editable,
    theme: PlaygroundEditorTheme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <SharedAutocompleteContext>
            <div className="editor-shell">
              <Editor />
            </div>
            <OnChangePlugin onChange={onChange} />
          </SharedAutocompleteContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}

export default EditorDeezNuts;