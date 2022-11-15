import ServiceManager from 'SvcManager'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import React from 'react'
import './AboutDlg.scss'

export default class AboutDlg extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor() {

    super()
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentDidMount() {

    this.forgeSvc = ServiceManager.getService('ForgeSvc')
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  close () {

    this.props.close()
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render() {

    const clientId = this.forgeSvc
      ? this.forgeSvc.clientId
      : ''

    return (
      <div>
        <Modal className="dialog about"
          contentLabel=""
          isOpen={this.props.open}
          onRequestClose={() => {this.close()}}>

          <div className="title">
            <img height="16" src="C:\Users\niculits0219\Desktop\ForgeNJS\resources\img\logos\arcadis.png"/>
            <b>Arcadis POC Forge</b>
          </div>

          <div className="content ">
             <div>
               Forge Responsive Database Extensions
               <br/>
               Edited for Arcadis
               <br/>
               <a href="https://streamable.com/e0pzc" target="_blank">
               Cost App Video
               </a>
               &nbsp;- February 2019
               <br/>
               <br/>
               <div>
                 {/* This App ClientID:
                 <div className="clientId">
                  {clientId}
                 </div> */}
               </div>
               Work Based on RCDB-Github:
               <br/>
               <a href="https://github.com/Autodesk-Forge/forge-rcdb.nodejs" target="_blank">
               Forge RCDB
               </a>
             </div>
          </div>

        </Modal>
      </div>
    )
  }
}
