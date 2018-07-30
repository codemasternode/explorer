import React from 'react'
import { Row } from 'mdbreact'
import { FilesList } from './Files'
import _ from 'lodash'
import { connect } from 'react-redux'
import { download, upload, toggleAdd, deleteFile, toggleDelete, modifyOrderActualState } from '../../../redux/actions'
import { MyModal } from '../../Modal/MyModal'
import { UploadModal } from './Upload'
import { DeleteConfirmation } from '../ManagementPage/DeleteConfirmation';

class FilesContainer extends React.Component {

    constructor() {
        super()
        this.state = {
            message: '',
            success: false,
            border_color: '#777777',
            modalDeleteFile: false
        }
        this.download = this.download.bind(this)
        this.drop = this.drop.bind(this)
        this.addFile = this.addFile.bind(this)
        this.toggleDelete = this.toggleDelete.bind(this)
        this.deleteFile = this.deleteFile.bind(this)
    }

    drop(file) {
        if (file[file.length - 1].type == "application/pdf") {
            this.setState({
                message: 'Gotowy do przesłania',
                success: true,
                border_color: 'green',
                file: file[file.length - 1]
            })
        } else {
            this.setState({
                message: 'Zły typ pliku',
                success: false,
                border_color: 'red'
            })
        }
    }

    toggleDelete(id) {
        this.setState({
            file_delete_id: id,
            modalDeleteFile: !this.state.modalDeleteFile
        })
    }

    deleteFile() {
        this.props.deleteFile(this.state.file_delete_id, () => {
            this.props.modifyOrderActualState(this.state.files.id)
        })
        setTimeout(() => {
            this.toggleDelete()
        }, 500)
    }


    addFile() {
        console.log(this.props)
        if (this.state.success === true) {
            this.props.upload({
                OrderId: this.state.files.id,
                fileType: this.props.file.fileType,
                isRequired: this.props.file.isRequired
            }, this.state.file, () => {
                this.setState({
                    success: true,
                    message: 'Udało się',
                    border_color: 'green'
                })
            })
            setTimeout(() => {
                this.setState({
                    success: false,
                    message: '',
                    border_color: '#777777'
                })
                this.props.toggleAdd()
            }, 4000)
        }
    }

    download(id) {
        this.props.download(id)
    }

    componentWillMount() {
        this.setState({
            files: this.props.order
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            files: nextProps.order
        })
    }

    render() {
        let files = _.pick(this.state.files, ['fvkId', 'fvpId', 'cmrId', 'nipId', 'notaId', 'ppId', 'rkId', 'zkId', 'zpId'])
        let requires = _.pick(this.state.files, ['isFVKRequired', 'isFVPRequired', 'isCMRRequired', 'isNIPRequired',
            'isNotaRequired', 'isPPRequired', 'isRKRequired', 'isZKRequired', 'isZPRequired'])
        console.log(this.props)
        return (

            <Row style={{ marginBottom: '80px' }}>
                <FilesList
                    download={this.download}
                    names={['fvkId', 'fvpId', 'cmrId', 'nipId', 'notaId', 'ppId', 'rkId', 'zkId', 'zpId']}
                    files={
                        Object.keys(files).map((value) => {
                            return [value, files[value]]
                        })}
                    requires={
                        Object.keys(requires).map((value) => {
                            return [value, requires[value]]
                        })
                    }
                    toggle={this.props.toggleAdd}
                    toggleDelete={this.toggleDelete}
                />
                <MyModal
                    test={this.props.file.modalAddFile}
                    toggle={this.props.toggleAdd}
                    component={UploadModal}
                    title="Dodaj pliki"
                    sumbitText="Wyślij"
                    sumbit={this.addFile}
                    drop={this.drop}
                    message={this.state.message}
                    success={this.state.success}
                    border_color={this.state.border_color}
                />
                <MyModal
                    test={this.state.modalDeleteFile}
                    toggle={this.toggleDelete}
                    component={DeleteConfirmation}
                    title="Usuwanie"
                    sumbitText="Usuń"
                    sumbit={this.deleteFile}
                />
            </Row>
        )
    }
}

const mapStateToProps = ({ file }) => {
    return {
        file
    }
}

export default connect(mapStateToProps, { download, upload, toggleAdd, toggleDelete, deleteFile, modifyOrderActualState })(FilesContainer)