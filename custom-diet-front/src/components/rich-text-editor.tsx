'use client';

import React, { forwardRef } from 'react';
import type { SerializedEditorState } from 'lexical';
import { Editor } from '@/components/blocks/editor-x/editor';

type RichTextEditorProps = {
  /** RHF field name (used for hidden input binding) */
  name: string;
  /** Controlled value from RHF (Lexical serialized state) */
  value: SerializedEditorState;
  /** Change callback back to RHF */
  onChange: (next: SerializedEditorState) => void;
  /** Optional read-only mode */
  readOnly?: boolean;
  /** Optional container class */
  className?: string;
  /** Optional onBlur for RHF (will be called when wrapper loses focus) */
  onBlur?: () => void;
};

/**
 * RHF-friendly wrapper for shadcn-editor's <Editor/>.
 * We expose an <input type="hidden" /> so RHF can attach a ref for focus/scrollIntoView on validation errors.
 * Comments in English per your request.
 */
export const RichTextEditor = forwardRef<HTMLInputElement, RichTextEditorProps>(
  ({ name, value, onChange, readOnly, className, onBlur }, ref) => {
    return (
      <div
        className={className}
        // Make wrapper focusable so we can trigger onBlur for RHF when user tabs away.
        tabIndex={0}
        onBlur={onBlur}
      >
        <div className="">
          <Editor
            editorSerializedState={value}
            onSerializedChange={(val) => onChange(val as SerializedEditorState)}
            // If your generated editor supports readOnly/disabled, pass it here:
            // readOnly={readOnly}
          />
        </div>

        {/* Hidden input allows RHF to attach its ref and keeps form semantics intact.
           We stringify the state so RHF "sees" a value; server won't use this string if you are sending JSON manually. */}
        <input
          ref={ref}
          type="hidden"
          name={name}
          value={JSON.stringify(value ?? {})}
          readOnly
        />
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';
