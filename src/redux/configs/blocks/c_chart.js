import {memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import $ from "jquery";
import { IsNumber } from "../blocks/Search/isNumber";
import ReactApexChart from "react-apexcharts";
import { style } from "d3";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const { cache, gridState, preview } = useSelector((state) => state);
  const {
    id,
    zIndex,
    insertComponent,
    renderFrontLiner,
    renderBackLiner,
    parent,
    content,
    params,
    fields,
    CHART_TYPES,
    new_charts,
    buttons,
  } = props;
  // console.log("Props", props);
  const CHART_TYPE = {
    VerticalLineChart: "bar",
    HorizontalLineChart: "bar",
    CircleChart: "pie",
  };
  const dispatch = useDispatch();
  const [chart, setChart] = useState(new_charts);
  const [chartElements, setChartElements] = useState([]);
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
    //  memo để tránh việc nó bị render lại không cần thiết
    const MemoizedChartElement = memo(({ item }) => (
      <div key={item.id}>{handleChart_C(item)}</div>
    ));
    //tính toán newChartElements chỉ khi new_charts thay đổi, thay vì mỗi lần component render.
    const newChartElements = useMemo(() => {
      return chart?.map((item, i) => (
        <MemoizedChartElement key={i} item={item} />
      ));
    }, [chart]);
  const handleChart_C = (item) => {
    // eslint-disable-next-line default-case
    switch (item?.type) {
      case "CircleChart":
        const data = item?.sections?.flatMap(
          (section) => section?.section?.keys?.value?.replace("$", "") || ""
        );
        let counter = 1;
        const series = item?.sections?.flatMap(
          (section) =>
            section?.section?.values?.map((it) => {
              if (typeof it.value.value === "string") {
                // Nếu là chuỗi, trả về giá trị counter và tăng counter lên 1
                // Tao dữ liệu giả
                return counter++;
              } else {
                // Nếu không phải chuỗi, giữ nguyên giá trị
                return it.value.value || 0;
              }
            }) || []
        );
        const options = {
          chart: {
            width: 380,
            type: "pie",
            style: {
              justifyContent: "center",
            },
          },
          labels: data,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 300,
                },
                legend: {
                  position: "bottom",
                  fontSize: "14px",
                  fontFamily: "UTM Avo, sans-serif",
                },
              },
            },
          ],
          legend: {
            fontSize: "14px",
            fontFamily: "UTM Avo, sans-serif",
          },
        };

        if (data?.length > 0 && series?.length > 0) {
          return (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ReactApexChart
                options={options}
                series={series}
                type="pie"
                width="500"
              />
            </div>
          );
        } else {
          return null;
        }
      case "VerticalLineChart":
        const dataColumn =
          item?.sections?.length > 0
            ? item.sections.flatMap(
                (section) =>
                  section?.section?.keys?.value?.replace("$", "") ?? 0
              )
            : [];
        const seriesCl = [];
        const columnNames = new Set();

        if (item?.sections) {
          for (const section of item.sections || []) {
            if (section?.section?.values?.length > 0) {
              for (const value of section.section.values) {
                columnNames.add(value.value.label);
              }
            }
          }
        }

        for (const columnName of columnNames) {
          const values =
            item?.sections?.length > 0
              ? item?.sections?.map((section) => {
                  const sectionData = section?.section?.values?.find(
                    (value) => {
                      return value?.value?.label === columnName;
                    }
                  );
                  // gán thằng số liêu trong select root để hiện ra
                  return sectionData?.value?.value?.replace("$", "") || 0;
                })
              : [];
          seriesCl.push({
            name: columnName,
            data: values,
          });
        }
        const optionCl = {
          chart: {
            type: "bar",
            height: 100,
            width: 100,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: 50,
              endingShape: "rounded",
            },
          },
          dataLabels: {
            enabled: true,
            offsetX: 1,
            style: {
              fontSize: "14px",
              colors: ["#fff"],
              fontFamily: "UTM Avo, sans-serif",
            },
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "14px",
                fontFamily: "UTM Avo, sans-serif",
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "12px",
                fontFamily: "UTM Avo, sans-serif",
              },
            },
          },
          fill: {
            opacity: 1,
          },
          legend: {
            fontSize: "14px",
            fontFamily: "UTM Avo, sans-serif",
            offsetY: 8,
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                plotOptions: {
                  bar: {
                    columnWidth: 25,
                  },
                },
                dataLabels: {
                  textAnchor: "middle",
                  style: {
                    fontSize: "11px",
                  },
                },
                legend: {
                  fontSize: "14px",
                },
              },
            },
          ],
          labels: dataColumn,
        };
        return (
          <ReactApexChart
            options={optionCl}
            series={seriesCl}
            type="bar"
            height="300"
          />
        );

      case "HorizontalLineChart":
        const dataHor =
          item?.sections?.length > 0
            ? item.sections.flatMap(
                (section) =>
                  section?.section?.keys?.value?.replace("$", "") ?? 0
              )
            : [];
        const seriesHor = [];
        const columnNamesHor = new Set();
        if (item?.sections) {
          for (const section of item?.sections || []) {
            if (section?.section?.values?.length > 0) {
              for (const value of section.section.values) {
                columnNamesHor.add(value.value.label);
              }
            }
          }
        }

        for (const cl of columnNamesHor) {
          const valuesHor =
            item?.sections?.length > 0
              ? item.sections.map((section) => {
                  const sectionData = section?.section?.values?.find(
                    (value) => {
                      return value.value.label === cl;
                    }
                  );
                  // Nếu có kết quả thì dua vào mảng ở vị trí đúng còn k thì dữ liệu đó là 0
                  // Nên k tạo dữ liệu giả được
                  // Nên gán thằng số liêu trong select root để hiện ra
                  return sectionData?.value?.value?.replace("$", "") || 0;
                })
              : [];

          seriesHor.push({
            name: cl,
            data: valuesHor,
          });
        }
        const optionHor = {
          chart: {
            type: "bar",
            height: 100,
          },
          toolbar: {
            show: true,
          },
          columnWidth: "50%",
          labels: dataHor,
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: "40%",

              dataLabels: {
                position: "top",
              },
            },
          },
          dataLabels: {
            enabled: true,
            offsetX: -6,
            textAnchor: "middle",
            fontSize: "14px",
            style: {
              colors: ["#fff"],
              fontFamily: "UTM Avo, sans-serif",
            },
          },
          stroke: {
            show: true,
            width: 1,
            colors: ["#fff"],
          },
          tooltip: {
            shared: true,
            intersect: false,
          },
          xaxis: {
            labels: {
              style: {
                fontFamily: "UTM Avo, sans-serif",
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "12px",

                fontFamily: "UTM Avo, sans-serif",
              },
            },
          },
          legend: {
            fontSize: "14px",
            fontFamily: "UTM Avo, sans-serif",
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  fontSize: "14px",
                },
              },
            },
          ],
        };

        return (
          <ReactApexChart
            options={optionHor}
            type="bar"
            series={seriesHor}
            height={350}
          />
        );
    }
  };
  useEffect(() => {
    setChartElements((prevElements) => {
      if (!chart) return prevElements;
      return newChartElements;
    });
    setChart(new_charts);
  }, [new_charts, newChartElements]);
  if (preview) {
    return (
      // <div>
      //   <div className="chart-criterias">
      //     <div className="row block-statis">
      //       { params?.map( field => <Criteria field={ field } /> ) }
      //     </div>
      //   </div>
      //   <div>
      //     <Chart options={state.options} series={state.series} type="bar" height={350} />
      //   </div>
      // </div>
      <div className="design-zone-container" style={{ zIndex }}>
        {renderFrontLiner(id, parent)}
        <div
          className={`design-zone chart-design
        
        `}
          onClick={SwitchingState}
          onMouseEnter={ComponentHover}
          style={{ zIndex }}
        >
          <div className="top-utils d-flex justify-content-between align-items-center">
            <span className="chart-title">{content}</span>
            <div className="">
                {buttons?.export?.state && (
                  <button className="btn btn-success">
                    <i class="fa fa-download mr-1 icon-search" />
                    Export
                  </button>
                )}
            </div>
          </div>
          <div className="chart-criterias p-2">
            <div className="row block-statis">
              {params?.map((field) => (
                <Criteria field={field} />
              ))}
              <div className="d-none">
                <div className="col-md-12 text-right pb-3">
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
          </div>

          <div>
          {chartElements}
            {/* {chart?.map(({ type, ...data }) => {
              console.log("type", type);
              const chartData = chartShowIf(data, type);
              return <ReactApexChart {...chartData} type={CHART_TYPE[type]} />;
            })} */}
          </div>
          {/* <div id="html-dist"></div> */}
        </div>
        {renderBackLiner(id, parent)}
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
                {buttons?.export?.state && (
                  <button className="btn btn-success">
                    <i class="fa fa-download mr-1 icon-search" />
                    Export
                  </button>
                )}
            </div>
          </div>
          <div className="chart-criterias p-2">
            <div className="row block-statis">
              {params?.map((field) => (
                <Criteria field={field} />
              ))}
              <div className="d-none">
                <div className="col-md-12 text-right pb-3">
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
          </div>

          <div>
            {/* {chart?.map(({ type, ...data }) => {
              const chartData = chartShowIf(data, type);
              return <ReactApexChart {...chartData} type={CHART_TYPE[type]} />;
            })} */}
              {chartElements}
          </div>
          {/* <div id="html-dist"></div> */}
        </div>
        {renderBackLiner(id, parent)}
      </div>
    );
  }
};

const Criteria = (props) => {
  return null;
  const { field } = props;

  const { DATATYPE } = field.props;

  let type = "text";

  if (["DATE", "DATETIME"].indexOf(DATATYPE) != -1) {
    if (DATATYPE == "DATE") {
      type = "date";
    } else {
      type = "datetime-local";
    }
  }
  if (
    ["INT", "INT UNSIGNED", "BIGINT", "BIGINT UNSIGNED"].indexOf(DATATYPE) != -1
  ) {
    type = "number";
  }

  if (DATATYPE == "BOOL") {
    type = "bool";
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
                  padding: "6px 6px",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
