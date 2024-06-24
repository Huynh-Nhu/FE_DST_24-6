import functions from "../../functions";
import lang from "../../property_lang";

const { getFormatedUUID } = functions;

export const table_chart = [
  {
    id: getFormatedUUID(),
    label: lang["props.title"],
    type: "text",
    path: "props.content",
  },
  {
    id: getFormatedUUID(),
    label: lang["props.table.buttons.export"],
    type: "bool",
    path: "props.buttons.export.state",
    if_true: {
      value: true,
      label: lang["props.table.show"],
    },
    if_false: {
      value: false,
      label: lang["props.table.hide"],
    },
  },

  {
    id: getFormatedUUID(),
    label: "WHERE",
    type: "JoiningTable",
    path: "props.joiningTable",
    tablespath: "props.joiningTable",
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
