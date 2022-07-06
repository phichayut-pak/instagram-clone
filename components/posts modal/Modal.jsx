import React from 'react'
import ReactDOM from 'react-dom'
import Backdrop from './Backdrop'
import CreateNewPost from './CreateNewPost/CreateNewPost'

const Modal = ({ onClose }) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />, document.getElementById('backdrop-post')
      )}
      {ReactDOM.createPortal(
        <CreateNewPost/>, document.getElementById('overlay-post')
      )}
    </div>
  )
}

export default Modal