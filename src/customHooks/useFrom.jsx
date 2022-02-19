import {useState} from "react"

const useForm = (initialValue) => {
    const [values, setValues] = useState(initialValue);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleCheckboxChange = (e) => {
        const {name, checked} = e.target;
        setValues({
            ...values,
            [name]: checked,
        })
    }

    return({
        values,
        handleInputChange,
        handleCheckboxChange
    })
}

export default useForm;