import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.scss';


class Header extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleClick(e) {
    
    let target = e.currentTarget.innerHTML
    this.props.openModal(target)
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout()
    this.props.history.push('/')
  }


  render() {
    let { currentUser } = this.props;
    const path = this.props.location.pathname;
    let accountButtons;

    if (!currentUser) {
      accountButtons = (
        <>
          <button className='buttons' onClick={this.handleClick}>Sign In</button>
          <button className='buttons' onClick={this.handleClick}>Sign Up</button>
        </>
      )
    } else if (currentUser && path === "/") {
      accountButtons = (
        <>
          <Link to={`/users/${currentUser._id}`}>
            <i className="icons fas fa-user-circle fa-2x"></i>
          </Link>
            <button className='buttons' onClick={this.handleLogout}>Log Out</button>
        </>
      )
    } else if (path.includes("users")) {
      accountButtons = (
      <>
          <Link to='/plans/create'>
            {/* plus icon for add new trip */}
            <i className="icons fas fa-plus-circle fa-2x"></i>
          </Link>
          <button className='buttons' onClick={this.handleLogout}>Log Out</button>
      </>
      )
    } else {
      accountButtons = (
        <>
          <Link to='/plans/create'>
            {/* plus icon for add new trip */}
            <i className="icons fas fa-plus-circle fa-2x"></i>
          </Link>
          <Link to={`/users/${currentUser._id}`}>
            <i className="icons fas fa-user-circle fa-2x"></i>
          </Link>
          <button className='buttons' onClick={this.handleLogout}>Log Out</button>
        </>
      )
    }

    return (
      <header>
        <div className='header-cont'>
          <div className='left-head'>
            <Link className='logo-link' to="/" ><h1 className='logo'>flux</h1></Link>
          </div>
          <div className='right-head'>
            {accountButtons}
            <Link to='/about'>
              <i className="icons fas fa-question-circle fa-2x"></i>
            </Link>
          </div>

        </div>
      </header >
    )

  }


}


export default Header;