import React, { Fragment } from 'react'
import { Container, Row, Col, Input, Button } from 'mdbreact';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './login.css'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            windowHeight: window.innerHeight,
            username: '',
            password: '',
            errors: {
                username: null,
                password: null
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value,

        })

    }

    handleBlur(event) {
        const { name, value } = event.target
        let errors = Object.assign({}, this.state.errors)
        console.log(value.length)
        if (name == 'username' && value.length >= 4) {
            errors.username = 'Username zawiera tylko 4 znaki'
        } else {
            errors.username = undefined
        }
        this.setState({
            errors
        })
    }

    handleSubmit(event) {
        event.preventDefault()
    }

    render() {

        const checkErrorForUsername = this.state.errors.username != undefined ? 'red-alert' : ''
        const checkErrorForPassword = this.state.errors.password != undefined ? 'red-alert' : ''

        if (this.props.loginResult.auth) {
            return <Redirect to="/dashboard" />
        }

        return (
            <Container>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <form className="login-form" style={{ paddingTop: this.state.windowHeight / 4 + 'px' }}
                            onSubmit={this.handleSubmit}
                        >
                            <p className="h3 text-center mb-4">Logowanie</p>
                            <div className="grey-text">
                                <Input name="username" label="Username" icon="user" type="text"
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    className={checkErrorForUsername}
                                />
                                <p className="warning">{this.state.errors.username}</p>
                                <Input name="password" label="Hasło" icon="lock" type="password"
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    className={checkErrorForPassword}
                                />
                                <p className="warning">{this.state.errors.password}</p>
                            </div>
                            <div className="text-center">
                                <Button type="submit">Login</Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps({ loginResult }) {
    return {
        loginResult
    }
}

const page = connect(mapStateToProps)(Login)
export { page as LoginPage }