import React from 'react'
import { Table } from 'mdbreact'
import { Fa } from 'mdbreact'
import { withRouter } from 'react-router-dom'

export const Users = ({ users, changeLocation, ...rest }) => {
    return (
        <div style={{ display: 'block', maxHeight: '300px', overflowY: 'auto', marginBottom: '30px' }}>
            <Table className="users-list">
                <thead >
                    <tr>
                        <th>ID</th>
                        <th className="th-lg">Nazwa Użytkownika</th>
                        <th className="th-lg">Rola</th>
                        <th className="th-lg">Usuń</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((value, index) => (
                            <tr key={index} className="user-list-item">
                                <td onClick={() => changeLocation(value.username)}>{index}</td>
                                <td onClick={() => changeLocation(value.username)}>
                                    {value.username}
                                </td>
                                <td>{value.role}</td>
                                <td className="delete">
                                    <Fa icon="close" size="2x" onClick={() => rest.deleteUser(value.id)} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default withRouter(Users)
