import { memo, useState, useEffect } from "react";

function Select({ onChange, label, default_value = {}, component_id }) {
  const [content, setContent] = useState(JSON.stringify(default_value));
  useEffect(() => {
    try {
      if (typeof default_value === "object") {
        setContent(JSON.stringify(default_value));
      }
    } catch (e) {}
  }, [component_id]);

  return (
    <section
      style={{
        width: "100%",
      }}
    >
      <label>{label}</label>
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        value={content}
        onChange={({ target: { value } }) => {
          onChange(value);
          setContent(value);
        }}
         //  Nhu style giới hạn chiều cao
         style={{
          height: 'auto',
          minHeight: '150px', // Giới hạn chiều cao tối đa là 100px
          overflow: 'auto',
        }}
      ></textarea>
    </section>
  );
}

export const SelectContainer = memo(Select, (oldProps, newProps) => {
  if (
    oldProps.component_id === newProps.component_id &&
    oldProps.label === newProps.label
  ) {
    return true;
  }

  return false;
});
