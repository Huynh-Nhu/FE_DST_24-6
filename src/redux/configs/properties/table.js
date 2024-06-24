import {
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faItalic,
  faBold,
  faUnderline,
  faStrikethrough,
} from "@fortawesome/free-solid-svg-icons";
import functions from "../functions";
import lang from "../property_lang";

const { getFormatedUUID } = functions;

const table = [
  {
    id: getFormatedUUID(),
    label: lang["props.title"],
    type: "text",
    path: "props.name",
  },

  {
    id: getFormatedUUID(),
    label: lang["props.tables"],
    type: "selectTables",
    path: "props.source.tables",
    namePath: "props.name",
    fieldsPath: "props.source.fields",
    // childOf: {
    //     prop_id: "prop_1",
    //     caseIf: "database"
    // }
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
    label: "Chọn trường hiển thị",
    type: "SelectDisplayFields",
    path: "props.source.DisplayFields",
  },

  // {
  //   id: getFormatedUUID(),
  //   label: lang["props.fields"],
  //   type: "tablefieldspicker",
  //   path: "props.source.fields",
  //   tablespath: "props.source.tables",
  // },

  {
    id: getFormatedUUID(),
    label: lang["props.fields.calculate"],
    type: "tablecalculatefields",
    path: "props.source.calculates",
  },

  {
    id: getFormatedUUID(),
    label: lang["props.table.buttons.add"],
    type: "bool",
    path: "props.buttons.add.state",
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
    label: lang["props.table.buttons.import"],
    type: "bool",
    path: "props.buttons.import.state",
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
    label: lang["props.table.buttons.search"],
    type: "bool",
    path: "props.source.search.state",
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
    label: lang["props.table.buttons.update"],
    type: "bool",
    path: "props.buttons.update.state",
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
    label: lang["props.table.buttons.delete"],
    type: "bool",
    path: "props.buttons.delete.state",
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
    label: lang["props.table.buttons.detail"],
    type: "bool",
    path: "props.buttons.detail.state",
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
    label: lang["props.table.navigator"],
    type: "number",
    path: "props.buttons.navigator.visible",
  },

  {
    id: getFormatedUUID(),
    label: lang["props.table.recordsperpage"],
    type: "number",
    path: "props.visibility.row_per_page",
  },

  {
    id: getFormatedUUID(),
    label: lang["style.margin"],
    type: "text",
    path: "props.style.margin",
  },

  {
    id: getFormatedUUID(),
    label: lang["style.padding"],
    type: "text",
    path: "props.style.padding",
  },

  {
    id: getFormatedUUID(),
    label: lang["props.lockbuttons"],
    type: "lockbuttons",
    tablesPath: "props.source.tables",
    lockpath: "props.lockbuttons",

   // Nhu thay tên path để tách nút
   path: "props.style.button.look",
  },

  {
    id: getFormatedUUID(),
    label: lang["style.order"],
    type: "number",
    path: "props.flex.order",
    onlyExistsIn: [{ name: "flex", type: "direct" }],
  },
  {
    id: getFormatedUUID(),
    label: lang["style.flexgrow"],
    type: "number",
    path: "props.flex.flexGrow",
    onlyExistsIn: [{ name: "flex", type: "direct" }],
  },
  {
    id: getFormatedUUID(),
    label: lang["props.params"],
    type: "selectParams",
    path: "props.params",
    tablespath: "props.tables",
  },
];
export default table;
