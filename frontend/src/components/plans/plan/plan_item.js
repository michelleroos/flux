import React from 'react';
import { NavLink } from 'react-router-dom';

class PlanItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            joined: false,
            errors: {},
            loggedIn: true
        }
        this.handleClick = this.handleClick.bind(this);
        this.addMember = this.addMember.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
    }

    refreshPage() {
        if (Object.values(this.props.currentUser).length === 0) {
            this.props.openModal('Sign In')
        } else {
            this.setState({ loggedIn: false })
        }
    }

    addMember(e) {
        e.preventDefault();
        
        this.props.joinParty(this.props.match.params.planId, this.props.currentUser.id)
            .then((res) => {
                if (res.type === 'RECEIVE_PLAN_ERRORS') {
                    return this.setState({ errors: res.errors })
                } else {
                    return this.setState({ joined: true })
                }
        })
    }

    componentDidMount() {
        this.props.fetchPlan(this.props.match.params.planId)
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value })
    }

    handleClick(e) {
        e.preventDefault();
        let email = this.state.email;
        this.props.sendInvite(email, this.props.plan._id)
        this.setState({ email: '' })
    }

    render() {

        if (!this.props.plan) return null;
        let joinButton;

        const mapped = this.props.plan.members
            .filter(plan => plan.id === this.props.currentUser.id)

        if (mapped.length > 0) {
            joinButton = (
                <div>
                    Congrats! You are part of our group!
                </div>
            )
        } else {
            joinButton = (
                <button onClick={this.addMember}>
                    Join
                </button>
            )
        }
        debugger

        return (
            <div>
                {this.props.plan.title}
                {this.props.plan.description}
                {this.state.loggedIn ? this.refreshPage() : null}
                <form>
                    <div>Invite people:</div>
                    <input onChange={this.update('email')}
                            placeholder='Email *'
                    />
                    <button onClick={this.handleClick}>
                        Send Invite
                    </button>
                </form>
                {joinButton}
                <NavLink to={{
                    pathname: `/${this.props.plan._id}/edit`,
                    aboutProps: {
                        plan: this.props.plan,
                        editPlan: this.props.editPlan
                    }
                }}>
                    Edit Plan
                </NavLink>
            </div>
        )
    }
};

export default PlanItem;