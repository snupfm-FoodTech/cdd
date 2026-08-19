'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  InitialConfigType,
  LexicalComposer
} from '@lexical/react/LexicalComposer';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState, SerializedEditorState } from 'lexical';

import { FloatingLinkContext } from '@/components/editor/context/floating-link-context';
import { SharedAutocompleteContext } from '@/components/editor/context/shared-autocomplete-context';
import { editorTheme } from '@/components/editor/themes/editor-theme';
import { TooltipProvider } from '@/components/ui/tooltip';

import { nodes } from './nodes';
import { Plugins } from './plugins';

const baseConfig: InitialConfigType = {
  namespace: 'Editor',
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error);
  }
};

export function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
  readonly = false
}: {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  readonly?: boolean;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
}) {
  // 👇 Gate to client-only render to avoid SSR/CSR mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const initialConfig = useMemo<InitialConfigType>(() => {
    const editorStateProp = editorSerializedState
      ? { editorState: JSON.stringify(editorSerializedState) }
      : editorState
        ? { editorState }
        : {};
    return {
      ...baseConfig,
      editable: !readonly,
      ...editorStateProp
    };
  }, [editorSerializedState, editorState, readonly]);
  if (!mounted) return null;

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <LexicalComposer initialConfig={initialConfig}>
        <TooltipProvider>
          <SharedAutocompleteContext>
            <FloatingLinkContext>
              <Plugins readonly={readonly} />
              <OnChangePlugin
                ignoreSelectionChange
                onChange={(state) => {
                  onChange?.(state);
                  onSerializedChange?.(state.toJSON());
                }}
              />
            </FloatingLinkContext>
          </SharedAutocompleteContext>
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}
