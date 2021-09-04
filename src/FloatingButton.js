import React from 'react'
import { Container, Button, darkColors } from 'react-floating-action-button';
const FloatingButton = (props) => {
    return (
        <Container>
            <Button
                  tooltip="Create new file"
                  icon="far fa-file"
                  onClick={props.modalManager.openFileModal}
                  className="fab-item btn btn-link btn-lg text-white"/>
            <Button
                  tooltip="Create new folder"
                  icon="fas fa-folder-plus"
                  onClick={props.modalManager.openDirModal}
                  className="fab-item btn btn-link btn-lg text-white"/>

            <Button
                icon="fas fa-plus"
                styles={{backgroundColor: darkColors.lightBlue, color:"white"}}/>
        </Container>
    )
};
export default FloatingButton;