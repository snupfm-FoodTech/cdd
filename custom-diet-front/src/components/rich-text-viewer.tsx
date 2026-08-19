'use client';

import React, { FC, forwardRef } from 'react';
import type { SerializedEditorState } from 'lexical';
import { Editor } from '@/components/blocks/editor-x/editor';

type RichTextEditorViewerProps = {
  /** Controlled value from RHF (Lexical serialized state) */
  value: SerializedEditorState;
  /** Optional container class */
  className?: string;
};

/**
 * RHF-friendly wrapper for shadcn-editor's <Editor/>.
 * We expose an <input type="hidden" /> so RHF can attach a ref for focus/scrollIntoView on validation errors.
 * Comments in English per your request.
 */
export const RichTextViewer: FC<RichTextEditorViewerProps> = (
  { value, className },
  ref
) => {
  return (
    <div
      className={className}
      // Make wrapper focusable so we can trigger onBlur for RHF when user tabs away.
      tabIndex={0}
    >
      <div className="">
        <Editor editorSerializedState={value} readonly={true} />
      </div>
    </div>
  );
};
