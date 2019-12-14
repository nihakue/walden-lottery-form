import React from "react";
import { Field } from "./Field";


export function Term({ title, desc, register, errors }: any) {
  return (<Field name={title} errors={errors}>
    <label htmlFor={title}>{title}</label>
    <label htmlFor={title}>{desc}</label>
    <span className="radio-group">
      <input ref={register({ validate: (value: any) => value === 'accept' })} type="radio" name={title} value="accept"></input>
      <label htmlFor="accept">I accept</label>
      <input ref={register} type="radio" name={title} value="decline"></input>
      <label htmlFor="decline">I do not accept</label>
    </span>
  </Field>);
}
