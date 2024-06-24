import functions from "../functions";
import lang from "../property_lang";

const { getFormatedUUID } = functions;
const chart_1 = [
  {
    id: getFormatedUUID(),
    label: lang["props.title"],
    type: "text",
    path: "props.content",
  },
  {
    id: getFormatedUUID(),
    label: lang["props.tables"],
    type: "selectTables",
    path: "props.tables",
    fieldsPath: "props.fields",
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
    label: lang["props.groupby"],
    type: "tablefieldspicker",
    path: "props.group_by",
    tablespath: "props.tables",
  },

  {
    id: getFormatedUUID(),
    label: lang["props.choosestatisfield"],
    type: "singleFieldSelection",
    path: "props.field",
    data: "props.tables", // each tables must containt fields property
    fields: [
      {
        from: "id",
        to: "id",
      },
      {
        from: "field_name",
        to: "field_name",
      },
      {
        from: "fomular_alias",
        to: "fomular_alias",
      },
    ],
    display_value: "field_name",
  },
  {
    id: getFormatedUUID(),
    label: "Biểu đồ",
    type: "SELECT_CHART_TYPES",
    path: "props.CHART_TYPES",
  },
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
export default chart_1;
