import React from "react";

import FolderView from "./view/FolderView";
import FileView from "./view/FileView";
import {DIRECTORY,FILE} from "./support/Constants";
import empty_ic from "./icons/empty-folder.png";

const Directories = (props) =>{

    const directories = props.directories.map((item,index)=> {
        if (item.type === DIRECTORY)
            return (<FolderView folder={item} key={item.entityId}
                                directoryClickListener={props.directoryClickListener}
                                onDelete={props.onDelete}
                                onRename={props.onRename}/>);

        else if (item.type === FILE)
            return (<FileView file={item} key={item.entityId} onDelete={props.onDelete} onRename={props.onRename}/>);

        return <React.Fragment></React.Fragment>
    });
    if(directories.length > 0)
    return (
        <div className="row">
            {directories}
        </div>
    );
    else
        return(
            <div className="text-center text-muted" style={{marginTop:"15%"}}>
                <h3>Add Some Files or Folders</h3>
                <img src={empty_ic} alt="" style={{filter:"grayscale(85%)"}} width="128px"/>
            </div>
        );

};
export default Directories;