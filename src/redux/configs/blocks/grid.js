/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faBold,
  faItalic,
  faStrikethrough,
  faTextSlash,
  faTrash,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import { ReactSortable } from "react-sortablejs";
import { index } from "d3";

export default (props) => {
  const { cache, gridState, floating, page, preview } = useSelector(
    (state) => state
  );
  const {
    id,
    zIndex,
    insertComponent,
    appendChildComponent,
    removeComponent,
    children,
    parent,
    renderFrontLiner,
    renderBackLiner,
    style,
  } = props;
  const dispatch = useDispatch();
  const [childrenInEachColumn, setChildrenInEachColumn] = useState({});
  const [element, setElement] = useState(children);

  const isActive = () => {
    const { activeComponent, hoverComponent } = cache;
    if (activeComponent.indexOf(id) !== -1 || hoverComponent == id) {
      return true;
    }
    return false;
  };

  const atLeastOneChildIsNotUndefined = () => {
    const filtedChildren = children.filter((c) => c != undefined);
    return filtedChildren.length;
  };
  const SwitchingState = () => {
    const { activeComponent } = cache;
    if (children.length == 0) {
      if (activeComponent != id) {
        dispatch({
          branch: "design-ui",
          type: "setActiveComponent",
          payload: {
            id,
          },
        });
        $("#property-trigger").click();
      }
    }
  };
  const SwitchingStateBack = (id) => {
    const { activeComponent } = cache;
    dispatch({
      branch: "design-ui",
      type: "setActiveComponent",
      payload: {
        id: id,
      },
    });
  };
  const ComponentHover = () => {
    dispatch({
      branch: "design-ui",
      type: "setHoverComponent",
      payload: {
        id,
      },
    });
  };

  const FlexAppendsChild = () => {
    appendChildComponent(id);
  };
  const FlexAppendsChildCol = (rowIndex) => {
    if (childrenInEachColumn[rowIndex]) {
      // Nếu đã có child, không cho phép thêm nữa
      return;
    }
    appendChildComponent(id, rowIndex);
    setChildrenInEachColumn({ ...childrenInEachColumn, [rowIndex]: true });
  };
  const renderStyle = () => {
    let style = { zIndex };
    return style;
  };
  useEffect(() => {
    setElement(children);
  }, [children]);

  useEffect(() => {
    const newChildrenInEachColumn = {};
    style.grid.forEach((row, index) => {
      newChildrenInEachColumn[index] = children.some(
        (child) => child.props.colIndex === index
      );
    });
    setChildrenInEachColumn(newChildrenInEachColumn);
  }, [children, style.grid]);


  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    console.log("resultttt", result);
    const newColIndex = Number(result.destination.droppableId.split("-")[1]);

    dispatch({
      branch: "design-ui",
      type: "updateChildrenOrder",
      payload: {
        idGrid: id,
        id: result.draggableId,
        col: newColIndex,
        index_send: result.source.index,
        index_receive: result.destination.index,
      },
    });
  };
  const renderGrid = () => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              className="grid-container row"
              {...provided.droppableProps}
              ref={provided.innerRef}
              onClick={(e) => {
                const rowIndex = style?.grid.findIndex((row) =>
                  e.target.classList.contains(`col-${row.value}`)
                );
                if (
                  !element.some((child) => child.props.colIndex === rowIndex) &&
                  e.target === e.currentTarget
                ) {
                  SwitchingStateBack(id);
                }
              }}
            >
              {style?.grid.map((row, rowIndex) => {
                return (
                  <Droppable
                    key={rowIndex}
                    droppableId={`droppable-${rowIndex}`}
                  >
                    {(provided, snapshot) => (
                      <div
                        onMouseUp={() => FlexAppendsChildCol(rowIndex)}
                        className={`${
                          preview ? "" : "border-grid grid-col "
                        } col-${row.value} `}
                        style={{
                          width: row.value === "12" && "99%",
                        }}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                       
                        onClick={(e) => {
                          if (
                            !element.some(
                              (child) => child.props.colIndex === rowIndex
                            )
                          ) {
                            SwitchingStateBack(id);
                          }
                        }}
                      >
                       
                        {element?.map((child, index) => {
                          return child.props.colIndex === rowIndex ? (
                            <Draggable
                              key={child.key}
                              draggableId={child.key}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <>
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {child}
                                  </div>
                                </>
                              )}
                            </Draggable>
                          ) : (
                            <></>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}

              <div className="unfound-children">
                {element?.map((child, index) =>
                  child.props.colIndex === null ||
                  child.props.colIndex === undefined ? (
                    <Draggable
                      key={child.key}
                      draggableId={child.key}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <>
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {child}
                          </div>
                        </>
                      )}
                    </Draggable>
                  ) : (
                    <></>
                  )
                )}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };
  if (preview) {
    return <div style={renderStyle()}>{renderGrid()}</div>;
  } else {
    return (
      <div className="design-zone-container" style={{ zIndex }}>
        {renderFrontLiner(id, parent)}
        <div
          className={`design-zone block-design ${
            isActive() ? "design-zone-active flex2-design-active" : ""
          }`}
          onClick={SwitchingState}
          onMouseEnter={ComponentHover}
          style={{ zIndex }}
          onMouseUp={FlexAppendsChild}
        >
          {renderGrid()}
        </div>

        {renderBackLiner(id, parent)}
      </div>
    );
  }
};
