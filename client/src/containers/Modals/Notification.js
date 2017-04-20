/**
 * Created by hreid on 4/19/17.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../../store/modal';
import Modal from '../../components/Modal';

const Notification = ({ title, afterClose, hideModal }) => {
  const onClose = () => {
    hideModal();

    if (afterClose) {
      afterClose();
    }
  };

  return (
    <Modal title={title} onClose={onClose}>
      <button onClick={onClose}>
        Ok
      </button>
    </Modal>
  );
};

Notification.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func
};

export default connect(null, { hideModal })(Notification);
