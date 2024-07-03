import functions from "../functions";
import lang from "../property_lang";

const { getFormatedUUID } = functions;
const grid = [
  {
    id: getFormatedUUID(),
    label: lang["props.title"],
    type: "text",
    path: "props.name",
  },
  {
    id: getFormatedUUID(),
    label: lang["props.grid"],
    type: "grid",
    path: "props.style.grid",
    // pathChidren : "props.children.colIndex"
  },
 

];
export default grid;
