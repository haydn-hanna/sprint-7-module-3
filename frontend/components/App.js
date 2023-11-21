// ❗ The ✨ TASKS inside this component are NOT IN ORDER.
// ❗ Check the README for the appropriate sequence to follow.
import React from 'react'
import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import axios from 'axios'

const e = { // This is a dictionary of validation error messages.
  // username
  usernameRequired: 'username is required',
  usernameMin: 'username must be at least 3 characters',
  usernameMax: 'username cannot exceed 20 characters',
  // favLanguage
  favLanguageRequired: 'favLanguage is required',
  favLanguageOptions: 'favLanguage must be either javascript or rust',
  // favFood
  favFoodRequired: 'favFood is required',
  favFoodOptions: 'favFood must be either broccoli, spaghetti or pizza',
  // agreement
  agreementRequired: 'agreement is required',
  agreementOptions: 'agreement must be accepted',
}

// ✨ TASK: BUILD YOUR FORM SCHEMA HERE
// The schema should use the error messages contained in the object above.
const formSchema = Yup.object().shape({
  username: Yup
    .string()
    .required(e.usernameRequired)
    .min(3,e.usernameMin)
    .max(20,e.usernameMax),
  favFood: Yup
    .string()
    .required(e.favFoodRequired)
    .oneOf(['broccoli','spaghetti','pizza'],e.favFoodOptions),
  favLanguage: Yup
    .string()
    .required(e.favLanguageRequired)
    .oneOf(['javascript','rust'], e.favLanguageOptions),
  agreement: Yup
    .boolean()
    .oneOf([true],e.agreementOptions)
});

export default function App() {
  // ✨ TASK: BUILD YOUR STATES HERE
  // You will need states to track (1) the form, (2) the validation errors,
  // (3) whether submit is disabled, (4) the success message from the server,
  // and (5) the failure message from the server.
  const [form,setFormValues] = useState({
    username:'',
    favFood:'',
    favLanguage:'',
    agreement:false
  })
  const [errors,setErrors] = useState({
    username:'',
    favFood:'',
    favLanguage:'',
    agreement:''
  })
  const [submitDisabled,setSubmitDisabled] = useState(true)
  const [serverSuccessMessage,setServerSuccessMessage] = useState('')
  const [serverFailureMessage,setServerFailureMessage] = useState('')


  // ✨ TASK: BUILD YOUR EFFECT HERE
  // Whenever the state of the form changes, validate it against the schema
  // and update the state that tracks whether the form is submittable.
  useEffect(()=>{
    formSchema.isValid(form).then(valid => {
      setSubmitDisabled(!valid)
    })
  },[form])

  const onChange = evt => {
    // ✨ TASK: IMPLEMENT YOUR INPUT CHANGE HANDLER
    // The logic is a bit different for the checkbox, but you can check
    // whether the type of event target is "checkbox" and act accordingly.
    // At every change, you should validate the updated value and send the validation
    // error to the state where we track frontend validation errors.
    let { name, value, type } = evt.target
    if(type === 'checkbox'){value = evt.target.checked}

    Yup
    .reach(formSchema, name)
    .validate(value)
    .then(valid => {
      setErrors({
        ...errors, [name]: ""
      });
    })
    .catch(err => {
      setErrors({
        ...errors, [name]: err.errors[0]
      });
    });
    
    setFormValues({
      ...form, [name]: value
    });
  }

  const onSubmit = evt => {
    // ✨ TASK: IMPLEMENT YOUR SUBMIT HANDLER
    // Lots to do here! Prevent default behavior, disable the form to avoid
    // double submits, and POST the form data to the endpoint. On success, reset
    // the form. You must put the success and failure messages from the server
    // in the states you have reserved for them, and the form
    // should be re-enabled.
    evt.preventDefault();
    setSubmitDisabled(true);
    axios
      .post("https://reqres.in/api/users", form)
      .then(res => {
        setFormValues({
          username:'',
          favFood:'',
          favLanguage:'',
          agreement:false
        })
        setServerSuccessMessage('Success! New user created!')
      })
      .catch(err => {
        setServerFailureMessage('Error! User not created!')
      });
      setSubmitDisabled(false)
  }

  return (
    <div> {/* TASK: COMPLETE THE JSX */}
      <h2>Create an Account</h2>
      <form>
        {serverSuccessMessage && <h4 className="success">{serverSuccessMessage}</h4>}
        {serverFailureMessage && <h4 className="error">{serverFailureMessage}</h4>}

        <div className="inputGroup">
          <label htmlFor="username">Username:</label>
          <input id="username" name="username" type="text" placeholder="Type Username" onChange={onChange} value={form.username}/>
          {errors.username && <div className="validation">{errors.username}</div>}
        </div>

        <div className="inputGroup">
          <fieldset value={form.favLanguage}>
            <legend>Favorite Language:</legend>
            <label>
              <input id="javascript-radio" type="radio" name="favLanguage" value="javascript" onChange={onChange} checked={form.favLanguage==='javascript'}/>
              JavaScript
            </label>
            <label>
              <input id="rust-radio" type="radio" name="favLanguage" value="rust" onChange={onChange} checked={form.favLanguage==='rust'}/>
              Rust
            </label>
          </fieldset>
          {errors.favLanguage && <div className="validation">{errors.favLanguage}</div>}
        </div>

        <div className="inputGroup">
          <label htmlFor="favFood">Favorite Food:</label>
          <select id="favFood" name="favFood" onChange={onChange} value={form.favFood}>
            <option value="">-- Select Favorite Food --</option>
            <option value="pizza">Pizza</option>
            <option value="spaghetti">Spaghetti</option>
            <option value="broccoli">Broccoli</option>
          </select>
          {errors.favFood && <div className="validation">{errors.favFood}</div>}
        </div>

        <div className="inputGroup">
          <label>
            <input id="agreement" type="checkbox" name="agreement" onChange={onChange} checked={form.agreement}/>
            Agree to our terms
          </label>
          {errors.agreement && <div className="validation">{errors.agreement}</div>}
        </div>

        <div>
          <input id="submit" type="submit" disabled={submitDisabled} onClick={onSubmit}/>
        </div>
      </form>
    </div>
  )
}
