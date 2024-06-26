import $ from "jquery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { formatDate } from "../../redux/configs/format-date";
import { ValidTypeEnum } from "../enum/type";
import { Conditions } from "../../Components/Conditions/index";
import Select from "react-select";
import { SetDefaultValue } from "../../Components/SetDefaultValue";
import { ReactSortable } from "react-sortablejs";
import ColorContext from "./ContextTable";

export const METHOD_TYPE = {
  CALCULATE: "calculate",
  OVERRIDE: "override",
};
const types = [
  ValidTypeEnum.INT,
  ValidTypeEnum.INT_UNSIGNED,
  ValidTypeEnum.BIGINT,
  ValidTypeEnum.BIGINT_UNSIGNED,
  ValidTypeEnum.BOOL,
  ValidTypeEnum.CHAR,
  ValidTypeEnum.DATE,
  ValidTypeEnum.DATETIME,
  ValidTypeEnum.DECIMAL,
  ValidTypeEnum.DECIMAL_UNSIGNED,
  ValidTypeEnum.EMAIL,
  ValidTypeEnum.PHONE,
  ValidTypeEnum.TEXT,
];
const typenull = [
  { value: false, label: "Not null" },
  { value: true, label: "Null" },
];

const CreateAPI = () => {
  const { lang, proxy, auth, functions } = useSelector((state) => state);
  const _token = localStorage.getItem("_token");
  const stringifiedUser = localStorage.getItem("user");
  const users = JSON.parse(stringifiedUser);

  const { tempFieldParam } = useSelector((state) => state);

  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);
  const { project_id, version_id } = useParams();
  const [showModal, setShowModal] = useState(false);
  let navigate = useNavigate();

  const back = () => {
    navigate(`/projects/${project_id}/${version_id}/apis`);
  };
  const [apiMethod, setApiMethod] = useState(1); // Default is GET
  const [fieldsShow, setFieldShow] = useState({
    id: null,
    display_name: null,
    formular: null,
  });
  const defaultValues = {
    api_name: "",
    api_method: "get",
    tables: [],
    params: [],
    fields: [],
    body: [],
    external_body: [],
    calculates: [],
    statistic: [],
    api_scope: "public",
    status: true,
  };
  const defaultValuesExternalbody = {
    id: functions.uid(),
    field_name: "",
    fomular_alias: "",
    default_vlaue: "",
    props: {
      DATATYPE: "",
      NULL: false,
      LENGTH: 65535,
      AUTO_INCREMENT: true,
      MIN: "-2147483648",
      MAX: "2147483647",
      FORMAT: "",
      PATTERN: "",
      DECIMAL_PLACE: "",
      DEFAULT: "",
      DEFAULT_TRUE: "",
      DEFAULT_FALSE: "",
    },
  };

  const [modalTemp, setModalTemp] = useState(defaultValues); /////tạo api
  const [externalBody, setExternalBody] = useState(defaultValuesExternalbody);

  const [externalBodyUpdate, setExternalBodyUpdate] = useState({});
  const [color, setColor] = useState({});

  // console.log(externalBody)
  // console.log(modalTemp)
  // const showApiResponseMessage = (status) => {
  //     const langItem = (localStorage.getItem("lang") || "Vi").toLowerCase(); // fallback to English if no language is set
  //     const message = responseMessages[status];

  //     const title = message?.[langItem]?.type || "Unknown error";
  //     const description = message?.[langItem]?.description || "Unknown error";
  //     const icon = (message?.[langItem]?.type === "Thành công" || message?.[langItem]?.type === "Success") ? "success" : "error";

  //     Swal.fire({
  //         title,
  //         text: description,
  //         icon,
  //         showConfirmButton: false,
  //         timer: 1500,
  //     }).then(() => {
  //         if (icon === "success") {
  //             window.location.reload();

  //         }
  //     });
  // };

  const [errorApi, setErrorApi] = useState({});
  const validateApiname = () => {
    let temp = {};
    temp.api_name = modalTemp.api_name ? "" : lang["error.input"];
    temp.tables = tables && tables.length > 0 ? "" : lang["table empty"];
    setErrorApi({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const validateApiParams = () => {
    let temp = {};
    temp.params =
      modalTemp.params && modalTemp.params.length > 0
        ? ""
        : lang["params empty"];
    setErrorApi({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const validateApiBody = () => {
    let temp = {};
    temp.body =
      modalTemp.body && modalTemp.body.length > 0 ? "" : lang["body empty"];
    setErrorApi({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };
  const validateApiFieldShow = () => {
    let temp = {};
    temp.fields =
      modalTemp.fields && modalTemp.fields.length > 0 ? "" : lang["show empty"];

    setErrorApi({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmitModal = () => {
    const validator = {
      get: [validateApiname, validateApiFieldShow],
      post: [validateApiname, validateApiBody],
      put: [validateApiname, validateApiParams, validateApiBody],
      delete: [validateApiname, validateApiParams],
    };

    const validateFunctions = validator[modalTemp.api_method];
    let valid = true;

    for (let i = 0; i < validateFunctions.length; i++) {
      const checkResult = validateFunctions[i]();
      if (!checkResult) {
        valid = false;

        break;
      }
    }

    if (valid) {
      setModalTemp((prevModalTemp) => ({
        ...prevModalTemp,
        api_method: apiMethod,
      }));

      dispatch({
        branch: "api",
        type: "addFieldParam",
        payload: {
          field: { ...modalTemp, tables: tables.map(({ id }) => id) },
        },
      });
    }
  };
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    // Kiểm tra điều kiện dữ liệu sẵn sàng
    if (tempFieldParam && Object.keys(tempFieldParam).length > 0) {
      // console.log("adddsa")
      addApi();
    }
  }, [tempFieldParam]);

  const addApi = () => {
    const requestBody = {
      version_id: parseInt(version_id),
      api: {
        ...tempFieldParam,
      },
    };

    if (!requestBody.api.payload_type) {
      switch (requestBody.api.api_method) {
        case "get":
          requestBody.api.payload_type = "params";

          break;
        case "post":
        case "put":
          requestBody.api.payload_type = "body";
          break;
        default:
          break;
      }
    }
    /**
     * body: [{
     *       fieldId,
     *       method_type: "calculate" | "override"
     *       }]
     */

    fetch(`${proxy}/apis/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${_token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((resp) => {
        const { success, content, data, status } = resp;
        // console.log(resp)
        if (success) {
          functions.showApiResponseMessage(status);
        } else {
          functions.showApiResponseMessage(status);
        }
      });
  };

  const handleSubmitTables = () => {
    // Tạo một mảng mới bao gồm tất cả fieldId đã chọn từ tất cả bảng
    const allSelectedFields = Object.values(selectedFields).flat();

    // Cập nhật modalTemp
    setModalTemp((prev) => ({
      ...prev,
      tables: selectedTables.map((table) => table.id),
    }));
  };

  const handleSubmitParam = () => {
    // Tạo một mảng mới bao gồm tất cả fieldId đã chọn từ tất cả bảng
    const allSelectedFields = Object.values(selectedFields).flat();

    // Cập nhật modalTemp
    setModalTemp((prevModalTemp) => ({
      ...prevModalTemp,
      params: allSelectedFields.map(({ fieldId }) => fieldId),
    }));
  };
  const handleSubmitShow = () => {
    // Tạo một mảng mới bao gồm tất cả fieldId đã chọn từ tất cả bảng
    const allSelectedFields2 = Object.values(selectedFieldsModal2).flat();

    // Cập nhật modalTemp
    setModalTemp((prevModalTemp) => ({
      ...prevModalTemp,
      fields: allSelectedFields2,
    }));
  };
  const handleSubmitBody = () => {
    // Tạo một mảng mới bao gồm tất cả fieldId đã chọn từ tất cả bảng
    const allSelectedFieldBody = Object.values(selectedFieldsBody).flat();

    // Cập nhật modalTemp
    setModalTemp((prevModalTemp) => ({
      ...prevModalTemp,
      body: allSelectedFieldBody,
    }));
  };

  const validateExternalBody = () => {
    let temp = {};
    temp.field_name = externalBody.field_name ? "" : lang["error.input"];
    const fomularAliasRegex = /^[A-Za-z0-9._-]+$/;
    if (
      !fomularAliasRegex.test(externalBody.fomular_alias) ||
      !externalBody.fomular_alias
    ) {
      temp.fomular_alias = lang["error.invalidCharacter"];
    } else {
      temp.fomular_alias = "";
    }
    temp.DATATYPE = externalBody.props.DATATYPE ? "" : lang["error.input"];
    setErrorApi({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };
  const validateUpdateExternalBody = () => {
    let temp = {};
    temp.field_name = externalBodyUpdate.field_name ? "" : lang["error.input"];
    const fomularAliasRegex = /^[A-Za-z0-9._-]+$/;
    if (
      !fomularAliasRegex.test(externalBodyUpdate.fomular_alias) ||
      !externalBodyUpdate.fomular_alias
    ) {
      temp.fomular_alias = lang["error.invalidCharacter"];
    } else {
      temp.fomular_alias = "";
    }
    temp.DATATYPE = externalBodyUpdate.props.DATATYPE
      ? ""
      : lang["error.input"];
    setErrorApi({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };
  const handleSubmitExternalBody = () => {
    if (validateExternalBody()) {
      setModalTemp((prevModalTemp) => ({
        ...prevModalTemp,
        external_body: [...prevModalTemp.external_body, externalBody],
      }));

      setExternalBody(defaultValuesExternalbody);

      $("#closeModalExternalBody").click();
    }
  };
  // console.log(errorApi)
  //update
  const updateFieldExternalBody = (ex) => {
    // console.log(ex)
    setExternalBodyUpdate(ex);
  };

  const submitupdateFieldExternalBody = () => {
    if (validateUpdateExternalBody()) {
      const updateExternal = modalTemp.external_body.map((item) =>
        item.id === externalBodyUpdate.id ? { ...externalBodyUpdate } : item
      );

      setModalTemp((prev) => ({
        ...prev,
        external_body: updateExternal,
      }));
      $("#closeEditStatis").click();
      Swal.fire({
        title: lang["success.title"],
        text: lang["success.update"],
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDeleteExternal = (ex) => {
    // const newCalculates = calculates.filter(item => item.fomular_alias !== cal.fomular_alias);
    // setModalTemp(prev => ({
    //     ...prev,
    //     calculates: newCalculates
    // }));
    Swal.fire({
      title: lang["confirm"],
      text: lang["delete.field"],
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: lang["btn.delete"],
      cancelButtonText: lang["btn.cancel"],
      customClass: {
        confirmButton: "swal2-confirm my-confirm-button-class",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newExternal = modalTemp.external_body.filter(
          (item) => item.fomular_alias !== ex.fomular_alias
        );

        setModalTemp((prev) => ({
          ...prev,
          external_body: newExternal,
        }));

        Swal.fire({
          title: lang["success.title"],
          text: lang["delete.success.field"],
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // console.log(getAllField)
  const [allTable, setAllTable] = useState([]);
  const [possibleTables, setPossibleTables] = useState([]);
  useEffect(() => {
    fetch(`${proxy}/db/tables/v/${version_id}`, {
      headers: {
        Authorization: _token,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        const { success, data, status, content } = resp;

        if (success) {
          if (data) {
            setAllTable(data.tables);
            setPossibleTables(data.tables);
          }
        } else {
          // window.location = "/404-not-found"
        }
      });
  }, []);

  const [selectedTables, setSelectedTables] = useState([]);

  const handleChange = (e) => {
    const selectedTableName = e.target.value;
    const selectedTableData = allTable.find(
      (table) => table.table_name === selectedTableName
    );

    setSelectedTables((prevSelectedTables) => [
      ...prevSelectedTables,
      selectedTableData,
    ]);

    const updatedSelectedTables = [...selectedTables, selectedTableData];
    const linkedTables = allTable.filter(
      (table) =>
        !updatedSelectedTables.some(
          (selectedTable) => selectedTable.id === table.id
        ) &&
        updatedSelectedTables.some((selectedTable) =>
          selectedTable.foreign_keys.some(
            (fk) => fk.table_id === table.id || fk.ref_table_id === table.id
          )
        )
    );
    setPossibleTables(linkedTables);
  };

  //xóa bảng đã chọn
  const handleDeleteAll = () => {
    setSelectedTables([]);
    setPossibleTables(allTable);
    setModalTemp((prevState) => ({
      ...prevState,
      params: [],
    }));
  };
  //  hiển thị các tường của bảngđược chọn
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTable = (tableId) => {
      return fetch(`${proxy}/db/tables/v/${version_id}/table/${tableId}`, {
        headers: {
          Authorization: _token,
        },
      }).then((res) => res.json());
    };

    Promise.all(modalTemp.tables.map(fetchTable)).then((responses) => {
      const tableNames = responses.map((resp) =>
        resp.success ? resp.data : "unknown"
      );
      setTables(tableNames);
    });
  }, [modalTemp.tables]);

  const [tableFields, setTableFields] = useState([]);

  // console.log(tableFields)
  useEffect(() => {
    const fetchFields = async (tableId) => {
      const res = await fetch(
        `${proxy}/db/tables/v/${version_id}/table/${tableId}`,
        {
          headers: {
            Authorization: _token,
          },
        }
      );
      const resp = await res.json();

      if (resp.success) {
        return resp.data; // Trả về toàn bộ đối tượng data
      } else {
        console.error("Error fetching fields:", resp.content);
        return null; // Trả về null nếu có lỗi
      }
    };

    const fetchAllFields = async () => {
      const promises = modalTemp.tables.map(async (tableId) => {
        const fields = await fetchFields(tableId);
        return { tableId, fields };
      });

      const results = await Promise.all(promises);
      // console.log(1111111111,results)

      const fieldsByTable = {};
      for (const { tableId, fields } of results) {
        fieldsByTable[tableId] = fields;
      }

      // const fieldsByTable = results.map(({ tableId, fields }) => ({ [tableId]: fields }));

      // console.log(1232132132131231233123213,fieldsByTable);
      setTableFields(fieldsByTable);
    };

    fetchAllFields();
  }, [modalTemp.tables]);

  function isPrimaryKey(tableId, fieldId) {
    return tableFields[tableId]?.primary_key.includes(fieldId);
  }

  function handleChangeModalTempBody({ fieldId, payload }) {
    setModalTemp((prev) => {
      const newModalTemp = {
        ...prev,
      };

      for (const index in newModalTemp.body) {
        const item = newModalTemp.body[index];

        if (item.fieldId === fieldId) {
          for (const k in payload) {
            newModalTemp.body[index][k] = payload[k];
          }
        }
      }
      return newModalTemp;
    });
  }

  // luu truong body
  const [selectedFieldsBody, setSelectedFieldsBody] = useState({});
  const handleCheckboxChangeBody = (tableId, fieldId, isChecked) => {
    // Sao chép state hiện tại
    const updatedSelections = { ...selectedFieldsBody };

    // Nếu không có mảng cho tableId này, tạo mới
    if (!updatedSelections[tableId]) {
      updatedSelections[tableId] = [];
    }

    // if (isChecked) {
    //     // Nếu checkbox được chọn, thêm fieldId vào mảng
    //     updatedSelections[tableId].push(fieldId);
    // } else {
    //     // Nếu checkbox không được chọn, loại bỏ fieldId khỏi mảng
    //     updatedSelections[tableId] = updatedSelections[tableId].filter(id => id !== fieldId);
    // }
    if (isChecked) {
      updatedSelections[tableId].push({
        fieldId,
        method_type: METHOD_TYPE.OVERRIDE,
      });

      // Nếu là khóa chính và được chọn, bỏ chọn khóa ngoại tương ứng (nếu có)
      if (isPrimaryKey(tableId, fieldId)) {
        for (let tid in tableFields) {
          for (const fk of tableFields[tid]?.foreign_keys || []) {
            if (fk.ref_field_id === fieldId && updatedSelections[tid]) {
              updatedSelections[tid] = updatedSelections[tid].filter(
                ({ fieldId: id }) => id !== fk.field_id
              );
            }
          }
        }
      }
    } else {
      if (updatedSelections[tableId]) {
        updatedSelections[tableId] = updatedSelections[tableId].filter(
          ({ fieldId: id }) => id !== fieldId
        );
      }
    }

    setSelectedFieldsBody(updatedSelections);
  };

  // luu truong show
  const [selectedFieldsModal2, setSelectedFieldsModal2] = useState({});
  // console.log(selectedFieldsModal2[0]?.id)
  // console.log("FieldShow", selectedFieldsModal2)
  /////luu truong param
  const [selectedFields, setSelectedFields] = useState({});

  function isPrimaryKey(tableId, fieldId) {
    return tableFields[tableId]?.primary_key.includes(fieldId);
  }

  const handleCheckboxChange = (tableId, fieldId, isChecked) => {
    const updatedSelections = { ...selectedFields };

    if (!updatedSelections[tableId]) {
      updatedSelections[tableId] = [];
    }

    if (isChecked) {
      updatedSelections[tableId].push({
        fieldId,
        method_type: METHOD_TYPE.OVERRIDE,
      });

      // Nếu là khóa chính và được chọn, bỏ chọn khóa ngoại tương ứng (nếu có)
      if (isPrimaryKey(tableId, fieldId)) {
        for (let tid in tableFields) {
          for (const fk of tableFields[tid]?.foreign_keys || []) {
            if (fk.ref_field_id === fieldId && updatedSelections[tid]) {
              updatedSelections[tid] = updatedSelections[tid].filter(
                ({ fieldId: id }) => id !== fk.field_id
              );
            }
          }
        }
      }
    } else {
      if (updatedSelections[tableId]) {
        updatedSelections[tableId] = updatedSelections[tableId].filter(
          ({ fieldId: id }) => id !== fieldId
        );
      }
    }

    setSelectedFields(updatedSelections);
  };

  // console.log("trường hiển thị:", selectedFieldsModal2)
  const getFieldDetails = (tableId, fieldId) => {
    const tableInfo = tableFields[tableId];
    const fieldInfo = tableInfo?.fields.find((field) => field.id === fieldId);
    const fieldName = fieldInfo?.field_name;
    const tableName = tableInfo?.table_name;
    return { fieldName, tableName };
  };

  //console.log(selectedFields)
  //delete selected table

  const [display_name, setDisplayname] = useState("");
  const [fomular, setFomular] = useState("");

  const [calculates, setCalculates] = useState([]);
  // console.log("calustasud", calculates)
  const [aliasCalculates, setaliasCalculates] = useState([]);

  const generateUniqueFormularAlias = async (display_name) => {
    const requestBody = { field_name: display_name, version_id };
    const response = await fetch(`${proxy}/apis/make/alias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${_token}`,
      },
      body: JSON.stringify(requestBody),
    });

    const resp = await response.json();
    if (resp.success) {
      setaliasCalculates(resp.alias);
      return resp.alias;
    } else {
      // Handle error here
      return null;
    }
  };

  const [errorCaculates, setErrorCaculates] = useState({});
  const validateCaculates = () => {
    let temp = {};

    temp.display_name = display_name ? "" : lang["error.input"];
    temp.fomular = fomular ? "" : lang["error.input"];

    setErrorCaculates({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };
  const handleSubmitFieldCalculates = async (event) => {
    event.preventDefault();
    if (validateCaculates()) {
      const fomular_alias = await generateUniqueFormularAlias(display_name);
      const newCalculate = { display_name, fomular_alias, fomular };

      // Cập nhật modalTemp
      setModalTemp((prev) => ({
        ...prev,
        calculates: [...prev.calculates, newCalculate],
      }));
      setCalculates([...calculates, newCalculate]);
      setDisplayname("");
      setFomular("");
      Swal.fire({
        title: lang["success.title"],
        text: lang["success.add"],
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      $("#closeAddCalculates").click();
    }
  };
  //Cập nhật trường tính toán
  const [calculatesUpdate, setCalculatesUpdate] = useState({
    display_name: "",
    fomular: "",
    fomular_alias: "",
  });
  const updateFieldCalculates = (cal) => {
    setCalculatesUpdate(cal);
  };
  const validateCaculatesUpdate = () => {
    let temp = {};

    temp.display_name = calculatesUpdate.display_name
      ? ""
      : lang["error.input"];
    temp.fomular = calculatesUpdate.fomular ? "" : lang["error.input"];
    setErrorCaculates({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const submitupdateFieldCalculates = () => {
    if (validateCaculatesUpdate()) {
      const updatedCalculates = modalTemp.calculates.map((item) =>
        item.fomular_alias === calculatesUpdate.fomular_alias
          ? calculatesUpdate
          : item
      );
      setCalculates(updatedCalculates);
      setModalTemp((prev) => ({
        ...prev,
        calculates: updatedCalculates,
      }));
      Swal.fire({
        title: lang["success.title"],
        text: lang["success.update"],
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      $("#closeEditCalculates").click();
    }
  };

  // Khi calculatesUpdate thay đổi, cập nhật mảng calculates
  // useEffect(() => {
  //     if (calculatesUpdate.fomular_alias) {
  //         submitupdateFieldCalculates();
  //     }
  // }, [calculatesUpdate]);

  const handleDeleteCalculates = (cal) => {
    // console.log(cal)
    // const newCalculates = calculates.filter(item => item.fomular_alias !== cal.fomular_alias);
    // setModalTemp(prev => ({
    //     ...prev,
    //     calculates: newCalculates
    // }));
    Swal.fire({
      title: lang["confirm"],
      text: lang["delete.field"],
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: lang["btn.delete"],
      cancelButtonText: lang["btn.cancel"],
      customClass: {
        confirmButton: "swal2-confirm my-confirm-button-class",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newCalculates = modalTemp.calculates.filter(
          (item) => item.fomular_alias !== cal.fomular_alias
        );
        setModalTemp((prev) => ({
          ...prev,
          calculates: newCalculates,
        }));
        Swal.fire({
          title: lang["success.title"],
          text: lang["delete.success.field"],
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  ///Cập nhât trường  thống kê
  const [statisticalUpdate, setStatisticalUpdate] = useState({
    display_name: "",
    field: "",
    fomular: "",
    fomular_alias: "",
  });
  const updateFieldStatistical = (sta) => {
    setStatisticalUpdate(sta);
    setGroupBy(sta.raw_group_by);
  };
  const validateStatisticalUpdate = () => {
    let temp = {};

    temp.display_name = statisticalUpdate.display_name
      ? ""
      : lang["error.input"];
    temp.fomular = statisticalUpdate.fomular ? "" : lang["error.input"];
    temp.field = statisticalUpdate.field ? "" : lang["error.input"];

    setErrorStatistical({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const submitupdateFieldStatistical = () => {
    if (validateStatisticalUpdate()) {
      const updatedStatistical = modalTemp.statistic.map((item) =>
        item.fomular_alias === statisticalUpdate.fomular_alias
          ? {
              ...statisticalUpdate,
              group_by: groupBy.map((g) => g.fomular_alias),
              raw_group_by: groupBy,
            }
          : item
      );

      setGroupBy([]);

      setModalTemp((prev) => ({
        ...prev,
        statistic: updatedStatistical,
      }));
      $("#closeEditStatis").click();
      Swal.fire({
        title: lang["success.title"],
        text: lang["success.update"],
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const [groupBy, setGroupBy] = useState([]);
  // console.log(groupBy)
  const combinedFields = [
    ...(modalTemp.fields || []),
    ...(modalTemp.calculates || []),
  ];
  const addOrRemoveGroupByField = (fomular_alias) => {
    // console.log(id)
    const corespondingGroupByField = groupBy.find(
      (f) => f.fomular_alias == fomular_alias
    );
    let newGroupBy;
    if (corespondingGroupByField) {
      newGroupBy = groupBy.filter((f) => f.fomular_alias != fomular_alias);
    } else {
      const field = combinedFields.find(
        (f) => f.fomular_alias == fomular_alias
      );
      if (field) {
        newGroupBy = [...groupBy, field];
      }
    }
    setGroupBy(newGroupBy);
  };

  const isFieldChecked = (fomular_alias) => {
    return groupBy.some((f) => f.fomular_alias == fomular_alias);
  };

  const handleDeleteStatistical = (sta) => {
    // console.log(sta)
    // const newCalculates = calculates.filter(item => item.fomular_alias !== cal.fomular_alias);
    // setModalTemp(prev => ({
    //     ...prev,
    //     calculates: newCalculates
    // }));
    Swal.fire({
      title: lang["confirm"],
      text: lang["delete.field"],
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: lang["btn.delete"],
      cancelButtonText: lang["btn.cancel"],
      customClass: {
        confirmButton: "swal2-confirm my-confirm-button-class",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newCalculates = modalTemp.statistic.filter(
          (item) => item.fomular_alias !== sta.fomular_alias
        );
        setModalTemp((prev) => ({
          ...prev,
          statistic: newCalculates,
        }));
        Swal.fire({
          title: lang["success.title"],
          text: lang["delete.success.field"],
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // console.log(modalTemp.statistic)
  const [errorStatistical, setErrorStatistical] = useState({});
  const validateStatistical = () => {
    let temp = {};

    temp.display_name = display_name ? "" : lang["error.input"];
    temp.fomular = fomular ? "" : lang["error.input"];
    temp.field = field ? "" : lang["error.input"];

    setErrorStatistical({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const [field, setField] = useState("");

  const [statistical, setStatistical] = useState([]);

  const handleSubmitFieldStatistical = async (event) => {
    event.preventDefault();
    if (validateStatistical()) {
      const fomular_alias = await generateUniqueFormularAlias(display_name);

      const newStatistical = {
        fomular_alias,
        display_name,
        field,
        fomular,
        group_by: groupBy.map((g) => g.fomular_alias),
        raw_group_by: groupBy,
      };

      setModalTemp((prev) => ({
        ...prev,
        statistic: [...prev.statistic, newStatistical],
      }));
      setStatistical([...statistical, newStatistical]);
      setDisplayname("");
      setField("");
      setGroupBy([]);
      setFomular("");

      Swal.fire({
        title: lang["success.title"],
        text: lang["success.add"],
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      $("#closeAddStatis").click();
    }
  };

  const fieldShow = (project) => {
    window.location.href = `/projects/${version_id}/apis/create/fieldshow`;
    // window.location.href = `tables`;
  };
  const fieldStatistical = (project) => {
    window.location.href = `/projects/${version_id}/apis/create/fieldstatis`;
    // window.location.href = `tables`;
  };

  const findTableAndFieldInfo = (fieldId) => {
    for (const [tableId, tableInfo] of Object.entries(tableFields)) {
      const fieldInfo = tableInfo.fields.find((field) => field.id === fieldId);

      if (fieldInfo) {
        return { tableId, fieldInfo };
      }
    }

    return { tableId: null, fieldInfo: null };
  };
  const handleCloseModal = () => {
    setErrorStatistical({});
    setDisplayname("");
    setGroupBy([]);
    setField("");
    setFomular("");
    setErrorCaculates({});
  };

  return (
    <div class="midde_cont">
      <div class="container-fluid">
        <div class="row column_title">
          <div class="col-md-12">
            <div class="page_title">
              <h4>{lang["manage api"]}</h4>
            </div>
          </div>
        </div>
        {/* List table */}
        <div class="row">
          <div class="col-md-12">
            <div class="white_shd full margin_bottom_30">
              <div class="full graph_head">
                <div class="heading1 margin_0 ">
                  <h5>
                    <label class="pointer" onClick={() => back()}>
                      <i class="fa fa-chevron-circle-left mr-2"></i>
                      {lang["create api"]}
                    </label>{" "}
                  </h5>
                </div>
              </div>
              <div class="table_section padding_infor_info">
                <div class="row column1">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label class="font-weight-bold">
                        {lang["api name"]} <span className="red_star">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={modalTemp.api_name}
                        onChange={(e) =>
                          setModalTemp({
                            ...modalTemp,
                            api_name: e.target.value,
                          })
                        }
                        placeholder=""
                      />
                      {errorApi.api_name && (
                        <p className="text-danger">{errorApi.api_name}</p>
                      )}
                    </div>
                  </div>

                  <div class="col-md-12">
                    <label class="font-weight-bold">
                      {lang["projectstatus"]}{" "}
                      <span className="red_star">*</span>
                    </label>
                    <div class="row">
                      <div class="col-sm-3">
                        <div class="checkbox-item">
                          <label>
                            <input
                              class="mr-1"
                              type="radio"
                              checked={modalTemp.status === true}
                              onChange={() =>
                                setModalTemp({ ...modalTemp, status: true })
                              }
                            />
                            On
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-3">
                        <div class="checkbox-item">
                          <label>
                            {" "}
                            <input
                              class="mr-1"
                              type="radio"
                              checked={modalTemp.status === false}
                              onChange={() =>
                                setModalTemp({ ...modalTemp, status: false })
                              }
                            />
                            Off
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-3"></div>
                      <div class="col-sm-3"></div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <label class="font-weight-bold">Payload type</label>
                    <select
                      onChange={({ target: { value } }) => {
                        setModalTemp((prev) => ({
                          ...prev,
                          payload_type: value,
                        }));
                      }}
                    >
                      <option
                        value={"params"}
                        selected={
                          modalTemp.payload_type === "params" ||
                          modalTemp.api_method === "get"
                        }
                      >
                        Params
                      </option>
                      <option
                        value="body"
                        selected={
                          modalTemp.payload_type === "params" ||
                          modalTemp.api_method === "post" ||
                          modalTemp.api_method === "put"
                        }
                      >
                        Body
                      </option>
                    </select>
                  </div>

                  <div class="col-md-12">
                    <label class="font-weight-bold">
                      {lang["method"]} <span className="red_star">*</span>
                    </label>
                    <div class="row">
                      <div class="col-sm-3">
                        <div class="checkbox-item">
                          <label>
                            <input
                              class="mr-1"
                              type="radio"
                              checked={modalTemp.api_method === "get"}
                              onChange={() => {
                                const updatedModalTemp = {
                                  ...modalTemp,
                                  api_method: "get",
                                  tables: [],
                                  params: [],
                                  fields: [],
                                  body: [],
                                  calculates: [],
                                  statistic: [],
                                };
                                setModalTemp(updatedModalTemp);
                                setSelectedFieldsModal2([]);
                                setSelectedFields([]);
                                setSelectedFieldsBody([]);
                              }}
                            />
                            GET
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-3">
                        <div class="checkbox-item">
                          <label>
                            <input
                              class="mr-1"
                              type="radio"
                              checked={modalTemp.api_method === "post"}
                              onChange={() => {
                                const updatedModalTemp = {
                                  ...modalTemp,
                                  api_method: "post",
                                  tables: [],
                                  params: [],
                                  fields: [],
                                  body: [],
                                  calculates: [],
                                  statistic: [],
                                };
                                setModalTemp(updatedModalTemp);
                                setSelectedFieldsModal2([]);
                                setSelectedFields([]);
                                setSelectedFieldsBody([]);
                              }}
                            />
                            POST
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-3">
                        <div class="checkbox-item round">
                          <label>
                            <input
                              class="mr-1"
                              type="radio"
                              checked={modalTemp.api_method === "put"}
                              onChange={() => {
                                const updatedModalTemp = {
                                  ...modalTemp,
                                  api_method: "put",
                                  tables: [],
                                  params: [],
                                  fields: [],
                                  body: [],
                                  calculates: [],
                                  statistic: [],
                                };
                                setModalTemp(updatedModalTemp);
                                setSelectedFieldsModal2([]);
                                setSelectedFields([]);
                                setSelectedFieldsBody([]);
                              }}
                            />
                            PUT
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-3">
                        <div class="checkbox-item">
                          <label>
                            <input
                              class="mr-1"
                              type="radio"
                              checked={modalTemp.api_method === "delete"}
                              onChange={() => {
                                const updatedModalTemp = {
                                  ...modalTemp,
                                  api_method: "delete",
                                  tables: [],
                                  params: [],
                                  fields: [],
                                  body: [],
                                  calculates: [],
                                  statistic: [],
                                };
                                setModalTemp(updatedModalTemp);
                                setSelectedFieldsModal2([]);
                                setSelectedFields([]);
                                setSelectedFieldsBody([]);
                              }}
                            />
                            DELETE
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-group">
                      <label class="font-weight-bold">
                        {lang["api.description"]}
                      </label>
                      <textarea
                        rows={7}
                        className="form-control"
                        value={modalTemp.description}
                        onChange={(e) =>
                          setModalTemp({
                            ...modalTemp,
                            description: e.target.value,
                          })
                        }
                        placeholder=""
                      />
                    </div>
                  </div>
                  {/* Chọn các bảng */}
                  <div class="col-md-12 col-lg-12 bordered mr-4">
                    <div class="d-flex align-items-center mb-1">
                      <p class="font-weight-bold">
                        {lang["list of tables"]}
                        <span className="red_star"> *</span>
                      </p>
                      {errorApi.tables && (
                        <p className="text-danger">{errorApi.tables}</p>
                      )}
                      <button
                        type="button"
                        class="btn btn-primary custom-buttonadd ml-auto"
                        data-toggle="modal"
                        data-target="#addTables"
                      >
                        <i class="fa fa-plus"></i>
                      </button>
                    </div>
                    <div class="table-responsive">
                      {tables && tables.length > 0 ? (
                        <>
                          <table class="table table-striped">
                            <thead>
                              <tr>
                                <th class="font-weight-bold" scope="col">
                                  {lang["log.no"]}
                                </th>
                                <th class="font-weight-bold" scope="col">
                                  {lang["table name"]}
                                </th>
                                <th class="font-weight-bold" scope="col">
                                  {lang["creator"]}
                                </th>
                                <th class="font-weight-bold" scope="col">
                                  {lang["time"]}
                                </th>
                              </tr>
                            </thead>
                              <ReactSortable
                                list={tables}
                                setList={(list) => {
                                  setTables(list);
                                }}
                                tag="tbody"
                              >
                                {tables.map((table, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{table.table_name}</td>
                                    <td>{table.create_by?.fullname}</td>
                                    <td>{formatDate(table.create_at)}</td>
                                    <td>
                                      <Select
                                        // value={[]}
                                        onChange={({ value }) => {
                                          setModalTemp((prev) => {
                                            const newData = { ...prev };
                                            const i =
                                              newData?.table_type?.findIndex(
                                                (t) => t.table_id === table.id
                                              );
                                            if (i > -1) {
                                              newData.table_type[i].type =
                                                value;
                                            } else {
                                              const initials = {
                                                table_id: table.id,
                                                type: value,
                                              };
                                              if (newData?.table_type?.length) {
                                                newData.table_type.push(
                                                  initials
                                                );
                                              } else {
                                                newData.table_type = [initials];
                                              }
                                            }
                                            return newData;
                                          });
                                        }}
                                        options={[
                                          { label: "INSERT", value: "INSERT" },
                                          { label: "UPDATE", value: "UPDATE" },
                                        ]}
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </ReactSortable>
                        
                          </table>
                        </>
                      ) : (
                        <div class="list_cont ">
                          <p>{lang["not found"]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* {
                                        tables && tables.length > 0 ? (
                                            <> */}
                  {tables && tables.length > 0 ? (
                    <>
                      {/* Chọn đối số */}
                      {(modalTemp.api_method === "get" ||
                        modalTemp.api_method === "put" ||
                        modalTemp.api_method === "delete") && (
                        <div class="col-md-12 col-lg-12 bordered">
                          <div class="d-flex align-items-center mb-1">
                            <p class="font-weight-bold">
                              {lang["param fields"]}
                              {(modalTemp.api_method === "put" ||
                                modalTemp.api_method === "delete") && (
                                <span className="red_star"> *</span>
                              )}
                            </p>
                            {(modalTemp.api_method === "put" ||
                              (modalTemp.api_method === "delete" &&
                                errorApi.params)) && (
                              <p className="text-danger ml-2">
                                {errorApi.params}
                              </p>
                            )}
                            <button
                              type="button"
                              class="btn btn-primary custom-buttonadd ml-auto"
                              data-toggle="modal"
                              data-target="#addFieldParam"
                            >
                              <i class="fa fa-plus"></i>
                            </button>
                          </div>
                          <div class="table-responsive">
                            {modalTemp && modalTemp.params.length > 0 ? (
                              <>
                                <table class="table table-striped">
                                  <thead>
                                    <tr>
                                      <th class="font-weight-bold" scope="col">
                                        {lang["log.no"]}
                                      </th>
                                      <th class="font-weight-bold" scope="col">
                                        {lang["fields name"]}
                                      </th>
                                      <th class="font-weight-bold" scope="col">
                                        {lang["table name"]}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {modalTemp.params.map((fieldId, index) => {
                                      const { tableId, fieldInfo } =
                                        findTableAndFieldInfo(fieldId);

                                      if (!tableId || !fieldInfo) {
                                        return null; // Xử lý trường hợp không tìm thấy thông tin bảng hoặc trường
                                      }

                                      const tableInfo = tableFields[tableId];

                                      if (!tableInfo) {
                                        return null; // Xử lý trường hợp không tìm thấy thông tin bảng
                                      }

                                      return (
                                        <tr key={`${tableId}-${fieldId}`}>
                                          <td>{index + 1}</td>
                                          <td>{fieldInfo.field_name}</td>
                                          <td>{tableInfo.table_name}</td>
                                        </tr>
                                      );
                                    })}

                                    {/* {modalTemp.params.map((params, index) => (
                                                                                    <tr key={index}>
                                                                                        <td>{index + 1}</td>
                                                                                        <td>{statistic}</td>

                                                                                    </tr>
                                                                                ))} */}
                                  </tbody>
                                </table>
                              </>
                            ) : (
                              <div class="list_cont ">
                                <p>{lang["not found"]}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {/* Chọn body */}
                      {(modalTemp.api_method === "post" ||
                        modalTemp.api_method === "put") && (
                        <div class="col-md-12 col-lg-12 bordered">
                          <div class="d-flex align-items-center mb-1">
                            <p class="font-weight-bold">
                              {lang["fields data"]}
                              {(modalTemp.api_method === "post" ||
                                modalTemp.api_method === "put") && (
                                <span className="red_star"> *</span>
                              )}
                            </p>
                            {(modalTemp.api_method === "put" ||
                              (modalTemp.api_method === "post" &&
                                errorApi.body)) && (
                              <p className="text-danger ml-2">
                                {errorApi.body}
                              </p>
                            )}

                            <button
                              type="button"
                              class="btn btn-primary custom-buttonadd ml-auto"
                              data-toggle="modal"
                              data-target="#addFieldBody"
                            >
                              <i class="fa fa-plus"></i>
                            </button>
                          </div>
                          <div class="table-responsive">
                            {modalTemp && modalTemp.body.length > 0 ? (
                              <>
                                <table class="table table-striped">
                                  <thead>
                                    <tr>
                                      <th class="font-weight-bold" scope="col">
                                        {lang["log.no"]}
                                      </th>
                                      <th class="font-weight-bold" scope="col">
                                        {lang["fields name"]}
                                      </th>
                                      <th class="font-weight-bold" scope="col">
                                        {lang["table name"]}
                                      </th>
                                      <th class="font-weight-bold" scope="col">
                                        {lang["table method"]}
                                      </th>
                                      <th class="font-weight-bold" scope="col">
                                        {lang["table conditions"]}
                                      </th>
                                      <th class="font-weight-bold" scope="col">
                                        {lang["table setDefaultValue"]}
                                      </th>
                                    </tr>
                                  </thead>
                                  <ReactSortable
                                    list={modalTemp.body}
                                    setList={(list) => {
                                      setModalTemp((prev) => ({
                                        ...prev,
                                        body: list,
                                      }));
                                    }}
                                    tag="tbody"
                                  >
                                    {modalTemp.body.map(
                                      ({ fieldId, default_value }, index) => {
                                        const { tableId, fieldInfo } =
                                          findTableAndFieldInfo(fieldId);

                                        if (!tableId || !fieldInfo) {
                                          return null; // Xử lý trường hợp không tìm thấy thông tin bảng hoặc trường
                                        }

                                        const tableInfo = tableFields[tableId];

                                        if (!tableInfo) {
                                          return null; // Xử lý trường hợp không tìm thấy thông tin bảng
                                        }

                                        return (
                                          <tr key={`${tableId}-${fieldId}`}>
                                            <td>{index + 1}</td>
                                            <td>
                                              {fieldInfo.field_name}-
                                              {fieldInfo.fomular_alias}
                                            </td>
                                            <td>{tableInfo.table_name}</td>
                                            <td>
                                              <select
                                                class="form-select"
                                                aria-label="Default select example"
                                                onChange={({
                                                  target: { value },
                                                }) => {
                                                  setModalTemp((prev) => ({
                                                    ...prev,
                                                    body: prev.body.map(
                                                      (field) => {
                                                        if (
                                                          field.fieldId ===
                                                          fieldId
                                                        ) {
                                                          return {
                                                            ...field,
                                                            method_type: value,
                                                          };
                                                        }
                                                        return field;
                                                      }
                                                    ),
                                                  }));
                                                }}
                                              >
                                                {Object.keys(METHOD_TYPE).map(
                                                  (k) => (
                                                    <option
                                                      key={k}
                                                      selected
                                                      value={METHOD_TYPE[k]}
                                                    >
                                                      {METHOD_TYPE[k]}
                                                    </option>
                                                  )
                                                )}
                                              </select>
                                            </td>
                                            <td id="no-padding">
                                              <ColorContext.Provider
                                                value={{ color, setColor }}
                                              >
                                                <Conditions
                                                  onChange={({
                                                    field_id,
                                                    payload,
                                                  }) => {
                                                    handleChangeModalTempBody({
                                                      fieldId,
                                                      payload: {
                                                        conditions: payload,
                                                      },
                                                    });
                                                    // setConditions((prev) => {
                                                    //   let isChanged = false;
                                                    //
                                                    //   const newConditions =
                                                    //     prev.map((condition) => {
                                                    //       if (
                                                    //         condition.field_id ===
                                                    //         field_id
                                                    //       ) {
                                                    //         isChanged = true;
                                                    //         return {
                                                    //           ...payload,
                                                    //         };
                                                    //       }
                                                    //       return condition;
                                                    //     });
                                                    //   if (!isChanged) {
                                                    //     newConditions.push({
                                                    //       ...payload,
                                                    //     });
                                                    //   }
                                                    //   return newConditions;
                                                    // });
                                                  }}
                                                  field_id={fieldId}
                                                  fields={modalTemp.body.map(
                                                    ({ fieldId }, index) => {
                                                      const {
                                                        tableId,
                                                        fieldInfo: {
                                                          id,
                                                          field_name,
                                                          fomular_alias,
                                                        },
                                                      } =
                                                        findTableAndFieldInfo(
                                                          fieldId
                                                        );
                                                      return {
                                                        id,
                                                        field_name,
                                                        fomular_alias,
                                                      };
                                                    }
                                                  )}
                                                  tables={allTable}
                                                />
                                              </ColorContext.Provider>
                                            </td>
                                            <td>
                                              {
                                                <SetDefaultValue
                                                  fieldId={fieldId}
                                                 
                                                  default_value={default_value}
                                                  onChange={(props) => {
                                                    handleChangeModalTempBody({
                                                      fieldId,
                                                      payload: {
                                                        default_value:
                                                          props.value,
                                                      },
                                                    });
                                                  }}
                                                />
                                              }
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </ReactSortable>
                                </table>
                              </>
                            ) : (
                              <div class="list_cont ">
                                <p>{lang["not found"]}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {/* Chọn External body */}
                      {(modalTemp.api_method === "post" ||
                        modalTemp.api_method === "put" ||
                        modalTemp.api_method === "delete") && (
                        <div class="col-md-12 col-lg-12 bordered">
                          <div class="d-flex align-items-center mb-1">
                            <p class="font-weight-bold">
                              {lang["fields external body"]}
                            </p>
                            <button
                              type="button"
                              class="btn btn-primary custom-buttonadd ml-auto"
                              data-toggle="modal"
                              data-target="#addFieldExternalBody"
                            >
                              <i class="fa fa-plus"></i>
                            </button>
                          </div>
                          <div class="table-responsive">
                            {modalTemp && modalTemp.external_body.length > 0 ? (
                              <>
                                <table class="table table-striped">
                                  <thead>
                                    <tr>
                                      <th class="font-weight-bold" scope="col">
                                        {lang["log.no"]}
                                      </th>
                                      <th class="font-weight-bold" scope="col">
                                        {lang["fields name"]}
                                      </th>
                                      <th class="font-weight-bold" scope="col">
                                        {lang["alias"]}
                                      </th>
                                      <th class="font-weight-bold" scope="col">
                                        {lang["log.action"]}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {modalTemp.external_body.map(
                                      (ex, index) => {
                                        return (
                                          <tr key={`${index}`}>
                                            <td>{index + 1}</td>
                                            <td>{ex.field_name}</td>
                                            <td>{ex.fomular_alias}</td>
                                            <td
                                              class="align-center"
                                              style={{ minWidth: "130px" }}
                                            >
                                              <i
                                                class="fa fa-edit size-24 pointer icon-margin icon-edit"
                                                onClick={() =>
                                                  updateFieldExternalBody(ex)
                                                }
                                                data-toggle="modal"
                                                data-target="#editFieldExternalBody"
                                                title={lang["edit"]}
                                              ></i>
                                              <i
                                                class="fa fa-trash-o size-24 pointer icon-margin icon-delete"
                                                onClick={() =>
                                                  handleDeleteExternal(ex)
                                                }
                                                title={lang["delete"]}
                                              ></i>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </>
                            ) : (
                              <div class="list_cont ">
                                <p>{lang["not found"]}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Chọn trường hiển thị */}
                      {(modalTemp.api_method === "get" ||
                        modalTemp.api_method === "post") && (
                        <div class="col-md-12 col-lg-12 bordered">
                          <div class="d-flex align-items-center mb-1">
                            <p class="font-weight-bold">
                              {lang["fields display"]}{" "}
                              {modalTemp.api_method === "get" ? (
                                <span className="red_star">*</span>
                              ) : null}
                            </p>
                            {modalTemp.api_method === "get" && (
                              <p className="text-danger ml-2">
                                {errorApi.fields}
                              </p>
                            )}
                            <button
                              type="button"
                              class="btn btn-primary custom-buttonadd ml-auto"
                              data-toggle="modal"
                              data-target="#addFieldShow"
                            >
                              <i class="fa fa-plus"></i>
                            </button>
                          </div>
                          <div class="table-responsive">
                            {modalTemp.fields && modalTemp.fields.length > 0 ? (
                              <table class="table table-striped">
                                <thead>
                                  <tr>
                                    <th class="font-weight-bold">
                                      {lang["log.no"]}
                                    </th>
                                    <th class="font-weight-bold">
                                      {lang["fields name"]}
                                    </th>
                                    <th class="font-weight-bold">
                                      {lang["alias"]}
                                    </th>
                                    <td class="font-weight-bold">
                                      {lang["table name"]}
                                    </td>
                                  </tr>
                                </thead>
                                <tbody>
                                  {modalTemp.fields.map((field, index) => {
                                    const { tableId, fieldInfo } =
                                      findTableAndFieldInfo(field.id);
                                    if (!tableId || !fieldInfo) {
                                      return null; // Xử lý trường hợp không tìm thấy thông tin bảng hoặc trường
                                    }
                                    const tableInfo = tableFields[tableId];
                                    if (!tableInfo) {
                                      return null; // Xử lý trường hợp không tìm thấy thông tin bảng
                                    }
                                    return (
                                      <tr key={`${tableId}-${field.id}`}>
                                        <td>{index + 1}</td>
                                        <td>{fieldInfo.field_name}</td>
                                        <td>{fieldInfo.fomular_alias}</td>
                                        <td>{tableInfo.table_name}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            ) : (
                              <div class="list_cont ">
                                <p>{lang["not found"]}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  ) : null}
                  {modalTemp.fields && modalTemp.fields.length > 0 ? (
                    <>
                      {/* Chọn trường tính toán */}
                      {(modalTemp.api_method === "get" ||
                        modalTemp.api_method === "post") && (
                        <div class="col-md-12 col-lg-12 bordered">
                          <div class="d-flex align-items-center mb-1">
                            <p class="font-weight-bold">
                              {lang["calculated fields"]}
                            </p>
                            <button
                              type="button"
                              class="btn btn-primary custom-buttonadd ml-auto"
                              data-toggle="modal"
                              data-target="#addFieldCalculates"
                            >
                              <i class="fa fa-plus"></i>
                            </button>
                          </div>
                          <div class="table-responsive">
                            {modalTemp.calculates &&
                            modalTemp.calculates.length > 0 ? (
                              <table class="table table-striped">
                                <thead>
                                  <tr>
                                    <th class="font-weight-bold">
                                      {lang["log.no"]}
                                    </th>
                                    <th class="font-weight-bold">
                                      {lang["fields name"]}
                                    </th>
                                    <th class="font-weight-bold">
                                      {lang["alias"]}
                                    </th>
                                    <th class="font-weight-bold">
                                      {lang["calculations"]}
                                    </th>
                                    <th class="font-weight-bold align-center">
                                      {lang["log.action"]}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {modalTemp.calculates.map(
                                    (calculates, index) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{calculates.display_name}</td>
                                        <td>{calculates.fomular_alias}</td>
                                        <td>{calculates.fomular}</td>
                                        <td
                                          class="align-center "
                                          style={{ minWidth: "130px" }}
                                        >
                                          <i
                                            class="fa fa-edit size-24 pointer icon-margin icon-edit"
                                            onClick={() =>
                                              updateFieldCalculates(calculates)
                                            }
                                            data-toggle="modal"
                                            data-target="#editCalculates"
                                            title={lang["edit"]}
                                          ></i>
                                          <i
                                            class="fa fa-trash-o size-24 pointer icon-margin icon-delete"
                                            onClick={() =>
                                              handleDeleteCalculates(calculates)
                                            }
                                            title={lang["delete"]}
                                          ></i>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            ) : (
                              <div class="list_cont ">
                                <p>{lang["not found"]}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {/* Chọn trường thống kê */}
                      {(modalTemp.api_method === "get" ||
                        modalTemp.api_method === "post") && (
                        <div class="col-md-12 col-lg-12 bordered">
                          <div class="d-flex align-items-center mb-1">
                            <p class="font-weight-bold">
                              {lang["statistical fields"]}
                            </p>
                            <button
                              type="button"
                              class="btn btn-primary custom-buttonadd ml-auto"
                              data-toggle="modal"
                              data-target="#addFieldStatistical"
                            >
                              <i class="fa fa-plus"></i>
                            </button>
                          </div>
                          <div class="table-responsive">
                            {modalTemp.statistic &&
                            modalTemp.statistic.length > 0 ? (
                              <table class="table table-striped">
                                <thead>
                                  <tr>
                                    <th class="font-weight-bold">
                                      {lang["log.no"]}
                                    </th>
                                    <th class="font-weight-bold">
                                      {lang["fields name"]}
                                    </th>
                                    <th class="font-weight-bold">
                                      {lang["alias"]}
                                    </th>
                                    <th class="font-weight-bold">
                                      {lang["group by"]}
                                    </th>
                                    <th class="font-weight-bold">
                                      {lang["calculations"]}
                                    </th>
                                    <th class="font-weight-bold align-center">
                                      {lang["log.action"]}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {modalTemp.statistic.map(
                                    (statistic, index) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{statistic.display_name}</td>
                                        <td>{statistic.field}</td>
                                        <td>
                                          {statistic.raw_group_by
                                            ?.map((field) => field.display_name)
                                            .join(", ")}
                                        </td>
                                        <td>{statistic.fomular}</td>
                                        <td
                                          class="align-center"
                                          style={{ minWidth: "130px" }}
                                        >
                                          <i
                                            class="fa fa-edit size-24 pointer icon-margin icon-edit"
                                            onClick={() =>
                                              updateFieldStatistical(statistic)
                                            }
                                            data-toggle="modal"
                                            data-target="#editStatistical"
                                            title={lang["edit"]}
                                          ></i>
                                          <i
                                            class="fa fa-trash-o size-24 pointer icon-margin icon-delete"
                                            onClick={() =>
                                              handleDeleteStatistical(statistic)
                                            }
                                            title={lang["delete"]}
                                          ></i>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            ) : (
                              <div class="list_cont ">
                                <p>{lang["not found"]}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  ) : null}
                  <div className="mt-2 d-flex justify-content-end ml-auto">
                    <button
                      type="button"
                      onClick={handleSubmitModal}
                      class="btn btn-success mr-2"
                    >
                      {lang["btn.update"]}
                    </button>
                    <button
                      type="button"
                      onClick={() => back()}
                      data-dismiss="modal"
                      class="btn btn-danger"
                    >
                      {lang["btn.close"]}
                    </button>
                  </div>
                  {/* </>
                                        ) : (
                                            null
                                        )
                                    } */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*add table */}
        <div
          class={`modal no-select-modal ${showModal ? "show" : ""}`}
          id="addTables"
        >
          <div class="modal-dialog modal-dialog-center">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">{lang["select table"]}</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div className={`form-group col-lg-12`}>
                    <label>
                      {lang["table name"]} <span className="red_star">*</span>
                    </label>
                    <select className="form-control" onChange={handleChange}>
                      <option value="">{lang["choose"]}</option>
                      {possibleTables.map((table) => (
                        <option key={table.id} value={table.table_name}>
                          {table.table_name}
                        </option>
                      ))}
                    </select>

                    {selectedTables.length > 0 && (
                      <div className={`form-group col-lg-12 mt-2`}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <label>
                            {lang["selected table"]}:{" "}
                            <span className="red_star">*</span>
                          </label>
                          <button
                            class="btn btn-danger mb-2"
                            onClick={handleDeleteAll}
                          >
                            {lang["deleteall"]}
                          </button>
                        </div>
                        <div className="outerBox">
                          {selectedTables.map((table) => (
                            <div key={table.id} className="innerBox">
                              {table.table_name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div class="form-group col-md-12">
                    <label>{lang["creator"]}</label>
                    <input
                      class="form-control"
                      type="text"
                      value={users.fullname}
                      readOnly
                    ></input>
                  </div>
                  <div class="form-group col-md-12">
                    <label>{lang["time"]}</label>
                    <input
                      class="form-control"
                      type="text"
                      value={new Date().toISOString().substring(0, 10)}
                      readOnly
                    ></input>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-success"
                  data-dismiss="modal"
                  onClick={handleSubmitTables}
                >
                  {" "}
                  {lang["btn.create"]}
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  class="btn btn-danger"
                >
                  {lang["btn.close"]}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*add fieldParam */}
        <div
          class={`modal  no-select-modal ${showModal ? "show" : ""}`}
          id="addFieldParam"
        >
          <div class="modal-dialog modal-dialog-center">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">{lang["add param"]}</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div className="container-field">
                    {/* {modalTemp.tables?.map((tableId, index) => (
                                            <div key={index} className={`form-group table-wrapper`}>
                                                <label className="table-label">{tableFields[tableId]?.table_name}</label>
                                                {tableFields[tableId]?.fields && tableFields[tableId].fields.map((field, fieldIndex) => (
                                                    <div key={fieldIndex}>
                                                        <label>
                                                            <input className="mr-1 "
                                                                type="checkbox"
                                                                checked={selectedFields[tableId]?.includes(field.id) ?? false}
                                                                onChange={e => handleCheckboxChange(tableId, field.id, e.target.checked)}
                                                            />
                                                            {field.field_name}
                                                            {field.props.DATATYPE}
                                                        </label>
                                                    </div>
                                                ))}

                                            </div>
                                        ))} */}

                    {modalTemp.tables?.map((tableId, index) => (
                      <div key={index} className="form-group table-wrapper">
                        <label className="table-label">
                          {tableFields[tableId]?.table_name}
                        </label>
                        <div className="field-wrapper">
                          {tableFields[tableId]?.fields &&
                            tableFields[tableId].fields.map(
                              (field, fieldIndex) => {
                                // Check if the field is a foreign key
                                let isForeignKey = tableFields[
                                  tableId
                                ]?.foreign_keys?.find(
                                  (fk) => fk.field_id === field.id
                                );
                                let correspondingPrimaryKeyExists = false;

                                // Check if the corresponding primary key exists in any of the tables
                                if (isForeignKey) {
                                  modalTemp.tables?.forEach((tid) => {
                                    correspondingPrimaryKeyExists =
                                      tableFields[tid]?.fields.some(
                                        (obj) =>
                                          obj.id === isForeignKey.ref_field_id
                                      ) || correspondingPrimaryKeyExists;
                                  });
                                }

                                function isPrimaryKey(tableId, fieldId) {
                                  return tableFields[
                                    tableId
                                  ]?.primary_key.includes(fieldId);
                                }
                                // Check if the field is of type 'date'
                                let isDateField =
                                  field.props.DATATYPE === "DATE" ||
                                  field.props.DATATYPE === "DATETIME" ||
                                  field.props.DATATYPE === "DECIMAL" ||
                                  field.props.DATATYPE === "DECIMAL UNSIGNED";

                                return (
                                  <div key={fieldIndex}>
                                    <label>
                                      <input
                                        className="mr-1"
                                        type="checkbox"
                                        checked={
                                          selectedFields[tableId]?.find(
                                            ({ fieldId: id }) => id === field.id
                                          ) ?? false
                                        }
                                        onChange={(e) => {
                                          // If it's a date field, show error and prevent checking
                                          if (isDateField && e.target.checked) {
                                            Swal.fire({
                                              title: lang["log.error"],
                                              text: lang["error.date"],
                                              icon: "error",
                                              showConfirmButton: true,
                                              customClass: {
                                                confirmButton:
                                                  "swal2-confirm my-confirm-button-class",
                                              },
                                            });
                                            e.preventDefault();
                                          } else if (
                                            isForeignKey &&
                                            e.target.checked &&
                                            isPrimaryKey(
                                              isForeignKey.table_id,
                                              isForeignKey.ref_field_id
                                            ) &&
                                            selectedFields[
                                              isForeignKey.table_id
                                            ]?.find(
                                              ({ fieldId: id }) =>
                                                id === isForeignKey.ref_field_id
                                            )
                                          ) {
                                            Swal.fire({
                                              title: lang["log.error"],
                                              text: lang["error.fk"],
                                              icon: "error",
                                              showConfirmButton: true,
                                              customClass: {
                                                confirmButton:
                                                  "swal2-confirm my-confirm-button-class",
                                              },
                                            });
                                            e.preventDefault();
                                          } else {
                                            handleCheckboxChange(
                                              tableId,
                                              field.id,
                                              e.target.checked
                                            );
                                          }
                                        }}
                                      />
                                      {field.field_name}
                                    </label>
                                  </div>
                                );
                              }
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div class="form-group col-md-12">
                    <label>{lang["creator"]} </label>
                    <input
                      class="form-control"
                      type="text"
                      value={users.fullname}
                      readOnly
                    ></input>
                  </div>
                  <div class="form-group col-md-12">
                    <label>{lang["time"]} </label>
                    <input
                      class="form-control"
                      type="text"
                      value={new Date().toISOString().substring(0, 10)}
                      readOnly
                    ></input>
                  </div>
                </form>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  onClick={handleSubmitParam}
                  data-dismiss="modal"
                  class="btn btn-success "
                >
                  {lang["btn.create"]}
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  class="btn btn-danger"
                >
                  {lang["btn.close"]}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*add Field show */}
        <div class={`modal ${showModal ? "show" : ""}`} id="addFieldShow">
          <div class="modal-dialog modal-dialog-center">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">{lang["add fields show"]}</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div className="container-field">
                    {modalTemp.tables?.map((tableId, index) => (
                      <div key={index} className={`form-group table-wrapper`}>
                        <label className="table-label">
                          {tableFields[tableId]?.table_name}
                        </label>
                        <div className="field-wrapper">
                          {tableFields[tableId] &&
                            tableFields[tableId].fields.map(
                              (field, fieldIndex) => {
                                // Check if the field is a foreign key
                                let isForeignKey = tableFields[
                                  tableId
                                ]?.foreign_keys?.find(
                                  (fk) => fk.field_id === field.id
                                );
                                let correspondingPrimaryKeyExists = false;

                                // Check if the corresponding primary key exists in any of the tables
                                if (isForeignKey) {
                                  modalTemp.tables?.forEach((tid) => {
                                    correspondingPrimaryKeyExists =
                                      tableFields[tid]?.fields.some(
                                        (obj) =>
                                          obj.id === isForeignKey.ref_field_id
                                      ) || correspondingPrimaryKeyExists;
                                  });
                                }

                                return (
                                  <div key={fieldIndex}>
                                    <label>
                                      <input
                                        className="mr-1"
                                        type="checkbox"
                                        value={field.id}
                                        checked={
                                          selectedFieldsModal2[tableId]?.some(
                                            (obj) => obj.id === field.id
                                          ) ?? false
                                        }
                                        onChange={(e) => {
                                          const checked = e.target.checked;

                                          // Kiểm tra nếu trường hiện tại là khóa ngoại và đã được chọn,
                                          // và khóa chính tương ứng của nó cũng đã được chọn trước đó.
                                          if (
                                            isForeignKey &&
                                            checked &&
                                            isPrimaryKey(
                                              isForeignKey.table_id,
                                              isForeignKey.ref_field_id
                                            ) &&
                                            selectedFieldsModal2[
                                              isForeignKey.table_id
                                            ]?.some(
                                              (f) =>
                                                f.id ===
                                                isForeignKey.ref_field_id
                                            )
                                          ) {
                                            Swal.fire({
                                              title: lang["log.error"],
                                              text: lang["error.fk"],
                                              icon: "error",
                                              showConfirmButton: true,
                                              customClass: {
                                                confirmButton:
                                                  "swal2-confirm my-confirm-button-class",
                                              },
                                            });
                                            e.preventDefault();
                                          } else {
                                            setSelectedFieldsModal2(
                                              (prevState) => {
                                                let newFields = {
                                                  ...prevState,
                                                };

                                                if (checked) {
                                                  if (!newFields[tableId])
                                                    newFields[tableId] = [];
                                                  newFields[tableId].push({
                                                    id: field.id,
                                                    display_name:
                                                      field.field_name,
                                                    fomular_alias:
                                                      field.fomular_alias,
                                                  });

                                                  // Bỏ chọn khóa ngoại nếu khóa chính tương ứng được chọn
                                                  if (
                                                    isPrimaryKey(
                                                      tableId,
                                                      field.id
                                                    )
                                                  ) {
                                                    for (let tid in tableFields) {
                                                      for (const fk of tableFields[
                                                        tid
                                                      ]?.foreign_keys || []) {
                                                        if (
                                                          fk.ref_field_id ===
                                                            field.id &&
                                                          newFields[tid]
                                                        ) {
                                                          newFields[tid] =
                                                            newFields[
                                                              tid
                                                            ].filter(
                                                              (f) =>
                                                                f.id !==
                                                                fk.field_id
                                                            );
                                                        }
                                                      }
                                                    }
                                                  }
                                                } else {
                                                  newFields[tableId] =
                                                    newFields[tableId].filter(
                                                      (f) => f.id !== field.id
                                                    );
                                                }

                                                return newFields;
                                              }
                                            );
                                          }
                                        }}
                                      />
                                      {field.field_name}
                                    </label>
                                  </div>
                                );
                              }
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div class="form-group col-md-12">
                    <label>{lang["creator"]} </label>
                    <input
                      class="form-control"
                      type="text"
                      value={users.fullname}
                      readOnly
                    ></input>
                  </div>
                  <div class="form-group col-md-12">
                    <label>{lang["time"]} </label>
                    <input
                      class="form-control"
                      type="text"
                      value={new Date().toISOString().substring(0, 10)}
                      readOnly
                    ></input>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  onClick={handleSubmitShow}
                  data-dismiss="modal"
                  class="btn btn-success "
                >
                  {lang["btn.create"]}
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  class="btn btn-danger"
                >
                  {lang["btn.close"]}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*add Field Body */}
        <div class={`modal ${showModal ? "show" : ""}`} id="addFieldBody">
          <div class="modal-dialog modal-dialog-center">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">{lang["add fields body"]}</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div className="container-field">
                    {modalTemp.tables?.map((tableId, index) => (
                      <div key={index} className="form-group table-wrapper">
                        <label className="table-label">
                          {tableFields[tableId]?.table_name}
                        </label>
                        <div className="field-wrapper">
                          {tableFields[tableId]?.fields &&
                            tableFields[tableId].fields.map(
                              (field, fieldIndex) => {
                                // Check if the field is a foreign key
                                let isForeignKey = tableFields[
                                  tableId
                                ]?.foreign_keys?.find(
                                  (fk) => fk.field_id === field.id
                                );
                                let correspondingPrimaryKeyExists = false;

                                // Check if the corresponding primary key exists in any of the tables
                                if (isForeignKey) {
                                  modalTemp.tables?.forEach((tid) => {
                                    correspondingPrimaryKeyExists =
                                      tableFields[tid]?.fields.some(
                                        (obj) =>
                                          obj.id === isForeignKey.ref_field_id
                                      ) || correspondingPrimaryKeyExists;
                                  });
                                }

                                function isPrimaryKey(tableId, fieldId) {
                                  return tableFields[
                                    tableId
                                  ]?.primary_key.includes(fieldId);
                                }

                                return (
                                  <div key={fieldIndex}>
                                    <label>
                                      <input
                                        className="mr-1"
                                        type="checkbox"
                                        checked={
                                          selectedFieldsBody[tableId]?.find(
                                            ({ fieldId }) =>
                                              fieldId === field.id
                                          ) ?? false
                                        }
                                        onChange={(e) => {
                                          if (
                                            isForeignKey &&
                                            e.target.checked &&
                                            isPrimaryKey(
                                              isForeignKey.table_id,
                                              isForeignKey.ref_field_id
                                            ) &&
                                            selectedFieldsBody[
                                              isForeignKey.table_id
                                            ]?.find(
                                              ({ fieldId }) =>
                                                fieldId ===
                                                isForeignKey.ref_field_id
                                            )
                                          ) {
                                            Swal.fire({
                                              title: lang["log.error"],
                                              text: lang["error.fk"],
                                              icon: "error",
                                              showConfirmButton: true,
                                              customClass: {
                                                confirmButton:
                                                  "swal2-confirm my-confirm-button-class",
                                              },
                                            });
                                            e.preventDefault();
                                          } else {
                                            handleCheckboxChangeBody(
                                              tableId,
                                              field.id,
                                              e.target.checked
                                            );
                                          }
                                        }}
                                      />
                                      {field.field_name}
                                    </label>
                                  </div>
                                );
                              }
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div class="form-group col-md-12">
                    <label>{lang["creator"]} </label>
                    <input
                      class="form-control"
                      type="text"
                      value={users.fullname}
                      readOnly
                    ></input>
                  </div>
                  <div class="form-group col-md-12">
                    <label>{lang["time"]}</label>
                    <input
                      class="form-control"
                      type="text"
                      value={new Date().toISOString().substring(0, 10)}
                      readOnly
                    ></input>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  onClick={handleSubmitBody}
                  data-dismiss="modal"
                  class="btn btn-success "
                >
                  {lang["btn.create"]}
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  class="btn btn-danger"
                >
                  {lang["btn.close"]}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*add Field External Body */}
        <div
          class={`modal ${showModal ? "show" : ""}`}
          id="addFieldExternalBody"
        >
          <div class="modal-dialog modal-dialog-center">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">{lang["add fields external body"]}</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group col-lg-12">
                    <label>
                      {lang["fields name"]} <span className="red_star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={externalBody.field_name}
                      onChange={(e) =>
                        setExternalBody({
                          ...externalBody,
                          field_name: e.target.value,
                        })
                      }
                      placeholder=""
                    />
                    {errorApi.field_name && (
                      <p className="text-danger">{errorApi.field_name}</p>
                    )}
                  </div>
                  <div class="form-group col-lg-12">
                    <label>
                      {lang["alias"]}
                      <span className="red_star">*</span>
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={externalBody.fomular_alias}
                      onInput={(e) => {
                        let inputValue = e.target.value;

                        // Regex này sẽ cho phép ký tự tiếng Việt, số, "_", và "-" mà không có khoảng trắng hoặc ký tự đặc biệt khác
                        //    const allowedCharactersRegex = /^[A-Za-z0-9À-ỹ_.-]+$/;
                        const allowedCharactersRegex = /^[A-Za-z0-9À-ỹ_.-]+$/;

                        const check = modalTemp.external_body?.find(
                          (ex) => ex.fomular_alias === inputValue
                        );

                        let temp = {};
                        temp.fomular_alias = check
                          ? lang["duplicate fomular"]
                          : "";

                        if (!allowedCharactersRegex.test(inputValue)) {
                          setErrorApi({
                            fomular_alias: lang["error.invalidCharacter"],
                          });
                        }
                        setErrorApi({
                          ...temp,
                        });

                        // Kiểm tra xem chuỗi có bắt đầu bằng một số
                        if (inputValue && isNaN(inputValue[0])) {
                          setExternalBody({
                            ...externalBody,
                            fomular_alias: inputValue,
                          });
                        } else if (!inputValue) {
                          setExternalBody({
                            ...externalBody,
                            fomular_alias: "",
                          });
                        }
                      }}
                      placeholder=""
                    />

                    {errorApi.fomular_alias && (
                      <p className="text-danger">{errorApi.fomular_alias}</p>
                    )}
                  </div>
                  <div class="form-group col-lg-12">
                    <label>
                      {lang["fields default"]}{" "}
                      <span className="red_star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={externalBody.default_vlaue}
                      onChange={(e) =>
                        setExternalBody({
                          ...externalBody,
                          default_vlaue: e.target.value,
                        })
                      }
                      placeholder=""
                    />
                  </div>
                  <div class="form-group col-lg-12">
                    <label>{lang["null"]} </label>
                    <select
                      className="form-control"
                      onChange={(e) =>
                        setExternalBody((prevState) => ({
                          ...prevState,
                          props: {
                            ...prevState.props,
                            NULL: e.target.value === "true" ? true : false,
                          },
                        }))
                      }
                    >
                      {typenull.map((item, index) => {
                        return (
                          <option key={index} value={item.value}>
                            {item.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div class={`form-group col-lg-12`}>
                    <label>
                      {" "}
                      {lang["datatype"]} <span className="red_star">*</span>{" "}
                    </label>
                    <select
                      className="form-control"
                      value={externalBody.props.DATATYPE}
                      onChange={(e) => {
                        const selectedDataType = e.target.value;
                        const selectedType = types.find(
                          (type) => type.name === selectedDataType
                        );
                        if (selectedType) {
                          setExternalBody((prevModalTemp) => {
                            const updateValues = {
                              ...prevModalTemp.props, // giữ nguyên các giá trị props hiện tại
                              PATTERN: defaultValuesExternalbody.props.PATTERN,
                              FORMAT: defaultValuesExternalbody.props.FORMAT,
                              DATATYPE: selectedDataType,
                            };
                            // Nếu có giới hạn, gán giá trị min, max tương ứng
                            if (selectedType.limit) {
                              const { min, max } = selectedType.limit;
                              updateValues.MIN =
                                min !== undefined
                                  ? String(min)
                                  : prevModalTemp.props.MIN;
                              updateValues.MAX =
                                max !== undefined
                                  ? String(max)
                                  : prevModalTemp.props.MAX;
                            }
                            // Nếu là kiểu date, gán định dạng ngày
                            if (
                              selectedType.type === "date" ||
                              selectedType.type === "datetime"
                            ) {
                              updateValues.FORMAT = selectedType.format;
                            }
                            return {
                              ...prevModalTemp, // giữ nguyên các giá trị hiện tại của externalBody
                              props: updateValues, // cập nhật object props
                            };
                          });
                        } else {
                          setExternalBody((prevModalTemp) => ({
                            ...prevModalTemp,
                            props: {
                              ...prevModalTemp.props,
                              DATATYPE: selectedDataType,
                            },
                          }));
                        }
                      }}
                    >
                      <option value="">{lang["choose"]} </option>
                      {types.map((type, index) => (
                        <option key={index} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    {errorApi.DATATYPE && (
                      <p className="text-danger">{errorApi.DATATYPE}</p>
                    )}
                  </div>
                  <div class="form-group col-lg-12 ml-2">
                    {types.map((type) => {
                      if (type.name !== externalBody.props.DATATYPE)
                        return null;

                      return (
                        <div key={type.id}>
                          {type.props.map((prop, index) => {
                            let inputType = prop.type;
                            let isBoolType = prop.type === "bool";
                            let value = externalBody[prop.name];

                            if (inputType === "int") {
                              if (prop.name === "MIN") value = type.limit.min;
                              if (prop.name === "MAX") value = type.limit.max;
                            }
                            return (
                              <div key={index} className="form-group col-lg-12">
                                <label>{prop.label} </label>
                                {isBoolType ? (
                                  <select
                                    className="form-control"
                                    value={value}
                                    onChange={(e) => {
                                      setExternalBody((prevModalTemp) => ({
                                        ...prevModalTemp,
                                        props: {
                                          ...prevModalTemp.props,
                                          [prop.name]:
                                            e.target.value === "true",
                                        },
                                      }));
                                    }}
                                  >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                  </select>
                                ) : (
                                  <input
                                    className="form-control"
                                    type={
                                      inputType === "int" ? "number" : inputType
                                    }
                                    defaultValue={value}
                                    onChange={(e) => {
                                      setExternalBody((prevModalTemp) => ({
                                        ...prevModalTemp,
                                        props: {
                                          ...prevModalTemp.props,
                                          [prop.name]: e.target.value,
                                        },
                                      }));
                                    }}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>

                  <div class="form-group col-md-12">
                    <label>{lang["creator"]} </label>
                    <input
                      class="form-control"
                      type="text"
                      value={users.fullname}
                      readOnly
                    ></input>
                  </div>
                  <div class="form-group col-md-12">
                    <label>{lang["time"]}</label>
                    <input
                      class="form-control"
                      type="text"
                      value={new Date().toISOString().substring(0, 10)}
                      readOnly
                    ></input>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  onClick={handleSubmitExternalBody}
                  class="btn btn-success "
                >
                  {lang["btn.create"]}
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  id="closeModalExternalBody"
                  class="btn btn-danger"
                >
                  {lang["btn.close"]}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Field External Body */}
        <div
          class={`modal ${showModal ? "show" : ""}`}
          id="editFieldExternalBody"
        >
          <div class="modal-dialog modal-dialog-center">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">{lang["add fields external body"]}</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group col-lg-12">
                    <label>
                      {lang["fields name"]} <span className="red_star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={externalBodyUpdate.field_name}
                      onChange={(e) =>
                        setExternalBodyUpdate({
                          ...externalBodyUpdate,
                          field_name: e.target.value,
                        })
                      }
                      placeholder=""
                    />
                    {errorApi.field_name && (
                      <p className="text-danger">{errorApi.field_name}</p>
                    )}
                  </div>
                  <div class="form-group col-lg-12">
                    <label>
                      {lang["alias"]}
                      <span className="red_star">*</span>
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={externalBodyUpdate.fomular_alias}
                      onInput={(e) => {
                        let inputValue = e.target.value;

                        // Regex này sẽ cho phép ký tự tiếng Việt, số, "_", và "-" mà không có khoảng trắng hoặc ký tự đặc biệt khác
                        //    const allowedCharactersRegex = /^[A-Za-z0-9À-ỹ_.-]+$/;
                        const allowedCharactersRegex = /^[A-Za-z0-9À-ỹ_.-]+$/;

                        const check = modalTemp.external_body?.find(
                          (ex) => ex.fomular_alias === inputValue
                        );

                        let temp = {};
                        temp.fomular_alias = check
                          ? lang["duplicate fomular"]
                          : "";

                        if (!allowedCharactersRegex.test(inputValue)) {
                          setErrorApi({
                            fomular_alias: lang["error.invalidCharacter"],
                          });
                        }
                        setErrorApi({
                          ...temp,
                        });

                        // Kiểm tra xem chuỗi có bắt đầu bằng một số
                        if (inputValue && isNaN(inputValue[0])) {
                          setExternalBodyUpdate({
                            ...externalBodyUpdate,
                            fomular_alias: inputValue,
                          });
                        } else if (!inputValue) {
                          setExternalBodyUpdate({
                            ...externalBodyUpdate,
                            fomular_alias: "",
                          });
                        }
                      }}
                      placeholder=""
                    />

                    {errorApi.fomular_alias && (
                      <p className="text-danger">{errorApi.fomular_alias}</p>
                    )}
                  </div>
                  <div class="form-group col-lg-12">
                    <label>
                      {lang["fields default"]}{" "}
                      <span className="red_star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={externalBodyUpdate.default_vlaue}
                      onChange={(e) =>
                        setExternalBodyUpdate({
                          ...externalBodyUpdate,
                          default_vlaue: e.target.value,
                        })
                      }
                      placeholder=""
                    />
                  </div>
                  <div class="form-group col-lg-12">
                    <label>{lang["null"]} </label>
                    <select
                      className="form-control"
                      onChange={(e) =>
                        setExternalBodyUpdate((prevState) => ({
                          ...prevState,
                          props: {
                            ...prevState.props,
                            NULL: e.target.value === "true" ? true : false,
                          },
                        }))
                      }
                    >
                      {typenull.map((item, index) => {
                        return (
                          <option key={index} value={item.value}>
                            {item.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div class={`form-group col-lg-12`}>
                    <label>
                      {" "}
                      {lang["datatype"]} <span className="red_star">*</span>{" "}
                    </label>
                    <select
                      className="form-control"
                      value={externalBodyUpdate?.props?.DATATYPE}
                      onChange={(e) => {
                        const selectedDataType = e.target.value;
                        const selectedType = types.find(
                          (type) => type.name === selectedDataType
                        );
                        if (selectedType) {
                          setExternalBodyUpdate((prevModalTemp) => {
                            const updateValues = {
                              ...prevModalTemp.props, // giữ nguyên các giá trị props hiện tại
                              PATTERN: externalBodyUpdate.props.PATTERN,
                              FORMAT: externalBodyUpdate.props.FORMAT,
                              DATATYPE: selectedDataType,
                            };
                            // Nếu có giới hạn, gán giá trị min, max tương ứng
                            if (selectedType.limit) {
                              const { min, max } = selectedType.limit;
                              updateValues.MIN =
                                min !== undefined
                                  ? String(min)
                                  : prevModalTemp.props.MIN;
                              updateValues.MAX =
                                max !== undefined
                                  ? String(max)
                                  : prevModalTemp.props.MAX;
                            }
                            // Nếu là kiểu date, gán định dạng ngày
                            if (
                              selectedType.type === "date" ||
                              selectedType.type === "datetime"
                            ) {
                              updateValues.FORMAT = selectedType.format;
                            }
                            return {
                              ...prevModalTemp, // giữ nguyên các giá trị hiện tại của externalBody
                              props: updateValues, // cập nhật object props
                            };
                          });
                        } else {
                          setExternalBody((prevModalTemp) => ({
                            ...prevModalTemp,
                            props: {
                              ...prevModalTemp.props,
                              DATATYPE: selectedDataType,
                            },
                          }));
                        }
                      }}
                    >
                      <option value="">{lang["choose"]} </option>
                      {types.map((type, index) => (
                        <option key={index} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    {errorApi.DATATYPE && (
                      <p className="text-danger">{errorApi.DATATYPE}</p>
                    )}
                  </div>
                  <div class="form-group col-lg-12 ml-2">
                    {types.map((type) => {
                      if (type.name !== externalBodyUpdate?.props?.DATATYPE)
                        return null;

                      return (
                        <div key={type.id}>
                          {type.props.map((prop, index) => {
                            let inputType = prop.type;
                            let isBoolType = prop.type === "bool";
                            let value = externalBodyUpdate.props[prop.name];

                            if (inputType === "int") {
                              if (prop.name === "MIN") value = type.limit.min;
                              if (prop.name === "MAX") value = type.limit.max;
                            }
                            return (
                              <div key={index} className="form-group col-lg-12">
                                <label>{prop.label} </label>
                                {isBoolType ? (
                                  <select
                                    className="form-control"
                                    value={value}
                                    onChange={(e) => {
                                      setExternalBodyUpdate(
                                        (prevModalTemp) => ({
                                          ...prevModalTemp,
                                          props: {
                                            ...prevModalTemp.props,
                                            [prop.name]:
                                              e.target.value === "true",
                                          },
                                        })
                                      );
                                    }}
                                  >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                  </select>
                                ) : (
                                  <input
                                    className="form-control"
                                    type={
                                      inputType === "int" ? "number" : inputType
                                    }
                                    defaultValue={value}
                                    onChange={(e) => {
                                      setExternalBodyUpdate(
                                        (prevModalTemp) => ({
                                          ...prevModalTemp,
                                          props: {
                                            ...prevModalTemp.props,
                                            [prop.name]: e.target.value,
                                          },
                                        })
                                      );
                                    }}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>

                  <div class="form-group col-md-12">
                    <label>{lang["creator"]} </label>
                    <input
                      class="form-control"
                      type="text"
                      value={users.fullname}
                      readOnly
                    ></input>
                  </div>
                  <div class="form-group col-md-12">
                    <label>{lang["time"]}</label>
                    <input
                      class="form-control"
                      type="text"
                      value={new Date().toISOString().substring(0, 10)}
                      readOnly
                    ></input>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  onClick={submitupdateFieldExternalBody}
                  class="btn btn-success "
                >
                  {lang["btn.update"]}
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  id="closeModalExternalBody"
                  class="btn btn-danger"
                >
                  {lang["btn.close"]}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*add Field calculates */}
        <div class={`modal ${showModal ? "show" : ""}`} id="addFieldCalculates">
          <div class="modal-dialog modal-dialog-center">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">{lang["add field calculations"]}</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div className={`form-group col-lg-12`}>
                    <label>
                      {lang["fields name"]} <span className="red_star">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      value={display_name}
                      onChange={(e) => setDisplayname(e.target.value)}
                      required
                    />
                    {errorCaculates.display_name && (
                      <p className="text-danger">
                        {errorCaculates.display_name}
                      </p>
                    )}
                  </div>
                  <div class="form-group col-md-12">
                    <label>{lang["fields display"]}</label>
                    <div class="table-responsive">
                      {modalTemp.fields && modalTemp.fields.length > 0 ? (
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th class="font-weight-bold">{lang["log.no"]}</th>
                              <th class="font-weight-bold">
                                {lang["fields name"]}
                              </th>
                              <th class="font-weight-bold">{lang["alias"]}</th>
                              <td class="font-weight-bold">
                                {lang["table name"]}
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {modalTemp.fields.map((field, index) => {
                              const { tableId, fieldInfo } =
                                findTableAndFieldInfo(field.id);
                              if (!tableId || !fieldInfo) {
                                return null; // Xử lý trường hợp không tìm thấy thông tin bảng hoặc trường
                              }
                              const tableInfo = tableFields[tableId];
                              if (!tableInfo) {
                                return null; // Xử lý trường hợp không tìm thấy thông tin bảng
                              }
                              return (
                                <tr key={`${tableId}-${field.id}`}>
                                  <td>{index + 1}</td>
                                  <td>{fieldInfo.field_name}</td>
                                  <td>{fieldInfo.fomular_alias}</td>
                                  <td>{tableInfo.table_name}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      ) : (
                        <div class="list_cont ">
                          <p>{lang["not found"]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`form-group col-lg-12`}>
                    <label>
                      {lang["fomular"]} <span className="red_star">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      value={fomular}
                      onChange={(e) => setFomular(e.target.value)}
                      required
                    />
                    {errorCaculates.fomular && (
                      <p className="text-danger">{errorCaculates.fomular}</p>
                    )}
                  </div>
                  <div class="form-group col-md-12">
                    <label>{lang["creator"]} </label>
                    <input
                      class="form-control"
                      type="text"
                      value={users.fullname}
                      readOnly
                    ></input>
                  </div>
                  <div class="form-group col-md-12">
                    <label>{lang["time"]} </label>
                    <input
                      class="form-control"
                      type="text"
                      value={new Date().toISOString().substring(0, 10)}
                      readOnly
                    ></input>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  onClick={handleSubmitFieldCalculates}
                  class="btn btn-success "
                >
                  {lang["btn.create"]}
                </button>
                <button
                  type="button"
                  id="closeAddCalculates"
                  onClick={handleCloseModal}
                  data-dismiss="modal"
                  class="btn btn-danger"
                >
                  {lang["btn.close"]}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Edit Field calculates */}
        <div class={`modal ${showModal ? "show" : ""}`} id="editCalculates">
          <div class="modal-dialog modal-dialog-center">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">{lang["edit field calculations"]}</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div className="row">
                    <div className="form-group col-lg-12">
                      <label>
                        {lang["fields name"]}{" "}
                        <span className="red_star">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={calculatesUpdate.display_name}
                        onChange={(e) => {
                          setCalculatesUpdate({
                            ...calculatesUpdate,
                            display_name: e.target.value,
                          });
                        }}
                        placeholder=""
                      />
                      {errorCaculates.display_name && (
                        <p className="text-danger">
                          {errorCaculates.display_name}
                        </p>
                      )}
                    </div>
                    <div class="form-group  col-md-12">
                      <label>
                        {" "}
                        <p class="font-weight-bold">{lang["fields display"]}</p>
                      </label>
                      <div class="table-responsive">
                        {modalTemp.fields && modalTemp.fields.length > 0 ? (
                          <table class="table table-striped">
                            <thead>
                              <tr>
                                <th class="font-weight-bold">
                                  {lang["log.no"]}
                                </th>
                                <th class="font-weight-bold">
                                  {lang["fields name"]}
                                </th>
                                <th class="font-weight-bold">
                                  {lang["alias"]}
                                </th>
                                <td class="font-weight-bold">
                                  {lang["table name"]}
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              {modalTemp.fields.map((field, index) => {
                                const { tableId, fieldInfo } =
                                  findTableAndFieldInfo(field.id);
                                if (!tableId || !fieldInfo) {
                                  return null; // Xử lý trường hợp không tìm thấy thông tin bảng hoặc trường
                                }
                                const tableInfo = tableFields[tableId];
                                if (!tableInfo) {
                                  return null; // Xử lý trường hợp không tìm thấy thông tin bảng
                                }
                                return (
                                  <tr key={`${tableId}-${field.id}`}>
                                    <td>{index + 1}</td>
                                    <td>{fieldInfo.field_name}</td>
                                    <td>{fieldInfo.fomular_alias}</td>
                                    <td>{tableInfo.table_name}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        ) : (
                          <div class="list_cont ">
                            <p>{lang["not found"]}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`form-group col-lg-12`}>
                      <label>
                        {lang["fomular"]} <span className="red_star">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={calculatesUpdate.fomular}
                        onChange={(e) => {
                          setCalculatesUpdate({
                            ...calculatesUpdate,
                            fomular: e.target.value,
                          });
                        }}
                        required
                      />
                      {errorCaculates.fomular && (
                        <p className="text-danger">{errorCaculates.fomular}</p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  onClick={submitupdateFieldCalculates}
                  class="btn btn-success "
                >
                  {lang["btn.update"]}
                </button>
                <button
                  type="button"
                  id="closeEditCalculates"
                  onClick={handleCloseModal}
                  data-dismiss="modal"
                  class="btn btn-danger"
                >
                  {lang["btn.close"]}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*add Field statistical */}
        <div
          class={`modal ${showModal ? "show" : ""}`}
          id="addFieldStatistical"
        >
          <div class="modal-dialog modal-dialog-center">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">{lang["add fields statis"]} </h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div className={`form-group col-lg-12`}>
                    <label>
                      {lang["fields name"]} <span className="red_star">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      value={display_name}
                      onChange={(e) => setDisplayname(e.target.value)}
                      required
                    />
                    {errorStatistical.display_name && (
                      <p className="text-danger">
                        {errorStatistical.display_name}
                      </p>
                    )}
                  </div>

                  <div class="form-group col-md-12">
                    <label>
                      <p class="font-weight-bold">{lang["fields display"]}</p>
                    </label>
                    <div class="table-responsive">
                      {modalTemp.fields && modalTemp.fields.length > 0 ? (
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th class="font-weight-bold">{lang["log.no"]}</th>
                              <th class="font-weight-bold">
                                {lang["fields name"]}
                              </th>
                              <th class="font-weight-bold">{lang["alias"]}</th>
                              <td class="font-weight-bold">
                                {lang["table name"]}
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {modalTemp.fields.map((field, index) => {
                              const { tableId, fieldInfo } =
                                findTableAndFieldInfo(field.id);
                              if (!tableId || !fieldInfo) {
                                return null; // Xử lý trường hợp không tìm thấy thông tin bảng hoặc trường
                              }
                              const tableInfo = tableFields[tableId];
                              if (!tableInfo) {
                                return null; // Xử lý trường hợp không tìm thấy thông tin bảng
                              }
                              return (
                                <tr key={`${tableId}-${field.id}`}>
                                  <td>{index + 1}</td>
                                  <td>{fieldInfo.field_name}</td>
                                  <td>{fieldInfo.fomular_alias}</td>
                                  <td>{tableInfo.table_name}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      ) : (
                        <div class="list_cont ">
                          <p>{lang["not found"]}</p>
                        </div>
                      )}
                    </div>
                    <label>
                      <p class="font-weight-bold">
                        {lang["calculated fields"]}
                      </p>
                    </label>
                    <div class="table-responsive">
                      {modalTemp.calculates &&
                      modalTemp.calculates.length > 0 ? (
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th class="font-weight-bold">{lang["log.no"]}</th>
                              <th class="font-weight-bold">
                                {lang["fields name"]}
                              </th>
                              <th class="font-weight-bold">{lang["alias"]}</th>
                              <th class="font-weight-bold">
                                {lang["calculations"]}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {modalTemp.calculates.map((calculate, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{calculate.display_name}</td>
                                <td>{calculate.fomular_alias}</td>
                                <td>{calculate.fomular}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div class="list_cont ">
                          <p>{lang["not found"]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`form-group col-lg-12`}>
                    <p className="font-weight-bold">{lang["group by"]}</p>

                    <div className="form-group checkbox-container-wrapper">
                      <div className="checkbox-container">
                        {[
                          ...(modalTemp.fields || []),
                          ...(modalTemp.calculates || []),
                        ].map((field, index) => (
                          <div key={index} className="form-check">
                            <label className="form-check-label">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={field.fomular_alias}
                                checked={isFieldChecked(field.fomular_alias)}
                                onChange={(e) =>
                                  addOrRemoveGroupByField(e.target.value)
                                }
                              />

                              {field.display_name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {errorStatistical.field && (
                      <p className="text-danger">{errorStatistical.field}</p>
                    )}
                  </div>
                  <div className={`form-group col-lg-12`}>
                    <label>
                      {lang["select fields"]}{" "}
                      <span className="red_star">*</span>
                    </label>
                    <select
                      className="form-control"
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                    >
                      <option value="">{lang["select fields"]}</option>
                      {modalTemp.fields?.map((field, index) => (
                        <option key={index} value={field.fomular_alias}>
                          {field.display_name} ({field.fomular_alias})
                        </option>
                      ))}
                      {calculates.map((calculate, index) => (
                        <option
                          key={`calculate-${index}`}
                          value={calculate.fomular_alias}
                        >
                          {calculate.display_name} ({calculate.fomular_alias})
                        </option>
                      ))}
                    </select>
                    {errorStatistical.field && (
                      <p className="text-danger">{errorStatistical.field}</p>
                    )}
                  </div>

                  <div className={`form-group col-lg-12`}>
                    <label>
                      {lang["fomular"]} <span className="red_star">*</span>
                    </label>
                    <select
                      className="form-control"
                      value={fomular}
                      onChange={(e) => setFomular(e.target.value)}
                      required
                    >
                      <option value="">{lang["choose"]}</option>
                      <option value="SUM">SUM</option>
                      <option value="AVERAGE">AVERAGE</option>
                      <option value="COUNT">COUNT</option>
                    </select>
                    {errorStatistical.fomular && (
                      <p className="text-danger">{errorStatistical.fomular}</p>
                    )}
                  </div>
                  <div class="form-group col-md-12">
                    <label>{lang["creator"]} </label>
                    <input
                      class="form-control"
                      type="text"
                      value={users.fullname}
                      readOnly
                    ></input>
                  </div>
                  <div class="form-group col-md-12">
                    <label>{lang["time"]} </label>
                    <input
                      class="form-control"
                      type="text"
                      value={new Date().toISOString().substring(0, 10)}
                      readOnly
                    ></input>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  onClick={handleSubmitFieldStatistical}
                  class="btn btn-success "
                >
                  {lang["btn.create"]}
                </button>
                <button
                  type="button"
                  id="closeAddStatis"
                  onClick={handleCloseModal}
                  data-dismiss="modal"
                  class="btn btn-danger"
                >
                  {lang["btn.close"]}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Edit Field statistical */}
        <div class={`modal ${showModal ? "show" : ""}`} id="editStatistical">
          <div class="modal-dialog modal-dialog-center">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">{lang["edit statistical fields"]}</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div className="row">
                    <div className="form-group col-lg-12">
                      <label>
                        {lang["fields name"]}{" "}
                        <span className="red_star">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={statisticalUpdate.display_name}
                        onChange={(e) => {
                          setStatisticalUpdate({
                            ...statisticalUpdate,
                            display_name: e.target.value,
                          });
                        }}
                        placeholder=""
                      />
                      {errorStatistical.display_name && (
                        <p className="text-danger">
                          {errorStatistical.display_name}
                        </p>
                      )}
                    </div>
                    <div class="form-group  col-md-12">
                      <label>
                        {" "}
                        <p class="font-weight-bold">{lang["fields display"]}</p>
                      </label>
                      <div class="table-responsive">
                        {modalTemp.fields && modalTemp.fields.length > 0 ? (
                          <table class="table table-striped">
                            <thead>
                              <tr>
                                <th class="font-weight-bold">
                                  {lang["log.no"]}
                                </th>
                                <th class="font-weight-bold">
                                  {lang["fields name"]}
                                </th>
                                <th class="font-weight-bold">
                                  {lang["alias"]}
                                </th>
                                <td class="font-weight-bold">
                                  {lang["table name"]}
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              {modalTemp.fields.map((field, index) => {
                                const { tableId, fieldInfo } =
                                  findTableAndFieldInfo(field.id);
                                if (!tableId || !fieldInfo) {
                                  return null; // Xử lý trường hợp không tìm thấy thông tin bảng hoặc trường
                                }
                                const tableInfo = tableFields[tableId];
                                if (!tableInfo) {
                                  return null; // Xử lý trường hợp không tìm thấy thông tin bảng
                                }
                                return (
                                  <tr key={`${tableId}-${field.id}`}>
                                    <td>{index + 1}</td>
                                    <td>{fieldInfo.field_name}</td>
                                    <td>{fieldInfo.fomular_alias}</td>
                                    <td>{tableInfo.table_name}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        ) : (
                          <div class="list_cont ">
                            <p>{lang["not found"]}</p>
                          </div>
                        )}
                      </div>
                      <label>
                        <p class="font-weight-bold">
                          {lang["calculated fields"]}
                        </p>
                      </label>
                      <div class="table-responsive">
                        {modalTemp.calculates &&
                        modalTemp.calculates.length > 0 ? (
                          <table class="table table-striped">
                            <thead>
                              <tr>
                                <th class="font-weight-bold">
                                  {lang["log.no"]}
                                </th>
                                <th class="font-weight-bold">
                                  {lang["fields name"]}
                                </th>
                                <th class="font-weight-bold">
                                  {lang["alias"]}
                                </th>
                                <th class="font-weight-bold">
                                  {lang["calculations"]}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {modalTemp.calculates.map((calculate, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{calculate.display_name}</td>
                                  <td>{calculate.fomular_alias}</td>
                                  <td>{calculate.fomular}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div class="list_cont ">
                            <p>{lang["not found"]}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`form-group col-lg-12`}>
                      <p className="font-weight-bold">{lang["group by"]}</p>

                      <div className="form-group checkbox-container-wrapper">
                        <div className="checkbox-container">
                          {[
                            ...(modalTemp.fields || []),
                            ...(modalTemp.calculates || []),
                          ].map((field, index) => (
                            <div key={index} className="form-check">
                              <label className="form-check-label">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={field.fomular_alias}
                                  checked={isFieldChecked(field.fomular_alias)}
                                  onChange={(e) =>
                                    addOrRemoveGroupByField(e.target.value)
                                  }
                                />

                                {field.display_name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {errorStatistical.field && (
                        <p className="text-danger">{errorStatistical.field}</p>
                      )}
                    </div>

                    <div className={`form-group col-lg-12`}>
                      <label>
                        {lang["select fields"]}
                        <span className="red_star">*</span>
                      </label>
                      <select
                        className="form-control"
                        value={statisticalUpdate.field}
                        onChange={(e) =>
                          setStatisticalUpdate({
                            ...statisticalUpdate,
                            field: e.target.value,
                          })
                        }
                      >
                        <option value="">{lang["choose"]}</option>
                        {modalTemp.fields.map((field, index) => (
                          <option key={index} value={field.fomular_alias}>
                            {field.display_name} ({field.fomular_alias})
                          </option>
                        ))}
                        {modalTemp.calculates.map((calculate, index) => (
                          <option
                            key={`calculate-${index}`}
                            value={calculate.fomular_alias}
                          >
                            {calculate.display_name} ( {calculate.fomular_alias}
                            )
                          </option>
                        ))}
                      </select>
                      {errorStatistical.field && (
                        <p className="text-danger">{errorStatistical.field}</p>
                      )}
                    </div>

                    <div className={`form-group col-lg-12`}>
                      <label>
                        {lang["fomular"]} <span className="red_star">*</span>
                      </label>
                      <select
                        className="form-control"
                        value={statisticalUpdate.fomular}
                        onChange={(e) =>
                          setStatisticalUpdate({
                            ...statisticalUpdate,
                            fomular: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">{lang["choose"]}</option>
                        <option value="SUM">SUM</option>
                        <option value="AVERAGE">AVERAGE</option>
                        <option value="COUNT">COUNT</option>
                      </select>
                      {errorStatistical.fomular && (
                        <p className="text-danger">
                          {errorStatistical.fomular}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  onClick={submitupdateFieldStatistical}
                  class="btn btn-success "
                >
                  {lang["btn.update"]}
                </button>
                <button
                  type="button"
                  id="closeEditStatis"
                  onClick={handleCloseModal}
                  data-dismiss="modal"
                  class="btn btn-danger"
                >
                  {lang["btn.close"]}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateAPI;
