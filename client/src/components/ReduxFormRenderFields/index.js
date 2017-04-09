/**
 * Created by hreid on 4/8/17.
 */
import React from 'react'

export const textField = ({ input, label, type, placeholder, id, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} type={type} id={id} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)
