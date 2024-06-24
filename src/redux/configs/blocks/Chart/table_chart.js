import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";

export const TableChart = (props) => {
  const { cache, gridState, preview, validButtonChildOnTable, floating } =
    useSelector((state) => state);
  const {
    id,
    zIndex,
    insertComponent,
    renderFrontLiner,
    renderBackLiner,
    parent,
    content,
    source,
    buttons,
    visibility,
    PropsSwitching,
    appendChildComponent,
    children,
    joiningTable,
    name,
    params,
    fields,
  } = props;
  // console.log("thinh is visibility", props);
  const dispatch = useDispatch();
  // thinh viet ham lay value cua select_root
  function formatValueSelectRoot(obj) {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => formatValueSelectRoot(item)).join(", ");
    }
    // test 2
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === "object") {
        value = formatValueSelectRoot(value);
      }
      const str = `${key}: ${value}`;

      // console.log("THINHHHHHH", key);
      return str; // Return key-value pairs as strings
      // Find the index of the first colon
    });

    // test 3
    // return Object.entries(obj).map(([key, value]) => {
    //   if (typeof value === 'object') {
    //     value = formatObject(value);
    //   }
    //   return { key, value: `${value}` }; // Return key-value pairs as objects
    // });
  }

  // thinh them ham cat chuoi, de cat di phan key du thua
  function cutString(str) {
    // Find the index of the first colon
    const colonIndex = str.indexOf(":");

    // Extract the substring after the first colon and trim it
    const modifiedStr = str.substring(colonIndex + 1).trim();
    return modifiedStr;
  }
  // thinh viet ham lay key cua select_root
  function formatKeySelectRoot(obj) {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => formatKeySelectRoot(item)).join(", ");
    }
    // test 3
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === "object") {
        value = formatKeySelectRoot(value);
      }
      return { key }; // Return key-value pairs as objects
    });
  }

  // thinh chia phan value va key trong select_root
  const valueSelectRoot = formatValueSelectRoot(joiningTable?.select_root);
  const keySelectRoot = formatKeySelectRoot(joiningTable?.select_root);

  const isActive = () => {
    /**
     * Nếu nhỏ này là có id là activeComponent hay hoverComponent thì kể như đang active
     */

    const { activeComponent, hoverComponent } = cache;
    if (activeComponent.indexOf(id) !== -1 || hoverComponent == id) {
      return true;
    }
    return false;
  };

  const SwitchingState = () => {
    /**
     *  Chuyển đổi trạng thái active cho nhỏ này
     */

    const { activeComponent } = cache;
    if (activeComponent != id) {
      dispatch({
        branch: "design-ui",
        type: "setActiveComponent",
        payload: {
          id,
        },
      });
      $("#property-trigger").click();
    }
  };

  const ComponentHover = () => {
    /**
     *  Chuyển đổi trạng thái hover cho nhỏ này
     */

    dispatch({
      branch: "design-ui",
      type: "setHoverComponent",
      payload: {
        id,
      },
    });
  };

  const AddButton = (e) => {
    const { block } = floating;
    const buttons = validButtonChildOnTable;

    if (buttons.indexOf(block) != -1) {
      appendChildComponent(id);
    }
  };

  const changeTableName = (e) => {
    const newName = e.target.value;
    PropsSwitching(id, "name", newName);
  };

  const getClassNameBasedOnRole = (field) => {
    const { approve, unapprove } = buttons;
    let className = [];

    const approveFieldId = approve?.field.id;
    const unapproveFieldId = unapprove?.field.id;

    if (approve?.state && approveFieldId == field.id) {
      className.push("approve-field");
    }
    if (unapprove?.state && unapproveFieldId == field.id) {
      className.push("unapprove-field");
    }
    return className.join("-");
  };

  const state = {
    series: [
      {
        data: [15, 21],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        fontFamily: "UTM Avo",

        toolbar: {
          show: false,
        },
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },
      colors: [],
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "12px",
          barHeight: "24px",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },

      title: {
        style: {
          fontSize: "32px",
        },
      },

      legend: {
        show: true,
      },

      xaxis: {
        categories: ["Tiêu chí 1", "Tiếu chí 2"],
        labels: {
          style: {
            colors: [],
            fontSize: "12px",
          },
        },
      },
    },
  };

  if (preview) {
    return (
      <div>
        {/* thinh chinh sua va them phan hien thi cac table khi preview is true */}
        <div className="design-zone-container" style={{ zIndex }}>
          {renderFrontLiner(id, parent)}
          {/* thinh xoa isActive de khi preview thi khong duoc hover */}
          <div
            className={`design-zone chart-design`}
            onClick={SwitchingState}
            onMouseEnter={ComponentHover}
            style={{ zIndex }}
          >
            <div className="top-utils d-flex justify-content-between align-items-center">
              <span className="chart-title">{content}</span>
              <div className="">
                {buttons.export.state && (
                  <button className="btn btn-success">
                    <i class="fa fa-download mr-1 icon-search" />
                    Export
                  </button>
                )}
              </div>
            </div>
            {/* <div className="chart-criterias p-2">
            <div className="block-statis"> */}
            <div className="row p-2">
              {params?.map((field) => (
                <Criteria field={field} />
              ))}
            </div>
            {/* <table className="preview-table">
                <thead>
                  <tr>
                    <td>thinh tam thoi de biet</td>
                    {source.fields?.map((field) => {
                      return (
                        <td className={getClassNameBasedOnRole(field)}>
                          {field.DISPLAY_NAME || field.field_name || field.display_name}
                        </td>
                      );
                    })}
                    <td>Thao tác</td>
                  </tr>
                </thead>
              </table> */}
            <table className="preview-table">
              <thead>
                <tr>
                  {/* this is where to design the lookalike table chart (thinh) */}
                  {<td>No.</td>}
                  {/* {abc} */}
                  {source.fields?.map((field) => {
                    return (
                      <td className={getClassNameBasedOnRole(field)}>
                        {field.DISPLAY_NAME ||
                          field.field_name ||
                          field.display_name}
                      </td>
                    );
                  })}
                  {source.calculates?.map((field) => {
                    return <td>{field.display_name}</td>;
                  })}

                  {/* thinh chinh sua phan key ra cac key (ten truong cua select root) */}
                  {keySelectRoot.map((pair, index) => (
                    <td key={index}>{pair.key}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {keySelectRoot && (
                  <tr>
                    {<th></th>}
                    {keySelectRoot?.map((field) => {
                      return (
                        <td className="search-cell">
                          <input type="text" />
                        </td>
                      );
                    })}
                    {source.calculates?.map((field) => {
                      return (
                        <td className="search-cell">
                          <input type="text" />
                        </td>
                      );
                    })}

                    {/* {(
                        <td className="table-icons">
                          <div className="icons">
                            <div className="table-icon">
                              <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                          </div>
                        </td>
                      )} */}
                  </tr>
                )}
                <tr>
                  {<td>1</td>}

                  {source.fields?.map((field) => {
                    return <td>{field.fomular_alias}</td>;
                  })}
                  {source.calculates?.map((field) => {
                    return (
                      <td>
                        {field.fomular_alias} = {field.fomular}
                      </td>
                    );
                  })}
                  {/* <td>test</td> */}

                  {/* thinh chinh sua phan key ra cac key (thanh phan cua select root) */}
                  {valueSelectRoot.map((pair, index) => (
                    <td key={index}>{cutString(pair)}</td>
                  ))}
                  {/* {(
                      <td className="table-icons">
                        <div className="icons" onMouseUp={AddButton}>
                          {(
                            <div className="table-icon">
                              <FontAwesomeIcon
                                icon={faArrowUpRightFromSquare}
                              />{" "}
                            </div>
                          )}
                          {(
                            <div className="table-icon">
                              <FontAwesomeIcon icon={faEdit} />{" "}
                            </div>
                          )}
                          {(
                            <div className="table-icon">
                              <FontAwesomeIcon icon={faTrash} />{" "}
                            </div>
                          )}
                          {(
                            <div className="table-icon">
                              <FontAwesomeIcon icon={faCheckCircle} />{" "}
                            </div>
                          )}
                          {(
                            <div className="table-icon">
                              <FontAwesomeIcon icon={faCircleXmark} />{" "}
                            </div>
                          )}
                          {children}
                        </div>
                      </td>
                    )} */}
                </tr>
              </tbody>
            </table>
            <nav
              aria-label="Page navigation example"
              className="navigation-disabled"
              style={{ display: "flex", padding: 12 }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span className="period-display">
                    Hiển thị 12 của 500 kết quả.{" "}
                  </span>
                </div>
                <div>
                  <ul className="pagination ml-auto">
                    {/* Nút đến trang đầu */}
                    <li className={`page-item`}>
                      <button className="page-link">&#8810;</button>
                    </li>
                    <li className={`page-item`}>
                      <button className="page-link">&laquo;</button>
                    </li>
                    {[...Array(3).keys()].map((pos) => (
                      <li className={`page-item`}>
                        <button className="page-link">
                          {3 + pos - Math.floor(6 / 2)}
                        </button>
                      </li>
                    ))}

                    <li className={`page-item`}>
                      <button className="page-link">&raquo;</button>
                    </li>

                    <li className={`page-item`}>
                      {" "}
                      {/** MAY CAUSE BUG HERE */}
                      <button className="page-link">&#8811;</button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {/* thinh tam dong cac button chuc nang */}
            {/* <div className="col-md-12 text-right pb-3">
                <button className="btn btn-secondary mr-3">
                  <i class="fa fa-history mr-1 icon-search" />
                  Làm mới
                </button>
                <button className="btn btn-primary mr-3">
                  <i class="fa fa-search mr-1 icon-search" />
                  Tìm Kiếm
                </button>
                {buttons.export.state && (
                  <button className="btn btn-success mr-3">
                    <i class="fa fa-download mr-1 icon-search" />
                    Export
                  </button>
                )}
            </div> */}
            {/* </div>
          </div> */}
            {/* <div className="row p-2">
              <div class="table-responsive" style={{ padding: "6px 12px" }}>
                <table class="preview-table">
                  <thead>
                    <tr>
                      {fields?.map((field) => (
                        <TableStatis field={field} />
                      ))}
                    </tr>
                  </thead>
                </table>
              </div>
            </div> */}

            {/* <div>
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div> */}
            {/* <div id="html-dist"></div> */}
          </div>
          {renderBackLiner(id, parent)}
        </div>
      </div>
    );
  } else {
    return (
      <div className="design-zone-container" style={{ zIndex }}>
        {renderFrontLiner(id, parent)}
        <div
          className={`design-zone chart-design ${
            isActive() ? "design-zone-active" : ""
          }`}
          onClick={SwitchingState}
          onMouseEnter={ComponentHover}
          style={{ zIndex }}
        >
          <div className="top-utils d-flex justify-content-between align-items-center">
            <span className="chart-title">{content}</span>
            <div className="">
              {buttons.export.state && (
                <button className="btn btn-success">
                  <i class="fa fa-download mr-1 icon-search" />
                  Export
                </button>
              )}
            </div>
          </div>
          {/* <div className="chart-criterias p-2">
            <div className="block-statis"> */}
          <div className="row p-2">
            {params?.map((field) => (
              <Criteria field={field} />
            ))}
          </div>
          {/* <table className="preview-table">
                <thead>
                  <tr>
                    <td>thinh tam thoi de biet</td>
                    {source.fields?.map((field) => {
                      return (
                        <td className={getClassNameBasedOnRole(field)}>
                          {field.DISPLAY_NAME || field.field_name || field.display_name}
                        </td>
                      );
                    })}
                    <td>Thao tác</td>
                  </tr>
                </thead>
              </table> */}
          <table className="preview-table">
            <thead>
              <tr>
                {/* this is where to design the lookalike table chart (thinh) */}
                {<td>No.</td>}
                {source.fields?.map((field) => {
                  return (
                    <td className={getClassNameBasedOnRole(field)}>
                      {field.DISPLAY_NAME ||
                        field.field_name ||
                        field.display_name}
                    </td>
                  );
                })}
                {source.calculates?.map((field) => {
                  return <td>{field.display_name}</td>;
                })}

                {/* thinh chinh sua phan key ra cac key (ten truong cua select root) */}
                {keySelectRoot.map((pair, index) => (
                  <td key={index}>{pair.key}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {keySelectRoot && (
                <tr>
                  {<th></th>}
                  {keySelectRoot?.map((field) => {
                    return (
                      <td className="search-cell">
                        <input type="text" />
                      </td>
                    );
                  })}
                  {source.calculates?.map((field) => {
                    return (
                      <td className="search-cell">
                        <input type="text" />
                      </td>
                    );
                  })}
                  {/* thinh dang sua*/}
                  {/* <td>{formattedObject}</td> */}

                  {/* Render each key-value pair separately */}
                  {/* {formattedObject.map((pair, index) => (
                          <td key={index}>
                           {pair.key}
                          </td>
                        ))} */}
                  {/* {(
                        <td className="table-icons">
                          <div className="icons">
                            <div className="table-icon">
                              <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                          </div>
                        </td>
                      )} */}
                </tr>
              )}
              <tr>
                {<td>1</td>}

                {source.fields?.map((field) => {
                  return <td>{field.fomular_alias}</td>;
                })}
                {source.calculates?.map((field) => {
                  return (
                    <td>
                      {field.fomular_alias} = {field.fomular}
                    </td>
                  );
                })}
                {/* <td>test</td> */}

                {/* thinh chinh sua phan key ra cac key (thanh phan cua select root) */}
                {valueSelectRoot.map((pair, index) => (
                  <td key={index}>{cutString(pair)}</td>
                ))}
                {/* thinh an di cac table icon khong can thiet  */}
                {/* {(
                      <td className="table-icons">
                        <div className="icons" onMouseUp={AddButton}>
                          {(
                            <div className="table-icon">
                              <FontAwesomeIcon
                                icon={faArrowUpRightFromSquare}
                              />{" "}
                            </div>
                          )}
                          {(
                            <div className="table-icon">
                              <FontAwesomeIcon icon={faEdit} />{" "}
                            </div>
                          )}
                          {(
                            <div className="table-icon">
                              <FontAwesomeIcon icon={faTrash} />{" "}
                            </div>
                          )}
                          {(
                            <div className="table-icon">
                              <FontAwesomeIcon icon={faCheckCircle} />{" "}
                            </div>
                          )}
                          {(
                            <div className="table-icon">
                              <FontAwesomeIcon icon={faCircleXmark} />{" "}
                            </div>
                          )}
                          {children}
                        </div>
                      </td>
                    )} */}
              </tr>
            </tbody>
          </table>
          <nav
            aria-label="Page navigation example"
            className="navigation-disabled"
            style={{ display: "flex", padding: 12 }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span className="period-display">
                  Hiển thị 12 của 500 kết quả.{" "}
                </span>
              </div>
              <div>
                <ul className="pagination ml-auto">
                  {/* Nút đến trang đầu */}
                  <li className={`page-item`}>
                    <button className="page-link">&#8810;</button>
                  </li>
                  <li className={`page-item`}>
                    <button className="page-link">&laquo;</button>
                  </li>
                  {[...Array(3).keys()].map((pos) => (
                    <li className={`page-item`}>
                      <button className="page-link">
                        {3 + pos - Math.floor(6 / 2)}
                      </button>
                    </li>
                  ))}

                  <li className={`page-item`}>
                    <button className="page-link">&raquo;</button>
                  </li>

                  <li className={`page-item`}>
                    {" "}
                    {/** MAY CAUSE BUG HERE */}
                    <button className="page-link">&#8811;</button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/* thinh tam dong cac button chuc nang */}
          {/* </div>
          </div> */}
          {/* <div className="row p-2">
            <div class="table-responsive" style={{ padding: "6px 12px" }}>
              <table class="preview-table">
                <thead>
                  <tr>
                    {fields?.map((field) => (
                      <TableStatis field={field} />
                    ))}
                  </tr>
                </thead>
              </table>
            </div>
          </div> */}

          {/* <div>
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div> */}
          {/* <div id="html-dist"></div> */}
        </div>
        {renderBackLiner(id, parent)}
      </div>
    );
  }
};
const Criteria = (props) => {
  const { field } = props;
  let type = "text";

  if (field.props && field.props.DATATYPE) {
    const { DATATYPE } = field.props;

    if (["DATE", "DATETIME"].indexOf(DATATYPE) != -1) {
      if (DATATYPE == "DATE") {
        type = "date";
      } else {
        type = "datetime-local";
      }
    }
    if (
      ["INT", "INT UNSIGNED", "BIGINT", "BIGINT UNSIGNED"].indexOf(DATATYPE) !=
      -1
    ) {
      type = "number";
    }

    if (DATATYPE == "BOOL") {
      type = "bool";
    }
  }

  return (
    <div className="col-md-4 criteria">
      <div className="form-group">
        <div
          className="criteria-label mt-3"
          style={{ fontSize: "14px", fontWeight: "bold", color: "#000" }}
        >
          <label>{field.field_name}</label>
        </div>

        <div className="criteria-input mt-2">
          {type == "bool" ? (
            <div>
              <select className="form-select form-control">
                <option>{field.props.DEFAULT_TRUE}</option>
                <option>{field.props.DEFAULT_FALSE}</option>
              </select>
            </div>
          ) : (
            <div>
              <input
                className="form-control"
                type={type}
                style={{
                  border: "1px solid #ccc",
                  width: "100%",
                  padding: "6px",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TableStatis = (props) => {
  const { field } = props;
  return (
    <>
      <th scope="col">{field.field_name}</th>
    </>
  );
};
