import functions from "../functions";
import lang from "../property_lang";

const { getFormatedUUID } = functions;
const detail_box = [
  {
    id: getFormatedUUID(),
    label: "WHERE",
    type: "JoiningTable",
    path: "props.joiningTable",
    tablespath: "props.joiningTable",
  },
  {
    id: getFormatedUUID(),
    label: lang["props.params"],
    type: "selectParams",
    path: "props.params",
    tablespath: "props.tables",
  },
  {
    id: getFormatedUUID(),
    label: lang["style.padding"],
    type: "text",
    path: "props.style.padding",
  },
  {
    id: getFormatedUUID(),
    label: lang["style.margin"],
    type: "text",
    path: "props.style.margin",
  },
];
export default detail_box;
