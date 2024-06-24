import { GroupByContainer } from "./GroupByContainer";
import { SelectContainer } from "./SelectContainer";
import { ConvertStringToObject } from "../../../../../utils/ConvertStringToObject";
import { memo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

const JoiningTable = ({
  joining = [],
  tables = [],
  onChange,
  handleDelete,
  lang,
}) => {
  return (
    <div className="accordion" id="accordionJoining">
      {joining.map(
        (
          {
            id,
            left_table,
            right_table,
            where_condition,
            group_by,
            order_by,
            select: prev,
            alias,
            custom_group_by,
          },
          i
        ) => (
          <div className="p-1">
            <div
              className="accordion-item accordion-item-chart"
              key={id}
              // style={{
              //   display: "flex",
              //   margin: "10px 0",
              //   flexWrap: "wrap",
              // }}
            >
              <h2
                className="accordion-header "
                id={`panelsStayOpen-headingChart${id}`}
                // onClick={() => onAccordionClick(i)}
              >
                <button
                  className="accordion-button accordion-button-left"
                  data-bs-toggle="collapse"
                  data-bs-target={`#panelsStayOpen-collapse${id}`}
                  aria-expanded={i === 0 ? "true" : "false"}
                  aria-controls={`panelsStayOpen-collapse${id}`}
                  type="button"
                >
                  {lang["Joining"]} <span className="ml-1">{i + 1}</span>
                  <div className="accordion-button-right">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={(e) => {
                        handleDelete(id);
                      }}
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
                <div className="accordion-body">
                  <section
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    <select
                      className="form-control"
                      onChange={({ target: { value } }) => {
                        onChange(id, "left_table", value);
                      }}
                    >
                      <option selected disabled></option>
                      {tables.map(({ id, table_alias, table_name }) => (
                        <option
                          key={id}
                          value={table_alias}
                          selected={left_table === table_alias}
                        >
                          {table_name}-{table_alias}
                        </option>
                      ))}
                    </select>
                    <div className="label-box">left join</div>
                    <select
                      className="form-control"
                      onChange={({ target: { value } }) => {
                        onChange(id, "right_table", value);
                      }}
                    >
                      <option selected disabled></option>
                      {tables.map(({ id, table_alias, table_name }) => (
                        <option
                          key={id}
                          value={table_alias}
                          selected={right_table === table_alias}
                        >
                          {table_name}-{table_alias}
                        </option>
                      ))}
                    </select>
                  </section>
                  <section>
                    <div className="label-box">Where</div>
                    <div className="where">
                      <div className="where-left mb-2">
                        <div className="label-box">{left_table}</div>
                        <input
                          className="form-control"
                          type="text"
                          value={where_condition?.["left_table"]}
                          onChange={({ target: { value } }) => {
                            const newData = { ...where_condition };
                            newData["left_table"] = value;
                            onChange(id, "where_condition", newData);
                          }}
                        />
                      </div>
                      <div className="where-right">
                        <div className="label-box">{right_table}</div>
                        <input
                          className="form-control"
                          type="text"
                          value={where_condition?.["right_table"]}
                          onChange={({ target: { value } }) => {
                            const newData = { ...where_condition };
                            newData["right_table"] = value;
                            onChange(id, "where_condition", newData);
                          }}
                        />
                      </div>
                    </div>
                  </section>
                  <GroupByContainer
                    groups={tables.find(
                      (table) => table.table_alias === left_table
                    )}
                    defaultValue={group_by["left_table"]}
                    onChange={(checked, fomular_alias) => {
                      const newData = { ...group_by };
                      const key = "left_table";
                      if (checked) {
                        if (newData[key]) {
                          newData[key].push(fomular_alias);
                        } else {
                          newData[key] = [fomular_alias];
                        }
                      } else {
                        newData[key] = newData[key].filter(
                          (item) => item !== fomular_alias
                        );
                      }
                      onChange(id, "group_by", newData);
                    }}
                  />
                  <div>CUSTOM GROUP BY</div>
                  <textarea
                          className="form-control"

                    style={{ width: "100%" }}
                    onChange={({ target: { value } }) => {
                      const newData = { ...custom_group_by };
                      newData["left_table"] = value;
                      onChange(id, "custom_group_by", newData);
                    }}
                  >
                    {custom_group_by?.["left_table"]}
                  </textarea>

                  <GroupByContainer
                    label="Order by"
                    groups={tables.find(
                      (table) => table.table_alias === left_table
                    )}
                    defaultValue={order_by?.["left_table"]}
                    onChange={(checked, fomular_alias) => {
                      const newData = { ...order_by };
                      const key = "left_table";
                      if (checked) {
                        if (newData[key]) {
                          newData[key].push(fomular_alias);
                        } else {
                          newData[key] = [fomular_alias];
                        }
                      } else {
                        newData[key] = newData[key].filter(
                          (item) => item !== fomular_alias
                        );
                      }
                      onChange(id, "order_by", newData);
                    }}
                  />
                  <GroupByContainer
                    groups={tables.find(
                      (table) => table.table_alias === right_table
                    )}
                    defaultValue={group_by["right_table"]}
                    onChange={(checked, fomular_alias) => {
                      const newData = { ...group_by };
                      const key = "right_table";
                      if (checked) {
                        if (newData[key]) {
                          newData[key].push(fomular_alias);
                        } else {
                          newData[key] = [fomular_alias];
                        }
                      } else {
                        newData[key] = newData[key].filter(
                          (item) => item !== fomular_alias
                        );
                      }
                      onChange(id, "group_by", newData);
                    }}
                  />
                  <GroupByContainer
                    label="Order by"
                    groups={tables.find(
                      (table) => table.table_alias === right_table
                    )}
                    defaultValue={order_by?.["right_table"]}
                    onChange={(checked, fomular_alias) => {
                      const newData = { ...order_by };
                      const key = "right_table";
                      if (checked) {
                        if (newData[key]) {
                          newData[key].push(fomular_alias);
                        } else {
                          newData[key] = [fomular_alias];
                        }
                      } else {
                        newData[key] = newData[key].filter(
                          (item) => item !== fomular_alias
                        );
                      }
                      onChange(id, "order_by", newData);
                    }}
                  />
                  <div>CUSTOM GROUP BY</div>
                  <textarea
                                           className="form-control"

                    style={{ width: "100%" }}
                    onChange={({ target: { value } }) => {
                      const newData = { ...custom_group_by };
                      newData["right_table"] = value;
                      onChange(id, "custom_group_by", newData);
                    }}
                  >
                    {custom_group_by?.["right_table"]}
                  </textarea>

                  <label>Select</label>
                  <section>
                    <span>{left_table} alias: </span>
                    <input
                      type="text"
                      className="form-control"
                      value={alias?.["left_table"]}
                      onChange={({ target: { value } }) => {
                        const newData = { ...alias };
                        newData["left_table"] = value;

                        onChange(id, "alias", newData);
                      }}
                    />
                  </section>
                  <SelectContainer
                    label={left_table}
                    default_value={prev?.["left_table"]}
                    component_id={id}
                    onChange={(value) => {
                      const newData = { ...prev };
                      newData["left_table"] = ConvertStringToObject(value);

                      onChange(id, "select", newData);
                    }}
                  />
                  <section>
                    <span>{right_table} alias: </span>
                    <input
                      type="text"
                      className="form-control"
                      value={alias?.["right_table"]}
                      onChange={({ target: { value } }) => {
                        const newData = { ...alias };
                        newData["right_table"] = value;

                        onChange(id, "alias", newData);
                      }}
                    />
                  </section>
                  <SelectContainer
                    label={right_table}
                    default_value={prev?.["right_table"]}
                    component_id={id}
                    onChange={(value) => {
                      const newData = { ...prev };
                      newData["right_table"] = ConvertStringToObject(value);

                      onChange(id, "select", newData);
                    }}
                  />
                </div>
              </div>
              {/* <button
                className="btn btn-danger"
                onClick={() => {
                  handleDelete(id);
                }}
              >
                XOA
              </button> */}
            </div>
          </div>
        )
      )}
    </div>
  );
};
export const JoiningTableContainer = memo(JoiningTable);
