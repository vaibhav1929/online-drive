import React from 'react';
import Modal from 'react-modal';
import "bootstrap/dist/css/bootstrap.min.css";

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const DeleteConfirmModal = (props) => {
    return (
        <div>
            <Modal
                isOpen={props.isDeleteConfirmModal}
                style={customStyles}>
                <h4>Are you sure you want to delete?</h4>
                <button className="btn btn-danger m-2 float-end"
                        onClick={()=>{props.deleteEntity()}}>
                    Delete it
                </button>
                <button className="btn btn-outline-primary m-2 float-end"
                      onClick={()=>{props.closeDeleteConfirmModal()}}>
                    Cancel
                </button>
            </Modal>
        </div>
    );
};

export default DeleteConfirmModal;