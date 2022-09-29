import { useState } from "react";


export const useForm = <T>(inputValues : T) => {
    const [form, setValues] = useState(inputValues);
  
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        event.preventDefault();
        const {value, name} = event.target;
        setValues({...form, [name]: value});
    };
    return {form, handleChange, setValues};
}