/**
 * Created by hreid on 4/19/17.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../../store/modal';
import Modal from '../../components/Modal';

const Confirmation = ({ title, onConfirm, hideModal }) => {
  const handleConfirm = (isConfirmed) => () => {
    hideModal();
    onConfirm(isConfirmed);
  };

  return (
    <Modal title={title}>
      <button onClick={handleConfirm(true)}>
        Yes
      </button>
      <button onClick={handleConfirm(false)}>
        No
      </button>
    </Modal>
  );
};

export default connect(null, { hideModal })(Confirmation);
