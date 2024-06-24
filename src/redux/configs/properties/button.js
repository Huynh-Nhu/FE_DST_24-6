import { faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight, faItalic, faBold, faUnderline, faStrikethrough } from '@fortawesome/free-solid-svg-icons'
import functions from '../functions'
import lang from '../property_lang'

const { getFormatedUUID } = functions

const button =  [        
    { 
        id: getFormatedUUID(), 
        label: lang["props.title"],
        type: "text",
        path: "props.title" 
    },

    { 
        id: getFormatedUUID(), 
        label: lang["style.fontsize"],
        type: "number",
        path: "props.style.fontSize" 
    },

    { 
        id: getFormatedUUID(), 
        label: lang["style.borderwidth"],
        type: "number",
        path: "props.style.borderWidth" 
    },

    { 
        id: getFormatedUUID(), 
        label: lang["style.boldercolor"],
        type: "color",
        path: "props.style.borderColor" 
    },
   
    { 
        id: getFormatedUUID(), 
        label: lang["style.borderstyle"],
        type: "selection",
        path: "props.style.borderStyle",
        options: [
            {
                label: lang["style.borderstyle.solid"],
                value: "solid"
            },
            
            {
                label: lang["style.borderstyle.dashed"],
                value: "dashed"
            },

            {
                label: lang["style.borderstyle.dotted"],
                value: "dotted"
            },

            {
                label: lang["general.none"],
                value: "none"
            },

        ] 
    },

    { 
        id: getFormatedUUID(), 
        label: lang["style.borderradius"],
        type: "number",
        path: "props.style.borderRadius" 
    },

    { 
        id: getFormatedUUID(), 
        label: lang["style.color"],
        type: "color",
        path: "props.style.color" 
    },

    { 
        id: getFormatedUUID(), 
        label: lang["style.background"],
        type: "color",
        path: "props.style.backgroundColor" 
    },

    { 
        id: getFormatedUUID(), 
        label: "Alignment",
        type: "iconicSwitchingGroup",
        path: "props.style.textAlign",
        defaultValue: "left",
        buttons: [
            { 
                id: getFormatedUUID(),
                icon: faAlignLeft,
                value: "left"
            },
            { 
                id: getFormatedUUID(),
                icon: faAlignCenter,
                value: "center"
            },
            { 
                id: getFormatedUUID(),
                icon: faAlignRight,
                value: "right"
            },
            { 
                id: getFormatedUUID(),
                icon: faAlignJustify,
                value: "justify"
            }
        ]
    },

    { 
        id: getFormatedUUID(), 
        label: lang["style.italic"],
        type: "iconicSwitching",
        path: "props.style.fontStyle",
        values: [ "unset", "italic" ],
        icon: faItalic 
    },
    { 
        id: getFormatedUUID(), 
        label: lang["style.bold"],
        type: "iconicSwitching",
        path: "props.style.fontWeight",
        values: [ "unset", "bold" ],
        icon: faBold 
    },
    { 
        id: getFormatedUUID(), 
        label: lang["style.underline"],
        type: "iconicSwitching",
        path: "props.style.textDecoration",
        values: [ "unset", "underline" ],
        icon: faUnderline
    },

    { 
        id: getFormatedUUID(), 
        label: lang["style.width"],
        type: "text",
        path: "props.style.width" 
    },

    { 
        id: getFormatedUUID(), 
        label: lang["style.margin"],
        type: "text",
        path: "props.style.margin" 
    },
    { 
        id: getFormatedUUID(), 
        label: lang["style.padding"],
        type: "text",
        path: "props.style.padding" 
    },


    { 
        id: getFormatedUUID(), 
        label: lang["func.recordtrigger"],
        type: "apiSelection",                
        path: "props.recordTrigger.api",
        url: "/apis/v/[version_id]",
        params: ["version_id"],
        api_data: "data.apis",
        fields: [
            {
                from: "api_id",
                to: "api"
            },            
            {
                from: "api_name",
                to: "api_name"
            },
        ],
        display_value: "api_name",
        onlyExistsIn:[
            { name: "table", type: "cascading" }
        ]
    },

    { 
        id: getFormatedUUID(), 
        label: lang["style.order"],
        type: "number", 
        path: "props.flex.order",
        onlyExistsIn:[{ name: "flex",type: "direct" }]
    },
    { 
        id: getFormatedUUID(), 
        label: lang["style.flexgrow"],
        type: "number", 
        path: "props.flex.flexGrow" ,
        onlyExistsIn:[{ name: "flex",type: "direct" }]
    },

]
export default button