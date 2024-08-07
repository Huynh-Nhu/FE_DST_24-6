import { style } from "d3";
import grid from "./blocks/grid";

const blockTypes = {
  text: "text",
  table: "table",
  flex: "flex",
  form: "form",
  entry: "entry",
  block: "block",
  button: "button",
  datetime: "datetime",
  apiCombo: "apiCombo",
  chart_1: "chart_1",
  table_chart: "table_chart",
  chart_2: "chart_2",
  chart_3: "chart_3",
  c_chart: "c_chart",
  search_component: "search_component",
  inline_statis: "inline_statis",
  table_param: "table_param",
  redirect_button: "redirect_button",
  table_export_button: "table_export_button",

  custom_button: "custom_button",
  detail_box: "detail_box",
  detail_text: "detail_text",
  detail_image: "detail_image",
  detail_images: "detail_images",
  code_generating_button: "code_generating_button",
  barcode_activation: "barcode_activation",
  grid: "grid",
};

const defaultStylesheet = {
  margin: "0px 0px 0px 0px",
  padding: "6px 12px 6px 12px",
  width: "100%",
};

const initialStates = {
  text: {
    name: "text",
    props: {
      flex: {
        order: "1",
        flexGrow: "1",
      },
      content: "Sample Text",
      style: {
        fontSize: 16,
        color: "#000",
        textAlign: "left",
        fontStyle: "normal",
        fontWeight: "normal",
        textDecoration: "none",

        ...defaultStylesheet,
      },
    },
  },

  table: {
    name: "table",
    props: {
      joiningTable: [],
      params: [],
      FIELDS: [],
      name: "Sample table",
      style: {
        ...defaultStylesheet,
      },

      flex: {
        order: "1",
        flexGrow: "1",
      },

      source: {
        type: "database", // api || database
        added_fields: [],
        tables: [],
        fields: [],
        DisplayFields: [],
        calculates: [],
        get: {
          api: "",
          api_name: "",
        },
        search: {
          state: true,
          api: "",
          api_name: "",
        },
      },
      buttons: {
        add: {
          state: true,
          api: {
            api: "",
            api_name: "",
          },
        },
        import: {
          state: true,
          api: {
            api: "",
            api_name: "",
          },
        },
        export: {
          state: true,
          api: {
            api: "",
            api_name: "",
          },
        },
        update: {
          state: true,
          api: {
            api: "",
            api_name: "",
          },
        },
        delete: {
          state: true,
          api: {
            api: "",
            api_name: "",
          },
        },
        detail: {
          state: true,
          api: {
            api: "",
            api_name: "",
          },
        },

        approve: {
          state: false,
          field: {
            id: "",
            fomular_alias: "",
            display_name: "",
          },
          api: {
            api: "",
            api_name: "",
          },
        },

        unapprove: {
          state: false,
          field: {
            id: "",
            fomular_alias: "",
            display_name: "",
          },
          api: {
            api: "",
            api_name: "",
          },
        },

        navigator: {
          state: true,
          visible: 3,
        },
      },
      fields: [], // empty field set means all fields will be display

      visibility: {
        row_per_page: 12,
        indexing: true,
      },
      lockbuttons: {},
    },

    children: [
      // adde defaulte buttonz
    ],
  },

  table_param: {
    name: "table_param",
    props: {
      name: "Sample table",
      style: {
        ...defaultStylesheet,
      },

      params: [],

      flex: {
        order: "1",
        flexGrow: "1",
      },

      source: {
        type: "database", // api || database

        tables: [],
        fields: [],
        calculates: [],
        get: {
          api: "",
          api_name: "",
        },
        search: {
          state: true,
          api: "",
          api_name: "",
        },
      },
      buttons: {
        add: {
          state: true,
          api: {
            api: "",
            api_name: "",
          },
        },
        import: {
          state: true,
          api: {
            api: "",
            api_name: "",
          },
        },
        export: {
          state: true,
          api: {
            api: "",
            api_name: "",
          },
        },
        update: {
          state: true,
          api: {
            api: "",
            api_name: "",
          },
        },
        delete: {
          state: true,
          api: {
            api: "",
            api_name: "",
          },
        },
        detail: {
          state: true,
          api: {
            api: "",
            api_name: "",
          },
        },

        approve: {
          state: false,
          field: {
            id: "",
            fomular_alias: "",
            display_name: "",
          },
          api: {
            api: "",
            api_name: "",
          },
        },

        unapprove: {
          state: false,
          field: {
            id: "",
            fomular_alias: "",
            display_name: "",
          },
          api: {
            api: "",
            api_name: "",
          },
        },

        navigator: {
          state: true,
          visible: 3,
        },
      },
      fields: [], // empty field set means all fields will be display

      visibility: {
        row_per_page: 12,
        indexing: true,
      },
    },

    children: [
      // adde defaulte buttonz
    ],
  },

  flex: {
    name: "flex",
    children: [],
    props: {
      content: "Sample Text",
      style: {
        flexDirection: "row",
        flexWrap: "no-wrap",
        justifyContent: "unset",
        alignItems: "unset",

        ...defaultStylesheet,
      },
    },
  },

  block: {
    name: "block",
    children: [],
    props: {
      content: "Sample Text",
      style: {
        ...defaultStylesheet,
      },
    },
  },

  detail_box: {
    name: "detail_box",
    children: [],
    props: {
      content: "Sample Text",
      tables: [],
      fields: [],
      joiningTable: { tables: [], select_root: {} },
      params: [],
      style: {
        ...defaultStylesheet,
      },
    },
  },
  grid: {
    name: "grid",
    children: [],
    props: {
      title: {
        content: "Title",
      },
      style: {
        grid: [],
        ...defaultStylesheet,
      },
    },
  },

  detail_text: {
    name: "detail_text",
    children: [],
    props: {
      icon: "",
      field: "",
      prefix: "",
      postfix: "",
      styleIcon: {
        fontSize: 16,
        color: "#000",
        textAlign: "left",
        fontStyle: "normal",
        fontWeight: "normal",
        textDecoration: "none",
        backgroundColor: "",
        margin: "0px 0px 0px 0px",
        padding: "0px 0px 0px 0px",
      },
      stylePrefix: {
        fontSize: 16,
        color: "#000",
        textAlign: "left",
        fontStyle: "normal",
        fontWeight: "normal",
        textDecoration: "none",
        backgroundColor: "",
        margin: "0px 0px 0px 0px",
        padding: "0px 0px 0px 0px",
      },
      stylePostfix: {
        fontSize: 16,
        color: "#000",
        textAlign: "left",
        fontStyle: "normal",
        fontWeight: "normal",
        textDecoration: "none",
        backgroundColor: "",
        margin: "0px 0px 0px 0px",
        padding: "0px 0px 0px 0px",
      },
      style: {
        fontSize: 16,
        color: "#000",
        textAlign: "left",
        fontStyle: "normal",
        fontWeight: "normal",
        textDecoration: "none",
        backgroundColor: "",
        margin: "0px 0px 0px 0px",
        padding: "6px 12px 6px 12px",
        width: "auto",
      },
      styles: {
        justifyContent: "",
      },
      dateFormat: "",
    },
  },

  detail_image: {
    name: "detail_image",

    props: {
      content: "Sample Text",
      field: {},

      style: {
        ...defaultStylesheet,
      },
    },
  },

  detail_images: {
    name: "detail_images",

    props: {
      content: "Sample Text",
      field: {},

      style: {
        ...defaultStylesheet,
      },
    },
  },

  chart_1: {
    name: "chart_1",
    children: [],
    props: {
      CHART_TYPES: [],
      tables: [],
      field: [],
      joiningTable: { tables: [], select_root: {} },
      api: {
        api_id: "",
        api_name: "",
        url: "",
      },

      fomular: "",

      criterias: "",

      group_by: [],

      content: "Sample Text",
      style: {
        ...defaultStylesheet,
      },
    },
  },

  table_chart: {
    name: "table_chart",
    children: [],
    props: {
      tables: [],
      field: {
        id: "",
        fomular_alias: "",
      },
      joiningTable: { tables: [], select_root: {} },
      api: {
        api_id: "",
        api_name: "",
        url: "",
      },

      fomular: "",

      criterias: "",

      group_by: [],
      source: {
        type: "database", // api || database

        tables: [],
        fields: [],
        calculates: [],
        get: {
          api: "",
          api_name: "",
        },
        search: {
          state: true,
          api: "",
          api_name: "",
        },
      },
      buttons: {
        export: {
          state: true,
          api: {
            api: "",
            api_name: "",
          },
        },
      },

      content: "Sample Text",
      style: {
        ...defaultStylesheet,
      },
    },
  },

  chart_2: {
    name: "chart_2",
    children: [],
    props: {
      children: [],
      style: {
        ...defaultStylesheet,
      },
    },
  },

  chart_3: {
    name: "chart_3",
    children: [],
    props: {
      tables: [],
      field: {
        id: "",
        fomular_alias: "",
      },

      api: {
        api_id: "",
        api_name: "",
        url: "",
      },

      fomular: "",

      criterias: "",

      group_by: [],

      content: "Sample Text",
      style: {
        ...defaultStylesheet,
      },
    },
  },

  inline_statis: {
    name: "inline_statis",

    props: {
      label: "",

      table: {
        table_id: "",
        table_name: "",
      },

      field: {
        field_id: "",
        fomular_alias: "",
      },
      value: "",

      group_by: {},

      fomular: "", // ENUM [ "SUM", "COUNT", "AVERAGE" ]
      criteria: {
        display_value: "",
      },
    },
  },

  c_chart: {
    name: "c_chart",
    children: [],
    props: {
      CHART_TYPES: [],
      tables: [],
      params: [],
      field: [],
      joiningTable: { tables: [], select_root: {} },
      buttons: {
        export: {
          state: true,
          api: {
            api: "",
            api_name: "",
          },
        },
      },
      api: {
        api_id: "",
        api_name: "",
        url: "",
      },

      export: {
        state: false,
        api: {},
      },

      fomular: "",

      criterias: "",

      group_by: [],

      content: "Sample Text",
      style: {
        ...defaultStylesheet,
      },
    },
  },

  search_component: {
    name: "search_component",
    props: {
      title: "Search Component",
      charts: [],
      tables: [],
      style: {
        ...defaultStylesheet,
      },
    },
  },

  // CRAETE DEFAULTE BLOCKT

  form: {
    name: "form",
    props: {
      title: "Sample title",
      table: undefined,

      fields: [],

      api: {
        api: undefined,
        url: "",
        body: [],
      },

      submit_trigger: "",
      style: {
        ...defaultStylesheet,
      },
      children: [],
    },
  },

  entry: {
    name: "entry",
    props: {
      title: {
        content: "",
        visible: true,
      },
      placeholder: {
        content: "...",
        visible: true,
      },
      required: true,
      variable_name: "",

      flex: {
        order: "1",
        flexGrow: "1",
      },

      labelStyle: {
        fontSize: 16,
        color: "#000",
        textAlign: "left",
        fontStyle: "unset",
        fontWeight: "unset",
        textDecoration: "none",

        ...defaultStylesheet,
      },
      displayField: [],
      default_value: "",
      style: {
        fontSize: 16,
        color: "#000",
        textAlign: "left",
        fontStyle: "normal",
        fontWeight: "normal",
        textDecoration: "none",

        ...defaultStylesheet,
      },
    },
  },

  datetime: {
    name: "datetime",
    props: {
      title: {
        content: "Sample title",
        visible: true,
      },
      required: true,
      variable_name: "",
      default_value: "",
      inputType: "date", // date  || datetime-local

      flex: {
        order: "1",
        flexGrow: "1",
      },

      labelStyle: {
        fontSize: 16,
        color: "#000",
        textAlign: "left",
        fontStyle: "unset",
        fontWeight: "unset",
        textDecoration: "none",
        ...defaultStylesheet,
      },

      style: {},
    },
  },

  button: {
    name: "button",
    props: {
      title: "Button",
      style: {
        fontSize: 16,

        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",

        backgroundColor: "#777",

        borderRadius: 0,

        color: "#fff",
        textAlign: "left",
        fontStyle: "normal",
        fontWeight: "normal",
        textDecoration: "none",

        ...defaultStylesheet,
      },
      recordTrigger: {
        api: {
          api_id: "",
          api_name: "",
        },
      },
    },
  },
  // Nhu them mặc định icon để hiện

  redirect_button: {
    name: "redirect_button",
    props: {
      to: {
        page_id: "",
        page_tile: "",
        params: [],
      },
      icon: "50",
      style: {
        color: "",
        backgroundColor: "",
      },
    },
  },
  // Nhu them mặc định icon để hiện

  table_export_button: {
    name: "table_export_button",
    props: {
      slave: {},
      icon: "51",
      fields: [],
      source: {
        DisplayFields: [],
      },
      style: {
        color: "",
        backgroundColor: "",
      },
    },
  },

  custom_button: {
    name: "custom_button",
    props: {
      icon: "6",
      fields: [],
      condition_fields: [],
      table_id: "",
      title: "",
      value: "",
      style: {
        color: "",
        backgroundColor: "",
      },
    },
  },

  code_generating_button: {
    name: "code_generating_button",
    props: {
      icon: "6",
      field: {
        id: "",
        field_name: "",
        fomular_alias: "",
      },
      title: "",
      value: "",
      style: {
        color: "",
        backgroundColor: "",
      },
      generator: {
        primary_table: {},

        primary_field: {},

        table: {},
        indexField: {},

        onField: {},
        pattern: "",
        amount: {},
        api: {},
        onOption: {},
        prefix: "",
        preview: "",
      },
    },
  },

  apiCombo: {
    name: "apiCombo",
    props: {
      title: {
        content: "Title",
        visible: true,
      },
      placeholder: {
        content: "...",
        visible: true,
      },
      required: true,
      variable_name: "",

      api: {
        api: {
          api_id: "",
          api_name: "",
          fields: [],
        },
        field: {
          id: "",
          display_name: "",
          fomular_alias: "",
        },
      },

      flex: {
        order: "1",
        flexGrow: "1",
      },

      labelStyle: {
        fontSize: 16,
        color: "#000",
        textAlign: "left",
        fontStyle: "unset",
        fontWeight: "unset",
        textDecoration: "none",

        ...defaultStylesheet,
      },

      style: {
        fontSize: 16,
        color: "#000",
        textAlign: "left",
        fontStyle: "normal",
        fontWeight: "normal",
        textDecoration: "none",

        ...defaultStylesheet,
      },
    },
  },

  barcode_activation: {
    name: "barcode_activation",
    title: {
      content: "Title",
      visible: true,
    },
    props: {
      style: {
        ...defaultStylesheet,
      },
    },
  },
};

// initialStates.form.children = [
//     { ...initialStates.text, props: { ...initialStates.text.props, content: "FORM" } },
//     initialStates.entry,
//     initialStates.button
// ]

// initialStates.flex.children = [
//     initialStates.entry,
//     initialStates.entry
// ]

// initialStates.block.children = [
//     initialStates.entry,
//     initialStates.entry
// ]

export { blockTypes, initialStates };
