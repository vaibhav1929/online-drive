import React from "react";
import folder_ic from "../icons/folder.png";
import { Menu, Item, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import rename_ic from "../icons/rename.png";
import delete_ic from "../icons/delete-folder.png";

const FolderView = (props) =>{
    const { show } = useContextMenu({id: props.folder.entityId,});
    const handleContextMenu = (e)=>{
        e.preventDefault();
        show(e, {
            props: {...props.folder}
        })
    };
    return(
        <React.Fragment>
                <div className="p-2 col-lg-2 col-md-4 col-sm-6 col-xs-12 text-center" key={props.folder.entityId}
                     onDoubleClick={()=>{
                         props.directoryClickListener(
                             { id:props.folder.entityId,
                                 parent:props.folder.parent,
                                 name:props.folder.name
                             }) }}
                    onContextMenu={handleContextMenu}>

                    <div className="folder-card">
                        <div>
                            <img className="folder-card-image" src={folder_ic} alt="" width="72px"/>
                        </div>
                        <div className="file-details">
                            {props.folder.name}
                        </div>
                    </div>

                </div>

            <Menu id={props.folder.entityId} className="col-1">
                <Item onClick={props.onRename}>
                    <img className="ms-2 me-2" src={rename_ic} alt="" width="32px"/>Rename
                </Item>

                <Item onClick={props.onDelete}>
                    <img className="ms-2 me-2" src={delete_ic} alt="" width="32px"/>Delete
                </Item>

            </Menu>

        </React.Fragment>
    );
};
export default FolderView;