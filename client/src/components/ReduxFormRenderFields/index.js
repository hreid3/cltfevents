/**
 * Created by hreid on 4/8/17.
 */
import React from 'react'

export const textField = ({ input, label, type, placeholder, id, meta: { touched, error, warning } }) => (
  <div className="pt-form-group">
    <label className="pt-label" htmlFor={id}>
      {label}&nbsp;
      <span className="pt-text-muted">{touched && ((error && <span>({error})</span>) || (warning && <span>({warning})</span>))}</span>
    </label>
    <div className="pt-form-content">
      <input {...input} placeholder={placeholder} type={type} id={id} className="pt-input"/>
      {/*<div className="pt-form-helper-text">Helper text with details / user feedback</div>*/}
    </div>
  </div>
)
