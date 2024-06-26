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
import { hr } from "date-fns/locale";

const { getFormatedUUID } = functions;

const button = [
  {
    id: getFormatedUUID(),
    label: lang["props.icon"],
    type: "icon",
    path: "props.icon",
  },

  {
    id: getFormatedUUID(),
    label: lang["props.title"],
    type: "text",
    path: "props.name",
  },

  {
    id: getFormatedUUID(),
    label: lang["props.field"],
    optionslabel: lang["props.option"],
    type: "choosePreImportTable",
    masterTables: "props.source.tables",
    fieldPath: "props.field",
    valuePath: "props.value",
    // Nhu thêm trường ở đây
    path:"props.field.generating"
  },

  {
    id: getFormatedUUID(),
    label: lang["props.field"],
    optionslabel: lang["props.option"],
    type: "UpdateByCondition",
    masterTables: "props.source.tables",
    fieldPath: "props.fields",
    valuePath: "props.value",
      // Nhu thêm trường ở đây
     path:"props.UpdateCondition"
  },

  {
    id: getFormatedUUID(),
    label: lang["style.color"],
    type: "color",
    path: "props.style.color",
  },

  {
    id: getFormatedUUID(),
    label: lang["style.background"],
    type: "color",
    path: "props.style.backgroundColor",
  },

  {
    id: getFormatedUUID(),
    label: lang["props.amount"],
    type: "masterSelection",
    path: "props.generator.amount",
    data: "props.source.added_fields",
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
    label: lang["props.chooseslaves"],
    type: "chooseSlave",
    path: "props.generator.table",
    master: "props.source.tables",
    primary_key: "props.primary_key",
    fields: [
      {
        from: "id",
        to: "id",
      },
      {
        from: "table_name",
        to: "table_name",
      },
      {
        from: "fields",
        to: "fields",
      },
    ],
    display_value: "table_name",
  },

  {
    id: getFormatedUUID(),
    label: lang["props.index"],
    type: "selfSelection",
    path: "props.generator.indexField",
    data: "props.generator.table.fields",
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
    label: lang["props.onField"],
    type: "selfSelection",
    path: "props.generator.onField",
    data: "props.generator.table.fields",
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
    label: lang["props.pattern"],
    type: "pattern",
    path: "props.generator.pattern",
  },

  // them
  {
    id: getFormatedUUID(),
    label: lang["props.onOption"],
    type: "selfSelection",
    path: "props.generator.onOption",
    data: "props.generator.table.fields",
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
    label: lang["props.prefix"],
    type: "prefix",
    path: "props.generator.prefix",
  },
];
export default button;
