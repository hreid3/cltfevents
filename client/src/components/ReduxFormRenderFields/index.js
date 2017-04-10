/**
 * Created by hreid on 4/8/17.
 */
import React from 'react'
import ReactQuill from 'react-quill'

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

export const wysiwygEditorField = ({ input, label, value, meta: { touched, error, warning }}) => {
  console.log('value', value, input)
  return (
    <div className="pt-form-group">
      <label className="pt-form-group">
        {label}&nbsp;
        <span className="pt-text-muted">{touched && ((error && <span>({error})</span>) || (warning && <span>({warning})</span>))}</span>
      </label>
      <div className="pt-form-content">
        <ReactQuill
          value={value}
          {...input}
        />
      </div>
    </div>
  )
}
