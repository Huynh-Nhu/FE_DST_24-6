import {
  faBars,
  faBolt,
  faChartBar,
  faCode,
  faDiagramNext,
  faFont,
  faGrip,
  faImage,
  faImages,
  faLeaf,
  faLink,
  faList,
  faMagnifyingGlassChart,
  faSpoon,
  faSquareCheck,
  faTable,
  faTableCellsLarge,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

import $ from "jquery";
import { useEffect } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const dispatch = useDispatch();
  const { functions, blockTypes, floating, page, selectedCpn } = useSelector(
    (state) => state
  );
  const FloatingBoxTrigger = (e, icon, text, type) => {
    // console.log("eeeee nhe em ", e);
    const { pageX, pageY } = e;


    dispatch({
      branch: "floating-boxes",
      type: "setDesignBlockCoordinateAndIcon",
      payload: {
        type,
        icon: {
          icon,
          text,
        },
      },
    });

    dispatch({
      branch: "floating-boxes",
      type: "floatingTrigger",
      payload: {
        offset: {
          top: pageY,
          left: pageX,
        },
      },
    });
    dispatch({
      branch: "floating-boxes",
      type: "setBoxType",
      payload: {
        type: "designBlock",
      },
    });

    dispatch({
      branch: "design-ui",
      type: "setGridSystemState",
      payload: {
        status: true,
      },
    });

    functions.minimizeFloatingBG();

    $("*").on("mousemove", (e) => {
      const { pageX, pageY } = e;
      // console.log( { pageX, pageY } )
      dispatch({
        branch: "floating-boxes",
        type: "setOffset",
        payload: {
          offset: {
            top: pageY,
            left: pageX,
          },
        },
      });
    });

    $("*").on("mouseup", (e) => {
      if (e.target.id == "playground" || e.target.id == "playground-bg") {
        AddTrigger();
      } else {
        // UnboundBlock()
      }

      $("*").off("mousemove");
      $("*").off("mouseup");

      dispatch({
        branch: "floating-boxes",
        type: "floatingTrigger",
      });

      functions.restoreFloatingBG();

      dispatch({
        branch: "design-ui",
        type: "setGridSystemState",
        payload: {
          status: false,
        },
      });
    });
  };

  const AddTrigger = () => {
    const block = floating.block;

    if (block) {
      dispatch({
        branch: "design-ui",
        type: "addComponent",
        payload: {
          block,
        },
      });
    }
  };

  useEffect(() => {
    $(".design").on("mouseup", () => {
      UnboundBlock();
    });
  });

  const UnboundBlock = () => {
    dispatch({
      branch: "design-ui",
      type: "UnboundBlock",
    });
  };

  const isCurrentPageParamized = () => {
    if (page) {
      const { params } = page;
      if (params && params.length > 0) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="design">
      <div className="design-blocks">
        <span className="block-type">NỘI DUNG</span>
        <div className="blocks">
          <div
            className="block"
            onMouseDown={(e) => {
              FloatingBoxTrigger(e, faFont, "Văn bản", blockTypes.text);
            }}
          >
            <div className="block-icon">
              <FontAwesomeIcon icon={faFont} />
            </div>
            <span className="block-name">Văn bản</span>
          </div>
          {selectedCpn.name == "chart_2" && (
            <div
              className="block"
              onMouseDown={(e) => {
                FloatingBoxTrigger(
                  e,
                  faLeaf,
                  "Văn bản",
                  blockTypes.inline_statis
                );
              }}
            >
              <div className="block-icon">
                <FontAwesomeIcon icon={faLeaf} />
              </div>
              <span className="block-name">Số liệu thống kê </span>
            </div>
          )}
        </div>

        <span className="block-type">HIỂN THỊ DỮ LIỆU</span>
        <div className="blocks">
          <div
            className="block table"
            onMouseDown={(e) => {
              FloatingBoxTrigger(e, faTable, "Bảng", blockTypes.table);
            }}
          >
            <div className="block-icon">
              <FontAwesomeIcon icon={faTable} />
            </div>
            <span className="block-name">Bảng</span>
          </div>
          {isCurrentPageParamized() && (
            <div
              className="block table"
              onMouseDown={(e) => {
                FloatingBoxTrigger(
                  e,
                  faSpoon,
                  "Bảng 1",
                  blockTypes.table_param
                );
              }}
            >
              <div className="block-icon">
                <FontAwesomeIcon icon={faSpoon} />
              </div>
              <span className="block-name">Bảng 1</span>
            </div>
          )}

          <div
            className="block table"
            onMouseDown={(e) => {
              FloatingBoxTrigger(
                e,
                faLink,
                "Nút chuyển",
                blockTypes.redirect_button
              );
            }}
          >
            <div className="block-icon">
              <FontAwesomeIcon icon={faLink} />
            </div>
            <span className="block-name">Nút chuyển</span>
          </div>

          <div
            className="block table"
            onMouseDown={(e) => {
              FloatingBoxTrigger(
                e,
                faList,
                "Xuất dữ liệu",
                blockTypes.table_export_button
              );
            }}
          >
            <div className="block-icon">
              <FontAwesomeIcon icon={faList} />
            </div>
            <span className="block-name">Xuất dữ liệu</span>
          </div>

          <div
            className="block table"
            onMouseDown={(e) => {
              FloatingBoxTrigger(
                e,
                faBolt,
                "Thao tác tùy chọn",
                blockTypes.custom_button
              );
            }}
          >
            <div className="block-icon">
              <FontAwesomeIcon icon={faBolt} />
            </div>
            <span className="block-name">Thao tác tùy chọn</span>
          </div>

          <div
            className="block table"
            onMouseDown={(e) => {
              FloatingBoxTrigger(
                e,
                faCode,
                "Thao tác tùy chọn",
                blockTypes.code_generating_button
              );
            }}
          >
            <div className="block-icon">
              <FontAwesomeIcon icon={faCode} />
            </div>
            <span className="block-name">
              Thao tác tùy chọn và tạo mã tùy chọn
            </span>
          </div>
          {/* <div
            className="block table"
            onMouseDown={(e) => {
              FloatingBoxTrigger(
                e,
                faCode,
                "Thao tác tùy chọn",
                blockTypes.grid
              );
            }}
          >
            <div className="block-icon">
              <FontAwesomeIcon icon={faCode} />
            </div>
            <span className="block-name">
              Lưới
            </span>
          </div> */}
        </div>

        {/* <span className="block-type">KHỐI LAYOUT</span>
                <div className="blocks">                   
                    <div className="block table" onMouseDown={ (e) => { FloatingBoxTrigger(e, faTableCellsLarge, "Block", blockTypes.block ) } }>
                        <div className="block-icon" >
                            <FontAwesomeIcon icon={ faTableCellsLarge }/>
                        </div>
                        <span className="block-name">Block</span>
                    </div>
                    <div className="block table" onMouseDown={ (e) => { FloatingBoxTrigger(e, faTableCellsLarge, "Flex Box", blockTypes.flex ) } }>
                        <div className="block-icon" >
                            <FontAwesomeIcon icon={ faTableCellsLarge }/>
                        </div>
                        <span className="block-name">Flex</span>
                    </div>
                </div> */}

        {/* <span className="block-type">KHỐI BIỂU MẪU</span>
                <div className="blocks">                   
                    <div className="block table" onMouseDown={ (e) => { FloatingBoxTrigger(e, faRectangleList, "Form", blockTypes.form ) } }>
                        <div className="block-icon" >
                            <FontAwesomeIcon icon={ faRectangleList }/>
                        </div>
                        <span className="block-name">Form</span>
                    </div>
                </div> */}

        {/* <span className="block-type">KHỐI NHẬP DỮ LIỆU</span>
                <div className="blocks">   

                    <div className="block table" onMouseDown={ (e) => { FloatingBoxTrigger(e, faSquarePen, "Entry", blockTypes.entry ) } }>
                        <div className="block-icon" >
                            <FontAwesomeIcon icon={ faSquarePen }/>
                        </div>
                        <span className="block-name">Entry</span>
                    </div>

                    <div className="block table" onMouseDown={ (e) => { FloatingBoxTrigger(e, faSquare, "Button", blockTypes.button ) } }>
                        <div className="block-icon" >
                            <FontAwesomeIcon icon={ faSquare }/>
                        </div>
                        <span className="block-name">Button</span>
                    </div>
                    <div className="block table" onMouseDown={ (e) => { FloatingBoxTrigger(e, faCalendarDays, "Datetime", blockTypes.datetime ) } }>
                        <div className="block-icon" >
                            <FontAwesomeIcon icon={ faCalendarDays }/>
                        </div>
                        <span className="block-name">Datetime</span>
                    </div>

                    <div className="block table" onMouseDown={ (e) => { FloatingBoxTrigger(e, faStop, "Api Data Selection", blockTypes.apiCombo ) } }>
                        <div className="block-icon" >
                            <FontAwesomeIcon icon={ faStop }/>
                        </div>
                        <span className="block-name">Api Combo</span>
                    </div>

                </div> */}

        <span className="block-type">KHỐI BIỂU ĐỒ</span>

        <div className="blocks">
          <div
            className="block table"
            onMouseDown={(e) => {
              FloatingBoxTrigger(
                e,
                faChartBar,
                "Biểu đồ cột ngang",
                blockTypes.chart_1
              );
            }}
          >
            <div className="block-icon">
              <FontAwesomeIcon icon={faChartBar} />
            </div>
            <span className="block-name">Biểu đồ cột ngang</span>
          </div>

          <div
            className="block table"
            onMouseDown={(e) => {
              FloatingBoxTrigger(
                e,
                faChartBar,
                "Biểu đồ bảng",
                blockTypes.table_chart
              );
            }}
          >
            <div className="block-icon">
              <FontAwesomeIcon icon={faTableList} />
            </div>
            <span className="block-name">Biểu đồ bảng</span>
          </div>

          <div
            className="block table"
            onMouseDown={(e) => {
              FloatingBoxTrigger(
                e,
                faMagnifyingGlassChart,
                "Biểu đồ điều kiện",
                blockTypes.c_chart
              );
            }}
          >
            <div className="block-icon">
              <FontAwesomeIcon icon={faMagnifyingGlassChart} />
            </div>
            <span className="block-name">Biểu đồ điều kiện</span>
          </div>

          <div
            className="block table"
            onMouseDown={(e) => {
              FloatingBoxTrigger(
                e,
                faDiagramNext,
                "Thống kê đơn lẻ",
                blockTypes.chart_2
              );
            }}
          >
            <div className="block-icon">
              <FontAwesomeIcon icon={faDiagramNext} />
            </div>
            <span className="block-name">Thống kê đơn lẻ</span>
          </div>

          <div
            className="block table"
            onMouseDown={(e) => {
              FloatingBoxTrigger(
                e,
                faDiagramNext,
                "Tìm kiếm",
                blockTypes.search_component
              );
            }}
          >
            <div className="block-icon">
              <FontAwesomeIcon icon={faDiagramNext} />
            </div>
            <span className="block-name">Tìm kiếm</span>
          </div>

          <div
            className="block table"
            onMouseDown={(e) => {
              FloatingBoxTrigger(
                e,
                faTableCellsLarge,
                "Thống kê dạng bảng 2 chiều",
                blockTypes.chart_3
              );
            }}
          >
            <div className="block-icon">
              <FontAwesomeIcon icon={faTableCellsLarge} />
            </div>
            <span className="block-name">Thống kê dạng bảng 2 chiều</span>
          </div>
        </div>

        {isCurrentPageParamized() && (
          <div>
            <span className="block-type">KHỐI CHI TIẾT</span>
            <div className="blocks">
              <div
                className="block table"
                onMouseDown={(e) => {
                  FloatingBoxTrigger(
                    e,
                    faBars,
                    "Box chi tiết",
                    blockTypes.detail_box
                  );
                }}
              >
                <div className="block-icon">
                  <FontAwesomeIcon icon={faBars} />
                </div>
                <span className="block-name">Box chi tiết</span>
              </div>

              <div
                className="block table"
                onMouseDown={(e) => {
                  FloatingBoxTrigger(
                    e,
                    faFont,
                    "Box chi tiết",
                    blockTypes.detail_text
                  );
                }}
              >
                <div className="block-icon">
                  <FontAwesomeIcon icon={faFont} />
                </div>
                <span className="block-name">Text - chi tiết</span>
              </div>

              <div
                className="block table"
                onMouseDown={(e) => {
                  FloatingBoxTrigger(
                    e,
                    faImage,
                    "Box ảnh",
                    blockTypes.detail_image
                  );
                }}
              >
                <div className="block-icon">
                  <FontAwesomeIcon icon={faImage} />
                </div>
                <span className="block-name">Ảnh - chi tiết</span>
              </div>

              <div
                className="block table"
                onMouseDown={(e) => {
                  FloatingBoxTrigger(
                    e,
                    faImages,
                    "Box ảnh",
                    blockTypes.detail_images
                  );
                }}
              >
                <div className="block-icon">
                  <FontAwesomeIcon icon={faImages} />
                </div>
                <span className="block-name">Nhiều ảnh - chi tiết</span>
              </div>
            </div>
          </div>
        )}

        <div>
          <span className="block-type">KHỐI THAO TÁC DỮ LIỆU</span>
          <div className="blocks">
            <div
              className="block table"
              onMouseDown={(e) => {
                FloatingBoxTrigger(
                  e,
                  faSquareCheck,
                  "KÍCH HOẠT MÃ VẠCH",
                  blockTypes.barcode_activation
                );
              }}
            >
              <div className="block-icon">
                <FontAwesomeIcon icon={faSquareCheck} />
              </div>
              <span className="block-name">Kích hoạt mã vạch</span>
            </div>
          </div>
        </div>

            {/* Them khoi layout */}
            <div>
          <span className="block-type">KHỐI LAYOUT</span>
          <div className="blocks">
          <div
            className="block table"
            onMouseDown={(e) => {
              FloatingBoxTrigger(
                e,
                faGrip,
                "Lưới",
                blockTypes.grid
              );
            }}
          >
            <div className="block-icon">
              <FontAwesomeIcon icon={faGrip} />
            </div>
            <span className="block-name">
              Lưới
            </span>
          </div>
          </div>
        </div>

      </div>
    </div>
  );
};
