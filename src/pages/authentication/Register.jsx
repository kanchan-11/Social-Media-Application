import { Button, TextField, Box } from "@mui/material";
import { ErrorMessage, Form, Formik, Field } from "formik";
import React, { useState } from "react";
import * as Yup from "yup"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch } from "react-redux";
import { RegisterUserAction } from "../../redux/Auth/auth.action";
import { useNavigate } from "react-router-dom";

const initialValues = { firstName: "", lastName: "", email: "", password: "", gender: "" }
const validationSchema = {
    email: Yup
        .string()
        .email("Invalid Email")
        .required("Email is required")
    , password: Yup
        .string()
        .min(6, "Password must be atleast 6 characters").
        required("Password is required")
}
const Register = () => {

    const [gender, setGender] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (values) => {
        values.gender = gender
        console.log("handle submit", values)
        dispatch(RegisterUserAction({ data: values }))
    }
    const handleChange = (event) => {
        setGender(event.target.value)
    }
    return (
        <>
            <Formik onSubmit={handleSubmit}
                initialValues={initialValues}
            >
                <Form>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{ flex: 1 }}>
                                <Field
                                    as={TextField}
                                    name="firstName"
                                    label="First Name"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                />
                                <ErrorMessage
                                    name="firstName"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Field
                                    as={TextField}
                                    name="lastName"
                                    label="Last Name"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                />
                                <ErrorMessage
                                    name="lastName"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </Box>
                        </Box>
                        <div>
                            <Field
                                as={TextField}
                                name="email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>
                        <div>
                            <Field
                                as={TextField}
                                name="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>
                        <RadioGroup
                            onChange={handleChange}
                            row
                            aria-label="gender"
                            name="gender"
                            sx={{ justifyContent: 'center' }}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                        <ErrorMessage
                            name="gender"
                            component="div"
                            className="text-red-500 text-xs text-center"
                        />
                        <Button sx={{ padding: ".8rem 0rem", mt: 1 }} fullWidth type="submit"
                            variant="contained" color="primary">
                            Register
                        </Button>
                    </Box>
                </Form>
            </Formik>
            <div className="flex gap-2 items-center justify-center pt-5">
                <p className="text-sm text-gray-400">Already have an account?</p>
                <Button sx={{ textTransform: 'none' }} onClick={() => navigate("/login")}>Login</Button>
            </div>
        </>
    )
}
export default Register