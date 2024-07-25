import { Note } from "@/models/note";
import { usePage } from "@inertiajs/react";

function useNoteList() {
    const { props } = usePage<{ notes: Note[] }>()

    const { notes } = props

    return notes
}

function useNote() {
    const { props } = usePage<{ note?: Note }>()

    const { note } = props

    return note
}

export { useNote, useNoteList }