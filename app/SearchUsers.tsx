"use client";

import { useInput } from "react-raw-hooks/hooks/useInput";
import { FetchUsers } from "./FetchUsers";

export const SearchUsers = () => {

  const [input] = useInput('')

  return (
    <>
      <input {...input} />
      <FetchUsers search={input.value} />
    </>
  )
}