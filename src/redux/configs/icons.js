import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faIcons,
  faLemon,
  faLocation,
  faMagnifyingGlass,
  faPaperPlane,
  faPlane,
  faRocket,
  faSeedling,
  faStar,
  faUser,
  faCheck,
  faCheckCircle,
  faCheckSquare,
  faXmark,
  faXmarkCircle,
  faXmarkSquare,
  faEye,
  faSquare,
  faSquareCaretDown,
  faSquarePollHorizontal,
  faCaretRight,
  faIndustry,
  faMapLocationDot,
  faBoxesStacked,
  faBarsProgress,
  faLayerGroup,
  faCalendarDays,
  faMicrochip,
  faRotate,
  faUserGear,
  faUsers,
  faWarehouse,
  faKaaba,
  faLocationDot,
  faTruckPlane,
  faChartLine,
  faChartColumn,
  faArrowRotateLeft,
  faTents,
  faCubesStacked,
  faBarsStaggered,
  faCalendar,
  faSitemap,
  faSquareCaretRight,
  faPhone,
  faEnvelope,
  faTableColumns,
  faLink,
  faList
} from "@fortawesome/free-solid-svg-icons";
import { faDropbox } from "@fortawesome/free-brands-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
// import faDropBox from '../../icons/dropbox.svg'

const icons = {
  1: {
    id: "1",
    name: "",
    icon: "",
    lang: {
      vi: "",
      en: "",
    },
  },
  2: {
    id: "2",
    name: "Glass",
    icon: faMagnifyingGlass,
    lang: {
      vi: "Kính lúp",
      en: "Glass",
    },
  },
  3: {
    id: "3",
    name: "Star",
    icon: faStar,
    lang: {
      vi: "Ngôi sao",
      en: "Star",
    },
  },
  4: {
    id: "4",
    name: "User",
    icon: faUser,
    lang: {
      vi: "Người dùng",
      en: "User",
    },
  },
  5: {
    id: "5",
    name: "Rocket",
    icon: faRocket,
    lang: {
      vi: "Tên lửa",
      en: "Rocket",
    },
  },
  6: {
    id: "6",
    name: "seedling",
    icon: faCaretRight,
    lang: {
      vi: "Chòi non",
      en: "Seedling",
    },
  },
  7: {
    id: "7",
    name: "Location",
    icon: faLocation,
    lang: {
      vi: "Định vị",
      en: "Location",
    },
  },
  8: {
    id: "8",
    name: "Air plan",
    icon: faPlane,
    lang: {
      vi: "Máy bay",
      en: "Airplane",
    },
  },
  9: {
    id: "9",
    name: "Paper plan",
    icon: faPaperPlane,
    lang: {
      vi: "Máy bay",
      en: "Paper plane",
    },
  },
  10: {
    id: "10",
    name: "Lemon",
    icon: faLemon,
    lang: {
      vi: "Chanh",
      en: "Lemon",
    },
  },
  11: {
    id: "11",
    name: "Lemon",
    icon: faCheck,
    lang: {
      vi: "Chanh",
      en: "Lemon",
    },
  },
  12: {
    id: "12",
    name: "Lemon",
    icon: faCheckCircle,
    lang: {
      vi: "Chanh",
      en: "Lemon",
    },
  },
  13: {
    id: "13",
    name: "Lemon",
    icon: faCheckSquare,
    lang: {
      vi: "Chanh",
      en: "Lemon",
    },
  },
  14: {
    id: "14",
    name: "Lemon",
    icon: faXmark,
    lang: {
      vi: "Chanh",
      en: "Lemon",
    },
  },
  15: {
    id: "15",
    name: "Lemon",
    icon: faXmarkCircle,
    lang: {
      vi: "Chanh",
      en: "Lemon",
    },
  },
  16: {
    id: "16",
    name: "Lemon",
    icon: faXmarkSquare,
    lang: {
      vi: "Chanh",
      en: "Lemon",
    },
  },
  17: {
    id: "17",
    name: "Lemon",
    icon: faEye,
    lang: {
      vi: "Chanh",
      en: "Lemon",
    },
  },
  18: {
    id: "18",
    name: "Lemon",
    icon: faSquareCaretDown,
    lang: {
      vi: "",
      en: "",
    },
  },
  19: {
    id: "19",
    name: "Lemon",
    icon: faSquarePollHorizontal,
    lang: {
      vi: "",
      en: "",
    },
  },
  20: {
    id: "20",
    name: "Lemon",
    icon: faSquarePollHorizontal,
    lang: {
      vi: "",
      en: "",
    },
  },
  21: {
    id: "21",
    name: "Industry",
    icon: faIndustry,
    lang: {
      vi: "",
      en: "",
    },
  },
  22: {
    id: "22",
    name: "MapLocationDot",
    icon: faMapLocationDot,
    lang: {
      vi: "",
      en: "",
    },
  },
  23: {
    id: "23",
    name: "BoxesStacked",
    icon: faBoxesStacked,
    lang: {
      vi: "",
      en: "",
    },
  },
  24: {
    id: "24",
    name: "BarsProgress",
    icon: faBarsProgress,
    lang: {
      vi: "",
      en: "",
    },
  },
  25: {
    id: "25",
    name: "LayerGroup",
    icon: faLayerGroup,
    lang: {
      vi: "",
      en: "",
    },
  },
  26: {
    id: "26",
    name: "CalendarDays",
    icon: faCalendarDays,
    lang: {
      vi: "",
      en: "",
    },
  },
  27: {
    id: "27",
    name: "Microchip",
    icon: faMicrochip,
    lang: {
      vi: "",
      en: "",
    },
  },
  28: {
    id: "28",
    name: "Rotate",
    icon: faRotate,
    lang: {
      vi: "",
      en: "",
    },
  },
  29: {
    id: "29",
    name: "UserGear",
    icon: faUserGear,
    lang: {
      vi: "",
      en: "",
    },
  },
  30: {
    id: "30",
    name: "Users",
    icon: faUsers,
    lang: {
      vi: "",
      en: "",
    },
  },
  31: {
    id: "31",
    name: "Warehouse",
    icon: faWarehouse,
    lang: {
      vi: "",
      en: "",
    },
  },
  32: {
    id: "32",
    name: "Kaaba",
    icon: faKaaba,
    lang: {
      vi: "",
      en: "",
    },
  },
  33: {
    id: "33",
    name: "LocationDot",
    icon: faLocationDot,
    lang: {
      vi: "",
      en: "",
    },
  },
  34: {
    id: "34",
    name: "DropBox",
    icon: faDropbox,
    lang: {
      vi: "",
      en: "",
    },
  },
  35: {
    id: "35",
    name: "TruckPlane",
    icon: faTruckPlane,
    lang: {
      vi: "",
      en: "",
    },
  },
  36: {
    id: "36",
    name: "ChartLine",
    icon: faChartLine,
    lang: {
      vi: "",
      en: "",
    },
  },
  37: {
    id: "37",
    name: "ChartColumn",
    icon: faChartColumn,
    lang: {
      vi: "",
      en: "",
    },
  },
  38: {
    id: "38",
    name: "ArrowRotateLeft",
    icon: faArrowRotateLeft,
    lang: {
      vi: "",
      en: "",
    },
  },
  39: {
    id: "39",
    name: "Tent",
    icon: faTents,
    lang: {
      vi: "",
      en: "",
    },
  },
  40: {
    id: "40",
    name: "CubesStacked",
    icon: faCubesStacked,
    lang: {
      vi: "",
      en: "",
    },
  },
  41: {
    id: "41",
    name: "BarsStaggered",
    icon: faBarsStaggered,
    lang: {
      vi: "",
      en: "",
    },
  },
  42: {
    id: "42",
    name: "Calendar",
    icon: faCalendar,
    lang: {
      vi: "",
      en: "",
    },
  },
  43: {
    id: "43",
    name: "SiteMap",
    icon: faSitemap,
    lang: {
      vi: "",
      en: "",
    },
  },
  44: {
    id: "44",
    name: "SquareCareRight",
    icon: faSquareCaretRight,
    lang: {
      vi: "",
      en: "",
    },
  },
  45: {
    id: "45",
    name: "Circle",
    icon: faCircle,
    lang: {
      vi: "",
      en: "",
    },
  },
  46: {
    id: "46",
    name: "Phone",
    icon: faPhone,
    lang: {
      vi: "",
      en: "",
    },
  },
  47: {
    id: "47",
    name: "Mail",
    icon: faEnvelope,
    lang: {
      vi: "",
      en: "",
    },
  },
  48: {
    id: "48",
    name: "Table",
    icon: faTableColumns,
    lang: {
      vi: "",
      en: "",
    },
  },
  49: {
    id: "49",
    name: "Home",
    icon: faHome,
    lang: {
      vi: "Trang chủ",
      en: "Home",
    },
  },
  50: {
    id: "50",
    name: "Link",
    icon: faLink,
    lang: {
      vi: "",
      en: "",
    },
  },
  51: {
    id: "51",
    name: "List",
    icon: faList,
    lang: {
      vi: "",
      en: "",
    },
  },
};

export default icons;
