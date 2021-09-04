import arrow_up_ic from "./icons/arrow_up.png";
import BreadcrumbItem from "./view/BreadcrumbItem";
import uuid from "react-uuid";
const Breadcrumb = (props) =>{
    let ui_path = [];

const breadcrumbClickListener = (breadcrumb)=>{
    props.breadCrumbClickListener(breadcrumb);
};

if(props.path.length < 5){
    ui_path = props.path.map((item,index)=>{

        if(index === props.path.length-1)
            return <BreadcrumbItem key={uuid()} path={item} isLast={true} onClick={breadcrumbClickListener}/>;
        else
            return <BreadcrumbItem key={uuid()} path={item} onClick={breadcrumbClickListener}/>;
    });
}
// If the path contains 5 or more breadcrumbs, compress it to 4.
// Compressed folders will be available to "..." breadcrumb by clicking on it.
else{
    let compressedPath = [];
    compressedPath.push(...props.path);
    compressedPath.shift();compressedPath.shift();
    delete compressedPath[compressedPath.length-1];

    ui_path.push(<BreadcrumbItem path={props.path[0]} onClick={breadcrumbClickListener}/>);
    ui_path.push(<BreadcrumbItem path={props.path[1]} onClick={breadcrumbClickListener}/>);
    ui_path.push(<BreadcrumbItem path={{name:"...",compressedPath:compressedPath}} isCompressed={true} onClick={breadcrumbClickListener}/>);
    ui_path.push(<BreadcrumbItem path={props.path[props.path.length-1]} isLast={true} onClick={breadcrumbClickListener}/>);
}

return (
        <div className="container-fluid ps-4 pe-4 pt-2 pb-2 shadow-sm">
            <img role="button" className="m-2 cursor-pointer" src={arrow_up_ic} alt="" width="26px" onClick={props.backClickListener}/>
            {ui_path}
        </div>
);
};

export default Breadcrumb;