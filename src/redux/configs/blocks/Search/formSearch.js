import { useRef, useState } from "react";
import { IsNumber } from "./isNumber";
import "./search.css"

// Nhu code function
function FormSearch(props) {
  const { data, onchangeData } = props;
  // console.log("data", props);
  const [formData, setFormData] = useState({});
  const criteria = useRef([]);

  const handleInputChange = (fieldAlias, value, props) => {
    const index = criteria.current.findIndex(({ key }) => key === props.key);

    if (index > -1) {
      const newCriteria = [...criteria.current];
      if (newCriteria[index].tables[props.table]) {
        newCriteria[index].tables[props.table][fieldAlias] = value;
      } else {
        newCriteria[index].tables[props.table] = {};
        newCriteria[index].tables[props.table][fieldAlias] = value;
      }

      criteria.current = newCriteria;
    } else {
      criteria.current.push({
        key: props.key,
        tables: { [props.table]: { [fieldAlias]: value } },
      });
    }

    let processedValue;
    if (value === "true") {
      processedValue = true;
    } else if (value === "false") {
      processedValue = false;
    } else {
      processedValue = value;
    }

    const newFormData = { ...formData, [fieldAlias]: processedValue };

    setFormData(newFormData);
    onchangeData(newFormData);
  };
  const renderInput = (field, props) => {
    // const inputValue = formData[field.fomular_alias] || "";
    const valueBool = [
      {
        id: 0,
        label: field.DEFAULT_TRUE,
        value: true,
      },
      {
        id: 1,
        label: field.DEFAULT_FALSE,
        value: false,
      },
    ];
    switch (field.DATATYPE) {
      case "TEXT":
        return (
          <input
            type="text"
            className="form-control"
            placeholder={field.field_name}
            // value={inputValue}
            // onChange={(e) =>
            //   handleInputChange(field.fomular_alias, e.target.value, props)
            // }
          />
        );
      case "INT UNSIGNED" || "BIG INT" || "INT UNSIGNED" || "BIG INT UNSIGNED":
        return (
          <input
            type={`${field.AUTO_INCREMENT ? "text" : "number"}`}
            className="form-control "
            placeholder={field.field_name}
            min="0"
            // onChange={(e) =>
            //   handleInputChange(
            //     field.fomular_alias,
            //     IsNumber(e.target.value)
            //       ? Number(e.target.value)
            //       : e.target.value,
            //     props
            //   )
            // }
          />
        );
      case "DATETIME":
      case "DATE":
        return (
          <>
            <section className="d-flex date">
              <div
                className="input-search col-md-4 pl-0 mb-3"
                // style={{ marginRight: "50px" }}
              >

                  <label className="mr-2 mb-0 align-self-center label-search ">Ngày bắt đầu</label>
                <div
                  className="col-md-12 ml-auto render-input"
                  style={{ maxWidth: "70%" }}
                >
                  <input
                    type="date"
                    className="form-control"
                    placeholder={field.field_name}
                    // value={inputValue.from}
                    // onChange={({ target: { value } }) => {
                    //   let payload = { from: value };
                    //   const index = criteria.current.findIndex(
                    //     ({ key }) => key === props.key
                    //   );

                    //   if (
                    //     index > -1 &&
                    //     criteria.current[index].tables?.[props.table]
                    //   ) {
                    //     payload = {
                    //       ...criteria.current[index].tables[props.table][
                    //         field.fomular_alias
                    //       ],
                    //       from: value,
                    //     };
                    //   }

                    //   handleInputChange(field.fomular_alias, payload, props);
                    // }}
                  />
                </div>
              </div>
              <div className="input-search col-md-4 pl-0 mb-3">
                <label className="mr-2 mb-0 align-self-center label-search">Ngày kết thúc</label>
                <div
                  className="col-md-12 ml-auto render-input"
                  style={{ maxWidth: "70%" }}
                >
                  <input
                    type="date"
                    className="form-control"
                    placeholder={field.field_name}
                    // onChange={({ target: { value } }) => {
                    //   let payload = { to: value };
                    //   const index = criteria.current.findIndex(
                    //     ({ key }) => key === props.key
                    //   );
                    //   if (
                    //     index > -1 &&
                    //     criteria.current[index].tables?.[props.table]
                    //   ) {
                    //     payload = {
                    //       ...criteria.current[index].tables[props.table][
                    //         field.fomular_alias
                    //       ],
                    //       to: value,
                    //     };
                    //   }

                    //   handleInputChange(field.fomular_alias, payload, props);
                    // }}
                  />
                </div>
              </div>
            </section>
          </>
        );
   
      case "BOOL":
        return (
          <select
            onChange={(e) =>
              handleInputChange(field.fomular_alias, e.target.value, props)
            }
            className="form-control"
          >
            <option value="" disabled>
              Choose
            </option>
            {valueBool.map((val, index) => (
              <option key={index} value={val.value.toString()}>
                {val.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type="text"
            className="form-control"
            // onChange={(e) =>
            //   handleInputChange(field.fomular_alias, e.target.value, props)
            // }
          />
        );
    }
  };
  return (
    <>
      <div className="chart-criterias p-2">
        <div className="row block-statis position-relative p-3">
          {data.map(({ tables, key }) => {
            const children = [];
            for (const k in tables) {
              tables[k].map((field, index) => {
                children.push(
                  <div
                    className={
                      field.DATATYPE === "DATETIME" || field.DATATYPE === "DATE"
                        ? "col-md-12 p-0 label-search"
                        : "col-md-4 pl-0 a label-search"
                    }
                    
                    key={field.fomular_alias}
                  >
                    {field.DATATYPE === "DATETIME" || field.DATATYPE === "DATE" ? (
                      <fieldset className="">
                        <span
                          class="font-weight-bold"
                          style={{ marginBottom: "0px" }}
                        >
                          {field.field_name}
                        </span>
                        {renderInput(field, { key, table: k })}
                      </fieldset>
                    ) : (
                      <div className="input-search mb-3">
                        <span
                          class="font-weight-bold align-self-center label-search  "
                          style={{ marginBottom: "0px" }}
                        >
                          {field.field_name} 
                        </span>
                        <div
                          className="col-md-12  ml-auto render-input" 
                          style={{ maxWidth: "70%" }}
                        >
                          {renderInput(field, { key, table: k })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              });
            }
            return children;
          })}
          <div className="row p-3">

          </div>
          <div
            className="col-md-12 pb-2 text-right position-absolute "
            style={{ bottom: "3px", right: "-11px" }}
          >
            <button className="btn btn-secondary mr-3">
              <i class="fa fa-history mr-1 icon-search" />
              Làm mới
            </button>
            <button className="btn btn-primary mr-3">
              <i class="fa fa-search mr-1 icon-search" />
              Tìm Kiếm
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default FormSearch;
