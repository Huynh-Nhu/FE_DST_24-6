import { memo } from "react";

function GroupBy({
  groups: { fields = [] } = {},
  onChange,
  defaultValue = [],
  label = "Group by",
}) {
  return (
    <section>
      <div className="label-box mt-2 mb-2">{label}</div>
      <div class="form-check">
        {fields.map(({ id, field_name, fomular_alias }) => {
          const id_reference = Math.random();
          return (
            <section key={id}>
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id={id_reference}
                checked={defaultValue.find((item) => item === fomular_alias)}
                onChange={({ target: { checked } }) => {
                  onChange(checked, fomular_alias);
                }}
              />
              <label class="form-check-label" for={id_reference}>
                {field_name}-{fomular_alias}
              </label>
            </section>
          );
        })}
      </div>
    </section>
  );
}
export const GroupByContainer = memo(GroupBy);
