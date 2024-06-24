export default (state, action) => {
  switch (action.type) {
    case "UpdateHiddenPage":
      return UpdateHiddenPage(state, action);
      break;

    case "UpdateHiddenPageButDeHellOnTable":
      return UpdateHiddenPageButDeHellOnTable(state, action);
      break;

    case "InitializeFormComponent":
      return InitializeFormComponent(state, action);
      break;

    default:
      return state;
  }
};

const UpdateHiddenPage = (state, action) => {
  /**
   *
   * Abandoned
   */
  const { block_id } = action.payload;
  const { pages, initialStates, selectedCpn } = state;

  const targetHiddenPage = pages.find((page) => page.block == block_id);

  if (targetHiddenPage && selectedCpn) {
    const components = [];
    const body_detail = selectedCpn.source.fields;
    const form = JSON.parse(
      JSON.stringify({
        ...initialStates["form"],
        id: state.functions.getFormatedUUID(),
      })
    );

    for (let i = 0; i < body_detail.length; i++) {
      const field = body_detail[i];
      const { DATATYPE } = field.props;
      let block;
      const id = state.functions.getFormatedUUID();
      if (["DATE", "DATETIME"].indexOf(DATATYPE) != -1) {
        block = JSON.parse(
          JSON.stringify({ ...initialStates["datetime"], id })
        );
      } else {
        block = JSON.parse(JSON.stringify({ ...initialStates["entry"], id }));
      }
      block.props.title.content = field.field_name;
      block.required = field.props.NULLABLE;
      block.parent_id = form.id;
      components.push(block);
    }

    const button = JSON.parse(
      JSON.stringify({
        ...initialStates["button"],
        id: state.functions.getFormatedUUID(),
      })
    );
    button.props.title = "Thêm";
    button.parent_id = form.id;

    form.props.submit_trigger = button.id;

    form.children = [...components, button];
    targetHiddenPage.component = [form];

    const newPages = pages.map((page) => {
      if (page.page_id == targetHiddenPage.page_id) {
        return targetHiddenPage;
      }
      return page;
    });
    state.pages = newPages;
  }
  return state;
};

const flatteningComponents = (components) => {
  /**
   * Ép dẹp cây component thành mảng các component cùng cấp
   */

  const cpns = [];
  for (let i = 0; i < components.length; i++) {
    const { children } = components[i];
    cpns.push({ ...components[i] });
    if (children) {
      cpns.push(...flatteningComponents(children));
    }
  }
  return cpns;
};

const UpdateHiddenPageButDeHellOnTable = (state, action) => {
  const { block_id } = action.payload;
  const { pages, initialStates, page, tables } = state;

  const flattedCpns = flatteningComponents(page.component);
  const selectedCpn = flattedCpns.find((block) => block.id == block_id);
  const targetHiddenPage = pages.find((page) => page.block == block_id);
  const prev_components = targetHiddenPage?.component?.[0]?.children || [];

  if (selectedCpn && targetHiddenPage) {
    const fields = selectedCpn.props.source?.added_fields;

    const foreign_keys = selectedCpn.props.source.tables.reduce(
      (prev, { foreign_keys }) => [...prev, ...foreign_keys],
      []
    );

    const components = [];
    const form = JSON.parse(
      JSON.stringify({
        ...initialStates["form"],
        id: state.functions.getFormatedUUID(),
      })
    );

    for (let i = 0; i < fields?.length; i++) {
      const field = fields[i];

      const { DATATYPE } = field.props;
      let block;
      const id = state.functions.getFormatedUUID();
      if (["DATE", "DATETIME"].indexOf(DATATYPE) != -1) {
        block = JSON.parse(
          JSON.stringify({ ...initialStates["datetime"], id })
        );
      } else {
        block = JSON.parse(JSON.stringify({ ...initialStates["entry"], id }));
      }

      block.props.title.content = field.field_name;
      block.required = field.props.NULLABLE;
      block.parent_id = form.id;
      block.props.variable_name = field.fomular_alias;
      block.props.field_id = field.id;
      block.foreign_fields = [];

      const foreign_field = foreign_keys.find(
        (item) => item.field_id === field.id
      );
      if (foreign_field) {
        const table = tables.find((item) => item.id === foreign_field.table_id);
        block.foreign_fields = table.fields;
      }
      const prev_component = prev_components.find(
        (item) => item.props.field_id === field.id
      );
      if (prev_component) {
        block.props = prev_component.props;
      }

      components.push(block);
    }

    const button = JSON.parse(
      JSON.stringify({
        ...initialStates["button"],
        id: state.functions.getFormatedUUID(),
      })
    );
    button.props.title = "Thêm";
    button.parent_id = form.id;

    form.props.submit_trigger = button.id;

    form.children = [...components, button];

    targetHiddenPage.component = [form];

    const newPages = pages.map((page) => {
      if (page.page_id == targetHiddenPage.page_id) {
        return targetHiddenPage;
      }
      return page;
    });
    state.pages = newPages;
    state.selectedCpn = [];
    state.propertySet = [];
  }

  return state;
};

const InitializeFormComponent = (state, action) => {
  const { block_id } = action.payload;
  const { pages, initialStates, page, tables } = state;

  const flattedCpns = flatteningComponents(page.component);
  const selectedCpn = flattedCpns.find((block) => block.id == block_id);
  const targetHiddenPage = pages.find((page) => page.block == block_id);
  const prev_components = targetHiddenPage?.component?.[0]?.children || [];

  if (selectedCpn && targetHiddenPage) {
    const fields = selectedCpn.props.source?.added_fields;

    const foreign_keys = selectedCpn.props.source.tables.reduce(
      (prev, { foreign_keys }) => [...prev, ...foreign_keys],
      []
    );

    const components = [];
    const form = JSON.parse(
      JSON.stringify({
        ...initialStates["form"],
        id: state.functions.getFormatedUUID(),
      })
    );

    for (let i = 0; i < fields?.length; i++) {
      const field = fields[i];

      const { DATATYPE } = field.props;
      let block;
      const id = state.functions.getFormatedUUID();
      if (["DATE", "DATETIME"].indexOf(DATATYPE) != -1) {
        block = JSON.parse(
          JSON.stringify({ ...initialStates["datetime"], id })
        );
      } else {
        block = JSON.parse(JSON.stringify({ ...initialStates["entry"], id }));
      }

      block.props.title.content = field.field_name;
      block.required = field.props.NULLABLE;
      block.parent_id = form.id;
      block.props.variable_name = field.fomular_alias;
      block.props.field_id = field.id;
      block.foreign_fields = [];

      const foreign_field = foreign_keys.find(
        (item) => item.field_id === field.id
      );
      if (foreign_field) {
        const table = tables.find((item) => item.id === foreign_field.table_id);
        block.foreign_fields = table.fields;
      }
      const prev_component = prev_components.find(
        (item) => item.props.field_id === field.id
      );
      if (prev_component) {
        block.props = prev_component.props;
      }

      components.push(block);
    }

    const button = JSON.parse(
      JSON.stringify({
        ...initialStates["button"],
        id: state.functions.getFormatedUUID(),
      })
    );
    button.props.title = "Thêm";
    button.parent_id = form.id;

    form.props.submit_trigger = button.id;

    form.children = [...components, button];

    if (!targetHiddenPage.component.length) {
      targetHiddenPage.component = [form];
    }
  }

  return state;
};
