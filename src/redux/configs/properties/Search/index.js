import functions from "../../functions";
import lang from "../../property_lang";

const { getFormatedUUID } = functions;

export const search_component = [
  {
    id: getFormatedUUID(),
    label: lang["props.title"],
    type: "text",
    path: "props.title",
  },
  {
    id: getFormatedUUID(),
    label: "Link charts",
    type: "LinkCharts",
    path: "props.charts",
  },
];
