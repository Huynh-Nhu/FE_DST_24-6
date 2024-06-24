import { SelectTable } from "./SelectTable";
import {
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { FieldsContainer } from "../Fields/FieldsContainer";
import { SelectValue } from "./SelectValue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useContext } from "react";
import ColorContext from "../../../cpn/api/ContextTable";

function Component({ default_value, onChange, key, ...props }) {
  const state = useRef(default_value, []);
  const { lang } = useSelector((s) => s);
  const [showFields, setShowFields] = useState(false);
  const [showValues, setShowValues] = useState(false);
  const { color, setColor } = useContext(ColorContext);

  const fields = useMemo(() => {
    return (
      props?.tables?.find(
        ({ table_alias }) => table_alias === default_value?.table?.alias
      )?.fields || []
    );
  }, [default_value?.table?.alias]);
  // chọn bang

  const handleShowFields = (id) => {
    setShowFields(!showFields);
    setColor({
      [id]: id,
    });
  };
  const handleShowValues = (id) => {
    setShowValues(!showValues);
    setColor({
      [id]: id,
    });
  };

  const handleClickTaskChild = (id) => {
    setColor({
      [id]: id,
    });
  };

  const idField = useId();
  const idValue = useId();

  useEffect(() => {}, [showFields, showValues]);
  return (
    <section className="select-chonse-table">
      <div className="select-chonse-table-header d-flex row">
        <span
          className="col-5 pl-0 span-text-operand"
          onClick={() => handleShowFields(idField)}
        >
          <FontAwesomeIcon
            icon={showFields ? faAngleUp : faAngleRight}
            className="icon-arrow"
          />
          {lang["select table"]}
        </span>
        <p
          onClick={() => handleClickTaskChild(idField)}
          className="click-task col-7 pl-0 border-left-task"
        >
          {idField}
        </p>
      </div>
      {showFields && (
        <div
          //  className="group-fields"
          className={`${color[idField] ? "bg-set" : ""} group-fields`}
        >
          <SelectTable
            default_value={default_value?.table?.alias}
            onChange={(alias) => {
              if (!state.current.table) {
                state.current.table = {};
              }
              state.current.table.alias = alias;
              onChange(state.current);
            }}
            {...props}
          />
          <FieldsContainer
            default_value={default_value?.table?.fields}
            onChange={(fields) => {
              if (!state.current.table) {
                state.current.table = {};
              }
              state.current.table.fields = fields;
              onChange(state.current);
            }}
            fields={fields}
            {...props}
          />
        </div>
      )}
      <div>
        <div className="select-chonse-table-header d-flex row">
          <span
            className="col-5 pl-0 span-text-operand"
            onClick={() => handleShowValues(idValue)}
          >
            <FontAwesomeIcon
              icon={showValues ? faAngleUp : faAngleRight}
              className="icon-arrow"
            />
            {lang["select value"]}
          </span>
          <p
            onClick={() => handleClickTaskChild(idValue)}
            className="click-task col-7 pl-0 border-left-task"
          >
            1
          </p>
        </div>
        {showValues && (
          <div className={`${color[idValue] ? "bg-set" : ""} chonse-values`}>
            <SelectValue
              fields={fields}
              default_value={default_value?.value}
              onChange={(value) => {
                state.current.value = value;
                onChange(state.current);
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

const TableContainer = memo(Component);
export { TableContainer };
