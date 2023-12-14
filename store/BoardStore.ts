import { create } from 'zustand'
import { getTodosGroupedByColumns } from '../lib/getTodosGroupedByColumns'

interface BoardState {
    board: Board
    getBoard: () => void
    setBoardState: (board: Board) => void
}

const useBoardStore = create<BoardState>((set) => ({
    board: {
        columns: new Map<TypedColumn, Column>(),
    },
    getBoard: async () => {
        const board = await getTodosGroupedByColumns()
        set({board})
    },
    setBoardState: (board: Board) => set({board}),
}))

export default useBoardStore