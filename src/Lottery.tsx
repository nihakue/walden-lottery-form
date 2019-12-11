import React from "react";
import useForm from "react-hook-form";
import "./App.css";


const FULL_NAME = "entry.238038247";
const SCHOOL_YEAR = "entry.1895239640";
const ENTERING_GRADE = "entry.1470255954";
const TELEPHONE = "entry.1938712370";
const EMAIL_ADDRESS = "entry.303926191";
const SIBLINGS_ATTENDING = "entry.483979809";
const SIBLING_NAMES = "entry.189313467";
const PARENT_NAMES = "entry.1387083951";
const DATE_OF_BIRTH = "entry.1298740969";
const POSTAL_ADDRESS = "entry.21119083";
const GENDER = "entry.977251992";
const SIBLINGS_APPLYING = "entry.1167648643";
const SIBLINGS_APPLYING_NAMES = "entry.473053907";

const BOOLEAN_FIELDS = [SIBLINGS_APPLYING, SIBLINGS_ATTENDING];

const SIMPLE_TERMS = [
  {title: "This is not a registration application!", desc: "I understand that this application does not guarantee my child(ren) placement at this school."},
  {title: "All lottery applications have an equal chance of being picked (regardless of how old or new the application is), with a few exceptions:", desc: "I understand that all openings are filled via a random lottery, with initial preference given to faculty students and siblings of enrolled students as set forth in state law and our Charter."},
  {title: "Lottery applications only last for one year!", desc: "I understand that I must re-apply each school year that I wish to be considered in the lottery."}
]

export function Lottery({onSubmitted}: {onSubmitted: () => void}) {
  const { register, handleSubmit, watch, errors } = useForm();
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<undefined | boolean>();

  // On Oct 1 at midnight in MST, switch to allowing the next year, stop allowing the previous
  const validYears = React.useMemo(() => {
    const now = new Date();
    const switchesAt = new Date(Date.UTC(now.getFullYear(), 9, 1, 6));
    const earliestYear = now > switchesAt ? now.getFullYear() : now.getFullYear() - 1;
    return [earliestYear, earliestYear + 1];
  }, [])

  const name = watch(FULL_NAME) || 'the applicant';
  const schoolYear = watch(SCHOOL_YEAR) || 'the school year';
  const grade = watch(ENTERING_GRADE);
  const siblingsAttending = watch(SIBLINGS_ATTENDING);
  const siblingsApplying = watch(SIBLINGS_APPLYING);
  

  const submit = React.useCallback(async (formData: any, e: any) => {
    setSubmitting(true);
    const formDataObject = new FormData(e.target);
    BOOLEAN_FIELDS.forEach(f => {
      const value = formDataObject.get(f);
      formDataObject.set(f, value === 'on' ? 'TRUE' : 'FALSE');
    });
    try {
      await fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSdBUWzMY-tT4DkXlMqjv6HBPeiIU1pqFwOK356GXnnMoZwqmg/formResponse', {
        method: 'post',
        mode: 'no-cors',
        //@ts-ignore
        body: new URLSearchParams(formDataObject),
      });
      onSubmitted();
      setError(false);
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }, [onSubmitted]);

  if (error === false) {
    return null;
  }

  return (
      <form
        onSubmit={handleSubmit(submit)}
      >
        <a id="lottery-application"></a>
        <Field name={FULL_NAME} errors={errors}>
          <label htmlFor={FULL_NAME}>What is this student's full name?</label>
          <input ref={register({required: true})} type="text" name={FULL_NAME}></input>
        </Field>

        <Field name={SCHOOL_YEAR} errors={errors}>
          <label htmlFor={SCHOOL_YEAR}>
            Which school year is this application for?
          </label>
          <label htmlFor={SCHOOL_YEAR}>
            {
              "*Note: this application is only valid for the school year chosen here. If you wish to apply for multiple years, you must submit a seperate application for each year. Applications for the following year will become available starting Oct. 1"
            }
          </label>
          <select ref={register({required: true})} name={SCHOOL_YEAR}>
            <option></option>
            {validYears.map(year => <option key={year}>{`${year}-${year + 1}`}</option>)}
          </select>
        </Field>

        <Field name={ENTERING_GRADE} errors={errors}>
          <label
            htmlFor={ENTERING_GRADE}
          >{`What grade will ${name} be entering in ${schoolYear}?`}</label>
          <select ref={register({required: true})} name={ENTERING_GRADE}>
            <option></option>
            {Array(13)
              .fill(0)
              .map((_, i) => (
                <option key={i}>{i === 0 ? 'K' : i}</option>
              ))}
          </select>
        </Field>

        <Field name={TELEPHONE} errors={errors}>
          <label htmlFor={TELEPHONE}>What is your telephone number?</label>
          <label
            htmlFor={TELEPHONE}
          >{`We'll use this as a secondary means of leting you know if ${name}'s name is drawn (We'll e-mail you first).`}</label>
          <input ref={register({required: true})} type="tel" name={TELEPHONE}></input>
        </Field>

        <Field name={EMAIL_ADDRESS} errors={errors}>
          <label htmlFor={EMAIL_ADDRESS}>What is your e-mail address?</label>
          <label htmlFor={EMAIL_ADDRESS}>
            Tracking e-mails from us is critical! We will use this e-mail
            address to send you important updates about your lottery
            application.
          </label>
          <input ref={register({required: true})} type="email" name={EMAIL_ADDRESS}></input>
        </Field>

        <Field name={SIBLINGS_ATTENDING} errors={errors}>
          <label
            htmlFor={SIBLINGS_ATTENDING}
          >{`Does ${name} have any siblings attending Walden already?`}</label>
          <label
            htmlFor={SIBLINGS_ATTENDING}
          >{`Having siblings already at Walden allows us to place ${name} directly onto a waiting list.`}</label>
          <input
            ref={register}
            type="checkbox"
            name={SIBLINGS_ATTENDING}
          ></input>
        </Field>

        {siblingsAttending && (
          <Field name={SIBLING_NAMES} errors={errors}>
            <label htmlFor={SIBLING_NAMES}>
              What are those siblings' full names?
            </label>
            <label htmlFor={SIBLING_NAMES}>
              e.g. John Doe, Jane Doe, Janet Doe
            </label>
            <input ref={register} type="text" name={SIBLING_NAMES}></input>
          </Field>
        )}

        <Field name={PARENT_NAMES} errors={errors}>
          <label
            htmlFor={PARENT_NAMES}
          >{`What is/are ${name}'s parent/guardian's name(s)?`}</label>
          <label htmlFor={PARENT_NAMES}>e.g. John Doe, Jane Doe</label>
          <input ref={register({required: true})} type="text" name={PARENT_NAMES}></input>
        </Field>

        <Field name={DATE_OF_BIRTH} errors={errors}>
          <label
            htmlFor={DATE_OF_BIRTH}
          >{`What was ${name}'s date of birth?`}</label>
          <input ref={register({required: true})} type="date" name={DATE_OF_BIRTH}></input>
        </Field>

        <Field name={POSTAL_ADDRESS} errors={errors}>
          <label htmlFor={POSTAL_ADDRESS}>What is your postal address?</label>
          <label
            htmlFor={POSTAL_ADDRESS}
          >{`This is so we can send you reading packets, etc. should ${name}'s name be drawn.`}</label>
          <input ref={register({required: true})} type="text" name={POSTAL_ADDRESS}></input>
        </Field>

        <Field name={GENDER} errors={errors}>
          <label htmlFor={GENDER}>{`What is ${name}'s gender?`}</label>
          <select ref={register({required: true})} name={GENDER}>
            <option></option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
        </Field>

        <Field name={SIBLINGS_APPLYING} errors={errors}>
          <label
            htmlFor={SIBLINGS_APPLYING}
          >{`Are you submitting applications for any of ${name}'s siblings for the  school year?`}</label>
          <label
            htmlFor={SIBLINGS_APPLYING}
          >{`This will allow us to place all siblings on the waiting list if any are drawn.`}</label>
          <input
            ref={register}
            type="checkbox"
            name={SIBLINGS_APPLYING}
          ></input>
        </Field>

        {siblingsApplying && (
          <Field name={SIBLINGS_APPLYING_NAMES} errors={errors}>
            <label htmlFor={SIBLINGS_APPLYING_NAMES}>Please list their names</label>
            <label htmlFor={SIBLINGS_APPLYING_NAMES}>
              Note: you will still need to submit a separate application for
              each sibling.
            </label>
            <input
              ref={register({required: true})}
              type="text"
              name={SIBLINGS_APPLYING_NAMES}
            ></input>
          </Field>
        )}

        {SIMPLE_TERMS.map(term => (
          <Term key={term.title} {...term} register={register} errors={errors} />
        ))}
        {grade === 'K' && (
          <Term
            title={"Kindergarten is limited to children 5 and up."}
            desc={`I understand that ${name} must be at least 5 years old on or before September 1 of the chosen school year to begin kindergarten.`}
            register={register}
            errors={errors}
          />
        )}

        <input type="submit" value={submitting ? 'Submitting...' : 'Submit'}/>
        {error && <span>Something went wrong. Please try again.</span>}
      </form>
  );
};

function Term({title, desc, register, errors}: any) {
  return (
    <Field name={title} errors={errors}>
      <label htmlFor={title}>{title}</label>
      <label htmlFor={title}>{desc}</label>
      <span className="radio-group">
        <input ref={register({validate: (value: any) => value === 'accept'})} type="radio" name={title} value="accept"></input>
        <label htmlFor="accept">I accept</label>
        <input ref={register} type="radio" name={title} value="decline"></input>
        <label htmlFor="decline">I do not accept</label>
      </span>
    </Field>
  );
}

const ERROR_MESSAGES = {
  required: 'This field is required',
  validate: 'You must read and accept these terms to submit',
}

function ErrorMessage({ errors, name }: {errors: any, name: string}) {
  if (!errors[name]) return null;
  console.log(errors);
  // @ts-ignore
  return <span className='validation-error'>{ERROR_MESSAGES[errors[name].type]}</span>;
};

function Field({name, errors, children}: any) {
  return (
    <div className="form-group">
      {children}
      <ErrorMessage errors={errors} name={name} />
    </div>
  )
}
