import { memo } from "react";
import Select from "react-select";

function Component({ fields = [], onChange = () => {}, default_value }) {
  return (
    <section className="select-chonse-content">
      {/* <label>Chọn giá trị</label> */}
      <Select
        isMulti
        value={default_value}
        options={fields.map(({ field_name, fomular_alias }) => ({
          label: `${field_name}-${fomular_alias}`,
          value: fomular_alias,
        }))}
        onChange={(options) => {
          onChange(options);
        }}
      />
    </section>
  );
}

const SelectValue = memo(Component, (oldProps, newProps) => {
  return (
    oldProps.fields.length === newProps.fields.length &&
    oldProps.default_value === newProps.default_value
  );
});
export { SelectValue };
