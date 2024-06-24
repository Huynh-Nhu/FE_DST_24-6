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
const c_chart = [
  {
    id: getFormatedUUID(),
    label: lang["props.title"],
    type: "text",
    path: "props.content",
  },
  // c_chart không sử dụng chọn bảng

  // {
  //   id: getFormatedUUID(),
  //   label: lang["props.tables"],
  //   type: "selectTables",
  //   path: "props.tables",
  //   fieldsPath: "props.fields",
  // },
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
  // Bỏ chọn bàng nên bỏ ham này vì c_chart không sử dụng

  // {
  //   id: getFormatedUUID(),
  //   label: lang["props.choosestatisfield"],
  //   type: "singleFieldSelection",
  //   path: "props.field",
  //   data: "props.tables", // each tables must containt fields property
  //   fields: [
  //     {
  //       from: "id",
  //       to: "id",
  //     },
  //     {
  //       from: "field_name",
  //       to: "field_name",
  //     },
  //     {
  //       from: "fomular_alias",
  //       to: "fomular_alias",
  //     },
  //   ],
  //   display_value: "field_name",
  // },

  {
    id: getFormatedUUID(),
    label: lang["props.params"],
    type: "SelectCriteria",
    path: "props.params",
    tablespath: "props.tables",
  },
  // Nhu code sửa đường từ path: "props.CHART_TYPES" dẫn qua new_charts
  {
    id: getFormatedUUID(),
    label: "Biểu đồ",
    type: "SELECT_CHART_TYPES",
    // path: "props.CHART_TYPES",
    path: "props.new_charts",
  },
  // Bỏ chọn bảng nên bỏ hàm này
  // {
  //   id: getFormatedUUID(),
  //   label: lang["props.groupby"],
  //   type: "tablefieldspicker",
  //   path: "props.group_by",
  //   tablespath: "props.tables",
  // },
  {
    id: getFormatedUUID(),
    label: lang["props.fields.calculate"],
    type: "tablecalculatefields",
    path: "props.source.calculates",
  },
  {
    id: getFormatedUUID(),
    label: lang["props.fomular"],
    type: "selection",
    path: "props.fomular",
    options: [
      {
        label: "SUM",
        value: "SUM",
      },

      {
        label: "AVERAGE",
        value: "AVERAGE",
      },

      {
        label: "COUNT",
        value: "COUNT",
      },
    ],
  },

  {
    id: getFormatedUUID(),
    label: lang["props.criterias"],
    type: "text",
    path: "props.criterias",
  },

  {
    id: getFormatedUUID(),
    label: lang["props.table.buttons.export"],
    type: "bool",
    path: "props.export.state",
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
export default c_chart;
