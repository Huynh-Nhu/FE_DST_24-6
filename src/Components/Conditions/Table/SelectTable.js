import Select from "react-select";
import { memo } from "react";
import { useSelector } from "react-redux";

function Component({ tables = [], default_value, onChange = () => {} }) {
  const option = tables.find((table) => table.table_alias === default_value);
  const {lang} = useSelector((s)=>s)

  return (
    <section className="select-chonse-content">
     <div className="d-flex flex-wrap row align-items-center" style={{
            alignItems:"center"
          }}>
       <div className="col-4 pe-0 " > <label>{lang["Board"]}:</label></div>
       <div className=" col-8 pl-0 " >
          <Select
            value={{ label: option?.table_name, value: option?.table_alias }}
            options={tables.map(({ table_name, table_alias }) => ({
              label: table_name,
              value: table_alias,
            }))}
            onChange={(option) => {
              onChange(option.value);
            }}
          />
       </div >
     </div>
    </section>
  );
}

const SelectTable = memo(Component, (oldProps, newProps) => {
  return (
    oldProps.tables.length === newProps.tables.length &&
    oldProps.default_value === newProps.default_value
  );
});

export { SelectTable };
