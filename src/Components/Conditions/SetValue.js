import { memo } from "react";

function Component({ onChange, default_value, label }) {
  return (
    <section className="row d-flex flex-wrap align-items-center ">
   <div className="col-3 " style={{padding:" 0 0 0 16px"}}>   <label>{label}: </label></div>
     <div className="col-9 ">
        <input
        className="form-control"
          type="text"
          onChange={({ target: { value } }) => {
            onChange(value);
          }}
          value={default_value}
        />
     </div>
    </section>
  );
}

const SetValue = memo(Component, (oldProps, newProps) => {});
export { SetValue };
