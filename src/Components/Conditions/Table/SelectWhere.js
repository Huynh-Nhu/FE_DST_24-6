import { memo, useEffect, useId, useState } from "react";
import { useCondition } from "../Hooks/useCondition";
import { useContext } from "react";

import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTrash,
  faAngleUp,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import ColorContext from "../../../cpn/api/ContextTable";

function Component({
  // color,
  // setColor,
  left_fields: l_f = [],
  right_fields: r_f = [],
  default_value = [],
  onChange = () => {},

  ...props
}) {
  const { conditions, handleChange } = useCondition(default_value, {
    id: Math.random(),
    operator: undefined,
    left_fields: [],
    left_field_position: 0,
    right_fields: [],
    right_field_position: 0,
  });
  const { color, setColor } = useContext(ColorContext);
  const { lang } = useSelector((s) => s);
  // const {

  //   color, setColor,
  //   handleCompare,

  // } = props;

  const [showSelectWhere, setShowSelectWhere] = useState(false);

  const [showleft, setShowLeft] = useState({});

  const [showRight, setShowRight] = useState({});

  const [showCompare, setShowCompare] = useState(false);

  const operators = [
    {
      label: "Equal",
      value: "=",
    },
    {
      label: "Less than",
      value: "<",
    },
    {
      label: "Greater than",
      value: ">",
    },
    {
      label: "Not equal",
      value: "!=",
    },
    {
      label: "Less than or equal",
      value: "<=",
    },
    {
      label: "Greater than or equal",
      value: ">=",
    },
    {
      label: "Some",
      value: "some",
    },
    {
      label: "Every",
      value: "every",
    },
  ];
  // console.log("LOOOOO", conditions);

  const handleShowSelectWhere = (code) => {
    setShowSelectWhere({
      ...showSelectWhere,
      [code]: !showSelectWhere[code],
    });
    setColor({
      [code]: code,
    });
  };

  const handleShowShowLeft = (id, i) => {
    setShowLeft({
      ...showleft,
      [id]: !showleft[id],
    });
    setColor({
      [id + "-" + i]: id + "-" + i,
    });
  };
  const handleShowShowRight = (id, i) => {
    setShowRight({
      ...showRight,
      [id]: !showRight[id],
    });
    setColor({
      [id + "-" + i]: id + "-" + i,
    });
  };

  const handleShowCompare = (id) => {
    setShowCompare({
      ...showCompare,
      [id]: !showCompare[id],
    });
    setColor({
      [id]: id,
    });
  };
  const handleClickTask = (id) => {
    setColor({
      [id]: id,
    });
  };
  const handleClickTaskChild = (id, i) => {
    setColor({
      [id + "-" + i]: id + "-" + i,
    });
  };
  const idCompre = useId();
  const idLeft = useId();
  const idRight = useId();

  useEffect(() => {
    onChange(conditions);
  }, [conditions, showSelectWhere, color, showCompare, showleft, showRight]);

  return (
    <section className="comdition-lr">
      <div className="left-operand-header d-flex row m-0">
        <span
          className="col-5  span-text-operand"
          onClick={() => handleShowSelectWhere(idCompre)}
        >
          <FontAwesomeIcon
            icon={showSelectWhere ? faAngleUp : faAngleRight}
            className="icon-arrow"
          />
          {lang["Compare"]}
        </span>
        <div
          className="click-task col-5 border-left-task "
          onClick={() => handleClickTask(idCompre)}
        >
          1
        </div>
        <div className="btn-add-condition  icon-end col-2">
          <FontAwesomeIcon
            icon={faPlusCircle}
            onClick={() => handleChange({ type: "add" })}
          />
        </div>
      </div>

      {showSelectWhere[idCompre] && (
        <div
          className={`${
            color[idCompre] === idCompre ? "bg-set" : ""
          } compare-children`}
        >
          {conditions.length > 0 ? (
             <>
                 {conditions.map(
                  (
                    {
                      id,
                      operator,
                      left_fields,
                      right_fields,
                      left_field_position,
                      right_field_position,
                    },
                    i
                  ) => (
                    <section id={id} className="fields-children">
                      <div className="left-compare-children d-flex row m-0">
                        <span
                          className=" col-5 span-text-operand"
                          onClick={() => handleShowCompare(id)}
                        >
                          <FontAwesomeIcon
                            icon={showCompare[id] ? faAngleUp : faAngleRight}
                            className="icon-arrow "
                          />
                          {lang["Compare"]} {i + 1}
                        </span>
                        <div
                          className="click-task col-5 border-left-task"
                          onClick={() => handleClickTask(id)}
                        >
                          1
                        </div>
                        <div className="col-2 icon-end btn-remove-fields">
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => {
                              handleChange({ type: "delete", id });
                            }}
                          />
                        </div>
                      </div>
                      {showCompare[id] && (
                        <div
                          className={`${color[id] ? "bg-set" : ""}`}
                          style={{ border: "solid 1px gainsboro" }}
                        >
                          <div className="compare-left-right-fields">
                            <div className="left-fields-header-compare d-flex flex-wrap row m-0 ">
                              <span
                                className="col-5 pl-0 span-text-operand"
                                onClick={() => handleShowShowLeft(id, idLeft)}
                              >
                                <FontAwesomeIcon
                                  icon={showleft ? faAngleUp : faAngleRight}
                                  className="icon-arrow"
                                />
                                {lang["Left fields"]}
                              </span>
                              <p
                                className="click-task col-7 pl-0 border-left-task"
                                onClick={() => handleClickTaskChild(id, idLeft)}
                              >
                                1
                              </p>
                            </div>
                            {showleft[id] && (
                              <div
                                className={`${
                                  color[id + "-" + idLeft] === id + "-" + idLeft
                                    ? "bg-set"
                                    : ""
                                } p-2`}
                              >
                                <section>
                                  <span>{lang["Position"]}</span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={left_field_position}
                                    onChange={({ target: { value } }) => {
                                      if (
                                        value &&
                                        !isNaN(Number(value)) &&
                                        Number(value) >= 0
                                      ) {
                                        handleChange({
                                          type: "update",
                                          id,
                                          payload: { left_field_position: value },
                                        });
                                      }
                                    }}
                                  />
                                </section>
                                <section>
                                  <span>{lang["Comparative value"]}</span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={left_fields}
                                    onChange={({ target: { value } }) =>
                                      handleChange({
                                        type: "update",
                                        id,
                                        payload: { left_fields: value },
                                      })
                                    }
                                  />
                                </section>
                                {/* <Select
                              options={l_f}
                              value={left_fields}
                              onChange={(options) =>
                                handleChange({
                                  type: "update",
                                  id,
                                  payload: { left_fields: options },
                                })
                              }
                              /> */}
                                <section>
                                  <span>{lang["Comparison method"]}</span>
                                  <Select
                                    options={operators}
                                    value={operator}
                                    onChange={(option) => {
                                      handleChange({
                                        type: "update",
                                        id,
                                        payload: {
                                          operator: option,
                                        },
                                      });
                                    }}
                                  />
                                </section>
                              </div>
                            )}
                          </div>
                          <div className="compare-left-right-fields ">
                            <div className="left-fields-header-compare d-flex flex-wrap row m-0">
                              <span
                                className="col-5 pl-0 span-text-operand"
                                onClick={() => handleShowShowRight(id, idRight)}
                              >
                                <FontAwesomeIcon
                                  icon={showRight ? faAngleUp : faAngleRight}
                                  className="icon-arrow"
                                />
                                {lang["Right fields"]}
                              </span>
                              <div
                                className="click-task col-7 pl-0 border-left-task"
                                onClick={() => handleClickTaskChild(id, idRight)}
                              >
                                1
                              </div>
                            </div>
                            {showRight[id] && (
                              <div
                                className={`${
                                  color[id + "-" + idRight] === id + "-" + idRight
                                    ? "bg-set"
                                    : ""
                                } p-2`}
                              >
                                <section>
                                  <span>{lang["Position"]}</span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={right_field_position}
                                    onChange={({ target: { value } }) => {
                                      if (
                                        value &&
                                        !isNaN(Number(value)) &&
                                        Number(value) >= 0
                                      ) {
                                        handleChange({
                                          type: "update",
                                          id,
                                          payload: {
                                            right_field_position: value,
                                          },
                                        });
                                      }
                                    }}
                                  />
                                </section>
                                {/* <Select
                              options={r_f}
                              value={right_fields}
                              onChange={(options) =>
                                handleChange({
                                  type: "update",
                                  id,
                                  payload: { right_fields: options },
                                })
                              }
                              /> */}
      
                                <section className="">
                                  <span>{lang["Comparative value"]}</span>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={right_fields}
                                    onChange={({ target: { value } }) =>
                                      handleChange({
                                        type: "update",
                                        id,
                                        payload: { right_fields: value },
                                      })
                                    }
                                  />
                                </section>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </section>
                  )
                )}
             </>
          ) : (<>
            <span className="text-center">
              Chưa thêm trường so sánh
            </span>
          </>)}
       
        </div>
      )}
    </section>
  );
}
const SelectWhere = memo(Component, (oldProps, newProps) => {
  return (
    oldProps.default_value === newProps.default_value &&
    oldProps.left_fields.length === newProps.right_fields.length &&
    oldProps.color === newProps.color
  );
});
export { SelectWhere };
