/**
 * Created by hreid on 4/19/17.
 */

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const MODAL_TYPE_NOTIFICATION = 'MODAL_TYPE_NOTIFICATION';
export const MODAL_TYPE_CONFIRMATION = 'MODAL_TYPE_CONFIRMATION';

const initialState = {
  type: null,
  props: {}
};

export const showModal = (type, props) => ({
  type: SHOW_MODAL,
  payload: {
    type,
    props
  }
});

export const hideModal = () => ({
  type: HIDE_MODAL
});


export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        type: action.payload.type,
        props: action.payload.props
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}

export default modalReducer
