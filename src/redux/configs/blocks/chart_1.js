import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import $ from "jquery";

export default function Chart_1(props) {
  const { cache, gridState, preview } = useSelector((state) => state);
  const {
    id,
    zIndex,
    insertComponent,
    renderFrontLiner,
    renderBackLiner,
    parent,
    fields,
    content,
  } = props;

  const dispatch = useDispatch();

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
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
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
          <span className="chart-title">{content}</span>
          <div id="chart">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
          <div id="html-dist"></div>
        </div>
        {renderBackLiner(id, parent)}
      </div>
    );
  }
}
