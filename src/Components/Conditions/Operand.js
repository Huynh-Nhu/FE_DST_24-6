import { memo, useId, useState } from "react";
import { TableContainer } from "./Table/TableContainer";
import { useSelector } from "react-redux";

function Component({
  onChange = () => {},
  default_value: { value, table, ...default_valueProps },
  default_type = "value",
  ...props
}) {
  const [type, setType] = useState(default_type);
  const arr = [
   
    { label: "Value", value: "value", id: useId() },
    { label: "Table", value: "table", id: useId() },
  ];
  const {lang} = useSelector((s) => s)
  const handleChangeType = (type) => {
    setType(type);
  };


  const handleRenderByType = (type) => {
    switch (type) {
      case "value":
        return (
          <div
            className="mt-2 mb-2 row"
            style={{
              alignItems: "center",
            }}
          >
          <div className="col-4" style={{ paddingLeft: "16px" }}>  <span>{lang["Return value"]}:</span></div>
          <div className="col-8" style={{ padding: "0px 14px 0px 6px" }}>
              <input
                className="form-control"
                type="text"
                value={value}
                onChange={({ target: { value } }) => {
                  onChange({ payload: { ...default_valueProps, value } });
                }}
              />
          </div>
          </div>
        );
      case "table":
        return (
          <TableContainer
            default_value={{ table, value }}
            onChange={(payload) => {
              onChange({ payload: { ...default_valueProps, ...payload } });
            }}
           
            {...props}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      <div className="row   align-items-center mt-2">
        <div className="col-4" style={{ paddingLeft: "16px" }}>
          <span>{lang["table method"]}:</span>
        </div>
        <section className="col-8" style={{ padding: "0px 14px 0px 6px" }}>
          <select
            className="form-select"
            aria-label="Default select example"
            value={type}
            onChange={(e) => handleChangeType(e.target.value)}
          >
            {arr.map(({ label, value, id }) => (
              <option key={`${id}${value}`} value={value} >
                {label} 
              </option>
            ))}
          </select>
        </section>
      </div>
      {handleRenderByType(type)}
    </>
  );
}

const Operand = memo(Component);

export { Operand };
