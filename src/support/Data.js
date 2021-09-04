import uuid from "react-uuid";
import {DIRECTORY, FILE} from "./Constants";

let uniqueIds = [];
for(let i = 0; i < 25; i++) uniqueIds.push(uuid());
export const ROOT = {
    id:uniqueIds[0],
    name:"ROOT"
};
export let jsonData = [
    {
      entityId:uniqueIds[0],
      name:"_ROOT",
      type: DIRECTORY
    },
//--------------------------------------------------------------------------
    {
        entityId:uniqueIds[1],
        name:"JS development",
        type: DIRECTORY,
        parent:uniqueIds[0],
    },
    {
        entityId:uuid(),
        name:"index.js",
        type: FILE,
        parent:uniqueIds[1]
    },
    {
        entityId:uuid(),
        name:"index.ts",
        type: FILE,
        parent:uniqueIds[1]
    },
    {
        entityId:uuid(),
        name:"index.html",
        type: FILE,
        parent:uniqueIds[1]

    },
//------------------------------------------------------------------
    {
        entityId:uniqueIds[2],
        name:"CSS1",
        type: DIRECTORY,
        parent:uniqueIds[1],
    },
    {
        entityId:uuid(),
        name:"style.css",
        type: FILE,
        parent:uniqueIds[2]

    },
    {
        entityId:uniqueIds[10],
        name:"CSS2",
        type: DIRECTORY,
        parent:uniqueIds[2],
    },
    {
        entityId:uuid(),
        name:"style.css",
        type: FILE,
        parent:uniqueIds[10]

    },
    {
        entityId:uniqueIds[11],
        name:"CSS3",
        type: DIRECTORY,
        parent:uniqueIds[10],
    },
    {
        entityId:uuid(),
        name:"style.css",
        type: FILE,
        parent:uniqueIds[11]

    },
//------------------------------------------------------------------
    {
        entityId:uniqueIds[3],
        name:"Study Material",
        type: DIRECTORY,
        parent:uniqueIds[0],
    },
    {
        entityId:uuid(),
        name:"App.js",
        type: FILE,
        parent:uniqueIds[3]
    },
//-------------------------------------------------------------------

    {
        entityId:uniqueIds[4],
        name:"Nirma docs",
        type: DIRECTORY,
        parent:uniqueIds[3],
    },
    {
        entityId:uuid(),
        name:"Ajax.ts",
        type: FILE,
        parent:uniqueIds[4]
    },
//---------------------------------------------------------------------
    {
        entityId:uniqueIds[5],
        name:"CSS",
        type: DIRECTORY,
        parent:uniqueIds[4],
    },
    {
        entityId:uuid(),
        name:"style.css",
        type: FILE,
        parent:uniqueIds[5]
    },
//---------------------------------------------------------------------
    {
        entityId:uuid(),
        name:"Account-Statement.pdf",
        type: FILE,
        parent:uniqueIds[0]
    },

    {
        entityId:uuid(),
        name:"project-bugs.docx",
        type: FILE,
        parent:uniqueIds[0]
    },
    {
        entityId:uuid(),
        name:"App-recording.mp4",
        type: FILE,
        parent:uniqueIds[0]
    }
];
