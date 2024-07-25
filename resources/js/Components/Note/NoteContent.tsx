import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useMemo } from "react";
import { useDebouncedCallback } from "@mantine/hooks";
import { handleHttpError, httpClient } from "@/lib/axios";

interface NoteContentProps {
    ulid: string;
    content?: string;
}

function NoteContent({ ulid, content }: NoteContentProps) {
    const editor = useMemo(() => {
        const value: undefined | PartialBlock[] = content
            ? (JSON.parse(content) as PartialBlock[])
            : undefined;

        return BlockNoteEditor.create({
            initialContent: value,
        });
    }, [content]);

    const handleChange = useDebouncedCallback(async () => {
        const content = JSON.stringify(editor.document);

        try {
            await httpClient.patch(`/notes/${ulid}/content`, { content });
        } catch (error) {
            handleHttpError(error);
        }
    }, 600);

    return (
        <BlockNoteView editor={editor} theme="light" onChange={handleChange} />
    );
}

export default NoteContent;
