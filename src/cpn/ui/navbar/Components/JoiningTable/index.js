import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import functions from "../../../../../redux/configs/functions";
import { ConvertStringToObject } from "../../../../../utils/ConvertStringToObject";
import { JoiningTableContainer } from "./JoiningTableContainer";
import { SelectContainer } from "./SelectContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCirclePlus,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

function JoiningTableComponent(
  props = {
    getPropByPath: () => [],
    updateSelectedComponent: () => [],
    selectedCpn: {},
    path: "",
  }
) {
  const { getPropByPath, updateSelectedComponent, path, selectedCpn, id } =
    props;

  //accrodion
  const [showData, setShowData] = useState(false);
  const [showJoining, setShowJoining] = useState(false);
  const [showSelectroot, setShowSelectroot] = useState(false);

  // show bang data
  const handeleShowData = () => {
    setShowData(!showData);
  };

  // show bang joining
  const handeleShowJoining = () => {
    setShowJoining(!showJoining);
  };

  // show bang joining
  const handeleShowSelectroot = () => {
    setShowSelectroot(!showSelectroot);
  };

  const DATA = getPropByPath(path.split("."), selectedCpn);

  const { getFormatedUUID } = functions;
  const { tables, lang } = useSelector((s) => s);

  const initial_item = {
    id: getFormatedUUID(),
    joining_type: "left_join",
    left_table: "",
    right_table: "",
    where_condition: {},
    group_by: {},
    custom_group_by: {},
    order_by: {},
    select: {},
    alias: {},
  };

  const [joining, setJoining] = useState(DATA?.tables || []);
  const [select_root, setSelect_root] = useState(DATA.select_root);
  const [componentId, setComponentId] = useState(selectedCpn.id);

  useEffect(() => {
    setSelect_root(DATA.select_root);
    setJoining(DATA.tables);
    setComponentId(selectedCpn.id);
  }, [selectedCpn]);

  useEffect(() => {
    handleUpdateComponent("select_root", select_root);
  }, [select_root]);

  const handleUpdateComponent = (key, data) => {
    const newData = { ...DATA };
    newData[key] = data;
    updateSelectedComponent(newData, path.split("."));
  };

  const handleChange = (id, type, value) => {
    let newData = [];
    setJoining((prev) => {
      newData = [...prev];
      for (const k in newData) {
        const item = newData[k];
        if (item.id === id) {
          if (!newData[k][type]) {
            newData[k][type] = initial_item[type];
          }
          console.log("CHANGE", type, value);
          newData[k][type] = value;
          break;
        }
      }
      return newData;
    });
  };
  useEffect(() => {
    handleUpdateComponent("tables", joining);
  }, [joining]);
  const handleDelete = (id) => {
    setJoining((prev) => prev.filter((item) => item.id !== id));
  };
  const handleAddOutlet = () => {
    setJoining((prev) => {
      let newData = [...(prev || [])];
      newData.push(initial_item);
      return newData;
    });
  };

  return (
    <div className="padding-1rem">
      <div className="c-chart p-0">
        <div
          className={` ${showData ? "chart-header pb-2" : "chart-header-of"}`}
          onClick={handeleShowData}
        >
          <div className="chart-label ">
            <FontAwesomeIcon
              icon={showData ? faAngleUp : faAngleRight}
              className="me-2"
            />

            {lang["Data Joining"]}
          </div>
        </div>
        {showData && (
          <div className="p-1">
            <div className="joining-container p-0">
              <div className="joining-header  d-flex flex-warp">
                <div
                  className="chart-label m-2  me-auto"
                  onClick={handeleShowJoining}
                >
                  <FontAwesomeIcon
                    icon={showJoining ? faAngleUp : faAngleRight}
                    className="me-2"
                  />
                  {lang["Joining"]}
                </div>
                <div className="incon-plus-joining">
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    onClick={() => handleAddOutlet()}
                  />
                </div>
              </div>
              {showJoining && (
                <section>
                  <JoiningTableContainer
                    joining={joining}
                    tables={tables}
                    lang={lang}
                    onChange={handleChange}
                    handleDelete={handleDelete}
                  />
                  {/* Nhu coment code nay lai tai chuyen select root xuong c_chart */}
                </section>
              )}
            </div>
            <div className="joining-container p-0">
              <div
                className="joining-header mt-1 p-1"
                onClick={handeleShowSelectroot}
              >
                <div className="chart-label m-2 ">
                  <FontAwesomeIcon
                    icon={showSelectroot ? faAngleUp : faAngleRight}
                    className="me-2"
                  />
                  {lang["Statement"]}
                </div>
              </div>
              {showSelectroot && (
                <div className="p-1">
                  <SelectContainer
                    name={selectedCpn?.name}
                    label={"Select Root"}
                    default_value={select_root}
                    component_id={componentId}
                    onChange={(value) => {
                      const obj = ConvertStringToObject(value);
                      setSelect_root(obj);
                    }}
                  />
                </div>
              )}
            </div>

              {/* <div className="mb-2">
              <div className="label-box w-100">
                Joining
                <FontAwesomeIcon
                  style={{ marginLeft: "5px" }}
                  icon={faCirclePlus}
                  onClick={() => handleAddOutlet()}
                />
              </div>
            </div>
            <section>
              <JoiningTableContainer
                joining={joining}
                tables={tables}
                onChange={handleChange}
                handleDelete={handleDelete}
              />
              <SelectContainer
                label={"Select Root"}
                default_value={select_root}
                component_id={componentId}
                onChange={(value) => {
                  const obj = ConvertStringToObject(value);
                  setSelect_root(obj);
                }}
              />
            </section> */}
          </div>
        )}

      
      </div>
    </div>
  );
}
export const JoiningTable = memo(JoiningTableComponent);
