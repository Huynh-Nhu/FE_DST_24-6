import { useContext, useEffect, useId, useState } from "react";
import Select from "react-select";
import { useCondition } from "./Hooks/useCondition";
import { Operand } from "./Operand";
import { SetValue } from "./SetValue";
import { SelectWhere } from "./Table/SelectWhere";
import { GenerateRandomLetter } from "../../utils/GenerateRandomLetter";
import ColorContext from "../../cpn/api/ContextTable";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTrash,
  faAngleRight,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

export const CONDITION_TYPE = ["NOT_NULL", "NULL", "BOOLEAN"];

export const Conditions = ({
  tables = [],
  field_id = "",
  onChange = () => {},
  fields = [],
  ...props
}) => {
  const { handleChange, conditions } = useCondition(props.conditions, {
    id: Math.random(),
    field_id,
    left_operand: {
      table: {
        alias: "",
        fields: [],
      },
      alias: GenerateRandomLetter(5),
      value: undefined,
      position: undefined,
    },
    // operator: undefined,
    where: [],
    right_operand: {
      table: {
        alias: "",
        fields: [],
      },
      alias: GenerateRandomLetter(5),
      value: undefined,
      position: undefined,
    },
    isBreak: false,
    isContinue: true,
    success_value: undefined,
    failure_value: undefined,
  });
  const { color, setColor } = useContext(ColorContext);
  const { lang } = useSelector((s) => s);
  const [showLeft, setShowLeft] = useState({});
  const [show, setShow] = useState({});
  const [showC, setShowC] = useState(false);

  const handleShowC = () => {
    setShowC(!showC);
  };

  const handleShow = (id) => {
    setColor({
      [id]: id,
    });

    setShow({
      ...show,
      [id]: !show[id],
    });
  };

  const handleShowLeft = (code, id) => {
    setShowLeft({
      ...showLeft,
      [code + id]: !showLeft[code + id],
    });
    setColor({
      [code + id]: code + id,
    });
  };
  const handleClickTaskParent = (id) => {
    setColor({
      [id]: id,
    });
  };
  const handleClickTaskChild = (code, id) => {
    setColor({
      [code + id]: code + id,
    });
  };

  useEffect(() => {
    onChange({ field_id, payload: conditions });
  }, [conditions, showLeft, show, color]);

  const arr = [
    {
      label: "Left Operand",
      key: "left_operand",
      code: useId(),
    },
    {
      label: "Right Operand",
      key: "right_operand",
      code: useId(),
    },
  ];

  return (
    <div className="api-cnp" style={{ padding: "0px" }}>
      <div
        className={`${conditions.length > 0 ? "api-header" : "api-header-of"} `}
      >
        <div className="api-label" onClick={handleShowC}>
          <FontAwesomeIcon
            icon={showC ? faAngleUp : faAngleRight}
            className="icon-arrow"
          />
          {lang["Condition"]}
        </div>

        <div className="incon-plus-api ms-auto">
          <FontAwesomeIcon
            className=""
            icon={faPlusCircle}
            onClick={() => handleChange({ type: "add" })}
          />
        </div>
      </div>
      {showC && (
        <div>
          {conditions.map(
            ({ id, operator, isBreak, isContinue, where, ...props }, i) => {
              return (
                <div
                  className={`${
                    color[id] === id ? "bg-set" : ""
                  } condition-content`}
                >
                  <div className="left-operand-header-cpn d-flex row m-0">
                    <span
                      onClick={() => handleShow(id)}
                      className="drop-api col-5 pl-0 span-text-operand"
                    >
                      <FontAwesomeIcon
                        icon={show[id] ? faAngleUp : faAngleRight}
                        className="icon-arrow"
                      />
                      <span>{id} </span>
                    </span>
                    <div
                      className="click-task col-5 border-left-task"
                      onClick={() => handleClickTaskParent(id)}
                    >
                      1
                    </div>
                    <div className="col-2 icon-end  pe-0">
                      <FontAwesomeIcon
                        className="btn-remove-fields"
                        icon={faTrash}
                        onClick={() => {
                          handleChange({ type: "delete", id });
                        }}
                      />
                    </div>
                  </div>
                  {show[id] && (
                    <section key={i}>
                      {/* <p>{id}</p> */}
                      <div className="m-1">
                        <div className="row d-flex  flex-wrap align-items-center mb-2 mt-2">
                          <div
                            className="col-3"
                            style={{ padding: " 0 0 0 16px" }}
                          >
                            <span> {lang["Condition"]}: </span>
                          </div>
                          <div className="col-4">
                            <section className="d-flex">
                              <div
                                style={{ marginTop: "2px", marginRight: "2px" }}
                              >
                                <input
                                  type="checkbox"
                                  checked={isBreak}
                                  onChange={({ target: { checked } }) => {
                                    handleChange({
                                      type: "update",
                                      id,
                                      payload: { isBreak: checked },
                                    });
                                  }}
                                />
                              </div>
                              <span>Is Break: </span>
                            </section>
                          </div>
                          <div className="col-4">
                            <section className="d-flex">
                              <div
                                style={{ marginTop: "2px", marginRight: "2px" }}
                              >
                                <input
                                  type="checkbox"
                                  checked={isContinue}
                                  onChange={({ target: { checked } }) => {
                                    handleChange({
                                      type: "update",
                                      id,
                                      payload: { isContinue: checked },
                                    });
                                  }}
                                />
                              </div>
                              <span>Is Continue: </span>
                            </section>
                          </div>
                        </div>
                      </div>

                      {/* <button
                        onClick={() => {
                          handleChange({ type: "delete", id });
                        }}
                      >
                        Delete
                      </button> */}

                      <SetValue
                        label={lang["Correct value"]}
                        default_value={props?.success_value}
                        onChange={(value) => {
                          handleChange({
                            type: "update",
                            id,
                            payload: {
                              success_value: value,
                            },
                          });
                        }}
                      />
                      <div className="mt-2">
                        <SetValue
                          label={lang["Wrong value"]}
                          default_value={props?.failure_value}
                          onChange={(value) => {
                            handleChange({
                              type: "update",
                              id,
                              payload: {
                                failure_value: value,
                              },
                            });
                          }}
                        />
                      </div>

                      {arr.map(({ label, key, code }) => (
                        <section key={key} className="comdition-lr">
                          <div>
                            <div className="left-operand-header d-flex flex-wrap row m-0">
                              <span
                                className="col-5 pe-0 span-text-operand"
                                onClick={() => handleShowLeft(code, id)}
                              >
                                <FontAwesomeIcon
                                  icon={
                                    showLeft[code + "-" + id]
                                      ? faAngleUp
                                      : faAngleRight
                                  }
                                  className="icon-arrow"
                                />

                                {label}
                              </span>
                              <p
                                className="click-task col-7 pl-0 border-left-task"
                                onClick={() => handleClickTaskChild(code, id)}
                              >
                                1
                              </p>
                            </div>
                          </div>
                          {showLeft[code + id] && (
                            <div
                              className={`${
                                color[code + id] === code + id ? "bg-set" : ""
                              } left-container`}
                            >
                              <div
                                className="row mt-2"
                                style={{
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  className="col-4"
                                  style={{ paddingLeft: "16px" }}
                                >
                                  <span>{lang["Alias"]}: </span>
                                </div>
                                <div
                                  className="col-8"
                                  style={{ padding: "0px 14px 0px 6px" }}
                                >
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={props[key]?.alias}
                                    onChange={({ target: { value } }) => {
                                      if (value.length !== 0) {
                                        handleChange({
                                          type: "update",
                                          id,
                                          payload: {
                                            [key]: {
                                              ...props[key],
                                              alias: value,
                                            },
                                          },
                                        });
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                              <Operand
                               label={label}
                                tables={tables}
                                default_value={props[key]}
                                default_type={
                                  props[key]?.table?.alias ? "table" : "value"
                                }
                                onChange={({ payload }) => {
                                  handleChange({
                                    type: "update",
                                    id,
                                    payload: {
                                      [key]: payload,
                                    },
                                  });
                                }}
                              />
                            </div>
                          )}
                        </section>
                      ))}

                      <SelectWhere
                        default_value={where}
                        left_fields={(() => {
                          const fields = [];

                          // if (Array.isArray(props.left_operand.value)) {
                          //   fields.push(...props.left_operand.value);
                          // } else {
                          //   fields.push({
                          //     label: props.left_operand.value,
                          //     value: props.left_operand.value,
                          //   });
                          // }

                          return fields;
                        })()}
                        right_fields={(() => {
                          const fields = [];

                          // if (Array.isArray(props.right_operand.value)) {
                          //   fields.push(...props.right_operand.value);
                          // } else {
                          //   fields.push({
                          //     label: props.right_operand.value,
                          //     value: props.right_operand.value,
                          //   });
                          // }
                          return fields;
                        })()}
                        onChange={(fields) => {
                          handleChange({
                            type: "update",
                            id,
                            payload: {
                              where: fields,
                            },
                          });
                        }}
                      />
                    </section>
                  )}
                </div>
              );
            }
          )}
        </div>
      )}
      {/* <button
        type="button"
        class="btn btn-primary custom-buttonadd ml-auto"
        onClick={() => handleChange({ type: "add" })}
      >
        <i class="fa fa-plus"></i>
      </button> */}
    </div>
  );
};
