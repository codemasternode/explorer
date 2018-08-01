import { FileConstants, OrdersConstants } from '../constants'
import { FileService, OrdersService } from '../services'
import { lostSession, updateActionOrder } from './app.action'
import { getOrderById } from './order.action'

export function download(id) {

    function success() {
        return {
            type: FileConstants.GET_FILE_SUCCESS
        }
    }

    function failed() {
        return {
            type: FileConstants.GET_FILE_FAIL
        }
    }

    return dispatch => {
        FileService.download(id)
            .then(() => {
                dispatch(success())
            }).catch(() => {
                dispatch(lostSession())
            })
    }
}

export function upload(data, file, callback) {
    function success() {
        return {
            type: FileConstants.POST_FILE_SUCCESS
        }
    }

    function failed() {
        return {
            type: FileConstants.POST_FILE_FAIL
        }
    }

    return dispatch => {
        console.log(data)
        FileService.upload(data, file)
            .then(() => {
                dispatch(success())
                updateActionOrder(data.orderId, dispatch)
                callback()
            }).catch(() => {
                dispatch(lostSession())
            })
    }
}

export function toggleDelete() {
    function toggle() {
        return {
            type: FileConstants.TOGGLE_DELETE_FILE
        }
    }

    return dispatch => {
        dispatch(toggle())
    }
}

export function toggleAdd(fileType, isRequired) {
    function toggle(fileType, isRequired) {
        return {
            type: FileConstants.TOGGLE_ADD_FILE,
            fileType,
            isRequired
        }
    }
    console.log(fileType, isRequired)

    return dispatch => {
        dispatch(toggle(fileType, isRequired))
    }
}

export function deleteFile(id, orderId, callback) {
    function success() {
        return {
            type: FileConstants.DELETE_FILE_SUCCESS
        }
    }

    function failed() {
        return {
            type: FileConstants.DELETE_FILE_FAIL
        }
    }

    return dispatch => {
        FileService.deleteFile(id)
            .then(() => {
                dispatch(success())
                updateActionOrder(orderId, dispatch)
                callback()
            }).catch(() => {
                dispatch(failed())
            })
    }
}
