import { memo, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const CHARTS = {
  table_chart: 1,
  c_chart: 1,
};

function Component(props) {
  const { page, tables: root_tables, lang } = useSelector((s) => s);
  const charts =
    page.component.filter((component) => CHARTS[component.name]) || [];
  const { updateSelectedComponent, path, selectedCpn } = props;
  const initials_tables = selectedCpn?.props?.tables || [];
  const initial_charts = selectedCpn?.props?.charts || [];

  const [state, setState] = useState(initials_tables);
  const [selectedCharts, setSelectedCharts] = useState(initial_charts);
  const [joinedTables, setJoinedTables] = useState([]);

  const [showSearch, setShowSearch] = useState(false);
  const [showFields, setShowFields] = useState(false);

  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };
  const handleShowFields = () => {
    setShowFields(!showFields);
  };

  useEffect(() => {
    setJoinedTables((prev) => {
      let newSelectedCharts = [...selectedCharts];
      const joinedTables_mapped = [];

      for (const k in charts) {
        const {
          joiningTable: { tables },
        } = charts[k].props;

        if (newSelectedCharts.find((chart) => chart.value === charts[k].id)) {
          for (const i in tables) {
            const left_table =
              tables[i].alias["left_table"] || tables[i].left_table;
            const right_table =
              tables[i].alias["right_table"] || tables[i].right_table;

            const key = `${left_table}-${right_table}`;

            if (!joinedTables_mapped.find((item) => item.key === key)) {
              let left_fields = [];
              let right_fields = [];

              for (const index in root_tables) {
                if (root_tables[index].table_alias === tables[i].left_table) {
                  left_fields = root_tables[index].fields;
                }
                if (root_tables[index].table_alias === tables[i].right_table) {
                  right_fields = root_tables[index].fields;
                }
              }

              joinedTables_mapped.push({
                key,
                tables: {
                  [left_table]: left_fields,
                  [right_table]: right_fields,
                },
              });
            }
          }
        }
      }
      return joinedTables_mapped;
    });
  }, [selectedCharts]);

  useEffect(() => {
    setState((prev) => {
      return prev.filter((s) =>
        joinedTables.find((table) => table.key === s.key)
      );
    });
  }, [joinedTables]);

  useEffect(() => {
    updateSelectedComponent(selectedCharts, ["props", "charts"]);
    updateSelectedComponent(state, ["props", "tables"]);
  }, [selectedCharts, state]);

  useEffect(() => {
    setState(initials_tables);
    setSelectedCharts(initial_charts);
  }, [selectedCpn]);
  // console.log("joinedTables", joinedTables);
  return (
    <div className="padding-1rem">
      <div className="c-chart p-0">

      <div
        className={` ${showSearch ? "chart-header pb-2" : "chart-header-of"}`}
        onClick={handleShowSearch}
      >
        <div className="chart-label">
          <FontAwesomeIcon
            icon={showSearch ? faAngleUp : faAngleRight}
            className="me-2"
          />
          {lang["Search"]}
        </div>
      </div>
      {showSearch && (
        <section>
          <div className="p-2">
            <Select
              value={selectedCharts}
              isMulti
              name="colors"
              onChange={(charts) => {
                setSelectedCharts(charts);
              }}
              options={charts.map(({ props: { content }, id }) => ({
                label: content,
                value: id,
              }))}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div className="joining-container p-0">
            <div 
            
            // className="joining-header"
            className={`${showFields ? "joining-header" : " joining-header-of"}`}
            
            
            onClick={handleShowFields}>
              <div className="chart-label m-2">
                <FontAwesomeIcon
                  icon={showFields ? faAngleUp : faAngleRight}
                  className="me-2"
                />
                {lang["Field"]}
              </div>
            </div>
            {showFields && (
          <div className="p-1">
                <div className="accordion" id="accordionJoining">
                  {joinedTables.map(({ key, tables }, i) => (
                    <div className="p-1">
                      <div
                        className="accordion-item accordion-item-chart"
                        key={i}
                      >
                        <h2
                          className="accordion-header "
                          id={`panelsStayOpen-heading${i}`}
                        >
                          <button
                            className="accordion-button accordion-button-left"
                            data-bs-toggle="collapse"
                            data-bs-target={`#panelsStayOpen-collapseLinkCharts-${i}`}
                            aria-expanded={i === 0 ? "true" : "false"}
                            aria-controls={`panelsStayOpen-collapseLinkCharts-${key}`}
                            type="button"
                          >
                            {key}
                          </button>
                        </h2>
                        <div
                          id={`panelsStayOpen-collapseLinkCharts-${i}`}
                          className={`accordion-collapse collapse ${
                            i === 0 ? "show" : ""
                          }`}
                          aria-labelledby={`panelsStayOpen-heading${i}`}
                        >
                          <div className="accordion-body p-2">
                            {(() => {
                              const children = [];
                              for (const k in tables) {
                                const fields = tables[k];
                                children.push(
                                  <section>
                                    <label>{k}</label>
                                    <Select
                                      isMulti
                                      name="colors"
                                      value={
                                        state
                                          .find((item) => key === item.key)
                                          ?.tables[k]?.map(
                                            ({ fomular_alias, field_name }) => ({
                                              label: field_name,
                                              value: fomular_alias,
                                            })
                                          ) || []
                                      }
                                      onChange={(data) => {
                                        setState((prev) => {
                                          const index = prev.findIndex(
                                            (item) => item.key === key
                                          );
  
                                          const fields_mapped = fields.filter(
                                            (field) =>
                                              data.find(
                                                ({ value }) =>
                                                  value === field.fomular_alias
                                              )
                                          );
  
                                          if (index > -1) {
                                            prev[index].tables[k] = fields_mapped;
                                          } else {
                                            prev.push({
                                              key,
                                              tables: { [k]: fields_mapped },
                                            });
                                          }
                                          return [...prev];
                                        });
                                      }}
                                      options={fields.map(
                                        ({ field_name, fomular_alias }) => ({
                                          label: field_name,
                                          value: fomular_alias,
                                        })
                                      )}
                                      className="basic-multi-select"
                                      classNamePrefix="select"
                                    />
                                  </section>
                                );
                              }
                              return children;
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
          </div>
            )}
          </div>
        </section>
      )}
      </div>
    </div>
  );
}
export const LinkCharts = memo(Component);
