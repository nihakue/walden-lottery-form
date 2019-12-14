import React from "react";


const ERROR_MESSAGES = {
  required: 'This field is required',
  validate: 'You must read and accept these terms to submit',
};

export function ErrorMessage({ errors, name }: {
  errors: any;
  name: string;
}) {
  if (!errors[name])
    return null;
  console.log(errors);
  // @ts-ignore
  return <div className='validation-error'>{ERROR_MESSAGES[errors[name].type]}</div>;
}
;
