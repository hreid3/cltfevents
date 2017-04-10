/**
 * Created by hreid on 4/8/17.
 */
import React from 'react'
import ReactQuill from 'react-quill'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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

export const selectField = ({input, label, options, meta: { touched, error, warning }, placeholder}) => {
  let selectableOptions = [{value: 'missing', label: "Missing option data"}]
  if (options) {
    selectableOptions = options.map((obj) => {
      return {value: obj.id, label: obj.title}
    })
  }
  input.onBlur = null
  return (
    <div className="pt-form-group">
      <label className="pt-form-group">
        {label}&nbsp;
        <span className="pt-text-muted">{touched && ((error && <span>({error})</span>) || (warning && <span>({warning})</span>))}</span>
      </label>
      <div className="pt-form-content">
        <Select
          {...input}
          multi={false}
          options={selectableOptions}
          placeholder={placeholder}
          onBlurResetsInput={false}
        />
      </div>
    </div>
  )
}
