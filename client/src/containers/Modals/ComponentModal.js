/**
 * Created by hreid on 4/19/17.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../../store/modal';
import Modal from '../../components/Modal';

const ComponentModal = ({ title, onConfirm, hideModal, wrappedComponent }) => {
  const handleConfirm = (isConfirmed) => () => {
    hideModal();
    // onConfirm(isConfirmed);
  };

  return (
    <Modal title={title}>
      {wrappedComponent}
      {/*<button onClick={handleConfirm(false)}>*/}
        {/*Close*/}
      {/*</button>*/}
    </Modal>
  );
};

export default connect(null, { hideModal })(ComponentModal);
