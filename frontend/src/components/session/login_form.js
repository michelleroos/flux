import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            errored: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.demoLogin = this.demoLogin.bind(this);
    }

    handleErrors(field) {
        return this.props.errors.filter(error => error.includes(field))
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    demoLogin(e) {
        e.preventDefault();
        const demoUser = {
            email: "waldo@odlaw.com",
            password: "123456"
        }

        this.props.login(demoUser)
            .then((res) => {
                if (typeof res !== 'undefined') {
                    return this.setState({ errored: true })
                } else {
                    this.props.hideModal()
                }
            }
        )
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            email: this.state.email,
            password: this.state.password,
        }
        
        this.props.login(user)
            .then((res) => {
                if (typeof res !== 'undefined') {
                    return this.setState({ errored: true })
                } else {
                    this.props.hideModal()
                }
            }
        )
    }

    render() {
        return (
                <div id='login'>
                    <form >
                        <input className='form-inputs' value={this.state.email}
                                onChange={this.update('email')}
                                type='text'
                                placeholder='Email'
                            />
                        {this.state.errored ? (
                            <div className='errors' >{this.handleErrors('Email')}</div>
                            ) : null
                        }
                        <input className='form-inputs' value={this.state.password}
                                onChange={this.update('password')}
                                type='password'
                                placeholder='Password'
                            />
                        {this.state.errored ? (
                        <div className='errors' >{this.handleErrors('Password')}</div>
                            ) : null
                        }
                        {this.state.errored ? (
                        <div className='errors' >{this.handleErrors('Incorrect')}</div>
                            ) : null
                        }
                        <button className='buttons' onClick={this.handleSubmit}
                                value='Sign In'>
                            Sign In
                        </button>
                        {this.state.errored ? (
                        <div className='errors' >{this.handleErrors('user')}</div>
                            ) : null
                        }
                        <button className='buttons' onClick={this.demoLogin}
                                value='Demo'>
                            Demo
                        </button>
                    <h5>Don't have an account?</h5>
                    <div onClick={() => this.props.openModal('Sign Up')}> 
                        <h3>Create an account</h3>
                    </div>
                    </form>
                </div>
        )
    }
};

export default LoginForm;