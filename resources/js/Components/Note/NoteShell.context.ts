import { createContext, useContext } from "react";

interface NoteShellContextValue {
    opened: boolean;
    close: () => void;
    toggle: () => void;
}

const NoteShellContext = createContext<NoteShellContextValue>({
    opened: false,
    close: () => { },
    toggle: () => { }
})

function useNoteShell() {
    return useContext(NoteShellContext)
}

export { NoteShellContext, useNoteShell }

export type { NoteShellContextValue }