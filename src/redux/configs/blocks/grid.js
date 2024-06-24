import { useDispatch, useSelector } from "react-redux";

import $ from "jquery";

export default (props) => {
  const { cache, gridState, preview } = useSelector((state) => state);

  const {
    id,
    zIndex,
    title,
    value,
    placeholder,
    required,
    parent,
    flex,
    labelStyle,
    renderFrontLiner,
    renderBackLiner,
  } = props;
  console.log("hiifengg", props)
  const dispatch = useDispatch();

  const isActive = () => {
    const { activeComponent, hoverComponent } = cache;
    if (activeComponent.indexOf(id) !== -1 || hoverComponent == id) {
      return true;
    }
    return false;
  };

  const SwitchingState = (e) => {
    e.stopPropagation();
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
    dispatch({
      branch: "design-ui",
      type: "setHoverComponent",
      payload: {
        id,
      },
    });
  };

  if (preview) {
    return (
      null
    );
  } else {
    return (
      <div className="design-zone-container" style={{ zIndex, ...flex }}>
        {renderFrontLiner(id, parent)}
        <div
          className={`design-zone text-design grid-design ${
            isActive() ? "design-zone-active" : ""
          }`}
          onClick={SwitchingState}
          onMouseEnter={ComponentHover}
          style={{ zIndex }}
        >
          <p>{props?.title?.content}</p>
        </div>

        {renderBackLiner(id, parent)}
      </div>
    );
  }
};
