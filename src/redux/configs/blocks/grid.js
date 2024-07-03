/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

export default (props) => {
  const { cache, gridState, floating, preview } = useSelector((state) => state);
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
  // console.log("children", children);
  const dispatch = useDispatch();
  const [gridPositions, setGridPositions] = useState({});
  const [unfoundChildren, setUnfoundChildren] = useState([]);
  const [updatedGridStyle, setUpdatedGridStyle] = useState(style.grid);
  const [childrenInEachColumn, setChildrenInEachColumn] = useState({});

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
    // Kiểm tra xem cột đó đã có child chưa
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
    // const foundChildIds = style.grid.map((row) => row.childId);
    const unfound = children.filter(
      (child) =>
        child.props.colIndex === null || child.props.colIndex === undefined
    );
    setUnfoundChildren(unfound);



    const newChildrenInEachColumn = {};
    style.grid.forEach((row, index) => {
      newChildrenInEachColumn[index] = children.some(
        (child) => child.props.colIndex === index
      );
    });
    setChildrenInEachColumn(newChildrenInEachColumn);
  }, [children, style.grid]);
  const renderGrid = () => {
    return (
      <div
        className="grid-container row"
        onClick={(e) => {
          const rowIndex = style?.grid.findIndex((row) =>
            e.target.classList.contains(`col-${row.value}`)
          );
          if (
            !children.some((child) => child.props.colIndex === rowIndex) &&
            e.target === e.currentTarget
          ) {
            SwitchingStateBack(id);
          }
        }}
      >
        {style?.grid.map((row, rowIndex) => (
          <div
            // onMouseUp={() => appendChildComponent(id, rowIndex)}
            onMouseUp={() => FlexAppendsChildCol(rowIndex)}
            key={rowIndex}
            className={`${
              preview ? "" : "border-grid grid-col "
            }  col-${row.value}`}
            // style={{height: "fit-content"}}
          >
            {children
              .filter((child) => child.props.colIndex === rowIndex)
              .map((child, index) => (
                <div key={index}>{child}</div>
              ))}
            {/* {row.child} */}
          </div>
        ))}

        <div className="unfound-children">
          {unfoundChildren.map((child, index) => (
            <div key={index} className="unfound-child">
              {child}
            </div>
          ))}
        </div>
      </div>
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
