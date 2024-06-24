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
];
export default grid;
