/**
 * Created by hreid on 4/19/17.
 */


import React from 'react';
import { connect } from 'react-redux';

// import Notification from './modals/Notification';
import Confirmation from './Confirmation';
import ComponentModal from './ComponentModal'
import { MODAL_TYPE_CONFIRMATION, MODAL_TYPE_WRAPPED_COMPONENT } from '../../store/modal';

const MODAL_COMPONENTS = {
  // [MODAL_TYPE_NOTIFICATION]: Notification,
  [MODAL_TYPE_CONFIRMATION]: Confirmation,
  [MODAL_TYPE_WRAPPED_COMPONENT]: ComponentModal,
};

const ModalRoot = ({ type, props }) => {
  if (!type) {
    return null;
  }

  const ModalComponent = MODAL_COMPONENTS[type];
  return <ModalComponent {...props} />;
};

export default connect(state => state.modal)(ModalRoot);
