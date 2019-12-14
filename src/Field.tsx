import React from "react";
import { ErrorMessage } from "./ErrorMessage";


export function Field({ name, errors, children }: any) {
  return (<div className="form-group">
    {children}
    <ErrorMessage errors={errors} name={name} />
  </div>);
}
