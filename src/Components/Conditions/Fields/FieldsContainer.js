import Select from "react-select";
import { useCondition } from "../Hooks/useCondition";
import { memo, useEffect, useId, useState, useContext } from "react";
import { Operand } from "../Operand";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPlusCircle,
  faTrash,
  faAngleRight,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import ColorContext from "../../../cpn/api/ContextTable";

function Component({ default_value = [], fields = [], onChange, ...props }) {
  const { handleChange, conditions } = useCondition(default_value, {
    id: Math.random(),
    alias: undefined,
    operator: "=",
    table: {
      alias: "",
      fields: [],
    },
    position: undefined,
    value: undefined,
  });
  const { lang } = useSelector((s) => s);
  const { color, setColor } = useContext(ColorContext);

  const [showFields, setShowFields] = useState(false);
  const [showLeft, setShowLeft] = useState(false);

  const [fieldChild, setFieldChild] = useState({});

  const handleShowFields = (id) => {
    setShowFields(!showFields);

    setColor({
      [id]: id,
    });
  };
  const handleShowFieldChild = (id) => {
    setFieldChild({
      ...fieldChild,
      [id]: !fieldChild[id],
    });
    setColor({
      [id]: id,
    });
  };
  const handleShowLeft = (id, i) => {
    setShowLeft({
      ...showLeft,
      [id + i]: !showLeft[id + i],
    });
    setColor({
      [id + "-" + i]: id + "-" + i,
    });
  };
  const handleClickTask = (id) => {
    setColor({
      [id]: id,
    });
  };
  const handleClickPrerequisites = (id, i) => {
    setColor({
      [id + "-" + i]: id + "-" + i,
    });
  };
  const idField = useId();
  useEffect(() => {
    onChange(conditions);
  }, [conditions, showFields, showLeft]);

  return (
    <section
      className={`${color[idField] ? "bg-set" : " "} fiedls-container`}
      //  className="fiedls-container"
    >
      <div className="field-of-chonse-table d-flex row m-0">
        <span
          className="col-5 pl-0 span-text-operand"
          onClick={() => handleShowFields(idField)}
        >
          <FontAwesomeIcon
            icon={showFields ? faAngleUp : faAngleRight}
            className="icon-arrow"
          />
          {lang["Field"]}
        </span>

        <div
          className="click-task col-5 border-left-task "
          onClick={() => handleClickTask(idField)}
        >
          .............................{" "}
        </div>
        <div className="btn-add-fields col-2 icon-end  pe-0">
          <FontAwesomeIcon
            icon={faPlusCircle}
            onClick={() => {
              handleChange({ type: "add" });
            }}
          />
        </div>
      </div>

      {showFields && (
        <>
          {conditions.length > 0 ? (
            <>
              <div>
                {conditions.map(({ id, table, value, alias }, i) => {
                  const field = fields.find(
                    ({ fomular_alias }) => fomular_alias === alias
                  );

                  return (
                    <section key={id} className="fields-children">
                      <div className="field-header-cpn d-flex row m-0">
                        <div
                          onClick={() => handleShowFieldChild(id)}
                          className="drop-api col-5 pl-0 span-text-operand"
                        >
                          <FontAwesomeIcon
                            icon={fieldChild[id] ? faAngleUp : faAngleRight}
                            className="icon-arrow"
                          />
                          {lang["Field"]} {i + 1}
                        </div>
                        <div
                           className="click-task col-5 border-left-task"
                          onClick={() => handleClickTask(id)}
                        >
                          .............................{" "}
                        </div>
                        <div className="col-2 icon-end  pe-0">
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="btn-remove-fields"
                            onClick={() => {
                              handleChange({ type: "delete", id });
                            }}
                          />
                        </div>
                      </div>

                      {fieldChild[id] && (
                        <div className={`${color[id] === id ? "bg-set" : ""} `}>
                          <div className="select-chonse-content">
                            <div className=" row d-flex flex-wrap align-items-center">
                              <div className="col-4">
                                <span>{lang["select fields"]}:</span>
                              </div>
                              <div className="col-8 pl-0">
                                <Select
                                  options={fields.map(
                                    ({ field_name, fomular_alias }) => ({
                                      label: field_name,
                                      value: fomular_alias,
                                    })
                                  )}
                                  value={{
                                    label: field?.field_name,
                                    value: field?.fomular_alias,
                                  }}
                                  onChange={(option) => {
                                    handleChange({
                                      type: "update",
                                      id,
                                      payload: { alias: option.value },
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="left-operand">
                            <div className="name-select-chonse-table d-flex flex-wrap row m-0">
                              <span  className="col-5 pe-0 span-text-operand" onClick={() => handleShowLeft(id, i)}>
                                <FontAwesomeIcon
                                  icon={showLeft ? faAngleUp : faAngleRight}
                                  className="icon-arrow"
                                />
                                {lang["Prerequisites"]}
                              </span>
                              <div
                                  className="click-task col-7 pl-0 border-left-task"
                                onClick={() => handleClickPrerequisites(id, i)}
                              >
                              0
                              </div>
                            </div>
                            {showLeft[id + i] && (
                              <div
                                // className="left-container-of-fields"
                                className={`${
                                  color[id + "-" + i] === id + "-" + i
                                    ? "bg-set"
                                    : ""
                                } left-container-of-fields`}
                              >
                                <Operand
                                  default_value={{ table, value }}
                                  default_type={
                                    table?.alias ? "table" : "value"
                                  }
                                  onChange={({ payload }) => {
                                    handleChange({
                                      type: "update",
                                      id,
                                      payload,
                                    });
                                  }}
                                  tables={props?.tables}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <span className="text-center">Chưa thêm trường</span>
            </>
          )}
        </>
      )}
    </section>
  );
}

const FieldsContainer = memo(Component, (oldProps, newProps) => {
  return (
    oldProps?.fields?.length === newProps?.fields?.length &&
    oldProps?.default_value?.length === newProps?.default_value?.length
  );
});

export { FieldsContainer };
