import React, {useRef} from 'react';
import Modal from 'react-modal';
import "bootstrap/dist/css/bootstrap.min.css";
import folder_ic from "../icons/folder.png";

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
    },
};
const ItemModal = (props) => {
    const inputRef = useRef({value:props.fileName});
    return (
        <div>
            <Modal
                isOpen={props.fileModalIsOpen}
                style={customStyles}>
                <i onClick={props.closeFileModal} className="fas fa-times-circle position-absolute top-0 end-0 fs-4 text-muted"></i>

                {!props.validFile && inputRef.current && inputRef.current.value.length > 0?
                    <div className="alert-sm alert-danger m-1 text-center rounded">
                        Name already exists or invalid!
                    </div>:null}

                    <div>
                        <label htmlFor="file_name" className="form-label">{props.type} name</label>

                        <input ref={inputRef} type="text" className="form-control mb-3" id="file_name" placeholder="Give nice name"
                               value={props.fileName}
                                onChange={props.onValueChange}/>

                        <button className="btn btn-primary"
                                disabled={!props.validFile}
                                value={props.fileName}
                                onClick={()=>{props.addFileListener(inputRef.current.value)}}>
                            {props.fileRenameId.length > 0?"Rename":"Create new"} {props.type}
                        </button>
                        <hr/>

                        Working directory:
                        <div className="m-1 breadcrumb-badge text-dark p-1" style={{cursor:"default"}}>
                            <img className="ms-2 me-2" alt="" src={folder_ic} width="32px"/>
                            {props.currentDir.name}
                        </div>

                    </div>

            </Modal>
        </div>
    );
}

export default ItemModal;