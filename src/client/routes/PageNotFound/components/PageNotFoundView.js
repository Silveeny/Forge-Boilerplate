import { Link } from 'react-router'
import './PageNotFoundView.scss'
import React from 'react'

class PageNotFoundView extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentWillMount () {

    this.props.setNavbarState({
      links: {
        settings: false
      }
    })
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render() {

    return (
      <div className="page-not-found">
        <img className='forge-hero'/>
        <div className="container">
          <label>
            The Arcadis Configurator is still in an alpha.
            Please be patient as this is an ongoing project.
            <br/>
            <br/>
            Try one of the following routing link:
            <br/>
            <br/>
            <Link to={'/'}>
              Initial
            </Link>
              &nbsp;|&nbsp;
            <Link to={'/configurator?id=58c7ae474c6d400bfa5aaf37'}>
              Color Layer
            </Link>
              &nbsp;|&nbsp;
            <Link to={'/configurator'}>
              Extensions
            </Link>
              &nbsp;|&nbsp;
            <Link to={'/gallery'}>
              Upload
            </Link>
          </label>
        </div>
      </div>
    )
  }
}

export default PageNotFoundView
























































