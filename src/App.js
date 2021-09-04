import Breadcrumb from "./Breadcrumb";
import React, { useRef, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Directories from "./Directories";
import {jsonData,ROOT} from "./support/Data";
import FloatingButton from "./FloatingButton";
import ItemModal from "./modal/ItemModal";
import uuid from "react-uuid";
import {DIRECTORY, FILE} from "./support/Constants";
import DeleteConfirmModal from "./modal/DeleteConfirmModal";

const App = () => {
    let [directories,setDirectories] = useState(jsonData.filter(item => item.parent === ROOT.id));
    let directoryStack  = useRef([ROOT]);

    const [fileModalIsOpen, setIsFileModalOpen] = React.useState(false);
    const [isValidFile, setIsValidFile] = useState(false);

    const [dirModalIsOpen, setIsDirModalOpen] = React.useState(false);
    const [isValidDir, setIsValidDir] = useState(false);

    const [dirName, setDirName] = useState("");
    const [fileName, setFileName] = useState("");
    const [dirRenameId, setDirRenameId] = useState("");
    const [fileRenameId, setFileRenameId] = useState("");

    const[isFileDeleteModal, setIsFileDeleteModal] = useState(false);
    const[deleteId, setDeleteId] = useState("");

    // Handles double click of any folder and set the content accordingly.
    const directoryClickListener = (directory)=>{
        directoryStack.current.push(directory);
        setDirectories(()=>{
            let dirData = jsonData.filter(item => item.parent === directory.id) || [];
            return [...dirData];
        });
    };

    // Pop directory from stack to back step.
    const backClickListener = ()=>{
        if(directoryStack.current.length > 1){
            let directory = directoryStack.current.pop();
            setDirectories(()=>{
                // Find siblings, resides under same folder
                let dirData = jsonData.filter(item => item.parent === directory.parent) || [];
                return [...dirData]
            });

        }
    };

    //Handles bread click, change content according to click of bread.
    const breadCrumbClickListener = (directory)=>{
       if(directoryStack.current.length > 1){
           while(directoryStack.current.length > 1){
               let stackTop = directoryStack.current[directoryStack.current.length-1];
               if(stackTop.id !== directory.id) directoryStack.current.pop();
               else break;
           }
           setDirectories(()=>{
               let dirData = jsonData.filter(item => item.parent === directory.id) || [];
               return [...dirData];
           });
       }

    };

    // Helper functions for File add/rename modals.
    const openFileModal = () => {
        setIsFileModalOpen(true);
    };
    const closeFileModal = () => {
        setFileName("");
        setFileRenameId(false);
        setIsFileModalOpen(false);
    };

    // Handles "Create new file"/ "Rename File" button click.
    const addFileListener = (file_name) => {
        if(isValidFile){
            let currentParentId = directoryStack.current[directoryStack.current.length-1].id;
            const newFile = {
                entityId:uuid(),
                name:file_name,
                type: FILE,
                parent:currentParentId
            }
            if(fileRenameId.length > 0)  // Rename
                jsonData.find(item => item.entityId === fileRenameId).name = file_name;
            else // Add new
                jsonData.push(newFile);

            setDirectories(()=>{
                let dirData = jsonData.filter(item => item.parent === currentParentId) || [];
                return [...dirData]
            });
           closeFileModal();
        }

    };

    // Validate and show error if file already exists.
    const fileNameValidator = (e)=>{
        let fileName = e.target.value;
        setFileName(fileName);
        let currentParentId = directoryStack.current[directoryStack.current.length-1].id;

        let filter = jsonData.find(item => item.parent === currentParentId && item.name === fileName);
        let fileExists = fileName.trim().length === 0 || filter !== undefined;
        setIsValidFile(!fileExists);
    };
//------------------------------------------------------------------------------------

    // Helper functions for new directory/rename directory modal.
    const openDirModal = () => {
        setIsDirModalOpen(true);
    };
    const closeDirModal = () => {
        setDirName("");
        setDirRenameId(false);
        setIsDirModalOpen(false);
    };

    //Handles "Create new file"/ "Rename File" button click.
    const addDirListener = (dir_name) => {
        if(isValidDir){
            let currentParentId = directoryStack.current[directoryStack.current.length-1].id;
            const newDir = {
                entityId:uuid(),
                name:dir_name,
                type: DIRECTORY,
                parent:currentParentId
            };
            if(dirRenameId.length > 0) // Rename
                jsonData.find(item => item.entityId === dirRenameId).name = dir_name;
            else // Add new
                jsonData.push(newDir);
            setDirectories(()=>{
                let dirData = jsonData.filter(item => item.parent === currentParentId) || [];
                return [...dirData]
            });
            closeDirModal();
        }
    };

    // Validate and show error if directory already exists.
    const dirNameValidator = (e)=>{
        let dirName = e.target.value;
        setDirName(dirName);
        let currentParentId = directoryStack.current[directoryStack.current.length-1].id;

        let filter = jsonData.find(item => item.parent === currentParentId && item.name === dirName);
        let dirExists = dirName.trim().length === 0 || filter !== undefined;
        setIsValidDir(!dirExists);
    };
//--------------------------------------------------------------------------------------

    // Helper functions for delete modal.
    const openDeleteModal = () => {
        setIsFileDeleteModal(true);
    };
    const closeDeleteModal = () => {
        setDeleteId("");
        setIsFileDeleteModal(false);
    };

    // Deletes File/Folder (For non-empty folder all children entities will be also deleted)
    const deleteEntity = ()=>{

            let deleteList = [deleteId];
            jsonData.forEach(function(item, index){
                if(deleteList.includes(item.parent) || deleteList.includes(item.entityId)){
                    if(item.type === DIRECTORY) deleteList.push(item.entityId);
                    jsonData.splice(index, 1);
                }
            });
            let currentParentId = directoryStack.current[directoryStack.current.length-1].id;
            setDirectories(()=>{
                let dirData = jsonData.filter(item => item.parent === currentParentId) || [];
                return [...dirData]
            });
            closeDeleteModal();
    };

    // Set Rename mode in modal.
    const triggerRenameModal = ({event, props, triggerEvent, data})=>{
        if(props.type === DIRECTORY){
            setIsDirModalOpen(true);
            setDirName(props.name);
            setDirRenameId(props.entityId);
        }
        else{
            setIsFileModalOpen(true);
            setFileName(props.name);
            setFileRenameId(props.entityId);
        }
    };

    // Opens delete Modal and set Delete Id.
    const triggerDeleteModal = ({event, props, triggerEvent, data}) => {
        setDeleteId(props.entityId);
        openDeleteModal();
    };

    return (
    <div>
      <Breadcrumb backClickListener={backClickListener}
                  breadCrumbClickListener={breadCrumbClickListener}
                  path={directoryStack.current}
                    />

      <div className="container mt-2 mb-2">
          <Directories directories={directories}
                       directoryClickListener={directoryClickListener}
                       onDelete={triggerDeleteModal}
                       onRename={triggerRenameModal} />
      </div>

      <FloatingButton modalManager={{"openFileModal":openFileModal,
                                        "openDirModal":openDirModal}}/>

      <ItemModal type={FILE} closeFileModal={closeFileModal}
                 fileModalIsOpen={fileModalIsOpen}
                 validFile={isValidFile}
                 fileName={fileName}
                 currentDir={directoryStack.current[directoryStack.current.length-1]}
                 fileRenameId={fileRenameId}
                 addFileListener={addFileListener}
                onValueChange={fileNameValidator}/>

      <ItemModal  type={DIRECTORY} closeFileModal={closeDirModal}
                   fileModalIsOpen={dirModalIsOpen}
                   validFile={isValidDir}
                   fileName={dirName}
                   currentDir={directoryStack.current[directoryStack.current.length-1]}
                   fileRenameId={dirRenameId}
                   addFileListener={addDirListener}
                   onValueChange={dirNameValidator}/>

      <DeleteConfirmModal isDeleteConfirmModal={isFileDeleteModal}
                          deleteEntity={deleteEntity}
                          closeDeleteConfirmModal={closeDeleteModal}/>
    </div>
  );
};
export default App;
