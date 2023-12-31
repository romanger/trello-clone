'use client'

import useBoardStore from '@/store/BoardStore'
import { useEffect } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import Column from './Column'

const Board = () => {
    const [board, getBoard, setBoardState] = useBoardStore((state) => {
        return [state.board, state.getBoard, state.setBoardState]
    })

    useEffect(() => {
        getBoard()
    }, [getBoard])

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, type } = result

        if (!destination) return

        if (type === 'column') {
            const entries = Array.from(board.columns.entries())
            const [removed] = entries.splice(source.index, 1)
            entries.splice(destination.index, 0, removed)
            const rearrangedColumns = new Map(entries)
            setBoardState({ ...board, columns: rearrangedColumns })
        }

        
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='board' direction='horizontal' type='column'>
                {(provided) => (
                    <div
                        className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {Array.from(board.columns.entries()).map(
                            ([id, column], index) => (
                                <Column
                                    id={id}
                                    todos={column.todos}
                                    index={index}
                                    key={id}
                                />
                            )
                        )}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Board
