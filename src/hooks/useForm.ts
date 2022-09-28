import { SyntheticEvent, useState } from "react";


export const useForm = <T>(inputValues : T) => {
    const [form, setValues] = useState(inputValues);
  
    const handleChange = (event : SyntheticEvent) => {
        event.persist();
        event.preventDefault();
        /* @ts-ignore */
        const {value, name} = event.target;
        setValues({...form, [name]: value});
    };
    return {form, handleChange, setValues};
}