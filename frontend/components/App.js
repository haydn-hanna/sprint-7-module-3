// ❗ The ✨ TASKS inside this component are NOT IN ORDER.
// ❗ Check the README for the appropriate sequence to follow.
import React from 'react'
import * as Yup from 'yup'

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
    .required(e.agreementRequired)
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

  },[form])

  const onChange = evt => {
    // ✨ TASK: IMPLEMENT YOUR INPUT CHANGE HANDLER
    // The logic is a bit different for the checkbox, but you can check
    // whether the type of event target is "checkbox" and act accordingly.
    // At every change, you should validate the updated value and send the validation
    // error to the state where we track frontend validation errors.
    const { name, value, type } = evt.target
    
    yup
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
    
    setFormState({
      ...formState, [name]: value
    });
  }

  const onSubmit = evt => {
    // ✨ TASK: IMPLEMENT YOUR SUBMIT HANDLER
    // Lots to do here! Prevent default behavior, disable the form to avoid
    // double submits, and POST the form data to the endpoint. On success, reset
    // the form. You must put the success and failure messages from the server
    // in the states you have reserved for them, and the form
    // should be re-enabled.
  }

  return (
    <div> {/* TASK: COMPLETE THE JSX */}
      <h2>Create an Account</h2>
      <form>
        <h4 className="success">Success! Welcome, new user!</h4>
        <h4 className="error">Sorry! Username is taken</h4>

        <div className="inputGroup">
          <label htmlFor="username">Username:</label>
          <input id="username" name="username" type="text" placeholder="Type Username" />
          <div className="validation">username is required</div>
        </div>

        <div className="inputGroup">
          <fieldset>
            <legend>Favorite Language:</legend>
            <label>
              <input type="radio" name="favLanguage" value="javascript" />
              JavaScript
            </label>
            <label>
              <input type="radio" name="favLanguage" value="rust" />
              Rust
            </label>
          </fieldset>
          <div className="validation">favLanguage is required</div>
        </div>

        <div className="inputGroup">
          <label htmlFor="favFood">Favorite Food:</label>
          <select id="favFood" name="favFood">
            <option value="">-- Select Favorite Food --</option>
            <option value="pizza">Pizza</option>
            <option value="spaghetti">Spaghetti</option>
            <option value="broccoli">Broccoli</option>
          </select>
          <div className="validation">favFood is required</div>
        </div>

        <div className="inputGroup">
          <label>
            <input id="agreement" type="checkbox" name="agreement" />
            Agree to our terms
          </label>
          <div className="validation">agreement is required</div>
        </div>

        <div>
          <input type="submit" disabled={false} />
        </div>
      </form>
    </div>
  )
}
