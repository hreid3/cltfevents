/**
 * Created by hreid on 4/8/17.
 */
import React from 'react'
import ReactQuill from 'react-quill'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'react-date-picker/index.css'
import { DateField, DatePicker } from 'react-date-picker'
import moment from 'moment'
import { FRIENDLY_DATE_FORMAT } from '../../routes/Event/modules/constants'

export const textField = ({ input, label, type, placeholder, id, autoFocus = false, meta: { touched, error, warning } }) => {
  return (
    <div className={"form-group" + (touched && error ? ' has-error' : '')}>
    <label className="control-label" htmlFor={id}>
      {label}&nbsp;
      <span className="text-danger">{touched && ((error && <span>({error})</span>) || (warning && <span>({warning})</span>))}</span>
    </label>
    <div className="pt-form-content">
      <input {...input} placeholder={placeholder} type={type} id={id} className="form-control" autoFocus={autoFocus} />
      {/*<div className="pt-form-helper-text">Helper text with details / user feedback</div>*/}
    </div>
  </div>
  )
}

export const numberTextField = ({ input, label, type = 'number', placeholder, id, min = 0, max = 999, step = 1, autoFocus = false, meta: { touched, error, warning } }) => {
  return (
    <div className={"form-group" + (touched && error ? ' has-error' : '')}>
      <label className="control-label" htmlFor={id}>
        {label}&nbsp;
      </label>
      <div className="pt-form-content">
        <input {...input} placeholder={placeholder} type={type} id={id} className="form-control" min={min} max={max} step={step} autoFocus={autoFocus} />
        <div className="text-danger">{touched && ((error && <span>({error})</span>) || (warning && <span>({warning})</span>))}</div>
        {/*<div className="pt-form-helper-text">Helper text with details / user feedback</div>*/}
      </div>
    </div>
  )
}

export const textareaField = ({ input, label, placeholder, id, rows = 5, autoFocus = false, meta: { touched, error, warning } }) => {
  return (
    <div className={"form-group" + (touched && error ? ' has-error' : '')}>
      <label className="control-label" htmlFor={id}>
        {label}&nbsp;
      </label>
      <div className="pt-form-content">
        <textarea {...input} placeholder={placeholder} id={id} className="form-control " rows={rows} autoFocus={autoFocus} />
        <div className="text-danger">{touched && ((error && <span>({error})</span>) || (warning && <span>({warning})</span>))}</div>
        {/*<div className="pt-form-helper-text">Helper text with details / user feedback</div>*/}
      </div>
    </div>
  )
}


export const wysiwygEditorField = ({ input, label, value, meta: { touched, error, warning }}) => {
  return (
    <div className={"form-group" + (touched && error ? ' has-error' : '')}>
      <label className="control-label">
        {label}&nbsp;
        <span className="text-danger">{touched && ((error && <span>({error})</span>) || (warning && <span>({warning})</span>))}</span>
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
    <div className={"form-group" + (touched && error ? ' has-error' : '')}>
      <label className="control-label">
        {label}&nbsp;
        <span className="text-danger">{touched && ((error && <span>({error})</span>) || (warning && <span>({warning})</span>))}</span>
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
          noResultsText="No Items are available"
        />
      </div>
    </div>
  )
}

export const selectTagField = ({input, label, options, meta: { touched, error, warning }, placeholder}) => {
  input.onBlur = null
  return (
    <div className={"form-group" + (touched && error ? ' has-error' : '')}>
      <label className="control-label">
        {label}&nbsp;
        <span className="text-danger">{touched && ((error && <span>({error})</span>) || (warning && <span>({warning})</span>))}</span>
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



export const asyncSelectField = ({input, label, loadOptions, meta: { touched, error, warning }, placeholder}) => {
  input.onBlur = null
  return (
    <div className={"form-group" + (touched && error ? ' has-error' : '')}>
      <label className="control-label">
        {label}&nbsp;
        <span className="text-danger">{touched && ((error && <span>({error})</span>) || (warning && <span>({warning})</span>))}</span>
      </label>
      <div className="pt-form-content">
        <Select.Async
          {...input}
          multi={false}
          loadOptions={loadOptions}
          placeholder={placeholder}
          onBlurResetsInput={false}
        />
      </div>
    </div>
  )
}

export const datetimePickerField = ({input, label, defaultValue, meta: { touched, error, warning }, placeholder}) => {

  if (!moment(input.value, FRIENDLY_DATE_FORMAT, true).isValid()) {
    try {
      const tmp = moment(input.value)
      if (tmp.isValid()) {
        input.value = tmp.format(FRIENDLY_DATE_FORMAT)
      } else {
        input.value = moment()
      }
    } catch(err) {
      input.value = moment()
    }
  }
  console.log("pickerField", input.value)
  return (
    <div className={"form-group" + (touched && error ? ' has-error' : '')}>
      <label className="control-label">
        {label}&nbsp;
        <span className="text-danger">{touched && ((error && <span>({error})</span>) || (warning && <span>({warning})</span>))}</span>
      </label>
      <div className="pt-form-content">
        <DateField
          forceValidDate={true}
          defaultValue={input.value}
          dateFormat={FRIENDLY_DATE_FORMAT}
          {...input}
        >
          <DatePicker
            navigation={true}
            locale="en"
            forceValidDate={true}
            highlightWeekends={true}
            highlightToday={true}
            weekNumbers={true}
            weekStartDay={0}
          />
        </DateField>
      </div>
    </div>
  )
}

