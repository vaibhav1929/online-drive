import file_ic from "../icons/file.png";
import rename_ic from "../icons/rename.png";
import delete_ic from "../icons/delete-file.png";
import { Menu, Item, useContextMenu } from 'react-contexify';
import React from "react";

const FileView = (props) =>{
    const { show } = useContextMenu({id: props.file.entityId,});
    const handleContextMenu = (e)=>{
        e.preventDefault();
        show(e, {
            props: {
                ...props.file
            }
        })
    };
    let fileDisplayName = props.file.name.split(".");
    if(fileDisplayName.length > 1) fileDisplayName = fileDisplayName[1];
    else fileDisplayName = props.file.name;

    return(
        <React.Fragment>
            <div onContextMenu={handleContextMenu} className="p-2 col-lg-2 col-md-4 col-sm-6 col-xs-12 text-center" key={props.file.entityId}>

                <div className="folder-card">
                    <div className="folder-card-image">
                        <img src={file_ic} alt="" width="72px"/>

                        <span className="badge bg-danger sticky-badge">{fileDisplayName}</span>
                    </div>

                    <div className="file-details">
                        {props.file.name}
                    </div>
                </div>

            </div>
            <Menu id={props.file.entityId} className="col-1">

                <Item onClick={props.onRename}>
                    <img className="ms-2 me-2" alt="" src={rename_ic} width="32px"/>Rename
                </Item>

                <Item onClick={props.onDelete}>
                    <img className="ms-2 me-2" alt="" src={delete_ic} width="32px"/>Delete
                </Item>

            </Menu>
        </React.Fragment>

    );
};
export default FileView;