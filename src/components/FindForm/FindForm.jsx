import React from 'react'
import { Card, CardBody, Input, Button } from 'mdbreact'
import _ from 'lodash'
import { finding } from '../../redux/actions/order.action'
import { connect } from 'react-redux'

class FindForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            number: undefined,
            client_NIP: undefined,
            broker_NIP: undefined,
            client_country: undefined,
            broker_country: undefined
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        let picked = _.pickBy(this.state, _.isString)
        console.log(picked)
        event.preventDefault()
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <form>
                        <p className="h3 text-center py-3">Szukanie zleceń</p>
                        <div className="grey-text">
                            <Input name="number" label="Numer faktury" icon="briefcase" group type="text" onChange={this.handleChange} />
                            <Input name="client_NIP" label="NIP klienta" icon="address-card" group type="text" validate error="wrong" success="right" onChange={this.handleChange} />
                            <Input name="broker_NIP" label="NIP pośrednika" icon="address-card-o" group type="text" validate error="wrong" success="right" onChange={this.handleChange} />
                            <Input name="client_country" label="Kraj klienta" icon="flag" group type="text" validate error="wrong" success="right" onChange={this.handleChange} />
                            <Input name="broker_country" label="Kraj pośrednika" icon="flag-o" group type="text" validate error="wrong" success="right" onChange={this.handleChange} />
                        </div>
                        <div className="text-center py-4 mt-3">
                            <Button color="cyan" type="submit" onClick={this.handleSubmit}>Szukaj</Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        )
    }
}

function mapStateToProps({ orders }) {
    return {
        orders
    }
}

export default connect(mapStateToProps, { finding })(FindForm)