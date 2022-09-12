import { useState } from "react";

export const useForm = inputValues => {
    const [form, setValues] = useState(inputValues);
  
    const handleChange = (event) => {
        event.persist();
        event.preventDefault();
        const {value, name} = event.target;
        setValues({...form, [name]: value});
    };
    return {form, handleChange, setValues};
}