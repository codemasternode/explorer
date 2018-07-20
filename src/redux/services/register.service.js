import axios from 'axios'
import { ApiConstants } from '../constants'
import _ from 'lodash'
import { getToken } from '../../components/helpers/getToken';

function register(values) {
    return new Promise((resolve, reject) => {
        axios({
            url: `${ApiConstants.rootURL}/users/register`,
            method: 'POST',
            data: values,
            headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res)
            resolve()
        }).catch((err) => {
            reject()
        })
    })
}




export const RegisterService = {
    register
}