import {
  faArrowUpRightFromSquare,
  faCaretDown,
  faCaretRight,
  faCircle,
  faCirclePlus,
  faClose,
  faEdit,
  faInfo,
  faPlusCircle,
  faQuestion,
  faSquarePlus,
  faTrash,
  faAngleUp,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import functions from "../../../redux/configs/functions";
import { act } from "react-dom/test-utils";
import { fi, id } from "date-fns/locale";
import { JoiningTable } from "./Components/JoiningTable";
import CreatableSelect from "react-select/creatable";
import { LinkCharts } from "./Components/Search";
import { List } from "immutable";
import { SelectDisplayFields } from "./Components/SelectDisplayFields";

// export default function Properties() {
//   const selectedCpn = useSelector((state) => state.selectedCpn);
//   const selectedCpns = useSelector((state) => state.selectedCpns);
//   const propertySet = useSelector((state) => state.propertySet);

//   const [properties, setProperties] = useState(propertySet);

//   useEffect(() => {
//     const parent = selectedCpns.find((cpn) => cpn.id == selectedCpn.parent_id);
//     if (parent) {
//       const parents = selectedCpns?.slice(0, selectedCpns.length - 1);
//       const filtedProperties = [];

//       for (let i = 0; i < propertySet.length; i++) {
//         const { onlyExistsIn } = propertySet[i];
//         let valid = false;
//         if (onlyExistsIn) {
//           const directParent = onlyExistsIn.find(
//             (c) => c.type == "direct" && c.name == parent.name
//           );

//           if (directParent) {
//             valid = true;
//           }

//           const cascadingParents = onlyExistsIn.filter(
//             (c) => c.type == "cascading"
//           );
//           const atleastOneParentIsCascading = parents.filter((par) => {
//             const { name } = par;
//             const isExisted = cascadingParents.find(
//               (cpar) => cpar.name == name
//             );
//             return isExisted;
//           });

//           if (atleastOneParentIsCascading.length > 0) {
//             valid = true;
//           }

//           if (valid) {
//             filtedProperties.push(propertySet[i]);
//           }
//         } else {
//           filtedProperties.push(propertySet[i]);
//         }
//       }
//       setProperties(filtedProperties);
//     } else {
//       const filtedProperties = [];
//       for (let i = 0; i < propertySet.length; i++) {
//         const { onlyExistsIn } = propertySet[i];
//         if (!onlyExistsIn) {
//           filtedProperties.push(propertySet[i]);
//         }
//       }
//       setProperties(filtedProperties);
//     }
//   }, [selectedCpn]);

//   const dispatch = useDispatch();

//   const getPropByPath = (path, object) => {
//     const value = object[path[0]];
//     if (path.length > 0 && value != undefined) {
//       return getPropByPath(path.slice(1, path.length), value);
//     } else {
//       if (path.length == 0) {
//         return object;
//       } else {
//         if (value == undefined) {
//           return [];
//         }
//       }
//     }
//   };
//   const setPropByPath = (object, path = [], value) => {
//     if (path?.length == 1) {
//       object = { ...object, [path[0]]: value };
//     } else {
//       try {
//         object[path[0]] = setPropByPath(
//           object[path[0]],
//           path.slice(1, path.length),
//           value
//         );
//       } catch (e) {}
//     }
//     return object;
//   };

//   const areParentActive = (childOf) => {
//     if (childOf != undefined) {
//       const { prop_id, caseIf } = childOf;
//       const parent = propertySet.find((p) => p.id == prop_id);
//       if (parent) {
//         const { path } = parent;
//         const value = getPropByPath(path.split("."), selectedCpn);
//         if (value == caseIf) {
//           return true;
//         }
//       }
//       return false;
//     }
//     return true;
//   };

//   const updateSelectedComponent = (value, path) => {
//     const newComp = setPropByPath(selectedCpn, path, value);

//     dispatch({
//       branch: "design-ui",
//       type: "overideSelectedComp",
//       payload: {
//         component: newComp,
//       },
//     });
//   };

//   const setActiveComponent = (cpn) => {
//     dispatch({
//       branch: "design-ui",
//       type: "setActiveComponent",
//       payload: {
//         id: cpn.id,
//       },
//     });
//   };

//   const getCpnById = () => {};

//   return (
//     <div className="properties">
//       <div className="cpn-chain">
//         {selectedCpns.slice(0, selectedCpns.length - 1).map((c, i) => (
//           <div
//             key={i}
//             className="cpn"
//             onClick={() => {
//               setActiveComponent(c);
//             }}
//           >
//             <span>{c.name?.toUpperCase()}</span>
//             <span>
//               <FontAwesomeIcon icon={faCaretRight} />
//             </span>
//           </div>
//         ))}

//         <div className="cpn">
//           <span>{selectedCpn.name?.toUpperCase()}</span>
//         </div>
//       </div>

//       {properties.map((prop, index) => {
//         const { type } = prop;
//         console.log(type, "Nhu");

//         const Component = Components[type];
//         if (Component != undefined) {
//           return (
//             <Component
//               {...prop}
//               index={properties.length - index + 2}
//               selectedCpn={selectedCpn}
//               updateSelectedComponent={updateSelectedComponent}
//               getPropByPath={getPropByPath}
//               areParentActive={areParentActive}
//             />
//           );
//         } else {
//           return null;
//         }
//       })}
//       {/* {
//                 selectedCpn.id && <UnlinkComponent selectedCpn={selectedCpn} />
//             } */}
//     </div>
//   );
// }

// Nhu merge code

export default function Properties() {
  const { lang } = useSelector((state) => state);
  const selectedCpn = useSelector((state) => state.selectedCpn);
  const selectedCpns = useSelector((state) => state.selectedCpns);
  const propertySet = useSelector((state) => state.propertySet);

  const [properties, setProperties] = useState(propertySet);
  // thinh viet them ham sap xep lai cac bang theo y chi Linh
  const typeOrder = [
    "singleFieldSelection",
    "tablefieldspicker",
    "tablecalculatefields",
    "SelectDisplayFields",
    "bool",
  ];
  // Separate the specified types and unspecified types
  const specified = [];
  const unspecified = [];
  // console.log("THIS IS properties", properties);
  properties.forEach((item, index) => {
    if (typeOrder.includes(item.type)) {
      specified.push({ ...item, originalIndex: index });
    } else {
      unspecified.push({ ...item, originalIndex: index });
    }
  });

  // Sort the specified types based on the defined order
  specified.sort((a, b) => {
    return typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
  });

  // Merge the arrays, keeping unspecified types in their original positions
  const sortedProperties = [];
  let specIndex = 0;
  let unspecIndex = 0;

  for (let i = 0; i < properties.length; i++) {
    if (
      unspecified[unspecIndex] &&
      unspecified[unspecIndex].originalIndex === i
    ) {
      sortedProperties.push(unspecified[unspecIndex]);
      unspecIndex++;
    } else {
      sortedProperties.push(specified[specIndex]);
      specIndex++;
    }
  }

  useEffect(() => {
    const parent = selectedCpns.find((cpn) => cpn.id == selectedCpn.parent_id);
    if (parent) {
      const parents = selectedCpns?.slice(0, selectedCpns.length - 1);
      const filtedProperties = [];

      for (let i = 0; i < propertySet.length; i++) {
        const { onlyExistsIn } = propertySet[i];
        let valid = false;
        if (onlyExistsIn) {
          const directParent = onlyExistsIn.find(
            (c) => c.type == "direct" && c.name == parent.name
          );

          if (directParent) {
            valid = true;
          }

          const cascadingParents = onlyExistsIn.filter(
            (c) => c.type == "cascading"
          );
          const atleastOneParentIsCascading = parents.filter((par) => {
            const { name } = par;
            const isExisted = cascadingParents.find(
              (cpar) => cpar.name == name
            );
            return isExisted;
          });

          if (atleastOneParentIsCascading.length > 0) {
            valid = true;
          }

          if (valid) {
            filtedProperties.push(propertySet[i]);
          }
        } else {
          filtedProperties.push(propertySet[i]);
        }
      }
      setProperties(filtedProperties);
    } else {
      const filtedProperties = [];
      for (let i = 0; i < propertySet.length; i++) {
        const { onlyExistsIn } = propertySet[i];
        if (!onlyExistsIn) {
          filtedProperties.push(propertySet[i]);
        }
      }
      setProperties(filtedProperties);
    }
  }, [selectedCpn]);

  const dispatch = useDispatch();

  const getPropByPath = (path, object) => {
    const value = object[path[0]];
    if (path.length > 0 && value != undefined) {
      return getPropByPath(path.slice(1, path.length), value);
    } else {
      if (path.length == 0) {
        return object;
      } else {
        if (value == undefined) {
          return [];
        }
      }
    }
  };
  const setPropByPath = (object, path = [], value) => {
    if (path?.length == 1) {
      object = { ...object, [path[0]]: value };
    } else {
      try {
        object[path[0]] = setPropByPath(
          object[path[0]],
          path.slice(1, path.length),
          value
        );
      } catch (e) {}
    }
    return object;
  };

  const areParentActive = (childOf) => {
    if (childOf != undefined) {
      const { prop_id, caseIf } = childOf;
      const parent = propertySet.find((p) => p.id == prop_id);
      if (parent) {
        const { path } = parent;
        const value = getPropByPath(path.split("."), selectedCpn);
        if (value == caseIf) {
          return true;
        }
      }
      return false;
    }
    return true;
  };

  const updateSelectedComponent = (value, path) => {
    const newComp = setPropByPath(selectedCpn, path, value);

    dispatch({
      branch: "design-ui",
      type: "overideSelectedComp",
      payload: {
        component: newComp,
      },
    });
  };

  const setActiveComponent = (cpn) => {
    dispatch({
      branch: "design-ui",
      type: "setActiveComponent",
      payload: {
        id: cpn.id,
      },
    });
  };
  const [showAction, setShowAction] = useState(false);
  const [showUI, setShowUI] = useState(false);
  const [showData, setShowData] = useState(false);

  const getCpnById = () => {};
  const Top = [];
  const Action = [];
  const UI = [];
  const FN = [];
  const Data = [];
  const Dependent = [];

  sortedProperties.forEach((prop) => {
    if (prop && prop.path) {
      const { path, type } = prop;
      console.log("propPath", path);
      if (
        path.includes("props.name") ||
        path.includes("props.content") ||
        path.includes("props.title") ||
        path.includes("props.title.content")
      ) {
        Top.push(prop);
      } else if (
        path.includes("props.field.generating") ||
        path.includes("props.fomular") ||
        path.includes("props.export.state") ||
        path.includes("props.criterias") ||
        path.includes("props.buttons.add.state") ||
        path.includes("props.buttons.import.state") ||
        path.includes("props.buttons.export.state") ||
        path.includes("props.source.search.state") ||
        path.includes("props.buttons.update.state") ||
        path.includes("props.buttons.delete.state") ||
        path.includes("props.buttons.detail.state") ||
        path.includes("props.buttons.navigator.visible") ||
        path.includes("props.visibility.row_per_page") ||
        path.includes("props.to") ||
        path.includes("props.to.params") ||
        path.includes("props.generator.amount") ||
        path.includes("props.generator.table") ||
        path.includes("props.generator.indexField") ||
        path.includes("props.generator.onField") ||
        path.includes("props.generator.pattern") ||
        path.includes("props.generator.onOption") ||
        path.includes("props.generator.prefix") ||
        path.includes("props.criteria") ||
        path.includes("props.title.visible") ||
        path.includes("props.required") ||
        path.includes("props.default_value") ||
        path.includes("props.variable_name") ||
        path.includes("props.placeholder.content") ||
        path.includes("props.inputType") ||
        path.includes("props.prefix") || // tiền tố
        path.includes("props.postfix") || // hậu tố
        path.includes("props.dateFormat") || // kiểu ngày

        path.includes("props.displayField")
      ) {
        Action.push(prop);
      } else if (
        path.includes("props.style.margin") ||
        path.includes("props.style.padding") ||
        path.includes("props.style.color") ||
        path.includes("props.style.backgroundColor") ||
        path.includes("props.style.fontSize") ||
        path.includes("props.style.textAlign") ||
        path.includes("props.style.fontStyle") ||
        path.includes("props.style.fontWeight") ||
        path.includes("props.icon") ||
        path.includes("props.style.textDecoration") ||
        path.includes("props.labelStyle.padding") ||
        path.includes("props.labelStyle.color") ||
        path.includes("props.labelStyle.textAlign") ||
        path.includes("props.labelStyle.fontStyle") ||
        path.includes("props.labelStyle.fontWeight") ||
        path.includes("props.labelStyle.textDecoration") ||
        path.includes("props.labelStyle.margin") ||
        path.includes("props.labelStyle.fontSize") ||
        path.includes("props.style.borderStyle") ||
        path.includes("props.style.borderRadius") ||
        path.includes("props.style.width") ||
        path.includes("props.style.borderWidth") ||
        path.includes("props.style.borderWidth") ||
        path.includes("props.stylePrefix.fontSize") ||
        path.includes("props.stylePostfix.fontSize") ||
        path.includes("props.styleIcon.fontSize") ||
        path.includes("props.styleIcon.color") ||
        path.includes("props.stylePrefix.color") ||
        path.includes("props.stylePostfix.color") ||
        path.includes("props.styles.justifyContent") ||
        path.includes("props.stylePrefix.margin") ||
        path.includes("props.stylePrefix.padding") ||
        path.includes("props.stylePostfix.margin") ||
        path.includes("props.stylePostfix.padding") ||
        path.includes("props.styleIcon.margin") ||
        path.includes("props.styleIcon.padding") ||

        path.includes("props.style.borderColor")
      ) {
        UI.push(prop);
      } else if (
        path.includes("props.source.tables") ||
        path.includes("props.source.fields")
      ) {
        Data.push(prop);
      } else if (
        path.includes("props.table") ||
        path.includes("props.field") ||
        path.includes("props.slave") ||
        path.includes("props.master")
      ) {
        Dependent.push(prop);
      } else {
        FN.push(prop);
      }
    }
  });

  const handleShowAction = () => {
    setShowAction(!showAction);
  };

  const handleShowUi = () => {
    setShowUI(!showUI);
  };
  const handleShowData = () => {
    setShowData(!showData);
  };
  return (
    <div className="properties">
      <div className="cpn-chain mb-0">
        {selectedCpns.slice(0, selectedCpns.length - 1).map((c, i) => (
          <div
            key={i}
            className="cpn"
            onClick={() => {
              setActiveComponent(c);
            }}
          >
            <span>{c.name?.toUpperCase()}</span>
            <span>
              <FontAwesomeIcon icon={faCaretRight} />
            </span>
          </div>
        ))}

        <div className="cpn">
          <span>{selectedCpn.name?.toUpperCase()}</span>
        </div>
      </div>

      {sortedProperties.length && Top.length > 0 ? (
        <div style={{ padding: "1em" }}>
          <div className="c-chart p-0">
            <div className="chart-header p-1">
              <div className="chart-label mb-2">{lang["Information"]}</div>
            </div>
            {Top.map((prop, index) => {
              const { type } = prop;
              const Component = Components[type];

              if (Component != undefined) {
                return (
                  <>
                    <div>
                      <Component
                        {...prop}
                        index={properties.length - index + 2}
                        selectedCpn={selectedCpn}
                        updateSelectedComponent={updateSelectedComponent}
                        getPropByPath={getPropByPath}
                        areParentActive={areParentActive}
                      />
                    </div>
                  </>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
      {sortedProperties.length && Data.length > 0 ? (
        <div style={{ padding: "1em" }}>
          <div className="c-chart p-0">
            <div
              className={` ${
                showData ? "chart-header pb-2" : "chart-header-of"
              }`}
              onClick={handleShowData}
            >
              <div className="chart-label mb-2">
                <FontAwesomeIcon
                  icon={showData ? faAngleUp : faAngleRight}
                  className="me-2"
                />
                {lang["Data"]}
              </div>
            </div>
            {showData && (
              <>
                {Data.map((prop, index) => {
                  const { type } = prop;
                  const Component = Components[type];

                  if (Component != undefined) {
                    return (
                      <>
                        <div>
                          <Component
                            {...prop}
                            index={properties.length - index + 2}
                            selectedCpn={selectedCpn}
                            updateSelectedComponent={updateSelectedComponent}
                            getPropByPath={getPropByPath}
                            areParentActive={areParentActive}
                          />
                        </div>
                      </>
                    );
                  } else {
                    return null;
                  }
                })}
              </>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
      {sortedProperties.length && Dependent.length > 0 ? (
        <div style={{ padding: "1em" }}>
          <div className="c-chart p-0">
            <div
              className={` ${
                showData ? "chart-header pb-2" : "chart-header-of"
              }`}
              onClick={handleShowData}
            >
              <div className="chart-label ">
                <FontAwesomeIcon
                  icon={showData ? faAngleUp : faAngleRight}
                  className="me-2"
                />
                {lang["Data table"]}
              </div>
            </div>
            {showData && (
              <>
                {Dependent.map((prop, index) => {
                  const { type } = prop;
                  const Component = Components[type];

                  if (Component != undefined) {
                    return (
                      <>
                        <div>
                          <Component
                            {...prop}
                            index={properties.length - index + 2}
                            selectedCpn={selectedCpn}
                            updateSelectedComponent={updateSelectedComponent}
                            getPropByPath={getPropByPath}
                            areParentActive={areParentActive}
                          />
                        </div>
                      </>
                    );
                  } else {
                    return null;
                  }
                })}
              </>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div>
        {FN.length > 0 &&
          FN.map((prop, index) => {
            const { type } = prop;
            const Component = Components[type];

            if (Component != undefined) {
              return (
                <div>
                  <Component
                    {...prop}
                    index={properties.length - index + 2}
                    selectedCpn={selectedCpn}
                    updateSelectedComponent={updateSelectedComponent}
                    getPropByPath={getPropByPath}
                    areParentActive={areParentActive}
                  />
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>

      {sortedProperties.length && Action.length ? (
        <div style={{ padding: "1em" }}>
          <div className="c-chart p-0">
            <div
              className={` ${
                showAction ? "chart-header pb-2" : "chart-header-of"
              }`}
              onClick={handleShowAction}
            >
              <div className="chart-label">
                <FontAwesomeIcon
                  icon={showAction ? faAngleUp : faAngleRight}
                  className="me-2"
                />
                Chức năng
              </div>
            </div>
            {showAction &&
              Action.map((prop, index) => {
                const { type } = prop;
                const Component = Components[type];

                if (Component != undefined) {
                  return (
                    <div>
                      <Component
                        {...prop}
                        index={properties.length - index + 2}
                        selectedCpn={selectedCpn}
                        updateSelectedComponent={updateSelectedComponent}
                        getPropByPath={getPropByPath}
                        areParentActive={areParentActive}
                      />
                    </div>
                  );
                } else {
                  return null;
                }
              })}
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* Hiển thị các đối tượng trong mảng UI */}
      {sortedProperties.length && UI.length ? (
        <div style={{ padding: "1em" }}>
          <div className="c-chart p-0">
            <div
              className={` ${showUI ? "chart-header pb-2" : "chart-header-of"}`}
              onClick={handleShowUi}
            >
              <div className="chart-label">
                <FontAwesomeIcon
                  icon={showUI ? faAngleUp : faAngleRight}
                  className="me-2"
                />
                Giao diện
              </div>
            </div>
            {showUI &&
              UI.map((prop, index) => {
                const { type } = prop;
                const Component = Components[type];

                if (Component != undefined) {
                  return (
                    <div>
                      <Component
                        {...prop}
                        index={properties.length - index + 2}
                        selectedCpn={selectedCpn}
                        updateSelectedComponent={updateSelectedComponent}
                        getPropByPath={getPropByPath}
                        areParentActive={areParentActive}
                      />
                    </div>
                  );
                } else {
                  return null;
                }
              })}
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* {
      selectedCpn.id && <UnlinkComponent selectedCpn={selectedCpn} />
    } */}
    </div>
  );
}

const flatteningComponents = (components) => {
  const cpns = [];
  for (let i = 0; i < components.length; i++) {
    const { children } = components[i];
    cpns.push({ ...components[i], children: [] });
    if (children) {
      cpns.push(...flatteningComponents(children));
    }
  }
  return cpns;
};

const EntryBox = (props) => {
  const {
    label,
    path,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
    read_only,
  } = props;
  const splittedPath = path.split(".");

  return (
    <div className="property" style={{ zIndex: index }}>
      <div className="label-box">
        <span>{label}</span>
      </div>
      <div className="input-box">
        <input
          type="text"
          value={getPropByPath(splittedPath, selectedCpn)}
          onChange={(e) => {
            updateSelectedComponent(e.target.value, splittedPath);
          }}
          disabled={read_only}
        />
      </div>
    </div>
  );
};

const PattenEntry = (props) => {
  const {
    label,
    path,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
    read_only,
  } = props;

  const dispatch = useDispatch();

  const splittedPath = path.split(".");
  const value = getPropByPath(splittedPath, selectedCpn);

  const triggerInstruction = () => {
    dispatch({
      branch: "floating-boxes",
      type: "floatingTrigger",
    });
    dispatch({
      branch: "floating-boxes",
      type: "setBoxType",
      payload: {
        type: "patternGuideline",
      },
    });
  };

  const renderPreview = (value) => {
    const months = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear().toString().slice(2, 4);
    return `${value}${months[month]}${year}00000000000`;
  };

  return (
    <div>
      <div className="property" style={{ zIndex: index }}>
        <div className="label-box">
          <span>{label}</span>
        </div>
        <div className="input-box">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              updateSelectedComponent(e.target.value, splittedPath);
            }}
            disabled={read_only}
          />
        </div>
        <div className="infor-icon" onClick={triggerInstruction}>
          <FontAwesomeIcon icon={faQuestion} />
        </div>
      </div>
      {/* <div className="property">
        <div className="label-box">
          <span>Prefix</span>
        </div>
        <div className="input-box">
          <span
            style={
              value && value.length == 3 ? { color: "green" } : { color: "red" }
            }
          >
            {renderPrefix(value)}
          </span>
        </div>
      </div> */}
      <div className="property">
        <div className="label-box">
          <span>Xem trước</span>
        </div>
        <div className="input-box">
          <span
            style={
              value && value.length == 3 ? { color: "green" } : { color: "red" }
            }
          >
            {renderPreview(value)}
          </span>
        </div>
      </div>
    </div>
  );
};

const PrefixEntry = (props) => {
  const {
    label,
    path,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
    read_only,
  } = props;

  const splittedPath = path.split(".");
  const value = getPropByPath(splittedPath, selectedCpn);

  const renderPreview = (value) => {
    console.log(props);
    const months = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear().toString().slice(2, 4);
    return `${value}${months[month]}${year}00000000000`;
  };

  return (
    <div>
      <div className="property" style={{ zIndex: index }}>
        <div className="label-box">
          <span>{label}</span>
        </div>
        <div className="input-box">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              updateSelectedComponent(e.target.value, splittedPath);
            }}
            disabled={read_only}
          />
        </div>
      </div>
      <div className="property">
        <div className="label-box">
          <span style={{ whiteSpace: "nowrap" }}>Xem trước</span>
        </div>
        <div className="input-box">
          <span
            style={{
              color: "green",
              paddingLeft: "20px",
              wordBreak: "break-all",
            }}
          >
            {renderPreview(value)}
          </span>
        </div>
      </div>
    </div>
  );
};
const NumberBox = (props) => {
  const {
    label,
    path,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
  } = props;

  const splittedPath = path.split(".");
  return (
    <div className="property" style={{ zIndex: index }}>
      <div className="label-box">
        <span>{label}</span>
      </div>
      <div className="input-box">
        <input
          type="number"
          value={getPropByPath(splittedPath, selectedCpn)}
          onChange={(e) => {
            updateSelectedComponent(parseInt(e.target.value), splittedPath);
          }}
        />
      </div>
    </div>
  );
};

const IconicSwitchingGroup = (props) => {
  const {
    label,
    path,
    buttons,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
  } = props;
  const splittedPath = path.split(".");
  const currentValue = getPropByPath(splittedPath, selectedCpn);

  return (
    <div className="property" style={{ zIndex: index }}>
      <div className="label-box">
        <span>{label}</span>
      </div>
      <div className="iconic-switches">
        {buttons.map((btn) => (
          <div
            className={`icon-switch-btn ${
              currentValue == btn.value ? " switch-activated " : ""
            }`}
            onClick={() => {
              updateSelectedComponent(btn.value, splittedPath);
            }}
          >
            <FontAwesomeIcon icon={btn.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

const IconicSwitching = (props) => {
  const {
    label,
    path,
    values,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    icon,
    index,
  } = props;

  const splittedPath = path.split(".");

  const currentValue = getPropByPath(splittedPath, selectedCpn);

  return (
    <div className="property" style={{ zIndex: index }}>
      <div className="label-box">
        <span>{label}</span>
      </div>
      <div
        className={`iconic-switch ${
          currentValue == values[1] ? "switch-activated" : ""
        }`}
        onClick={() => {
          updateSelectedComponent(
            currentValue == values[0] ? values[1] : values[0],
            splittedPath
          );
        }}
      >
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  );
};

const Color = (props) => {
  const {
    label,
    path,
    values,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    icon,
    index,
  } = props;

  const splittedPath = path.split(".");

  const currentValue = getPropByPath(splittedPath, selectedCpn);

  return (
    <div className="property" style={{ zIndex: index }}>
      <div className="label-box">
        <span>{label}</span>
      </div>
      <div className={`color-box`}>
        <input
          type="color"
          className="color-input"
          value={currentValue}
          onChange={(e) => {
            updateSelectedComponent(e.target.value, splittedPath);
          }}
        />
      </div>
    </div>
  );
};

const Bool = (props) => {
  const {
    label,
    path,
    if_true,
    if_false,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
  } = props;

  const splittedPath = path.split(".");

  const currentValue = getPropByPath(splittedPath, selectedCpn);

  const [drop, setDrop] = useState(false);

  let value = if_true;
  if (!currentValue) {
    value = if_false;
  }

  // console.log("WTF", selectedCpn); // this is where it show the properties (values thinh)

  const options = [if_true, if_false];

  return (
    <div className="property" style={{ zIndex: index }}>
      <div className="label-box">
        <span>{label}</span>
      </div>
      <div className={`drop-box`}>
        <div
          className="content-container"
          onClick={() => {
            setDrop(!drop);
          }}
        >
          <div className={`content ${currentValue ? "true" : "false"}`}>
            <span>{value.label}</span>
          </div>
          <div className="caret">
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </div>
        <div
          className="options-container"
          style={{ display: drop ? "block" : "none" }}
        >
          <div className="options">
            {options.map((opt) => (
              <div
                className="option"
                onClick={() => {
                  updateSelectedComponent(opt.value, splittedPath);
                  setDrop(false);
                }}
              >
                <span>{opt.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChildSelection = (props) => {
  const {
    label,
    path,
    if_true,
    if_false,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    types,
    scope,
    index,
  } = props;

  const splittedPath = path.split(".");

  const currentValue = getPropByPath(splittedPath, selectedCpn);
  const [drop, setDrop] = useState(false);

  let options = [];
  const children = flatteningComponents(
    selectedCpn.children ? selectedCpn.children : []
  );
  if (scope == "cascade") {
    options = children.filter((c) => types[c.name] != undefined);
  } else {
    const children = selectedCpn.children ? selectedCpn.children : [];
    options = children.filter((c) => types[c.name] != undefined);
  }

  const selectedChild = children.find((c) => c.id == currentValue);

  const getLabel = (opt) => {
    const type = types[opt.name];
    let label = "";
    if (type) {
      const { display_value } = type;
      label = getPropByPath(display_value.split("."), opt);
    }
    return label;
  };

  return (
    <div className="property" style={{ zIndex: index }}>
      <div className="label-box">
        <span>{label}</span>
      </div>
      <div className={`drop-box`}>
        <div
          className="content-container"
          onClick={() => {
            setDrop(!drop);
          }}
        >
          <div className="content">
            <span>{selectedChild ? getLabel(selectedChild) : ""}</span>
          </div>
          <div className="caret">
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </div>
        <div
          className="options-container"
          style={{ display: drop ? "block" : "none" }}
        >
          <div className="options">
            {options.map((opt) => (
              <div
                className="option"
                onClick={() => {
                  updateSelectedComponent(opt.id, splittedPath);
                  setDrop(false);
                }}
              >
                <span>{getLabel(opt)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ApiSelection = (props) => {
  const proxy = useSelector((state) => state.proxy);
  const token = localStorage.getItem("_token");
  const {
    index,
    label,
    type,
    path,
    url,
    params,
    api_data,
    fields,
    display_value,

    getPropByPath,
    selectedCpn,
    updateSelectedComponent,

    childOf,
    areParentActive,
    sideFunction,
  } = props;

  const splittedPath = path.split(".");
  const PARAMS = useParams();
  const dispatch = useDispatch();

  const [options, setOptions] = useState([]);
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    let fromatedURL = url;
    for (let i = 0; i < params.length; i++) {
      fromatedURL = fromatedURL.replaceAll(`[${params[i]}]`, PARAMS[params[i]]);
    }

    fetch(`${proxy}${fromatedURL}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const data = getPropByPath(api_data.split("."), res);
        if (data) {
          const formatedOptions = data.map((record) => {
            const object = {};

            for (let i = 0; i < fields.length; i++) {
              const { from, to } = fields[i];
              object[to] = record[from];
            }
            return object;
          });
          setOptions(formatedOptions);
        } else {
          setOptions([]);
        }
      });
  }, []);

  const targetSelectTrigger = (opt) => {
    updateSelectedComponent(opt, splittedPath);

    if (sideFunction) {
      const payload = {};
      const { params } = sideFunction;

      for (let i = 0; i < params.length; i++) {
        const { from, param, translateTo } = params[i];

        if (from == "target") {
          payload[translateTo] = getPropByPath(param.split("."), opt);
        } else {
          payload[translateTo] = getPropByPath(param.split("."), selectedCpn);
        }
      }

      dispatch({
        branch: "side-funcs",
        type: sideFunction.name,
        payload,
      });
    }

    setDrop(false);
  };
  const getLabel = (opt) => {
    return opt[display_value];
  };

  if (areParentActive(childOf)) {
    return (
      <div className="property" style={{ zIndex: index }}>
        <div className="label-box">
          <span>{label}</span>
        </div>
        <div className={`drop-box`}>
          <div
            className="content-container"
            onClick={() => {
              setDrop(!drop);
            }}
          >
            <div className="content">
              <span>{getLabel(getPropByPath(splittedPath, selectedCpn))}</span>
            </div>
            <div className="caret">
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
          <div
            className="options-container"
            style={{ display: drop ? "block" : "none" }}
          >
            <div className="options">
              {options.map((opt) => (
                <div
                  className="option"
                  onClick={() => {
                    targetSelectTrigger(opt);
                  }}
                >
                  <span>{getLabel(opt)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const ListSelection = (props) => {
  const {
    label,
    path,
    options,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
  } = props;

  const splittedPath = path.split(".");

  const currentValue = getPropByPath(splittedPath, selectedCpn);

  const [drop, setDrop] = useState(false);

  let value = options.find((vl) => vl.value == currentValue);

  return (
    <div className="property" style={{ zIndex: index }}>
      <div className="label-box">
        <span>{label}</span>
      </div>
      <div className={`drop-box`}>
        <div
          className="content-container"
          onClick={() => {
            setDrop(!drop);
          }}
        >
          <div className="content">
            <span>{value?.label}</span>
          </div>
          <div className="caret">
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </div>
        <div
          className="options-container"
          style={{ display: drop ? "block" : "none" }}
        >
          <div className="options">
            {options.map((opt) => (
              <div
                className="option"
                onClick={() => {
                  updateSelectedComponent(opt.value, splittedPath);
                  setDrop(false);
                }}
              >
                <span>{opt.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChartSelection = (props) => {
  const {
    label,
    path,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
    read_only,
  } = props;

  const charts = [
    {
      value: "chart_1",
      content: "Biểu đồ cột ngang",
    },
    {
      value: "table_chart",
      content: "Biểu đồ bảng",
    },
  ];

  const splittedPath = path.split(".");
  const chart_type = getPropByPath(splittedPath, selectedCpn);

  return (
    <section>
      <label>{label}</label>
      <select
        onChange={({ target: { value } }) => {
          updateSelectedComponent(value, splittedPath);
        }}
      >
        {charts.map(({ value, content }) => (
          <option
            value={value}
            key={value}
            selected={chart_type === value ? true : false}
          >
            {content}
          </option>
        ))}
      </select>
    </section>
  );
};

const SelfSelection = (props) => {
  const {
    label,
    path,
    data,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
    fields,
    display_value,

    childOf,
    areParentActive,
  } = props;

  const splittedPath = path.split(".");
  const currentValue = getPropByPath(splittedPath, selectedCpn);
  const [drop, setDrop] = useState(false);

  const options = getPropByPath(data.split("."), selectedCpn);

  const formatObjectByFields = (opt) => {
    const clone = {};
    for (let i = 0; i < fields.length; i++) {
      const { from, to } = fields[i];
      clone[to] = opt[from];
    }
    return clone;
  };
  if (areParentActive(childOf)) {
    return (
      <div className="property" style={{ zIndex: index }}>
        <div className="label-box">
          <span>{label}</span>
        </div>
        <div className={`drop-box`}>
          <div
            className="content-container"
            onClick={() => {
              setDrop(!drop);
            }}
          >
            <div className="content">
              <span>{currentValue?.[display_value]}</span>
            </div>
            <div className="caret">
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
          <div
            className="options-container"
            style={{ display: drop ? "block" : "none" }}
          >
            <div className="options">
              {options.map((opt) => (
                <div
                  className="option"
                  onClick={() => {
                    updateSelectedComponent(
                      formatObjectByFields(opt),
                      splittedPath
                    );
                    setDrop(false);
                  }}
                >
                  <span>{opt[display_value]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const MasterSelection = (props) => {
  const {
    label,
    path,
    data,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,

    index,
    fields,
    display_value,

    childOf,
    areParentActive,
  } = props;

  const { selectedCpns } = useSelector((state) => state);

  const splittedPath = path.split(".");
  const currentValue = getPropByPath(splittedPath, selectedCpn);
  const [drop, setDrop] = useState(false);

  const parent = selectedCpns.find((p) => p.id == selectedCpn.parent_id);

  if (parent) {
    const options = getPropByPath(data.split("."), parent);
    console.log("AMOUNT", options, parent, data);
    const formatObjectByFields = (opt) => {
      const clone = {};
      for (let i = 0; i < fields.length; i++) {
        const { from, to } = fields[i];
        clone[to] = opt[from];
      }
      return clone;
    };
    if (areParentActive(childOf)) {
      return (
        <div className="property" style={{ zIndex: index }}>
          <div className="label-box">
            <span>{label}</span>
          </div>
          <div className={`drop-box`}>
            <div
              className="content-container"
              onClick={() => {
                setDrop(!drop);
              }}
            >
              <div className="content">
                <span>{currentValue?.[display_value]}</span>
              </div>
              <div className="caret">
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            </div>
            <div
              className="options-container"
              style={{ display: drop ? "block" : "none" }}
            >
              <div className="options">
                {options.map((opt) => (
                  <div
                    className="option"
                    onClick={() => {
                      updateSelectedComponent(
                        formatObjectByFields(opt),
                        splittedPath
                      );
                      setDrop(false);
                    }}
                  >
                    <span>{opt[display_value]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

const SelectTables = (props) => {
  const {
    label,
    path,
    fieldsPath,

    namePath,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
  } = props;

  const localTables = useSelector((state) => state.tables);
  const [tables, setTables] = useState(localTables); // ủa gì dị
  const [drop, setDrop] = useState(false);
  const splittedPath = path.split(".");
  const selectedTables = getPropByPath(splittedPath, selectedCpn);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTables.length > 0) {
      const foreignKeys = [];
      for (let i = 0; i < selectedTables.length; i++) {
        foreignKeys.push(...(selectedTables[i].foreign_keys ?? []));
      }
      const validTablesId = foreignKeys.map((key) => key.table_id);
      const validTables = localTables.filter(
        (tb) => validTablesId.indexOf(tb.id) != -1
      );
      const selectedTablesId = selectedTables.map((tb) => tb.id);

      const finalTables = validTables.filter((tb) => {
        return selectedTablesId.indexOf(tb.id) == -1;
      });

      setTables(finalTables);
    } else {
      setTables(localTables);
    }
  }, [selectedTables]);

  const tableSelect = (table) => {
    setDrop(false);

    const newTables = [...selectedTables, table];
    if (newTables.length > 0) {
      const foreignKeys = [];
      for (let i = 0; i < newTables.length; i++) {
        foreignKeys.push(...newTables[i].foreign_keys);
      }
      const validTablesId = foreignKeys.map((key) => key.table_id);
      const validTables = localTables.filter(
        (tb) => validTablesId.indexOf(tb.id) != -1
      );
      const finalTables = validTables.filter(
        (tb) => newTables.indexOf(tb) == -1
      );

      setTables(finalTables);
    } else {
      setTables(localTables);
    }

    if (newTables.length == 1) {
      const { table_name } = newTables[0];
      updateSelectedComponent(table.fields, [
        "props",
        "source",
        "added_fields",
      ]);
      if (namePath) {
        updateSelectedComponent(table_name, namePath.split("."));
      }
      dispatch({
        branch: "side-funcs",
        type: "UpdateHiddenPageButDeHellOnTable",
        payload: {
          block_id: selectedCpn.id,
        },
      });
    }

    updateSelectedComponent([...selectedTables, table], splittedPath);
  };

  const removeLastTable = () => {
    const removedTable = selectedTables[selectedTables.length - 1];
    const newTables = selectedTables.slice(0, selectedTables.length - 1);

    if (newTables.length > 0) {
      const foreignKeys = [];
      for (let i = 0; i < newTables.length; i++) {
        foreignKeys.push(...newTables[i].foreign_keys);
      }
      const validTablesId = foreignKeys.map((key) => key.table_id);
      const validTables = localTables.filter(
        (tb) => validTablesId.indexOf(tb.id) != -1
      );
      const finalTables = validTables.filter(
        (tb) => newTables.indexOf(tb) == -1
      );
      console.log("leftFields", finalTables);

      setTables(finalTables);
    } else {
      setTables(localTables);
    }
    const currentFields = getPropByPath(fieldsPath.split("."), selectedCpn);
    console.log("???", currentFields);

    const leftFields = currentFields.filter(
      (f) => f.table_id != removedTable.id
    );
    updateSelectedComponent(leftFields, fieldsPath.split("."));
    updateSelectedComponent(newTables, splittedPath);
  };

  return (
    <div>
      <div className="property" style={{ zIndex: index }}>
        <div className="label-box">
          <span>{label}</span>
        </div>
        <div className={`drop-box`}>
          <div
            className="content-container"
            onClick={() => {
              setDrop(!drop);
            }}
          >
            <div className="content">
              <span></span>
            </div>
            <div className="caret">
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
          <div
            className="options-container"
            style={{ display: drop ? "block" : "none" }}
          >
            <div className="options">
              {tables.map((table) => (
                <div
                  className="option"
                  onClick={() => {
                    tableSelect(table);
                  }}
                >
                  <span>{table.table_name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="property table-tag-list">
        {selectedTables.map((table, index) => (
          <div className="table-tag">
            <span>{table.table_name}</span>
            {index == selectedTables.length - 1 && (
              <span className="close" onClick={removeLastTable}>
                <FontAwesomeIcon icon={faClose} />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
// Nhu code hiện ra giao diện các item trong c_chart
const AccordionChart = (props) => {
  const {
    cpn,
    i,

    // activeIndex,
    // onAccordionClick,

    data,
    dataValues,
    handleRemoveChart,
    handleChartChange,
    selectedChart,

    handleAddSection,
    handleSectionRemove,

    handleUpdateValues,
    handleValuesRemove,
    handleValuesChange,

    handleOptionChange,
  } = props;
  const { lang } = useSelector((state) => state);

  return (
    <div className="p-1">
      <div className="accordion-item accordion-item-chart">
        <h2
          className="accordion-header "
          key={cpn.key}
          id={`panelsStayOpen-headingChart${i}`}
          // onClick={handleClick}
        >
          <button
            className="accordion-button accordion-button-left"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#panelsStayOpen-collapse${i}`}
            aria-expanded={i === 0 ? "true" : "false"}
            aria-controls={`panelsStayOpen-collapse${i}`}
          >
            {lang["Chart"]}
            <span className="ml-1">{i + 1}</span>
            <div className="accordion-button-right">
              <FontAwesomeIcon
                icon={faTrash}
                onClick={(e) => {
                  handleRemoveChart(i);
                }}
              />
            </div>
          </button>
        </h2>
        <div
          id={`panelsStayOpen-collapse${i}`}
          className={`accordion-collapse collapse ${i === 0 ? "show" : ""}`}
          aria-labelledby={`panelsStayOpen-headingChart${i}`}
        >
          <div className="accordion-body">
            <div>
              {ChartTypes?.map(({ key, value }) => (
                <div className="form-check" value={key} key={key}>
                  <input
                    className="form-check-input"
                    type="radio"
                    id={key}
                    value={key}
                    name={`chartType_${i}`}
                    checked={selectedChart === key || cpn.type === key}
                    onChange={(event) => handleChartChange(event, i)}
                  ></input>
                  <label className="form-check-label" htmlForfor={key}>
                    {value} {i}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div
            className="accordion accordion-flush"
            id="accordionPanelsStayOpenExample"
          >
            {cpn.sections?.map((section, index) => (
              <div className="accordion-item ">
                <h2
                  className="accordion-header "
                  key={index}
                  id={`panelsStayOpen-heading${index + i}`}
                >
                  <button
                    className="accordion-button  accordion-button-left-key"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#panelsStayOpen-collapseOne${
                      index + "-" + i
                    }`}
                    aria-expanded={
                      index + "-" + i === index + "-" + i ? "true" : "false"
                    }
                    aria-controls={`panelsStayOpen-collapseOne${
                      index + "-" + i
                    }`}
                    style={{
                      backgroundColor: "	#EEEEEE",
                    }}
                  >
                    {lang["Key and Values"]}

                    <div className="icon-chart-key-values">
                      <FontAwesomeIcon
                        className="icon-key-values"
                        icon={faCirclePlus}
                        onClick={() => handleAddSection(i)}
                      />
                      <FontAwesomeIcon
                        className="icon-values"
                        icon={faTrash}
                        onClick={() => handleSectionRemove(i, index)}
                      />
                    </div>
                  </button>
                </h2>
                <div
                  id={`panelsStayOpen-collapseOne${index + "-" + i}`}
                  className={`accordion-collapse collapse ${
                    index + "-" + i === index + "-" + i ? "show" : ""
                  }`}
                  aria-labelledby={`panelsStayOpen-heading${index + "-" + i}`}
                >
                  <div className="accordion-body">
                    <div className="key-chart row">
                      <div className="lable-box mt-2 col-3">
                        {lang["Key"]} :
                      </div>

                      <div className="col-9 p-0">
                        <CreatableSelect
                          isClearable
                          value={section.section.keys}
                          onChange={(selectedOptions) =>
                            handleOptionChange(selectedOptions, i, index)
                          }
                          options={data}
                        />
                      </div>
                    </div>
                    <div className="values-chart">
                      <div className="label-box mt-2 icon-add-values">
                        {lang["Values"]} :
                        <FontAwesomeIcon
                          icon={faCirclePlus}
                          onClick={() =>
                            handleUpdateValues({ ic: i, is: index })
                          }
                        />
                      </div>
                      {section.section.values?.map((value, id) => (
                        <div className="row">
                          <div className="col-3"></div>
                          <div className="col-9">
                            <div className="row mt-2 align-items-center">
                              <div className="col-10 p-0">
                                <CreatableSelect
                                  // isClearable
                                  key={index}
                                  value={value.value}
                                  onChange={(selectedOptions) =>
                                    handleValuesChange(
                                      selectedOptions,
                                      id,
                                      i,
                                      index
                                    )
                                  }
                                  options={dataValues}
                                />
                              </div>
                              <div className="col-2 trash-values">
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  onClick={() =>
                                    handleValuesRemove(id, i, index)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
//Nhu code tạo thêm 1 ra thêm 1 c_chart mới
const ComponentChart = (props) => {
  const {
    newChart,
    selectedChart,
    onChartChange,
    handleUpdateKey,
    handleUpdateValues,
    setSelectedValues,
    key_fields,
    value_fields,
    setNewChart,
    handleRemoveChart,
    handleAddSection,
    handleSectionRemove,
  } = props;
  // accrodion
  // const [activeIndex, setActiveIndex] = useState(0);
  // const handleAccordionClick = (index) => {
  //   setActiveIndex(index);
  // };

  // thay đổi loại biêu đồ
  const handleChartChange = (event, index) => {
    const { value } = event.target;
    onChartChange(value, index);
  };
  const handleOptionChange = (selectedOptions, i, index) => {
    handleUpdateKey({
      value: selectedOptions,
      ic: i,
      is: index,
    });
  };

  const handleValuesChange = (selectOption, id, i, index) => {
    setNewChart((prev) => {
      const updatedNewChart = [...prev];
      if (
        updatedNewChart[i].sections[index].section &&
        updatedNewChart[i].sections[index].section.values
      ) {
        updatedNewChart[i].sections[index].section = {
          ...updatedNewChart[i].sections[index].section,

          values: updatedNewChart[i].sections[index].section.values.map(
            (item, iv) => {
              if (iv === id) {
                return { ...item, value: selectOption };
              }
              return item;
            }
          ),
        };
      } else {
        // Nếu không có phần tử nào ở vị trí index, thêm một phần tử mới
        updatedNewChart[i].sections[index].section = {
          values: [
            {
              value: typeof setSelectedValues === "string" ? selectOption : {},
            },
          ],
        };
      }
      return updatedNewChart;
    });
  };
  const handleValuesRemove = (id, i, index) => {
    setNewChart((prev) => {
      const updatedNewChart = [...prev];
      if (
        updatedNewChart[i].sections[index].section &&
        updatedNewChart[i].sections[index].section.values
      ) {
        updatedNewChart[i].sections[index].section = {
          ...updatedNewChart[i].sections[index].section,
          values: updatedNewChart[i].sections[index].section.values.filter(
            (_, idx) => idx !== id
          ),
        };
      }
      return updatedNewChart;
    });
  };
  // data của key
  const data = key_fields?.reduce((prev, { id, fomular_alias, field_name }) => {
    if (!id) {
      return prev;
    }
    return [
      ...prev,
      {
        value: `$${field_name}`,
        label: `${field_name}-${fomular_alias}`,
      },
    ];
  }, []);
  // data của value
  const dataValues = value_fields?.reduce(
    (prev, { id, fomular_alias, field_name }) => {
      if (!id) {
        return prev;
      }
      return [
        ...prev,
        {
          value: `$${field_name}`,
          label: `${field_name}`,
        },
      ];
    },
    []
  );
  return (
    <div className="accordion" id="accordionExample">
      {newChart?.map((cpn, i) => {
        const selectedChartKey = selectedChart[i]; // Lưu trữ giá trị key của ChartTypes tương ứng
        return (
          <AccordionChart
            cpn={cpn}
            i={i}
            data={data}
            dataValues={dataValues}
            handleRemoveChart={handleRemoveChart}
            handleChartChange={handleChartChange}
            selectedChart={selectedChart}
            handleAddSection={handleAddSection}
            handleSectionRemove={handleSectionRemove}
            handleUpdateValues={handleUpdateValues}
            handleValuesRemove={handleValuesRemove}
            handleValuesChange={handleValuesChange}
            handleOptionChange={handleOptionChange}
            // activeIndex={activeIndex}
            // onAccordionClick={handleAccordionClick}
          />
        );
      })}
    </div>
  );
};
// Nhu: code này sửa lại hết
//code gốc em  có comment lại ở bên dưới
const SelectChartTypes = (props) => {
  const {
    label,
    path,
    namePath,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
  } = props;

  const splittedPath = path?.split(".");
  const { getFormatedUUID } = functions;
  const current2 = getPropByPath(splittedPath, selectedCpn) || [];
  const key_fields = [];
  for (const k in selectedCpn?.props?.joiningTable?.select_root) {
    key_fields.push({
      id: Math.random(),
      fomular_alias: JSON.stringify(
        selectedCpn.props.joiningTable.select_root[k]
      ),
      field_name: k,
    });
  }

  const value_fields = key_fields;
  const [newChart, setNewChart] = useState(current2);
  const [selectedChart, setSelectedChart] = useState([]);
  const [sectionChart, setSectionChart] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  const [showChart, setShowChart] = useState(false);

  const handleShowChart = () => {
    setShowChart(!showChart);
  };

  const handleClick = () => {
    const newChartState = [...newChart];
    newChartState.push({
      id: getFormatedUUID(),
      type: "VerticalLineChart",
      sections: [{ id: getFormatedUUID(), section: {} }],
    });

    setNewChart(newChartState);
    setSelectedChart((prev) => [...prev, ""]);
  };
  const handleRemoveChart = (index) => {
    // Tạo bản sao của mảng newChart
    const updatedCharts = [...newChart];
    // Xóa chart tại vị trí index
    updatedCharts.splice(index, 1);
    // Cập nhật state newChart với mảng mới
    setNewChart(updatedCharts);
    // Cập nhật state selectedChart
    const updatedSelectedChart = [...selectedChart];
    updatedSelectedChart.splice(index, 1);
    setSelectedChart(updatedSelectedChart);
  };
  const handleChartChange = (chart, index) => {
    setSelectedChart((prev) => {
      const updatedSelectedChart = [...prev];
      updatedSelectedChart[index] = chart;
      setNewChart((prev) => {
        const updatedNewChart = [...prev];
        // if(chart)
        updatedNewChart[index].type = chart;
        return updatedNewChart;
      });
      return updatedSelectedChart;
    });
  };
  const handleAddSection = (index) => {
    setNewChart((prev) => {
      const updatedNewChart = [...prev];
      if (!updatedNewChart[index].sections) {
        updatedNewChart[index] = {
          ...updatedNewChart[index],
          sections: [{ id: getFormatedUUID(), section: {} }],
        };
      } else {
        updatedNewChart[index].sections = [
          ...updatedNewChart[index].sections,
          { id: getFormatedUUID(), section: {} },
        ];
      }
      return updatedNewChart;
    });

    setSectionChart((prev) => {
      const newSection = [...prev];
      if (!newSection[index]) {
        newSection[index] = [{ id: getFormatedUUID(), sections: {} }];
      } else {
        newSection[index] = [
          ...newSection[index],
          { id: getFormatedUUID(), sections: {} },
        ];
      }
      return newSection;
    });
  };
  // xóa 1 section: key và values
  const handleRemoveSection = (index, sectionIndex) => {
    setNewChart((prev) => {
      const updatedNewChart = [...prev];
      if (updatedNewChart[index].sections) {
        updatedNewChart[index].sections = updatedNewChart[
          index
        ].sections.filter((_, i) => i !== sectionIndex);
      }
      return updatedNewChart;
    });

    setSectionChart((prev) => {
      const updatedSectionChart = [...prev];
      if (updatedSectionChart[index]) {
        updatedSectionChart[index] = updatedSectionChart[index].filter(
          (_, i) => i !== sectionIndex
        );
      }
      return updatedSectionChart;
    });
  };
  // hàm cập nhật key
  const handleUpdateKey = ({ value, ic, is }) => {
    // console.log("id", ic, is);
    setNewChart((prev) => {
      const updatedNewChart = [...prev];
      if (updatedNewChart[ic].sections) {
        updatedNewChart[ic].sections[is] = {
          ...updatedNewChart[ic].sections[is],
          section: {
            ...updatedNewChart[ic].sections[is].section,
            keys: value,
          },
        };
      }
      return updatedNewChart;
    });
  };
  // hàm cập nhật values
  const handleUpdateValues = async ({ ic, is }) => {
    setNewChart((prev) => {
      const updatedNewChart = [...prev];
      if (!updatedNewChart[ic].sections[is].section.values) {
        updatedNewChart[ic].sections[is].section = {
          ...updatedNewChart[ic].sections[is].section,
          values: [{ id: getFormatedUUID(), value: {} }],
        };
      } else {
        updatedNewChart[ic].sections[is].section = {
          ...updatedNewChart[ic].sections[is].section,
          values: updatedNewChart[ic].sections[is].section.values.concat({
            id: getFormatedUUID(),
            value: {},
          }),
        };
      }
      return updatedNewChart;
    });
  };
  useEffect(() => {
    setNewChart(current2);
  }, [current2]);

  useEffect(() => {
    if (newChart.length > 0) {
      setShowChart(true);
    }
    updateSelectedComponent(newChart, splittedPath);
  }, [newChart]);
  // hiện ra
  return !selectedCpn?.props?.field?.length ? (
    <div style={{ padding: "1rem" }}>
      <div className="c-chart p-0">
        <div
          className={` ${
            showChart ? "chart-header p-0" : "chart-header-of p-0"
          }  d-flex flex-warp`}
        >
          <div
            className="chart-label "
            style={{ margin: "10px 8px" }}
            onClick={handleShowChart}
          >
            <FontAwesomeIcon
              icon={showChart ? faAngleUp : faAngleRight}
              className="me-2"
            />
            {label}{" "}
          </div>
          <div className="incon-plus-chart ms-auto">
            <FontAwesomeIcon
              className=""
              icon={faCirclePlus}
              onClick={handleClick}
            />
          </div>
        </div>
        {showChart && (
          <div className="fields-picker ">
            <ComponentChart
              newChart={newChart}
              selectedChart={selectedChart}
              setSelectedValues={setSelectedValues}
              setNewChart={setNewChart}
              key_fields={key_fields}
              value_fields={value_fields}
              handleUpdateKey={handleUpdateKey}
              handleUpdateValues={handleUpdateValues}
              onChartChange={handleChartChange}
              handleRemoveChart={handleRemoveChart}
              handleAddSection={handleAddSection}
              handleSectionRemove={handleRemoveSection}
            />
          </div>
        )}
        {/* <div className="p-2">
          <SelectContainer
            label={"Select Root"}
            default_value={select_root}
            component_id={id}
            onChange={(value) => {
              const obj = ConvertStringToObject(value);
              setSelect_root(obj);
              console.log("ON CHANGE SELECT", obj);
              handleUpdateComponent("select_root", obj);
            }}
          />
        </div> */}
      </div>
    </div>
  ) : null;
};
// const SelectChartTypes = (props) => {
//   const {
//     label,
//     path,
//     namePath,
//     getPropByPath,
//     updateSelectedComponent,
//     selectedCpn,
//   } = props;

//   const splittedPath = path.split(".");
//   const { getFormatedUUID } = functions;
//   const current = getPropByPath(splittedPath, selectedCpn) || {};
//   const [isCollapse, setIsCollapse] = useState(false);
//   // const key_fields = [
//   //   ...(selectedCpn?.props?.field || []),
//   //   ...(selectedCpn?.props?.source?.calculates.map(
//   //     ({ fomular_alias, id, display_name }) => ({
//   //       id,
//   //       fomular_alias,
//   //       field_name: display_name,
//   //     })
//   //   ) || []),
//   // ];
//   const key_fields = [];
//   for (const k in selectedCpn?.props?.joiningTable?.select_root) {
//     key_fields.push({
//       id: Math.random(),
//       fomular_alias: JSON.stringify(
//         selectedCpn.props.joiningTable.select_root[k]
//       ),
//       field_name: k,
//     });
//   }

//   const value_fields = key_fields;

//   const [charts, setCharts] = useState(current);

//   const handleValues = ({ chart_key, list_index, id, type, value }) => {
//     setCharts((prev) => {
//       const newCharts = { ...prev };
//       newCharts[chart_key][list_index] = newCharts[chart_key][list_index].map(
//         (oldChart) => {
//           if (oldChart.id === id) {
//             let values = oldChart.values;

//             switch (type) {
//               case "add":
//                 values.push({
//                   id: getFormatedUUID(),
//                   value: "",
//                 });
//                 break;
//               case "delete":
//                 values = values.filter((i) => i.id !== value.id);
//                 break;
//               case "update":
//                 values = values.map((item) => {
//                   if (item.id === value.id) {
//                     return value;
//                   }
//                   return item;
//                 });

//                 break;
//               default:
//                 break;
//             }

//             return {
//               ...oldChart,
//               values,
//             };
//           }
//           return oldChart;
//         }
//       );

//       return newCharts;
//     });
//   };

//   const handleUpdateKey = ({ value, id, chart_key, list_index }) => {
//     setCharts((prev) => {
//       const newCharts = { ...prev };
//       newCharts[chart_key][list_index] = newCharts[chart_key][list_index].map(
//         (oldChart) => {
//           if (oldChart.id === id) {
//             return {
//               ...oldChart,
//               key: value,
//             };
//           }
//           return oldChart;
//         }
//       );

//       return newCharts;
//     });
//   };

//   useEffect(() => {
//     setCharts(current);
//   }, [current]);

//   useEffect(() => {
//     updateSelectedComponent(charts, splittedPath);
//   }, [charts]);
//   //charts
//   return !selectedCpn?.props?.field?.length ? (
//     <div style={{ padding: "1rem" }}>
//       <div className="label-box mb-2">
//         {label} <FontAwesomeIcon className="ml-1" icon={faCaretRight} />
//       </div>
//       <div className="fields-picker">
//         {ChartTypes.map(({ key, value }) => (
//           <div class="form-check" value={key}>
//             <input
//               class="form-check-input"
//               type="checkbox"
//               value={key}
//               checked={charts[key] ? true : false}
//               onChange={({ target: { checked } }) => {
//                 setCharts((prev) => {
//                   const newCharts = { ...prev };
//                   if (!checked) {
//                     delete newCharts[key];
//                   } else {
//                     newCharts[key] = [];
//                   }
//                   return newCharts;
//                 });
//               }}
//               id={key}
//             />
//             <section>
//               <label class="form-check-label" for={key}>
//                 {value}
//               </label>
//               {charts[key] ? (
//                 <>
//                   <FontAwesomeIcon
//                     className="ml-2"
//                     icon={faCirclePlus}
//                     onClick={() => {
//                       setCharts((prev) => {
//                         const newCharts = { ...prev };
//                         newCharts[key].push([
//                           {
//                             id: getFormatedUUID(),
//                             key: "",
//                             values: [],
//                           },
//                         ]);
//                         return newCharts;
//                       });
//                     }}
//                   />
//                 </>
//               ) : null}
//             </section>
//             {charts[key]?.map((list = [], index) => (
//               <section key={index}>
//                 <div className="label-box">Chart: {index}</div>
//                 <FontAwesomeIcon
//                   icon={faCirclePlus}
//                   onClick={() => {
//                     setCharts((prev) => {
//                       const newCharts = { ...prev };
//                       newCharts[key][index].push({
//                         id: getFormatedUUID(),
//                         key: "",
//                         values: [],
//                       });
//                       return newCharts;
//                     });
//                   }}
//                 />
//                 {list.map((chart) => {
//                   return (
//                     <section
//                       style={{
//                         border: "1px solid #ccc",
//                         marginBottom: "10px",
//                         padding: "5px",
//                         borderRadius: "3%",
//                       }}
//                     >
//                       <section>
//                         <div className="lable-box mt-2">Key: </div>
//                         <CreatableSelect
//                           isClearable
//                           value={chart.key}
//                           onChange={(option) => {
//                             handleUpdateKey({
//                               value: option,
//                               chart_key: key,
//                               list_index: index,
//                               id: chart.id,
//                             });
//                           }}
//                           options={key_fields.reduce(
//                             (prev, { id, fomular_alias, field_name }) => {
//                               if (!id) {
//                                 return prev;
//                               }
//                               return [
//                                 ...prev,
//                                 {
//                                   label: `${field_name}-${fomular_alias}`,
//                                   value: `$${field_name}`,
//                                 },
//                               ];
//                             },
//                             []
//                           )}
//                         />
//                       </section>
//                       <section>
//                         <div className="label-box mt-2">Values: </div>

//                         {chart?.values?.map((v) => (
//                           <select
//                             className="form-control mt-2"
//                             onChange={({ target: { value } }) => {
//                               handleValues({
//                                 chart_key: key,
//                                 list_index: index,
//                                 id: chart.id,
//                                 type: "update",
//                                 value: { ...v, value },
//                               });
//                             }}
//                             key={v.id}
//                           >
//                             <option selected disabled></option>
//                             {value_fields.map(
//                               ({ id, fomular_alias, field_name }) => {
//                                 if (!id) {
//                                   return null;
//                                 }
//                                 return (
//                                   <option
//                                     value={field_name}
//                                     selected={
//                                       field_name === v.value ? true : false
//                                     }
//                                   >
//                                     {field_name}-{fomular_alias}
//                                   </option>
//                                 );
//                               }
//                             )}
//                           </select>
//                         ))}

//                         <FontAwesomeIcon
//                           icon={faCirclePlus}
//                           onClick={() => {
//                             handleValues({
//                               chart_key: key,
//                               id: chart.id,
//                               list_index: index,
//                               type: "add",
//                               value: "",
//                             });
//                           }}
//                         />
//                       </section>
//                     </section>
//                   );
//                 })}
//               </section>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   ) : null;
// };
const SelectTable = (props) => {
  const {
    label,
    path,

    getPropByPath,
    updateSelectedComponent,
    selectedCpn,

    index,
    display_value,

    childOf,
    areParentActive,
  } = props;

  const { tables } = useSelector((state) => state);

  const splittedPath = path.split(".");
  const currentValue = getPropByPath(splittedPath, selectedCpn);
  const [drop, setDrop] = useState(false);

  const options = tables;

  if (areParentActive(childOf)) {
    return (
      <div className="property" style={{ zIndex: index }}>
        <div className="label-box">
          <span>{label}</span>
        </div>
        <div className={`drop-box`}>
          <div
            className="content-container"
            onClick={() => {
              setDrop(!drop);
            }}
          >
            <div className="content">
              <span>{currentValue?.[display_value]}</span>
            </div>
            <div className="caret">
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
          <div
            className="options-container"
            style={{ display: drop ? "block" : "none" }}
          >
            <div className="options">
              {options.map((opt) => (
                <div
                  className="option"
                  onClick={() => {
                    updateSelectedComponent(opt, splittedPath);
                    setDrop(false);
                  }}
                >
                  <span>{opt[display_value]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const TableFieldsPicker = (props) => {
  const {
    path,
    label,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    tablespath,
    index,
  } = props;
  const splittedPath = path.split(".");

  const currentValue = getPropByPath(splittedPath, selectedCpn);
  const fomularAliases = currentValue.map((f) => f.fomular_alias);

  const tables = getPropByPath(tablespath.split("."), selectedCpn);
  const [isCollapse, setIsCollapse] = useState({});

  // thinh now
  const fieldSelectOrNot = (field) => {
    const isFieldSelected = currentValue.find(
      (f) => f.fomular_alias == field.fomular_alias
    );
    // thinh them hoac xoa khi check hoac uncheck trong fieldSelectOrNot vao truong prevFieldsAndCalculates
    let prevFieldsAndCalculates =
      selectedCpn?.props?.source?.display_fields || [];
    const itemIndex = prevFieldsAndCalculates?.indexOf(field);
    console.log("this is prevFieldsAndCalculates", itemIndex);
    let newFieldsAndCalculates = prevFieldsAndCalculates;
    if (isFieldSelected) {
      newFieldsAndCalculates = prevFieldsAndCalculates.filter(
        (f) => f.fomular_alias != field.fomular_alias
      );
      // prevFieldsAndCalculates.splice(itemIndex+1, 1);
    } else {
      if (field) {
        newFieldsAndCalculates.push(field);
      }
    }
    updateSelectedComponent(newFieldsAndCalculates, [
      "props",
      "source",
      "display_fields",
    ]);

    let newValues = currentValue;
    if (isFieldSelected) {
      newValues = currentValue.filter(
        (f) => f.fomular_alias != field.fomular_alias
      );
    } else {
      newValues.push(field);
    }

    updateSelectedComponent(newValues, splittedPath);
  };

  const handleChangeDisplayName = (field, value) => {
    const newFields = [...currentValue];
    const field_selected = newFields.find(
      (f) => f.fomular_alias == field.fomular_alias
    );

    if (field_selected) {
      field_selected["DISPLAY_NAME"] = value;
    }

    updateSelectedComponent(newFields, splittedPath);
  };

  const handleCollapse = (id) => {
    setIsCollapse((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <div className="property">
        {tables.length > 0 && (
          <div className="">
            <span>{label}</span>
          </div>
        )}
      </div>
      <div className="property" style={{ zIndex: index }}>
        <div className={"fields-picker"}>
          {tables.map((tb) => (
            <div className="table-fields-picker">
              <div
                className="fields-picker-header"
                onClick={() => {
                  handleCollapse(tb.id);
                }}
              >
                {/* ten bang thinh now */}
                <span>{tb.table_name}</span>
              </div>
              {isCollapse[tb.id] && (
                <div className="picker-field-list">
                  {tb.fields?.map((field) => (
                    <div className="field-picker">
                      <div className="picker-checkbox">
                        <input
                          type="checkbox"
                          checked={
                            fomularAliases.indexOf(field.fomular_alias) != -1
                          }
                          onClick={() => {
                            fieldSelectOrNot(field);
                          }}
                        />
                        {/* here */}
                      </div>

                      <div className="picker-label">
                        <span>
                          {field.field_name} - {field.fomular_alias}
                        </span>
                        <input
                          className="form-control"
                          type="text"
                          placeholder={field.DISPLAY_NAME}
                          defaultValue={field.DISPLAY_NAME}
                          onChange={({ target: { value } }) => {
                            handleChangeDisplayName(field, value);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SelectCriteria = (props) => {
  const {
    path,
    label,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    tablespath,
    index,
  } = props;
  const splittedPath = path.split(".");

  const currentValue = getPropByPath(splittedPath, selectedCpn);
  const fomularAliases = currentValue.map((f) => f.fomular_alias);
  const [criteria, setCriteria] = useState(currentValue);
  const [showParameter, setShowParameter] = useState(false);

  useEffect(() => {
    setCriteria(currentValue);
  }, [selectedCpn]);

  const { tables } = useSelector((s) => s);
  // Nhu ham dong mo
  const handleShowParameter = () => {
    setShowParameter(!showParameter);
  };
  const handleChangeDisplayName = (field, value) => {
    const newFields = [...currentValue];
    const field_selected = newFields.find(
      (f) => f.fomular_alias == field.fomular_alias
    );

    if (field_selected) {
      field_selected["DISPLAY_NAME"] = value;
    }

    updateSelectedComponent(newFields, splittedPath);
  };

  const handleChangeCriteria = (tables, value, key, table) => {
    setCriteria((prev) => {
      const index = prev.findIndex((item) => item.key === key);
      if (index > -1) {
        prev[index].tables[table] = value;
      } else {
        prev.push({
          key,
          tables: {
            [table]: value,
          },
        });
      }
      updateSelectedComponent(prev, splittedPath);
      return prev;
    });
  };

  const handleRenderingByMappedTables = () => {
    const children = [];
    selectedCpn.props?.joiningTable?.tables?.map((table) => {
      const select_children = [];
      const key = `${table.left_table}-${table.right_table}`;
      tables.map((t) => {
        if (
          t.table_alias === table.left_table ||
          t.table_alias === table.right_table
        ) {
          const defaultValue =
            criteria
              .find((param) => param.key === key)
              ?.tables?.[t.table_alias]?.map(
                ({ field_name, fomular_alias }) => ({
                  label: `${field_name}-${fomular_alias}`,
                  value: fomular_alias,
                })
              ) || [];

          select_children.push(
            <section>
              <label>{t.table_alias}</label>
              <Select
                value={defaultValue}
                isMulti
                onChange={(option) => {
                  const mapped_option = [];
                  t.fields.map((field) => {
                    if (option.find((i) => i.value === field.fomular_alias)) {
                      mapped_option.push(field);
                    }
                  });

                  handleChangeCriteria(
                    currentValue,
                    mapped_option,
                    key,
                    t.table_alias
                  );
                }}
                options={t.fields.reduce((prev, field) => {
                  const { field_name, id, fomular_alias } = field;
                  if (!id) {
                    return prev;
                  }
                  return [
                    ...prev,
                    {
                      label: `${field_name}-${fomular_alias}`,
                      value: fomular_alias,
                    },
                  ];
                }, [])}
              />
            </section>
          );
        }
      });

      children.push(
        <section className="p-2">
          <label>
            Bảng: {table.left_table}-{table.right_table}
          </label>
          {select_children}
        </section>
      );
    });

    return (
      <div className="padding-1rem">
        <div className="c-chart p-0" style={{ zIndex: index }}>
          <div className={"fields-picker "}>
            <div
              className={` ${
                showParameter ? "chart-header pb-2" : "chart-header-of"
              }`}
              onClick={handleShowParameter}
            >
              {" "}
              <div className="chart-label ">
                <FontAwesomeIcon
                  icon={showParameter ? faAngleUp : faAngleRight}
                  className="me-2"
                />
                <span>{label}</span>
              </div>
            </div>
            {showParameter && <div> {children}</div>}
          </div>
        </div>
      </div>
    );
  };

  return <div>{handleRenderingByMappedTables()}</div>;
};

const SingularTableFieldsPicker = (props) => {
  const {
    path,

    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    tablepath,
    index,
  } = props;
  const splittedPath = path.split(".");

  const dispatch = useDispatch();

  const [tables, setTables] = useState([]);

  const currentValue = getPropByPath(splittedPath, selectedCpn);
  const fomularAliases = currentValue.map((f) => f.fomular_alias);
  const table = getPropByPath(tablepath.split("."), selectedCpn);

  useEffect(() => {
    if (table) {
      setTables([table]);
    }
  }, [table]);

  const fieldSelectOrNot = (field) => {
    const isFieldSelected = currentValue.find(
      (f) => f.fomular_alias == field.fomular_alias
    );

    let newValues = currentValue;
    if (isFieldSelected) {
      newValues = currentValue.filter(
        (f) => f.fomular_alias != field.fomular_alias
      );

      /**
       *  Remove coresponding component
       */

      const componentAboutToBeRemoved = selectedCpn.children?.find(
        (cpn) => cpn.field_id == field.id
      );
      if (componentAboutToBeRemoved) {
        dispatch({
          branch: "design-ui",
          type: "removeComponent",
          payload: {
            id: componentAboutToBeRemoved.id,
          },
        });
      }
    } else {
      /**
       *  Add component
       */

      dispatch({
        branch: "design-ui",
        type: "addFormField",
        payload: {
          form_id: selectedCpn.id,
          field,
        },
      });
      newValues.push(field);
    }
    updateSelectedComponent(newValues, splittedPath);
  };

  return (
    <div className="" style={{ zIndex: index }}>
      <div className="accordion" id="accordionSingularTableFieldsPicker">
        {tables.map(
          (tb, i) =>
            tb.fields && (
              <div className="p-1">
                <div className="accordion-item accordion-item-chart " key={i}>
                  <h2
                    className="accordion-header "
                    id={`panelsStayOpen-headingChartSingularTableFieldsPicker${i}`}
                  >
                    <button
                      className="accordion-button accordion-button-left"
                      data-bs-toggle="collapse"
                      data-bs-target={`#panelsStayOpen-collapseSingularTableFieldsPicker${i}`}
                      aria-expanded={i === 0 ? "true" : "false"}
                      aria-controls={`panelsStayOpen-collapSingularTableFieldsPicker${i}`}
                      type="button"
                    >
                      <span>{tb.table_name}</span>
                    </button>
                  </h2>
                  <div
                    id={`panelsStayOpen-collapseSingularTableFieldsPicker${i}`}
                    className={`accordion-collapse collapse ${
                      i === 0 ? "show" : ""
                    }`}
                    aria-labelledby={`panelsStayOpen-headingChartSingularTableFieldsPicker${i}`}
                  >
                    <div className="accordion-body">
                      {tb.fields?.map((field) => (
                        <div className="field-picker d-flex align-items-center">
                          <div className="picker-checkbox mt-1 mr-3 ">
                            <input
                              type="checkbox"
                              checked={
                                fomularAliases.indexOf(field.fomular_alias) !=
                                -1
                              }
                              onClick={() => {
                                fieldSelectOrNot(field);
                              }}
                            />
                          </div>

                          <div className="picker-label">
                            <span>
                              {field.field_name} - {field.fomular_alias}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
    // <div className="property" style={{ zIndex: index }}>
    //   <div className={"fields-picker"}>
    //     {tables.map(
    //       (tb) =>
    //         tb.fields && (
    //           <div className="table-fields-picker">
    //             <div className="fields-picker-header">
    //               <span>{tb.table_name} </span>
    //             </div>
    //             <div className="picker-field-list">
    //               {tb.fields?.map((field) => (
    //                 <div className="field-picker">
    //                   <div className="picker-checkbox">
    //                     <input
    //                       type="checkbox"
    //                       checked={
    //                         fomularAliases.indexOf(field.fomular_alias) != -1
    //                       }
    //                       onClick={() => {
    //                         fieldSelectOrNot(field);
    //                       }}
    //                     />
    //                   </div>

    //                   <div className="picker-label">
    //                     <span>
    //                       {field.field_name} - {field.fomular_alias}
    //                     </span>
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         )
    //     )}
    //   </div>
    // </div>
  );
};

const TableCalculateFields = (props) => {
  const {
    path,
    label,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    tablespath,
    index,
  } = props;
  const { functions, proxy, lang } = useSelector((state) => state);
  const token = localStorage.getItem("_token");
  const splittedPath = path.split(".");
  const currentValue = getPropByPath(splittedPath, selectedCpn);
  const fomularAliases = currentValue.map((f) => f.fomular_alias);
  const [focusFieldId, setFocusField] = useState("");
  const { version_id } = useParams();
  //  Nhu code dong mo
  const [showTablecalculatefields, setShowTablecalculatefields] =
    useState(false);
  // const [list, setList] = useState(selectedCpn?.props?.source?.fields);
  // const [calculateList, setCalculateList] = useState(selectedCpn?.props?.source?.calculates);
  const [calculateList, setCalculateList] = useState(
    selectedCpn?.props?.source?.calculates
  );
  console.log("this is calculateList", calculateList);
  const [list, setList] = useState(selectedCpn?.props?.source?.fields);
  // const [calculateList, setCalculateList] = useState(calculates);

  // thinh gop 2 mang calculates and fields thanh 1 mang tong display_fields
  const fieldsAndCalculates = list?.concat(calculateList);
  // nay la goi du lieu va truyen ve "props", "source", "display_fields" neu chua co
  useEffect(() => {
    const test = selectedCpn?.props?.source?.display_fields;
    if (test) {
      return;
    }
    updateSelectedComponent(fieldsAndCalculates, [
      "props",
      "source",
      "display_fields",
    ]);
  }, []);
  // const table = getPropByPath(tablespath.split("."), selectedCpn);

  // useEffect(() => {
  //   if (table) {
  //     setTables([table]);
  //   }
  // }, [table]);
  // // can sua now
  // console.log("sdada", selectedCpn?.props?.source?.fields);

  // Nhu code ham hien
  const handleShowTablecalculatefields = () => {
    setShowTablecalculatefields(!showTablecalculatefields);
  };
  const makeCloneField = () => {
    const newCalculate = {
      id: functions.getFormatedUUID(),
      display_name: "",
      fomular_alias: "",
      fomula: "",
      DATATYPE: "",
      checked: false,
    };

    updateSelectedComponent([...currentValue, newCalculate], splittedPath);
  };

  const fieldChangeName = (field, newName) => {
    const fields = currentValue;
    const newFields = fields.map((f) => {
      if (f.id == field.id) {
        f.display_name = newName;
      }
      return f;
    });

    updateSelectedComponent(newFields, splittedPath);
    // updateSelectedComponent([...newFields], ['props', 'source', 'fields']);
  };

  const fieldChangeFomular = (field, fomular) => {
    const fields = currentValue;
    const newFields = fields.map((f) => {
      if (f.id == field.id) {
        f.fomular = fomular;
      }
      return f;
    });

    updateSelectedComponent(newFields, splittedPath);
  };

  const isFieldFocused = (id) => {
    return id == focusFieldId;
  };

  const recordFocusing = (field) => {
    const { id } = field;
    setFocusField(id);
  };

  const regenerateAlias = async (field) => {
    let display_name = field.display_name;

    if (!display_name || display_name.length == 0) {
      display_name = "Trường mới";
      fieldChangeName(field, display_name);
    }

    const response = await fetch(`${proxy}/apis/make/alias`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ version_id, field_name: display_name }),
    });
    const data = await response.json();
    const alias = data.alias;
    const newFields = currentValue.map((f) => {
      if (f.id == field.id) {
        f.fomular_alias = alias;
      }
      return f;
    });
    // setSelectedItems(newFields)
    console.log("newFields", newFields);

    updateSelectedComponent(newFields, splittedPath);
    // updateSelectedComponent(newFields, ["props", "source", "fields"]);
  };

  // const fieldSelectOrNot = (e, field) => {
  //   let prev = list;
  //   let itemIndex = prev.indexOf(field);

  //   if (itemIndex !== -1) {
  //     prev.splice(itemIndex, 1);
  //   } else {
  //     prev.push(field);
  //   }
  //   setList(prev);
  //   console.log("sass", prev);
  //   updateSelectedComponent(prev, ["props", "source", "fields"]);
  // };

  // thinh viet ham check box cho calculate
  const calculateSelectOrNot = (field) => {
    // let itemIndex = prev.indexOf(field);

    // if (itemIndex !== -1) {
    //   prev.splice(itemIndex, 1);
    // } else {
    //   prev.push(field);
    // }
    // move index display_fields
    // let itemIndex = prev.indexOf(field);
    // prev.splice(itemIndex, 1)
    // prev.push(field);
    // console.log("this is itemIndex",itemIndex);
    // end move index
    // updateSelectedComponent(display_fields, ["props", "source", "display_fields"]);
    // const [display_fields, setCalculateList] = useState(selectedCpn?.props?.source?.display_fields);
    // const isFieldSelected = currentValue.find(
    //   (f) => f.fomular_alias == field.fomular_alias
    // );

    // thinh them truong hop xoa trong prevFieldsAndCalculates cua calculateSelectOrNot
    let prevFieldsAndCalculates =
      selectedCpn?.props?.source?.display_fields || [];
    const itemIndex = prevFieldsAndCalculates?.indexOf(field);
    console.log("this is prevFieldsAndCalculates", itemIndex);
    let newFieldsAndCalculates = prevFieldsAndCalculates;
    if (field.checked === true) {
      newFieldsAndCalculates = prevFieldsAndCalculates.filter(
        (f) => f.fomular_alias != field.fomular_alias
      );
      // prevFieldsAndCalculates.splice(itemIndex+1, 1);
    } else {
      if (field) {
        newFieldsAndCalculates.push(field);
      }
    }
    updateSelectedComponent(newFieldsAndCalculates, [
      "props",
      "source",
      "display_fields",
    ]);

    console.log("this is currentValue", currentValue);
    let prev = currentValue;
    field.checked = !field.checked;

    setCalculateList(prev);
    console.log("sass", prev);
    updateSelectedComponent(prev, splittedPath);
  };
  // thinh them collapse
  const [isThisCollapse, setIsThisCollapse] = useState({});
  const handleThisCollapse = (id) => {
    setIsThisCollapse((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const removeField = (field) => {
    // thinh them truong hop xoa trong prevFieldsAndCalculates
    let prevFieldsAndCalculates = selectedCpn?.props?.source?.display_fields;
    let newFieldsAndCalculates = prevFieldsAndCalculates;
    newFieldsAndCalculates = prevFieldsAndCalculates.filter((f) => {
      return f.fomular_alias != field.fomular_alias;
    });

    updateSelectedComponent(newFieldsAndCalculates, [
      "props",
      "source",
      "display_fields",
    ]);

    const fields = currentValue;
    const newFields = fields.filter((f) => {
      return f.fomular_alias != field.fomular_alias;
    });

    // updateSelectedComponent(newFields, ["props", "source", "fields"]);
    updateSelectedComponent(newFields, splittedPath);
  };
  //Nhu oce useEffect
  useEffect(() => {
    if (currentValue.length > 0) {
      setShowTablecalculatefields(true);
    }
  }, [currentValue.length]);

  return (
    <div className="padding-1rem" style={{ zIndex: index }}>
      <div className="c-chart p-0">
        <div
          className={` ${
            showTablecalculatefields ? "chart-header" : "chart-header-of p-0"
          }  d-flex flex-warp`}
        >
          <div
            className="chart-label m-2"
            onClick={handleShowTablecalculatefields}
          >
            <FontAwesomeIcon
              icon={showTablecalculatefields ? faAngleUp : faAngleRight}
              className="me-2"
            />
            {lang[label] || label}{" "}
          </div>
          <div className="incon-plus-chart ms-auto">
            <div className="add-icon" onClick={makeCloneField}>
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
          </div>
        </div>
        {showTablecalculatefields && (
          <div className={"fields-picker"}>
            {/* <div className="fields-picker-header">
            <span>{label}</span>
            <div className="add-icon" onClick={makeCloneField}>
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
          </div> */}
            <div className="accordion" id="accordionExample">
              <div className="dynamic-field-list">
                <table>
                  {/* thinh this is where to fix */}

                  {/* <thead className="field-record">
                    <th>1</th>
                    <th className="record-prop display-name m-0 p-1">
                      Tên hiển thị
                    </th>
                    <th className="record-prop fomular-alias m-0 p-1">
                      Bí danh
                    </th>
                    <th className="record-prop fomular m-0 p-1">
                      Công thức tính
                    </th>
                    <th className="trash"></th>
                  </thead> */}
                  <tbody>
                    {currentValue.map((field, i) => (
                      <div className="p-1">
                        <div className="accordion-item accordion-item-chart ">
                          <h2
                            className="accordion-header"
                            onClick={() => {
                              handleThisCollapse(field.id);
                            }}
                            id={`panelsThis1StayOpen-headingChart${i}`}
                            style={{ position: "relative" }}
                          >
                            <button
                              className="accordion-button accordion-button-left align-items-center"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#panelsThis1StayOpen-collapse${i}`}
                              aria-expanded={i === 0 ? "true" : "false"}
                              aria-controls={`panelsThis1StayOpen-collapse${i}`}
                            >
                              <span className="ml-4">
                                {field.display_name ||
                                  field.field_name ||
                                  `Trường ${i + 1}`}{" "}
                              </span>

                              <div className="accordion-button-right d-flex">
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  style={{
                                    // color: "#FFFAB3",
                                    color: "#07575b",
                                    fontSize: "18px",
                                  }}
                                  onClick={() => {
                                    removeField(field);
                                  }}
                                />
                              </div>
                            </button>
                          </h2>
                          <div
                            id={`panelsThis1StayOpen-collapse${i}`}
                            className={`accordion-collapse collapse ${
                              i === 0 ? "show" : ""
                            }`}
                            aria-labelledby={`panelsThis1StayOpen-headingChart${i}`}
                          >
                            <div className="accordion-body p-0">
                              <tr
                                className={`field-record ${
                                  isFieldFocused(field.id) && "field-focus"
                                }`}
                                onClick={() => {
                                  recordFocusing(field);
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                  }}
                                >
                                  <th className="d-flex m-2 p-1">
                                    <div
                                      style={{
                                        width: "100px",
                                        marginTop: "4px",
                                      }}
                                      className="w-100px"
                                    >
                                      Tên hiển thị
                                    </div>
                                    <div className="record-prop ml-1">
                                      <input
                                        type="text"
                                        onBlur={() => {
                                          regenerateAlias(field);
                                        }}
                                        onChange={(e) => {
                                          fieldChangeName(
                                            field,
                                            e.target.value
                                          );
                                        }}
                                        value={
                                          field.display_name || field.field_name
                                        }
                                      />
                                    </div>
                                  </th>
                                  <th className="d-flex m-2 p-1">
                                    <div
                                      style={{
                                        width: "100px",
                                        marginTop: "4px",
                                      }}
                                    >
                                      Bí danh
                                    </div>
                                    <div className="record-prop ml-1">
                                      <td>
                                        <span>{field.fomular_alias}</span>
                                      </td>
                                    </div>
                                  </th>
                                  <th className="d-flex m-2 p-1">
                                    <div
                                      style={{
                                        width: "100px",
                                        marginTop: "4px",
                                      }}
                                    >
                                      Công thức tính
                                    </div>
                                    <div className="record-prop ml-1">
                                      <input
                                        type="text"
                                        onChange={(e) => {
                                          fieldChangeFomular(
                                            field,
                                            e.target.value
                                          );
                                        }}
                                        value={field.fomular}
                                      />
                                    </div>
                                  </th>
                                </div>
                                {/* thinh them phan check box o day, goi ham calculateSelectOrNot va check xem checked is true or not */}
                                {/* <td>
                                  <div className="picker-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={field.checked === true}
                                      onClick={() => {
                                        calculateSelectOrNot(field);
                                      }}
                                    />
                                   
                                  </div>
                                </td> */}
                                <td className="record-prop">
                                  {/* <input
                        type="checkbox"
                        // checked={
                        //   fomularAliases.indexOf(field.fomular_alias) != -1
                        // }
                        // checked={initialList[field] ? false : true}
                        checked={list.includes(field)}
                        onClick={() => {
                          fieldSelectOrNot(field);
                        }}
                      /> */}
                                </td>
                                {/* <td
                                  className="trash"
                                  onClick={() => {
                                    removeField(field);
                                  }}
                                >
                                  {isFieldFocused(field.id) && (
                                    <FontAwesomeIcon icon={faTrash} />
                                  )}
                                </td> */}
                              </tr>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PrimaryTableOnlyBool = (props) => {
  const {
    label,
    path,
    tablesPath,
    data,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
    fields,
    display_value,
    childOf,
    areParentActive,
  } = props;

  const splittedPath = path.split(".");
  const splittedTablesPath = tablesPath.split(".");
  const splittedFieldsPath = data.split(".");

  const currentTables = getPropByPath(splittedTablesPath, selectedCpn);
  const currentFields = getPropByPath(splittedFieldsPath, selectedCpn);

  const currentValue = getPropByPath(splittedPath, selectedCpn);

  const [drop, setDrop] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const options = getPropByPath(data.split("."), selectedCpn);

    const firstTable = currentTables[0];
    if (firstTable) {
      const filtedOptions = options.filter(
        (opt) => opt.table_id == firstTable.id
      );
      const boolFields = filtedOptions.filter(
        (opt) => opt.props.DATATYPE == "BOOL"
      );
      setOptions(boolFields);
    }
  }, [JSON.stringify(currentTables), JSON.stringify(currentFields)]);

  const formatObjectByFields = (opt) => {
    const clone = {};
    for (let i = 0; i < fields.length; i++) {
      const { from, to } = fields[i];
      clone[to] = opt[from];
    }
    return clone;
  };
  if (areParentActive(childOf)) {
    return (
      <div className="property" style={{ zIndex: index }}>
        <div className="label-box">
          <span>{label}</span>
        </div>
        <div className={`drop-box`}>
          <div
            className="content-container"
            onClick={() => {
              setDrop(!drop);
            }}
          >
            <div className="content">
              <span>{currentValue?.[display_value]}</span>
            </div>
            <div className="caret">
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
          <div
            className="options-container"
            style={{ display: drop ? "block" : "none" }}
          >
            <div className="options">
              {options.map((opt) => (
                <div
                  className="option"
                  onClick={() => {
                    updateSelectedComponent(
                      formatObjectByFields(opt),
                      splittedPath
                    );
                    setDrop(false);
                  }}
                >
                  <span>{opt[display_value]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const MethodTypes = [
  {
    key: "SELECT",
    value: "SELECT",
  },
  {
    key: "COUNT",
    value: "COUNT",
  },
  {
    key: "SUM",
    value: "SUM",
  },
  {
    key: "AVERAGE",
    value: "AVERAGE",
  },
];

const ChartTypes = [
  {
    key: "VerticalLineChart",
    value: "Vertical Line Chart",
  },

  {
    key: "HorizontalLineChart",
    value: "Horizontal Line Chart",
  },
  {
    key: "CircleChart",
    value: "Circle Chart",
  },
];

const SingleFieldSelection = (props) => {
  const {
    path,
    data,

    label,

    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
  } = props;

  const tablespath = data;

  const splittedPath = path.split(".");

  const currentValue = Array.isArray(getPropByPath(splittedPath, selectedCpn))
    ? getPropByPath(splittedPath, selectedCpn)
    : [getPropByPath(splittedPath, selectedCpn)];

  const type_component = selectedCpn.name;
  const tables = getPropByPath(tablespath.split("."), selectedCpn);
  const [isCollapse, setIsCollapse] = useState({});
  const fieldSelectOrNot = (field) => {
    let isExist = false;
    let newFields = [...currentValue];

    newFields = currentValue.filter((prev) => {
      if (prev.id === field.id) {
        isExist = true;
        return false;
      }
      return true;
    });

    if (isExist === false) {
      field.METHOD_TYPE = "SELECT";
      newFields.push(field);
    }
    updateSelectedComponent(newFields, splittedPath);
  };

  const handleParams = (field, key, value) => {
    const newFields = currentValue.map((prev) => {
      if (prev.id === field.id) {
        return { ...prev, [key]: value };
      }
      return prev;
    });

    updateSelectedComponent(newFields, splittedPath);
  };

  const handleCollapse = (id) => {
    setIsCollapse((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <div className="property">
        {tables.length > 0 && (
          <div className="">
            <span>{label}</span>
          </div>
        )}
      </div>
      <div className="property" style={{ zIndex: index }}>
        <div className={"fields-picker"}>
          {tables.map((tb, i) => (
            <div className="table-fields-picker">
              <div
                className="fields-picker-header"
                onClick={() => {
                  handleCollapse(tb.id);
                }}
              >
                <span>{tb.table_name}</span>
              </div>
              {isCollapse[tb.id] && (
                <div className="picker-field-list">
                  {tb.fields?.map((field) => (
                    <section>
                      <div className="field-picker">
                        <div className="picker-checkbox">
                          <input
                            type="checkbox"
                            checked={
                              currentValue.find(
                                (item) =>
                                  item.fomular_alias === field.fomular_alias
                              )
                                ? true
                                : false
                            }
                            onClick={() => {
                              fieldSelectOrNot(field);
                            }}
                          />
                        </div>

                        <div className="picker-label">
                          <span>
                            {field.field_name} - {field.fomular_alias}
                          </span>
                        </div>
                      </div>
                      {currentValue.find(
                        (item, i) => item.fomular_alias === field.fomular_alias
                      ) ? (
                        <React.Fragment key={i}>
                          <section>
                            <div>Phép toán:</div>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              onChange={({ target: { value } }) => {
                                if (value) {
                                  handleParams(field, "METHOD_TYPE", value);
                                }
                              }}
                            >
                              <option disabled selected></option>
                              {MethodTypes.map(({ key, value }) => (
                                <option
                                  value={key}
                                  selected={
                                    currentValue.find(
                                      (item) =>
                                        item.fomular_alias ===
                                        field.fomular_alias
                                    )?.METHOD_TYPE === key
                                      ? true
                                      : false
                                  }
                                >
                                  {value}
                                </option>
                              ))}
                            </select>
                          </section>
                        </React.Fragment>
                      ) : null}
                    </section>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SelectParams = (props) => {
  const { page } = useSelector((state) => state);
  const [showParameterTable, setShowParameterTable] = useState(false);
  const { params } = page;

  const {
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,

    label,
    type,
    path,
    tablespath,
  } = props;

  const tables = getPropByPath(tablespath.split("."), selectedCpn);
  const fields = [];
  tables.map((tb) => {
    fields.push(...tb.fields);
  });

  const validParams = params;

  const currentValue = getPropByPath(path.split("."), selectedCpn);

  const isFieldPicked = (field) => {
    const selected = currentValue.find(
      (f) => f.fomular_alias == field.fomular_alias
    );
    return selected ? true : false;
  };
  const handleShowParameterTable = () => {
    setShowParameterTable(!showParameterTable);
  };
  const fieldSelectOrNot = (field) => {
    const isPicked = isFieldPicked(field);

    if (isPicked) {
      const newParamsSet = currentValue.filter(
        (p) => p.fomular_alias != field.fomular_alias
      );
      updateSelectedComponent(newParamsSet, path.split("."));
    } else {
      updateSelectedComponent([...currentValue, field], path.split("."));
    }
  };

  return (
    <div className="padding-1rem">
      {/* <div className="property">
        <div className="">
          <span>{label}</span>
        </div>
      </div> */}
      <div className="c-chart p-0" style={{ zIndex: index }}>
        <div className={"fields-picker"}>
          <div
            className={` ${
              showParameterTable ? "chart-header pb-2" : "chart-header-of"
            }`}
            onClick={handleShowParameterTable}
          >
            {" "}
            <div className="chart-label ">
              <FontAwesomeIcon
                icon={showParameterTable ? faAngleUp : faAngleRight}
                className="me-2"
              />
              <span>{label}</span>
            </div>
          </div>
          {/* <div className="table-fields-picker">
          </div> */}
          {showParameterTable && (
            <div className="p-2">
              {validParams?.map((field) => (
                <div className="field-picker">
                  <div className="picker-checkbox">
                    <input
                      type="checkbox"
                      checked={isFieldPicked(field)}
                      onClick={() => {
                        fieldSelectOrNot(field);
                      }}
                    />
                  </div>

                  <div className="picker-label">
                    <span>
                      {field.field_name} - {field.fomular_alias}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SelectPage = (props) => {
  const {
    index,
    label,
    path,
    fields,
    childOf,
    areParentActive,
    display_value,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
  } = props;

  const { pages } = useSelector((state) => state);

  const flatteningPages = (pages) => {
    /**
     * Ép dẹp cây component thành mảng các component cùng cấp
     */

    const cpns = [];
    for (let i = 0; i < pages.length; i++) {
      const { children } = pages[i];
      cpns.push({ ...pages[i] });
      if (children) {
        cpns.push(...flatteningPages(children));
      }
    }
    return cpns;
  };

  const splittedPath = path.split(".");
  const currentValue = getPropByPath(splittedPath, selectedCpn);
  const [drop, setDrop] = useState(false);

  const options = flatteningPages(pages);

  const formatObjectByFields = (opt) => {
    const clone = {};
    for (let i = 0; i < fields.length; i++) {
      const { from, to } = fields[i];
      clone[to] = opt[from];
    }
    console.log(clone);
    return clone;
  };
  if (areParentActive(childOf)) {
    return (
      <div className="property" style={{ zIndex: index }}>
        <div className="label-box">
          <span>{label}</span>
        </div>
        <div className={`drop-box`}>
          <div
            className="content-container"
            onClick={() => {
              setDrop(!drop);
            }}
          >
            <div className="content">
              <span>{currentValue?.[display_value]}</span>
            </div>
            <div className="caret">
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
          <div
            className="options-container"
            style={{ display: drop ? "block" : "none" }}
          >
            <div className="options">
              {options.map((opt) => (
                <div
                  className="option"
                  onClick={() => {
                    updateSelectedComponent(
                      formatObjectByFields(opt),
                      splittedPath
                    );
                    setDrop(false);
                  }}
                >
                  <span>{opt[display_value]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
const SelectDisplayField = (props) => {
  const { getPropByPath, selectedCpn, path, updateSelectedComponent } = props;
  const { foreign_fields = [] } = selectedCpn;
  const displayField = getPropByPath(path.split("."), selectedCpn);
  const [fields, setFields] = useState(displayField);

  useEffect(() => {
    setFields(displayField);
  }, [displayField]);

  const handleChangeDisplayField = (value) => {
    updateSelectedComponent(value, path.split("."));
  };

  return (
    <div className="property">
      <label className="label-box">Trường hiển thị</label>

      <div style={{ width: "60%" }}>
        <Select
          value={fields}
          isMulti
          name="colors"
          onChange={(value) => {
            handleChangeDisplayField(value);
          }}
          options={foreign_fields.map(({ id, field_name, fomular_alias }) => ({
            value: fomular_alias,
            label: `${field_name}-${fomular_alias}`,
          }))}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </div>
  );
};
const ShowParams = (props) => {
  const {
    path,
    label,

    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
  } = props;

  const params = getPropByPath(path.split("."), selectedCpn);

  return (
    <div className="property" style={{ zIndex: index }}>
      <div className="label-box">
        <span>{label}</span>
      </div>

      <div className="params-list">
        {params.map((p, index) => (
          <div className="param-record">
            <span>
              {index + 1}. {p.field_name} - {p.fomular_alias}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChooseSlave = (props) => {
  const {
    type,
    path,
    master,
    primary_key,
    display_value,
    fields,

    label,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
  } = props;

  const primaryKey = primary_key;

  const { tables, selectedCpns } = useSelector((state) => state);

  const parent = selectedCpns.find((cpn) => cpn.id == selectedCpn.parent_id);
  const [drop, setDrop] = useState(false);
  if (parent) {
    const parentTables = getPropByPath(master.split("."), parent);
    const primalTable = parentTables[0] || [];

    const slaveTables = tables.filter((tb) => {
      const { foreign_keys } = tb;
      const existedForeignKey = foreign_keys.find((key) => {
        const { table_id } = key;
        return table_id == primalTable.id;
      });
      return existedForeignKey;
    });

    const splittedPath = path.split(".");
    const currentValue = getPropByPath(splittedPath, selectedCpn);

    const formatObjectByFields = (opt) => {
      const clone = {};
      for (let i = 0; i < fields.length; i++) {
        const { from, to } = fields[i];
        clone[to] = opt[from];
      }
      return clone;
    };

    /**
     *
     * tìm tất cả bản phụ thuộc r chọn nó ở đây
     *
     */

    const clickTrigger = (opt) => {
      const { primary_key, fields } = primalTable;

      const pKey = primary_key[0];

      const primaryField = fields.find((f) => f.id == pKey);

      updateSelectedComponent(primaryField, primaryKey.split("."));
      setDrop(false);
      updateSelectedComponent(formatObjectByFields(opt), splittedPath);
    };

    return (
      <div className="property" style={{ zIndex: index }}>
        <div className="label-box">
          <span>{label}</span>
        </div>
        <div className={`drop-box`}>
          <div
            className="content-container"
            onClick={() => {
              setDrop(!drop);
            }}
          >
            <div className="content">
              <span>{currentValue?.[display_value]}</span>
            </div>
            <div className="caret">
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
          <div
            className="options-container"
            style={{ display: drop ? "block" : "none" }}
          >
            <div className="options">
              {slaveTables.map((opt) => (
                <div
                  className="option"
                  onClick={() => {
                    clickTrigger(opt);
                  }}
                >
                  <span>{opt[display_value]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return;
};

const ChooseMaster = (props) => {
  const {
    path,
    table_path,
    label,
    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    areParentActive,
    childOf,

    index,
  } = props;

  const display_value = "table_name";

  const { tables } = useSelector((state) => state);

  const splittedPath = path.split(".");
  const currentValue = getPropByPath(splittedPath, selectedCpn);
  const [drop, setDrop] = useState(false);

  const table = getPropByPath(table_path.split("."), selectedCpn);

  if (table && table.foreign_keys) {
    const { foreign_keys } = table;
    const refTableIds = foreign_keys.map((key) => key.table_id);

    const options = tables.filter(
      (table) => refTableIds.indexOf(table.id) != -1
    );

    if (areParentActive(childOf)) {
      return (
        <div className="property" style={{ zIndex: index }}>
          <div className="label-box">
            <span>{label}</span>
          </div>
          <div className={`drop-box`}>
            <div
              className="content-container"
              onClick={() => {
                setDrop(!drop);
              }}
            >
              <div className="content">
                <span>{currentValue?.[display_value]}</span>
              </div>
              <div className="caret">
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            </div>
            <div
              className="options-container"
              style={{ display: drop ? "block" : "none" }}
            >
              <div className="options">
                {options.map((opt) => (
                  <div
                    className="option"
                    onClick={() => {
                      updateSelectedComponent(opt, splittedPath);
                      setDrop(false);
                    }}
                  >
                    <span>{opt[display_value]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  return;
};

const ButtonChangeIcon = (props) => {
  const {
    label,
    path,

    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
  } = props;

  const dispatch = useDispatch();

  const { icons } = useSelector((state) => state);

  const splittedPath = path.split(".");
  const currentValue = getPropByPath(splittedPath, selectedCpn);

  const renderIcon = (icon) => {
    return icons[icon]?.icon;
  };

  const changeIconTrigger = () => {
    dispatch({
      branch: "floating-boxes",
      type: "floatingTrigger",
    });

    dispatch({
      branch: "floating-boxes",
      type: "setBoxType",
      payload: {
        type: "customButtonChangeIcon",
      },
    });
  };

  return (
    <div className="property" style={{ zIndex: index }}>
      <div className="label-box">
        <span>{label}</span>
      </div>
      <div className={`drop-box`}>
        <div className="icon-preview" onClick={changeIconTrigger}>
          <FontAwesomeIcon icon={renderIcon(currentValue)} />
        </div>
      </div>
    </div>
  );
};

const UpdateByCondition = (props) => {
  const {
    label,
    optionslabel,

    fieldPath,
    valuePath,
    masterTables,

    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
  } = props;

  const { tables, selectedCpns, proxy, lang } = useSelector((state) => state);
  const { getFormatedUUID } = functions;
  const parent = selectedCpns.find((cpn) => cpn.id == selectedCpn.parent_id);
  const currentFields = getPropByPath(fieldPath.split("."), selectedCpn);

  const customStyles = {
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
  };
  const currentConditionFields = getPropByPath(
    ["props", "condition_fields"],
    selectedCpn
  );
  const [fields, setFields] = useState(currentFields);
  const [conditionFields, setConditionFields] = useState(
    currentConditionFields
  );
  const [showUpdateByCondition, setShowUpdateByCondition] = useState(true);
  const [showUpdateFields, setShowUpdateFields] = useState(false);
  const [showConditionFields, setShowConditionFields] = useState(false);

  const handleShowUpdateByCondition = () => {
    setShowUpdateByCondition(!showUpdateByCondition);
  };

  const handleShowUpdateFields = () => {
    setShowUpdateFields(!showUpdateFields);
  };

  const handleShowConditionFields = () => {
    setShowConditionFields(!showConditionFields);
  };

  const options =
    parent?.props?.source?.added_fields?.map(
      ({ id, field_name, fomular_alias }) => ({
        label: field_name,
        value: id,
        fomular_alias,
      })
    ) || [];

  const condition_options =
    parent?.props?.source?.fields?.map(({ id, field_name, fomular_alias }) => ({
      label: field_name,
      value: id,
      fomular_alias,
    })) || [];

  useEffect(() => {
    if (parent?.props?.source?.tables?.[0]?.id) {
      updateSelectedComponent(parent.props.source.tables[0].id, [
        "props",
        "table_id",
      ]);
    }
  }, [parent?.props?.source?.tables?.[0]?.id]);

  function handleUpdateComponent(data, path) {
    updateSelectedComponent(data, path);
  }

  function handleChangeFields({ type, field }) {
    switch (type) {
      case "add":
        setFields((prev) => {
          return [
            {
              id: getFormatedUUID(),
              key: "",
              value: "",
              label: "",
              fomular_alias: "",
            },
            ...prev,
          ];
        });
        break;
      case "update":
        setFields((prev) => {
          const newFields = [...prev];
          for (const index in newFields) {
            if (newFields[index].id === field.id) {
              newFields[index] = { ...newFields[index], ...field };
              break;
            }
          }
          return newFields;
        });
        break;
      case "remove":
        setFields((prev) => {
          return prev.filter((item) => item.id !== field.id);
        });
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    handleUpdateComponent(fields, fieldPath.split("."));
  }, [fields]);

  useEffect(() => {
    handleUpdateComponent(conditionFields, ["props", "condition_fields"]);
  }, [conditionFields]);

  function handleChangeConditionFields({ type, field }) {
    switch (type) {
      case "add":
        setConditionFields((prev) => {
          return [{ id: getFormatedUUID(), key: "", value: "" }, ...prev];
        });
        break;
      case "update":
        setConditionFields((prev) => {
          const newFields = [...prev];
          for (const index in newFields) {
            if (newFields[index].id === field.id) {
              newFields[index] = { ...newFields[index], ...field };
              break;
            }
          }
          return newFields;
        });
        break;
      case "remove":
        setConditionFields((prev) => {
          return prev.filter((item) => item.id !== field.id);
        });
        break;
      default:
        break;
    }
  }

  return (
    <div className="padding-1rem">
      <div className="c-chart p-0">
        <div
          className={` ${
            showUpdateByCondition ? "chart-header pb-2" : "chart-header-of"
          }`}
          onClick={handleShowUpdateByCondition}
        >
          <div className="chart-label">
            <FontAwesomeIcon
              icon={showUpdateByCondition ? faAngleUp : faAngleRight}
              className="me-2"
            />
            {lang["UpdateByCondition"]}
          </div>
        </div>
        {showUpdateByCondition && (
          <>
            <div className="joining-container p-1">
              <div className="joining-header  d-flex flex-warp">
                <div
                  className="chart-lable m-2 me-auto"
                  onClick={handleShowUpdateFields}
                >
                  <FontAwesomeIcon
                    icon={showUpdateFields ? faAngleUp : faAngleRight}
                    className="me-2"
                  />
                  {lang["Update Fields"]}
                </div>
                <div className="incon-plus-chart">
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    onClick={() => handleChangeFields({ type: "add" })}
                  />
                </div>
              </div>
              {showUpdateFields && (
                <div div className="accordion" id="accordionUpdateByCondition">
                  {fields?.map(
                    ({ id, key, value, label, fomular_alias }, i) => (
                      <div className="p-1">
                        <div
                          className="accordion-item accordion-item-chart"
                          key={id}
                        >
                          <h2
                            className="accordion-header "
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
                              {lang["Field"]}{" "}
                              <span className="ml-1">{i + 1}</span>
                              <div className="accordion-button-right">
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  onClick={() =>
                                    handleChangeFields({
                                      type: "remove",
                                      field: {
                                        id,
                                      },
                                    })
                                  }
                                />
                              </div>
                            </button>
                          </h2>
                          <div
                            id={`panelsStayOpen-collapse${id}`}
                            className={`accordion-collapse collapse ${
                              i === 0 ? "show" : ""
                            } p-2`}
                            aria-labelledby={`panelsStayOpen-headingChart${id}`}
                          >
                            <section key={id}>
                              <div className="row  align-items-center ">
                                <div className="col-4">
                                  <span>{lang["Field name"]}:</span>
                                </div>
                                <div className="col-8 pl-0">
                                  <Select
                                    styles={customStyles}
                                    options={options}
                                    value={{ value, label }}
                                    onChange={(option) => {
                                      handleChangeFields({
                                        type: "update",
                                        field: {
                                          id,
                                          key: option.value,
                                          label: option.label,
                                          fomular_alias: option.fomular_alias,
                                        },
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="row  align-items-center">
                                <div className="col-4">
                                  <span>{lang["Value"]}:</span>
                                </div>
                                <div className="col-8 pl-0">
                                  <input
                                    type="text"
                                    value={value}
                                    onChange={({ target: { value } }) => {
                                      handleChangeFields({
                                        type: "update",
                                        field: { id, value },
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                              <p>{id} </p>
                              <p>
                                {" "}
                                {lang["Field"]}: {key} - {fomular_alias}
                              </p>
                              <p>
                                {lang["Results"]}: {value}
                              </p>
                            </section>
                          </div>
                          {/* 
                          <p>{id}</p>
                          <p>{key}</p>
                          <p>{value}</p>
                          <p>{fomular_alias}</p> */}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="joining-container p-1">
              <div className="joining-header  d-flex flex-warp">
                <div
                  className="chart-label m-2  me-auto"
                  onClick={handleShowConditionFields}
                >
                  <FontAwesomeIcon
                    icon={showConditionFields ? faAngleUp : faAngleRight}
                    className="me-2"
                  />
                  {lang["Condition fields"]}
                </div>
                <div className="incon-plus-chart">
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    onClick={() => handleChangeConditionFields({ type: "add" })}
                  />
                </div>
              </div>

              {showConditionFields && (
                <section>
                  {conditionFields.map(({ id, key, value, label }) => (
                    <section className="p-2" key={id}>
                      <p>{id}</p>
                      <p>{key}</p>
                      <p>{value}</p>
                      <div className="row align-items-center">
                        <div className="col-10">
                          <Select
                            options={condition_options}
                            value={{ value, label }}
                            onChange={(option) => {
                              handleChangeConditionFields({
                                type: "update",
                                field: {
                                  id,
                                  key: option.value,
                                  label: option.label,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="col-2 pl-3 trash-values">
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() =>
                              handleChangeConditionFields({
                                type: "remove",
                                field: {
                                  id,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </section>
                  ))}
                </section>
              )}
            </div>
            {/* <section>
              <button
                onClick={() => handleChangeConditionFields({ type: "add" })}
              >
                Them
              </button>
              {conditionFields.map(({ id, key, value, label }) => {
                return (
                  <section key={id}>
                    <p>{id}</p>
                    <p>{key}</p>
                    <p>{value}</p>
                    <Select
                      styles={customStyles}
                      options={options}
                      value={{ value, label }}
                      onChange={(option) => {
                        handleChangeConditionFields({
                          type: "update",
                          field: { id, key: option.value, label: option.label },
                        });
                      }}
                    />
                  </section>
                );
              })}
            </section> */}
          </>
        )}
      </div>
    </div>
  );
};

const ChoosePreImportTable = (props) => {
  const {
    label,
    optionslabel,

    fieldPath,
    valuePath,
    masterTables,

    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
  } = props;

  const { version_id } = useParams();
  const _token = localStorage.getItem("_token");
  const { tables, selectedCpns, proxy } = useSelector((state) => state);

  const parent = selectedCpns.find((cpn) => cpn.id == selectedCpn.parent_id);
  const [drop, setDrop] = useState(false);
  const [optionDrop, setOptionDrop] = useState(false);

  const [fTable, setFTable] = useState(undefined);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const InitFunc = async () => {
      const field = getPropByPath(fieldPath.split("."), selectedCpn);
      const { table_id } = field;

      if (table_id) {
        const table = tables.find((tb) => tb.id == table_id);
        setFTable(table);
        updateSelectedComponent(field, fieldPath.split("."));
        // updateSelectedComponent({}, valuePath.split('.'))

        setDrop(false);

        const res = await fetch(
          `${proxy}/db/preimport/${version_id}/${table.id}`,
          {
            headers: {
              Authorization: _token,
            },
          }
        );
        const data = await res.json();
        // console.log(data)
        setOptions(data.data);
      }
    };
    InitFunc();
    return () => {};
  }, []);

  const fieldClickTrigger = async (field) => {
    const { table_id } = field;
    const table = tables.find((tb) => tb.id == table_id);
    setFTable(table);
    updateSelectedComponent(field, fieldPath.split("."));
    updateSelectedComponent({}, valuePath.split("."));

    setDrop(false);

    const res = await fetch(`${proxy}/db/preimport/${version_id}/${table.id}`, {
      headers: {
        Authorization: _token,
      },
    });
    const data = await res.json();
    console.log(data);
    setOptions(data.data);
  };

  if (parent) {
    const currentField = getPropByPath(fieldPath.split("."), selectedCpn);
    const currentValue = getPropByPath(valuePath.split("."), selectedCpn);
    const fields = [];
    const parentTables = getPropByPath(masterTables.split("."), parent);
    parentTables.map((tb) => {
      const { foreign_keys } = tb;

      const foreignKeyFieldsID = foreign_keys.map((key) => key.field_id);
      const thisTableFields = Object.values(tb.fields);

      const foreignFields = thisTableFields
        .filter((f) => foreignKeyFieldsID.indexOf(f.id) != -1)
        .map((field) => {
          const { id } = field;
          const corespondingKey = foreign_keys.find(
            (key) => key.field_id == id
          );

          const foreignTable = tables.find(
            (tbl) => tbl.id == corespondingKey.table_id
          );

          if (foreignTable.pre_import) {
            return {
              ...field,
              table_id: corespondingKey.table_id,
              onTable: tb.id,
            };
          }
        })
        .filter((f) => f != undefined);

      fields.push(...foreignFields);
    });

    const valueClickTrigger = (opt) => {
      updateSelectedComponent(opt, valuePath.split("."));
      setOptionDrop(false);
    };

    return (
      <div>
        <div className="property" style={{ zIndex: index + 1 }}>
          <div className="label-box">
            <span>{label}</span>
          </div>
          <div className={`drop-box`}>
            <div
              className="content-container"
              onClick={() => {
                setDrop(!drop);
              }}
            >
              <div className="content">
                <span>
                  {currentField.field_name}-{currentField.fomular_alias}
                </span>
              </div>
              <div className="caret">
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            </div>
            <div
              className="options-container"
              style={{ display: drop ? "block" : "none" }}
            >
              <div className="options">
                {fields.map((opt) => (
                  <div
                    className="option"
                    onClick={() => {
                      fieldClickTrigger(opt);
                    }}
                  >
                    <span>
                      {opt["field_name"]}-{opt.fomular_alias}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {fTable && (
          <div className="property" style={{ zIndex: index }}>
            <div className="label-box">
              <span>{optionslabel}</span>
            </div>
            <div className={`drop-box`}>
              <div
                className="content-container"
                onClick={() => {
                  setOptionDrop(!optionDrop);
                }}
              >
                <div className="content">
                  <span>{Object.values(currentValue).join(" - ")}</span>
                </div>
                <div className="caret">
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </div>
              <div
                className="options-container"
                style={{ display: optionDrop ? "block" : "none" }}
              >
                <div className="options">
                  {options.map((opt) => (
                    <div
                      className="option"
                      onClick={() => {
                        valueClickTrigger(opt);
                      }}
                    >
                      <span>{Object.values(opt).join(" - ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  return;
};

const ChoosePreImportTableFromSibling = (props) => {
  const {
    label,
    optionslabel,

    fieldPath,
    valuePath,
    masterTables,

    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
  } = props;

  const { version_id } = useParams();
  const _token = localStorage.getItem("_token");
  const { tables, proxy } = useSelector((state) => state);

  const [drop, setDrop] = useState(false);
  const [optionDrop, setOptionDrop] = useState(false);

  const [fTable, setFTable] = useState(undefined);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const InitFunc = async () => {
      const field = getPropByPath(fieldPath.split("."), selectedCpn);
      const { table_id } = field;

      if (table_id) {
        const table = tables.find((tb) => tb.id == table_id);
        setFTable(table);
        updateSelectedComponent(field, fieldPath.split("."));
        updateSelectedComponent({}, valuePath.split("."));

        setDrop(false);

        const res = await fetch(
          `${proxy}/db/preimport/${version_id}/${table.id}`,
          {
            headers: {
              Authorization: _token,
            },
          }
        );
        const data = await res.json();
        setOptions(data.data);
      }
    };
    InitFunc();
    return () => {};
  }, []);

  const fieldClickTrigger = async (field) => {
    const { table_id } = field;
    const table = tables.find((tb) => tb.id == table_id);
    setFTable(table);
    updateSelectedComponent(field, fieldPath.split("."));
    updateSelectedComponent({}, valuePath.split("."));

    setDrop(false);

    const res = await fetch(`${proxy}/db/preimport/${version_id}/${table.id}`, {
      headers: {
        Authorization: _token,
      },
    });
    const data = await res.json();
    setOptions(data.data);
  };

  const currentField = getPropByPath(fieldPath.split("."), selectedCpn);
  const currentValue = getPropByPath(valuePath.split("."), selectedCpn);
  const fields = [];
  const parentTables = getPropByPath(masterTables.split("."), selectedCpn);
  parentTables.map((tb) => {
    const { foreign_keys } = tb;

    const foreignKeyFieldsID = foreign_keys.map((key) => key.field_id);
    const thisTableFields = Object.values(tb.fields);
    const foreignFields = thisTableFields
      .filter((f) => foreignKeyFieldsID.indexOf(f.id) != -1)
      .map((field) => {
        const { id } = field;
        const corespondingKey = foreign_keys.find((key) => key.field_id == id);

        const foreignTable = tables.find(
          (tbl) => tbl.id == corespondingKey.table_id
        );

        if (foreignTable.pre_import) {
          return {
            ...field,
            table_id: corespondingKey.table_id,
            onTable: tb.id,
          };
        }
      })
      .filter((f) => f != undefined);

    fields.push(...foreignFields);
  });

  const valueClickTrigger = (opt) => {
    updateSelectedComponent(opt, valuePath.split("."));
    setOptionDrop(false);
  };

  return (
    <div>
      <div className="property" style={{ zIndex: index + 1 }}>
        <div className="label-box">
          <span>{label}</span>
        </div>
        <div className={`drop-box`}>
          <div
            className="content-container"
            onClick={() => {
              setDrop(!drop);
            }}
          >
            <div className="content">
              <span>{currentField.field_name}</span>
            </div>
            <div className="caret">
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
          <div
            className="options-container"
            style={{ display: drop ? "block" : "none" }}
          >
            <div className="options">
              {fields.map((opt) => (
                <div
                  className="option"
                  onClick={() => {
                    fieldClickTrigger(opt);
                  }}
                >
                  <span>{opt["field_name"]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {fTable && (
        <div className="property" style={{ zIndex: index }}>
          <div className="label-box">
            <span>{optionslabel}</span>
          </div>
          <div className={`drop-box`}>
            <div
              className="content-container"
              onClick={() => {
                setOptionDrop(!optionDrop);
              }}
            >
              <div className="content">
                <span>{Object.values(currentValue).join(" - ")}</span>
              </div>
              <div className="caret">
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            </div>
            <div
              className="options-container"
              style={{ display: optionDrop ? "block" : "none" }}
            >
              <div className="options">
                {options.map((opt) => (
                  <div
                    className="option"
                    onClick={() => {
                      valueClickTrigger(opt);
                    }}
                  >
                    <span>{Object.values(opt).join(" - ")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PickDetailSingleProperty = (props) => {
  const {
    label,
    type,
    masterpath,
    path,
    display_field,

    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
  } = props;

  const { tables, selectedCpns } = useSelector((state) => state);
  const allDetailBoxes = selectedCpns.filter(
    (block) => block.name == "detail_box"
  );
  const nearestDetailBox = allDetailBoxes.pop();
  const currentValue = getPropByPath(path.split("."), selectedCpn);
  const [option, setOption] = useState(currentValue);
  const customStyles = {
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
  };

  useEffect(() => {
    setOption(currentValue);
  }, [selectedCpn.id]);

  function handleChangeOption(value) {
    updateSelectedComponent(value, path.split("."));
    setOption(value);
  }

  if (nearestDetailBox) {
    // const options = getPropByPath(masterpath.split("."), nearestDetailBox);
    const options = [];

    for (const k in nearestDetailBox.props.joiningTable.select_root) {
      options.push({
        label: k,
        value: k,
      });
    }

    return (
      <div className="m-3">
        <Select
          value={option}
          styles={customStyles}
          onChange={(value) => {
            handleChangeOption(value);
          }}
          options={options}
        />
      </div>
    );
    return (
      <div className="property" style={{ zIndex: index }}>
        <div className="label-box">
          <span>{label}</span>
        </div>
        <div className={`drop-box`}>
          <div className="content-container" onClick={() => {}}>
            <div className="content">
              <span>{currentValue?.[display_field]}</span>
            </div>
            <div className="caret">
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
          <div className="options-container">
            <div className="options"></div>
          </div>
        </div>
      </div>
    );
  }
  return;
};

const PickDetailSinglePropertyButOnlyNonMultipleFileType = (props) => {
  const {
    label,
    type,
    masterpath,
    path,
    display_field,

    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
  } = props;

  const { tables, selectedCpns } = useSelector((state) => state);
  const allDetailBoxes = selectedCpns.filter(
    (block) => block.name == "detail_box"
  );
  const current = getPropByPath(path.split("."), selectedCpn);

  const nearestDetailBox = allDetailBoxes.pop();

  const [option, setOption] = useState(current);

  useEffect(() => {
    setOption(current);
  }, [selectedCpn.id]);

  function handleChangeOption(value) {
    updateSelectedComponent(value, path.split("."));
    setOption(value);
  }

  if (nearestDetailBox) {
    const options = [];

    for (const k in nearestDetailBox.props.joiningTable.select_root) {
      options.push({
        label: k,
        value: k,
      });
    }

    return (
    <div className="padding-1rem">
        <Select
          value={option}
          onChange={(value) => {
            handleChangeOption(value);
          }}
          options={options}
        />
    </div>
    );
  }
  return;
};

const PickDetailSinglePropertyButOnlyMultipleFileType = (props) => {
  const {
    label,
    type,
    masterpath,
    path,
    display_field,

    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
  } = props;

  const { tables, selectedCpns } = useSelector((state) => state);
  const allDetailBoxes = selectedCpns.filter(
    (block) => block.name == "detail_box"
  );
  const nearestDetailBox = allDetailBoxes.pop();
  const [drop, setDrop] = useState(false);

  const clickTrigger = (opt) => {
    updateSelectedComponent(opt, path.split("."));
    setDrop(false);
  };

  if (nearestDetailBox) {
    const options = getPropByPath(masterpath.split("."), nearestDetailBox);
    const filtedOptions = options.filter((field) => {
      const { DATATYPE, FILE_MULTIPLE } = field.props ? field.props : {};
      if (DATATYPE == "FILE" && FILE_MULTIPLE) {
        return true;
      }
      return false;
    });
    const currentValue = getPropByPath(path.split("."), selectedCpn);

    return (
      <div className="property" style={{ zIndex: index }}>
        <div className="label-box">
          <span>{label}</span>
        </div>
        <div className={`drop-box`}>
          <div
            className="content-container"
            onClick={() => {
              setDrop(!drop);
            }}
          >
            <div className="content">
              <span>{currentValue?.[display_field]}</span>
            </div>
            <div className="caret">
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
          <div
            className="options-container"
            style={{ display: drop ? "block" : "none" }}
          >
            <div className="options">
              {filtedOptions.map((opt) => (
                <div
                  className="option"
                  onClick={() => {
                    clickTrigger(opt);
                  }}
                >
                  <span>{opt[display_field]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return;
};

const LockButtons = (props) => {
  const {
    label,
    type,
    tablesPath,

    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    index,
  } = props;

  const { tables } = useSelector((state) => state);
  const [showLockButton, setShowLockButtons] = useState(false);

  const handleShowLockButtons = () => {
    setShowLockButtons(!showLockButton);
  };

  const selectedTables = getPropByPath(tablesPath.split("."), selectedCpn);
  const selectedTable = selectedTables[0];
  if (selectedTable) {
    const { foreign_keys } = selectedTable;
    const preImportTables = [];
    for (let i = 0; i < foreign_keys.length; i++) {
      const { field_id, table_id } = foreign_keys[i];

      const foreignTable = tables.find((tb) => tb.id == table_id);

      if (foreignTable && foreignTable.pre_import) {
        const field = selectedTable.fields.find((f) => f.id == field_id);
        preImportTables.push({ field, foreignTable });
      }
    }

    if (preImportTables.length > 0) {
      return (
        <div className="padding-1rem">
          <div className="c-chart p-0" style={{ zIndex: index }}>
            <div
              className={` ${
                showLockButton ? "chart-header pb-2" : "chart-header-of"
              }`}
              onClick={handleShowLockButtons}
            >
              <div className="chart-label ">
                <FontAwesomeIcon
                  icon={showLockButton ? faAngleUp : faAngleRight}
                  className="me-2"
                />
                <span>{label}</span>
              </div>
            </div>
            {/* {showLockButton && 
            
            } */}
            <div className="accordion" id="accordionExample">
              {preImportTables.map((tb) => (
                <PreImportLockButtonSelection
                  {...props}
                  table={tb.foreignTable}
                  field={tb.field}
                  showLockButton={showLockButton}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
  return;
};

const PreImportLockButtonSelection = (props) => {
  /**
   *
   *  Tiếp tục phân tích preimport và gọi nút từ children
   *
   */

  const { proxy, icons } = useSelector((state) => state);

  const { version_id } = useParams();
  const _token = localStorage.getItem("_token");
  const buttons_for_blocking = {
    code_generating_button: "code_generating_button",
    custom_button: "custom_button",
    redirect_button: "redirect_button",
    table_export_button: "table_export_button",
  };
  const {
    table,
    field,
    lockpath,

    getPropByPath,
    updateSelectedComponent,
    selectedCpn,
    showLockButton,
  } = props;

  const lockbuttons = getPropByPath(lockpath.split("."), selectedCpn);
  const thisFieldConfig = lockbuttons[field.fomular_alias];

  const { children } = selectedCpn;

  const [preImportData, setPreImportData] = useState([]);

  const buttons = children.filter((cpn) => buttons_for_blocking[cpn.name]);
  console.log("buttons", buttons);
  const { primary_key, fields } = table;
  const primaryField = fields.find((f) => f.id == primary_key[0]);

  useEffect(() => {
    const asyncFetchingFunc = async () => {
      const res = await fetch(
        `${proxy}/db/preimport/${version_id}/${table.id}`,
        {
          headers: {
            Authorization: _token,
          },
        }
      );
      const data = await res.json();
      setPreImportData(data.data);
    };

    asyncFetchingFunc();
    return () => {};
  }, []);

  const checkTrigger = (data, btn) => {
    const config = thisFieldConfig;
    let newConfig = thisFieldConfig;
    if (config) {
      const thisButtonConfig =
        thisFieldConfig[data[primaryField.fomular_alias]];
      if (thisButtonConfig) {
        thisFieldConfig[data[primaryField.fomular_alias]][btn.id] =
          !thisFieldConfig[data[primaryField.fomular_alias]][btn.id];
      } else {
        thisFieldConfig[data[primaryField.fomular_alias]] = { [btn.id]: true };
      }
      newConfig = thisFieldConfig;
    } else {
      newConfig = { [data[primaryField.fomular_alias]]: { [btn.id]: true } };
    }
    updateSelectedComponent(newConfig, [
      "props",
      "lockbuttons",
      field.fomular_alias,
    ]);
  };

  const DefaultButtonSelection = (data, icon, name, value) => {
    return (
      <div className="field-picker" style={{ justifyContent: "flex-start" }}>
        <div className="picker-checkbox">
          <input
            type="checkbox"
            checked={
              thisFieldConfig?.[data[primaryField.fomular_alias]]?.[value]
            }
            onClick={() => {
              checkTrigger(data, { id: value });
            }}
          />
        </div>

        <div className="picker-label" style={{ margin: "0" }}>
          <FontAwesomeIcon icon={icon} />
        </div>

        <div className="picker-label" style={{ marginLeft: "1em" }}>
          <span>{name}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      {showLockButton && (
        <div className={"fields-picker"}>
          {preImportData.map((data, i) => (
            <div className="p-1">
              <div className="accordion-item accordion-item-chart">
                <h2
                  className="accordion-header "
                  key={i}
                  id={`panelsStayOpen-headingChart${i}`}
                >
                  <buttons
                    className="accordion-button accordion-button-left"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#panelsStayOpen-collapse${i}`}
                    aria-expanded={i === 0 ? "true" : "false"}
                    aria-controls={`panelsStayOpen-collapse${i}`}
                  >
                    <span
                      style={{
                        width: "100%",
                        display: "block",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        fontWeight: "normal",
                      }}
                    >
                      {Object.values(data).join(" - ")}
                    </span>
                  </buttons>
                </h2>
                <div
                  id={`panelsStayOpen-collapse${i}`}
                  className={`accordion-collapse collapse ${
                    i === 0 ? "show" : ""
                  }`}
                  aria-labelledby={`panelsStayOpen-headingChart${i}`}
                >
                  <div className="accordion-body">
                    <div className="picker-field-list">
                      {DefaultButtonSelection(
                        data,
                        faArrowUpRightFromSquare,
                        "Chi tiết",
                        "detail"
                      )}
                      {DefaultButtonSelection(
                        data,
                        faEdit,
                        "Cập nhật",
                        "update"
                      )}
                      {DefaultButtonSelection(data, faTrash, "Xóa", "delete")}

                      {buttons.map((btn) => {
                        return (
                          <div
                            className="field-picker"
                            style={{ justifyContent: "flex-start" }}
                          >
                            <div className="picker-checkbox">
                              <input
                                type="checkbox"
                                checked={
                                  thisFieldConfig?.[
                                    data[primaryField.fomular_alias]
                                  ]?.[btn.id]
                                }
                                onClick={() => {
                                  checkTrigger(data, btn);
                                }}
                              />
                            </div>

                            <div
                              className="picker-label"
                              style={{ margin: "0" }}
                            >
                              <FontAwesomeIcon
                                icon={
                                  icons[btn?.props?.icon]?.icon ||
                                  icons["6"].icon
                                }
                              />
                            </div>

                            <div
                              className="picker-label"
                              style={{ marginLeft: "1em" }}
                            >
                              <span>{btn.props.name}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="table-fields-picker">
            <div className="fields-picker-header">
              <span
                style={{
                  width: "100%",
                  display: "block",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  fontWeight: "normal",
                }}
              >
                {Object.values(data).join(" - ")}
              </span>
            </div>
            <div className="picker-field-list">
              {DefaultButtonSelection(
                data,
                faArrowUpRightFromSquare,
                "Chi tiết",
                "detail"
              )}
              {DefaultButtonSelection(data, faEdit, "Cập nhật", "update")}
              {DefaultButtonSelection(data, faTrash, "Xóa", "delete")}

              {buttons.map((btn) => {
                return (
                  <div
                    className="field-picker"
                    style={{ justifyContent: "flex-start" }}
                  >
                    <div className="picker-checkbox">
                      <input
                        type="checkbox"
                        checked={
                          thisFieldConfig?.[data[primaryField.fomular_alias]]?.[
                            btn.id
                          ]
                        }
                        onClick={() => {
                          checkTrigger(data, btn);
                        }}
                      />
                    </div>

                    <div className="picker-label" style={{ margin: "0" }}>
                      <FontAwesomeIcon
                        icon={icons[btn?.props?.icon]?.icon || icons["6"].icon}
                      />
                    </div>

                    <div className="picker-label" style={{ marginLeft: "1em" }}>
                      <span>{btn.props.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div> */}
            </div>
          ))}
        </div>
      )}
    </>
    // <div className={"fields-picker"}>
    //   {preImportData.map((data) => (
    //     <div className="table-fields-picker">
    //       <div className="fields-picker-header">
    //         <span
    //           style={{
    //             width: "100%",
    //             display: "block",
    //             overflow: "hidden",
    //             whiteSpace: "nowrap",
    //             textOverflow: "ellipsis",
    //             fontWeight: "normal",
    //           }}
    //         >
    //           {Object.values(data).join(" - ")}
    //         </span>
    //       </div>
    //       <div className="picker-field-list">
    //         {DefaultButtonSelection(
    //           data,
    //           faArrowUpRightFromSquare,
    //           "Chi tiết",
    //           "detail"
    //         )}
    //         {DefaultButtonSelection(data, faEdit, "Cập nhật", "update")}
    //         {DefaultButtonSelection(data, faTrash, "Xóa", "delete")}

    //         {buttons.map((btn) => {
    //           return (
    //             <div
    //               className="field-picker"
    //               style={{ justifyContent: "flex-start" }}
    //             >
    //               <div className="picker-checkbox">
    //                 <input
    //                   type="checkbox"
    //                   checked={
    //                     thisFieldConfig?.[data[primaryField.fomular_alias]]?.[
    //                       btn.id
    //                     ]
    //                   }
    //                   onClick={() => {
    //                     checkTrigger(data, btn);
    //                   }}
    //                 />
    //               </div>

    //               <div className="picker-label" style={{ margin: "0" }}>
    //                 <FontAwesomeIcon
    //                   icon={icons[btn?.props?.icon]?.icon || icons["6"].icon}
    //                 />
    //               </div>

    //               <div className="picker-label" style={{ marginLeft: "1em" }}>
    //                 <span>{btn.props.name}</span>
    //               </div>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

const Components = {
  text: EntryBox,
  pattern: PattenEntry,
  prefix: PrefixEntry,
  number: NumberBox,
  iconicSwitchingGroup: IconicSwitchingGroup,
  iconicSwitching: IconicSwitching,
  color: Color,
  bool: Bool,
  selection: ListSelection,
  childSelection: ChildSelection,
  apiSelection: ApiSelection,

  chart_selection: ChartSelection,
  selfSelection: SelfSelection,
  masterSelection: MasterSelection,
  icon: ButtonChangeIcon,

  UpdateByCondition: UpdateByCondition,
  SelectDisplayField: SelectDisplayField,
  selectTables: SelectTables, // onetimeuse
  SELECT_CHART_TYPES: SelectChartTypes,
  selectTable: SelectTable, // onetimeuse
  tablefieldspicker: TableFieldsPicker, // onetimeuse
  singulartablefieldspicker: SingularTableFieldsPicker, // onetimeuse
  tablecalculatefields: TableCalculateFields, // onetimeuse
  primaryTableOnlyBool: PrimaryTableOnlyBool, // onetimeuse
  singleFieldSelection: SingleFieldSelection,
  selectParams: SelectParams,
  selectPage: SelectPage,
  showParams: ShowParams, // onetimeuse
  chooseSlave: ChooseSlave,
  chooseMaster: ChooseMaster,
  JoiningTable: JoiningTable,
  SelectCriteria: SelectCriteria,
  choosePreImportTable: ChoosePreImportTable,
  choosePreImportTableFromSibling: ChoosePreImportTableFromSibling,
  LinkCharts: LinkCharts,
  SelectDisplayFields: SelectDisplayFields,

  pickdetailsingleproperty: PickDetailSingleProperty,
  pickdetailsinglepropertybutonlynonmultiplefiletype:
    PickDetailSinglePropertyButOnlyNonMultipleFileType, // onetimeuse
  pickdetailsinglepropertybutonlymultiplefiletype:
    PickDetailSinglePropertyButOnlyMultipleFileType, // onetimeuse
  lockbuttons: LockButtons, // onetimeuse
};
