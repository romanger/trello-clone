'use client'

import useBoardStore from '@/store/BoardStore'
import { useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const Board = () => {
    const [board, getBoard] = useBoardStore((state) => {
        return [state.board, state.getBoard]
    })

    useEffect(() => {
        getBoard()
    }, [])

    console.log(board)
    return (
        <div>Hello</div>
        // <DragDropContext>
        //     <Droppable droppableId='board' direction='horizontal' type='column'>
        //         {(provided) => <div></div>}
        //     </Droppable>
        // </DragDropContext>
    )
}

export default Board
