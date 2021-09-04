import folder_ic from "../icons/folder.png";
import {Item, Menu, useContextMenu} from "react-contexify";
import React from "react";

const BreadcrumbItem = (props)=>{
    const { show } = useContextMenu({id:"compressor"});
    const handleContextMenu = (e)=>{
        show(e,{})
    };

    if(props.isCompressed){
        return (
            <React.Fragment>
                <div className="m-1 breadcrumb-badge text-dark p-2" onClick={handleContextMenu}>{props.path.name}</div>\

                <Menu id={"compressor"} className="col-1">
                    {props.path.compressedPath.map((item, index)=>{
                        return (
                            <Item key={index} onClick={()=>{props.onClick(item)}}>
                                <img className="ms-2 me-2" src={folder_ic} alt="" width="32px"/>
                                {item.name}
                            </Item>
                        )
                    })}
                </Menu>
            </React.Fragment>
        )
    }
    else{
        return props.isLast?
            (
                <div className="m-1 breadcrumb-badge text-dark p-2" onClick={()=>{props.onClick(props.path)}}>
                    <img className="folder-card-image" src={folder_ic} alt="" width="16px"/> {props.path.name}
                </div>
            )
            :
            (
                <React.Fragment>
                <div className="m-1 breadcrumb-badge text-primary p-2" onClick={()=>{props.onClick(props.path)}}>
                    <span>
                        {props.path.name}
                    </span>
                </div>
                <h5 style={{display:"inline"}}> \ </h5>
                </React.Fragment>
            )
    }

};
export default BreadcrumbItem;