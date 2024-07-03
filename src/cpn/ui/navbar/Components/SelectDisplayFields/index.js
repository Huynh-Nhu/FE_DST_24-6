import { memo, useEffect, useMemo, useState } from "react";
// import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import functions from "../../../../../redux/configs/functions";
import { ReactSortable } from "react-sortablejs";
import { useSelector } from "react-redux";
import { FontAwesomeIcon,  } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrash ,faAngleRight,faAngleUp } from "@fortawesome/free-solid-svg-icons";


function Component(props) {
  const {
    selectedCpn: { props: { source, joiningTable = {} } = {} },
    path,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn

  } = props;
  const { select_root = {}, tables } = joiningTable;
  const { tables: root_tables , lang} = useSelector((s) => s);
  const [showSelectDisplay, setSelectDisplay] = useState(false)


  const { getFormatedUUID } = functions;
  const customStyles = {
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
  };

  const FIELDS = useMemo(() => {
    const _tables = [];
    const _fields = [];

    for (const index in tables) {
      const table = tables[index];
      if (table.left_table && !_tables.includes(table.left_table)) {
        _tables.push(table.left_table);
        const corresponding_table = root_tables.find(
          ({ table_alias }) => table_alias === table.left_table
        );
        if (corresponding_table) {
          _fields.push(...corresponding_table.fields);
        }
      }

      if (table.right_table && !_tables.includes(table.right_table)) {
        _tables.push(table.right_table);
        const corresponding_table = root_tables.find(
          ({ table_alias }) => table_alias === table.right_table
        );
        if (corresponding_table) {
          _fields.push(...corresponding_table.fields);
        }
      }
    }

    return _fields;
  }, [tables]);

  const MAPPED_FIELDS = getPropByPath(["props", "FIELDS"], props?.selectedCpn);

  useEffect(() => {
    // if (select_root && typeof select_root !== "string") {
    //   return select_root
    // }
    const fields = [];
    for (const k in select_root) {
      let alias = ""
      if(typeof select_root[k] === "string"){
        alias = select_root[k]?.split("-$")?.at(-1)?.split(".")?.at(-1);
      }
      alias = alias[0] === "$" ? alias.slice(1) : alias;
      const field = FIELDS.find(({ fomular_alias }) => fomular_alias === alias);
      if (field) {
        fields.push(field);
      }
    }
    if (fields.length) {
      updateSelectedComponent(fields, ["props", "FIELDS"]);
    }
  }, [select_root, FIELDS]);

  const options = [];

  for (const i in source?.calculates) {
    options.push({
      label: source.calculates[i].display_name,
      value: source.calculates[i].fomular_alias,
      formula: source.calculates[i].fomular,
    });
  }

  for (const k in select_root) {
    options.push({
      label: `${k}-${select_root[k]}`,
      value: k,
    });
  }

  const [fields, setFields] = useState(source?.DisplayFields || []);

  const handleShowSelectDisplay = () => {
    setSelectDisplay(!showSelectDisplay)
  }

  function AddAnOutlet() {
    setFields((prev) => [
      {
        id: getFormatedUUID(),
        label: "",
        value: "",
      },
      ...prev,
    ]);
  }

  function handleChangeOption(payload) {
    const { id, value, label } = payload;

    setFields((prev) => {
      const newFields = [...prev];

      for (const index in newFields) {
        if (newFields[index].id === id) {
          for (const k in payload) {
            newFields[index][k] = payload[k];
          }
          break;
        }
      }

      return newFields;
    });
  }

  function handleRemoveOption(id)
 {
    setFields((prev) => prev.filter((field) => field.id !== id));
  }

  function handleRemoveOption(id) {
    setFields((prev) => prev.filter((field) => field.id !== id));
    let prevFieldsAndCalculates = selectedCpn?.props?.source?.display_fields;


    // Convert the lookup object back to an array
    const newArray = prevFieldsAndCalculates.filter((field) => field.id !== id);

    // let newFieldsAndCalculates = prevFieldsAndCalculates.concat(fields);
    updateSelectedComponent(newArray, [
      "props",
      "source",
      "display_fields",
    ]);
  }


  function handleUpdateOrderFields(fields) {
    setFields(fields);
  }

  useEffect(() => {
    updateSelectedComponent(fields, path.split("."));

    // thinh this is where i need to put the value in display fields
    let prevFieldsAndCalculates = selectedCpn?.props?.source?.display_fields;
    // console.log("this is prevFieldsAndCalculates", prevFieldsAndCalculates);
    // Create a lookup object from arrayTwo
    const lookup = {};
    prevFieldsAndCalculates?.forEach(item => {
      lookup[item.id] = item;
    });

    // Iterate through arrayOne and add/replace items in the lookup object
    fields?.forEach(item => {
      lookup[item.id] = item;
    });

    // Convert the lookup object back to an array
    const mergedArray = Object.values(lookup);

    // console.log("this is mergedArray", mergedArray);

    // let newFieldsAndCalculates = prevFieldsAndCalculates.concat(fields);
    updateSelectedComponent(mergedArray, [
      "props",
      "source",
      "display_fields",
    ]);

  }, [fields]);

  useEffect(() => {
    setFields(source?.DisplayFields || []);
  }, [props?.selectedCpn?.id]);

  return (
    <div className="padding-1rem">
      <div className="c-chart p-0">
      <div className= {` ${showSelectDisplay ? 'chart-header' : 'chart-header-of p-0'} d-flex flex-warp ` }   >
          <div className="chart-label m-2 " onClick={handleShowSelectDisplay}>
             <FontAwesomeIcon
              icon={showSelectDisplay ? faAngleUp : faAngleRight}
              className="me-2"
            />

            {lang["Display field"]}
          </div>
          <div className="incon-plus-chart ms-auto">
            <div className="add-icon" onClick={() => AddAnOutlet()}>
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
          </div>
        </div>
      {showSelectDisplay && 
           <div className="accordion" id="accordionExample">
           <section>
             <ReactSortable
               list={fields}
               setList={(list) => {
                 handleUpdateOrderFields(list);
               }}
             >
               {fields.map(
                 ({ id, value, label, exported_fields, search_fields }, i) => (
                   <section key={id} className="p-1">
                     <div className="accordion-item accordion-item-chart ">
                       <h2
                         className="accordion-header"
                         id={`panelsStayOpen-headingChart${id}`}
                       >
                         <button
                           className="accordion-button accordion-button-left"
                           data-bs-toggle="collapse"
                           data-bs-target={`#panelsStayOpen-collapse${id}`}
                           aria-expanded={i === 0 ? "true" : "false"}
                           aria-controls={`panelsStayOpen-collapse${id}`}
                           type="button"
                         >
                           <span className="ml-2">
                             {label || `Trường hiển thị ${i + 1}`}{" "}
                           </span>
                           <div className="accordion-button-right">
                             <FontAwesomeIcon
                               icon={faTrash}
                               onClick={() => handleRemoveOption(id)}
                             />
                           </div>
                         </button>
                       </h2>
   
                       <div
                         id={`panelsStayOpen-collapse${id}`}
                         className={`accordion-collapse collapse ${
                           i === 0 ? "show" : ""
                         }`}
                         aria-labelledby={`panelsStayOpen-headingChart${id}`}
                       >
                         <div className="accordion-body p-0">
                           <div className="d-flex align-items-center m-2 mb-0 property">
                             <label className="mr-2">Tên trường</label>
                             <div className="input-box ">
                               <input
                                 type="text"
                                 onChange={({ target: { value } }) => {
                                   handleChangeOption({ id, label: value });
                                 }}
                                 value={label}
                               />
                             </div>
                           </div>
   
                           <Select
                             className="m-2"
                             styles={customStyles}
                             isMulti
                             options={options}
                             value={value}
                             onChange={(option) => {
                               const mapped_options = [];
                               for (const index in option) {
                                 const field = source.fields.find(
                                   (f) => f.fomular_alias === option[index]?.value
                                 );
                                 mapped_options.push({ ...option[index], field });
                               }
   
                               handleChangeOption({ id, value: mapped_options });
                             }}
                           />
                           <label className="m-2">Trường export</label>
                           <div style={{ zIndex: "1" }}>
                             <Select
                               className="m-2"
                               styles={customStyles}
                               isMulti
                               options={options}
                               value={exported_fields}
                               onChange={(option) => {
                                 handleChangeOption({
                                   id,
                                   exported_fields: option,
                                 });
                               }}
                             />
                           </div>
                           <label className="m-2">Trường tìm kiếm</label>
                           <div style={{ zIndex: "1" }}>
                             <Select
                               className="m-2"
                               styles={customStyles}
                               isMulti
                               options={value}
                               value={search_fields?.map(({ value, label }) => ({
                                 value,
                                 label,
                               }))}
                               onChange={(options) => {
                                 const fields = [];
                                 for (const index in options) {
                                   const option = options[index];
                                   let alias = option.label
                                     ?.split("-$")
                                     ?.at(-1)
                                     ?.split(".")
                                     ?.at(-1);
   
                                   alias =
                                     alias[0] === "$" ? alias.slice(1) : alias;
   
                                   const field = MAPPED_FIELDS.find(
                                     ({ fomular_alias }) => fomular_alias === alias
                                   );
                                   if (field) {
                                     fields.push({ ...option, field });
                                   }
                                 }
   
                                 handleChangeOption({ id, search_fields: fields });
                               }}
                             />
                           </div>
                         </div>
                       </div>
   
                       {/* <button
                         className="btn btn-danger m-3"
                         onClick={() => handleRemoveOption(id)}
                       >
                         Delete
                       </button> */}
                     </div>
                   </section>
                 )
               )}
             </ReactSortable>
           </section>
         </div>
      }
      </div>

      {/* <section className="m-3">
        <ReactSortable
          list={fields}
          setList={(list) => {
            handleUpdateOrderFields(list);
          }}
        >
          {fields.map(
            ({ id, value, label, exported_fields, search_fields }) => (
              <section key={id} className="fields-picker">
                <div className="table-fields-picker">
                  <div className="d-flex align-items-center m-2 mb-0 property">
                    <label className="mr-2">Tên trường</label>
                    <div className="input-box ">
                      <input
                        type="text"
                        onChange={({ target: { value } }) => {
                          handleChangeOption({ id, label: value });
                        }}
                        value={label}
                      />
                    </div>
                  </div>

                  <Select
                    className="m-2"
                    styles={customStyles}
                    isMulti
                    options={options}
                    value={value}
                    onChange={(option) => {
                      const mapped_options = [];
                      for (const index in option) {
                        const field = source.fields.find(
                          (f) => f.fomular_alias === option[index]?.value
                        );
                        mapped_options.push({ ...option[index], field });
                      }

                      handleChangeOption({ id, value: mapped_options });
                    }}
                  />
                  <label className="m-2">Trường export</label>
                  <div style={{ zIndex: "1" }}>
                    <Select
                      className="m-2"
                      styles={customStyles}
                      isMulti
                      options={options}
                      value={exported_fields}
                      onChange={(option) => {
                        handleChangeOption({ id, exported_fields: option });
                      }}
                    />
                  </div>
                  <label className="m-2">Trường tìm kiếm</label>
                  <div style={{ zIndex: "1" }}>
                    <Select
                      className="m-2"
                      styles={customStyles}
                      isMulti
                      options={value}
                      value={search_fields?.map(({ value, label }) => ({
                        value,
                        label,
                      }))}
                      onChange={(options) => {
                        const fields = [];
                        for (const index in options) {
                          const option = options[index];
                          let alias = option.label
                            ?.split("-$")
                            ?.at(-1)
                            ?.split(".")
                            ?.at(-1);

                          alias = alias[0] === "$" ? alias.slice(1) : alias;

                          const field = MAPPED_FIELDS.find(
                            ({ fomular_alias }) => fomular_alias === alias
                          );
                          if (field) {
                            fields.push({ ...option, field });
                          }
                        }

                        handleChangeOption({ id, search_fields: fields });
                      }}
                    />
                  </div>
                  <button
                    className="btn btn-danger m-3"
                    onClick={() => handleRemoveOption(id)}
                  >
                    Delete
                  </button>
                </div>
              </section>
            )
          )}
        </ReactSortable>
      </section> */}
    </div>
  );
}
export const SelectDisplayFields = memo(Component, (oldProps, newProps) => {
  return oldProps?.selectedCpn?.id === newProps?.selectedCpn?.id;
});