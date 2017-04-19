/**
 * Created by hreid on 4/8/17.
 */
import React from 'react'
import ReactQuill from 'react-quill'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'react-date-picker/index.css'
import { Calendar } from 'react-date-picker'

export const textField = ({ input, label, type, placeholder, id, autoFocus = false, meta: { touched, error, warning } }) => {
  return (
  <div className="pt-form-group">
    <label className="pt-label" htmlFor={id}>
      {label}&nbsp;
      <span className="pt-text-muted">{touched && ((error && <span>({error})</span>) || (warning && <span>({warning})</span>))}</span>
    </label>
    <div className="pt-form-content">
      <input {...input} placeholder={placeholder} type={type} id={id} className="pt-fill pt-input" autoFocus={autoFocus} />
      {/*<div className="pt-form-helper-text">Helper text with details / user feedback</div>*/}
    </div>
  </div>
  )
}

export const wysiwygEditorField = ({ input, label, value, meta: { touched, error, warning }}) => {
  return (
    <div className="pt-form-group">
      <label className="pt-label">
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

export const selectField = ({input, label, options, placeholder, meta: { touched, error, warning }}) => {
  input.onBlur = null // IF thi is removed, then field just clears out
  return (
    <div className="pt-form-group">
      <label className="pt-label">
        {label}&nbsp;
        <span className="pt-text-muted">{touched && ((error && <span>({error})</span>) || (warning && <span>({warning})</span>))}</span>
      </label>
      <div className="pt-form-content">
        <Select
          {...input}
          multi={false}
          options={options}
          placeholder={placeholder}
          onBlurResetsInput={false}
          labelKey="title"
          valueKey="id"
        />
      </div>
    </div>
  )
}

export const selectTagField = ({input, label, options, meta: { touched, error, warning }, placeholder}) => {
  input.onBlur = null
  return (
    <div className="pt-form-group">
      <label className="pt-label">
        {label}&nbsp;
        <span className="pt-text-muted">{touched && ((error && <span>({error})</span>) || (warning && <span>({warning})</span>))}</span>
      </label>
      <div className="pt-form-content">
        <Select.Creatable
          {...input}
          multi={true}
          options={options}
          placeholder={placeholder}
          onBlurResetsInput={false}
        />
      </div>
    </div>
  )
}

export const datetimePickerField = ({input, label, defaultValue, meta: { touched, error, warning }, placeholder}) => {
  // input.onBlur = null
  return (
    <div className="pt-form-group">
      <label className="pt-label">
        {label}&nbsp;
        <span className="pt-text-muted">{touched && ((error && <span>({error})</span>) || (warning && <span>({warning})</span>))}</span>
      </label>
      <div className="pt-form-content">
        <Calendar dateFormat="DD/MM/YYYY hh:mm a" {...input} />
      </div>
    </div>
  )
}

