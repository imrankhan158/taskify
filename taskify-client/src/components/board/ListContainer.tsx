import React from "react";
import ListItem from "./ListItem";
import ListForm from "./ListForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/interfaces";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { updateTaskOrderAction } from "../../redux/actions/orgActions";

const ListContainer = () => {
  const activeBoard = useSelector((state: RootState) => state.org.activeBoard);
  const dispatch = useDispatch();

  const onDragEnd = (result: any) => {
    dispatch(updateTaskOrderAction({ ...result }));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex m-6 gap-6"
          >
            {activeBoard?.cardList?.map((item, index) => (
              <ListItem card={item} key={item._id} index={index} />
            ))}
            {provided.placeholder}
            <ListForm />
            {/* <div className="flex-shrink-0 w-1" /> */}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
