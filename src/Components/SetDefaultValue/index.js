function SetDefaultValue({ fieldId = "", default_value, onChange = () => {} }) {
  console.log("Re-render Set default value");
  return (
    <section>
      <input
        type="text"
        className="form-control"
        value={default_value}
        onChange={({ target: { value } }) => {
          onChange({ fieldId, value });
        }}
      />
    </section>
  );
}
export { SetDefaultValue };
