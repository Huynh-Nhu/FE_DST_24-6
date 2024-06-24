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

const detailText = [
  {
    id: getFormatedUUID(),
    label: lang["props.field"],
    type: "pickdetailsingleproperty",
    masterpath: "props.fields",
    path: "props.field",
    display_field: "field_name",
  },
  {
    id: getFormatedUUID(),
    label: lang["props.icon"],
    type: "icon",
    path: "props.icon",
  },

  {
    id: getFormatedUUID(),
    label: lang["props.prefix"],
    type: "text",
    path: "props.prefix",
  },

  {
    id: getFormatedUUID(),
    label: lang["props.postfix"],
    type: "text",
    path: "props.postfix",
  },

  {
    id: getFormatedUUID(),
    label: lang["style.fontsize"],
    type: "number",
    path: "props.style.fontSize",
  },
  {
    id: getFormatedUUID(),
    label: lang["stylePrefix.fontsize"],
    type: "number",
    path: "props.stylePrefix.fontSize",
  },
  {
    id: getFormatedUUID(),
    label: lang["stylePostfix.fontsize"],
    type: "number",
    path: "props.stylePostfix.fontSize",
  },
  {
    id: getFormatedUUID(),
    label: lang["styleIcon.fontsize"],
    type: "number",
    path: "props.styleIcon.fontSize",
  },
  {
    id: getFormatedUUID(),
    label: lang["style.color"],
    type: "color",
    path: "props.style.color",
  },
  {
    id: getFormatedUUID(),
    label: lang["style.icon"],
    type: "color",
    path: "props.styleIcon.color",
  },
  {
    id: getFormatedUUID(),
    label: lang["style.prefix"],
    type: "color",
    path: "props.stylePrefix.color",
  },
  {
    id: getFormatedUUID(),
    label: lang["style.postfix"],
    type: "color",
    path: "props.stylePostfix.color",
  },
  {
    id: getFormatedUUID(),
    label: lang["style.background"],
    type: "color",
    path: "props.style.backgroundColor",
  },
  {
    id: getFormatedUUID(),
    label: lang["style.alignment"],
    type: "iconicSwitchingGroup",
    path: "props.style.textAlign",
    defaultValue: "left",
    buttons: [
      {
        id: getFormatedUUID(),
        icon: faAlignLeft,
        value: "left",
      },
      {
        id: getFormatedUUID(),
        icon: faAlignCenter,
        value: "center",
      },
      {
        id: getFormatedUUID(),
        icon: faAlignRight,
        value: "right",
      },
      {
        id: getFormatedUUID(),
        icon: faAlignJustify,
        value: "justify",
      },
    ],
  },
  {
    id: getFormatedUUID(),
    label: lang["style.justifycontents"],
    type: "iconicSwitchingGroup",
    path: "props.styles.justifyContent",
    defaultValue: "left",
    buttons: [
      {
        id: getFormatedUUID(),
        icon: faAlignLeft,
        value: "flex-start",
      },
      {
        id: getFormatedUUID(),
        icon: faAlignCenter,
        value: "center",
      },
      {
        id: getFormatedUUID(),
        icon: faAlignRight,
        value: "flex-end",
      }
    ],
  },
  {
    id: getFormatedUUID(),
    label: lang["style.italic"],
    type: "iconicSwitching",
    path: "props.style.fontStyle",
    values: ["unset", "italic"],
    icon: faItalic,
  },
  {
    id: getFormatedUUID(),
    label: lang["style.bold"],
    type: "iconicSwitching",
    path: "props.style.fontWeight",
    values: ["unset", "bold"],
    icon: faBold,
  },
  {
    id: getFormatedUUID(),
    label: lang["style.underline"],
    type: "iconicSwitching",
    path: "props.style.textDecoration",
    values: ["unset", "underline"],
    icon: faUnderline,
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
    label: lang["stylePrefix.margin"],
    type: "text",
    path: "props.stylePrefix.margin",
  },
  {
    id: getFormatedUUID(),
    label: lang["stylePrefix.padding"],
    type: "text",
    path: "props.stylePrefix.padding",
  },
  {
    id: getFormatedUUID(),
    label: lang["stylePostfix.margin"],
    type: "text",
    path: "props.stylePostfix.margin",
  },
  {
    id: getFormatedUUID(),
    label: lang["stylePostfix.padding"],
    type: "text",
    path: "props.stylePostfix.padding",
  },
  {
    id: getFormatedUUID(),
    label: lang["styleIcon.margin"],
    type: "text",
    path: "props.styleIcon.margin",
  },
  {
    id: getFormatedUUID(),
    label: lang["styleIcon.padding"],
    type: "text",
    path: "props.styleIcon.padding",
  },
  {
    id: getFormatedUUID(),
    label: lang["props.datetime.type"],
    type: "text",
    path: "props.dateFormat",
  },
];
export default detailText;
