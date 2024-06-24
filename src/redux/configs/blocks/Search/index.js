import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import FormSearch from "./formSearch";

export default function SearchComponent(props) {
  const { cache , preview  } = useSelector((state) => state);
  const { id, zIndex, renderFrontLiner, renderBackLiner, parent, title , tables } =
    props;

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
    if (activeComponent !== id) {
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
  // Nhu
  if(preview){
    return (
      <div className="design-zone-container" style={{ zIndex }}>
        {renderFrontLiner(id, parent)}
        <div
          className={`design-zone chart-design
          `
        }
          onClick={SwitchingState}
          onMouseEnter={ComponentHover}
          style={{ zIndex }}
        >
          <span className="chart-title">{title}</span>
          
          <FormSearch /// code hiện giao diện search
          data = {tables}
          onchangeData= {() => {}}
      
          />
          {/* <div id="html-dist"></div> */}
        </div>
        {renderBackLiner(id, parent)}
      </div>
      
    );
  }else{
    return (
      <div className="design-zone-container" style={{ zIndex }}>
        {renderFrontLiner(id, parent)}
        <div
          className={`design-zone chart-design
           ${
            isActive() ? "design-zone-active" : ""
          }
          `
        }
          onClick={SwitchingState}
          onMouseEnter={ComponentHover}
          style={{ zIndex }}
        >
          <span className="chart-title">{title}</span>
          
          <FormSearch /// code hiện giao diện search
          data = {tables}
          onchangeData= {() => {}}
      
          />
          {/* <div id="html-dist"></div> */}
        </div>
        {renderBackLiner(id, parent)}
      </div>
      
    );
  }

}
