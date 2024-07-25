import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { router } from "@inertiajs/react";
import { Textarea } from "@mantine/core";
import { useDebouncedValue, useDidUpdate } from "@mantine/hooks";

import { handleHttpError, httpClient } from "@/lib/axios";

import classes from "./NoteTitle.module.css";

interface NoteTitleProps {
    ulid: string;
    title?: string;
}

function NoteTitle({ ulid, title }: NoteTitleProps) {
    const [value, setValue] = useState(title || "");
    const [debouncedValue] = useDebouncedValue(value, 500);

    async function save() {
        try {
            await httpClient.patch(`/notes/${ulid}/title`, {
                title: value,
            });

            router.reload({
                only: ["notes", "note"],
            });
        } catch (error) {
            handleHttpError(error);
        }
    }

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setValue(event.target.value);
    }

    function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    }

    useDidUpdate(() => {
        save();
    }, [debouncedValue]);

    return (
        <div className={classes.root}>
            <Textarea
                variant="unstyled"
                autosize
                minRows={1}
                placeholder="Untitled"
                classNames={{
                    root: classes.inputRoot,
                    input: classes.input,
                }}
                value={value}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
            />
        </div>
    );
}

export default NoteTitle;
