import { Button, TextField, Box } from "@mui/material";
import { ErrorMessage, Form, Formik, Field } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup"
import { loginUserAction } from "../../redux/Auth/auth.action";
import { useNavigate } from "react-router-dom";

const initialValues = { email: "", password: "" }
const validationSchema = {
    email: Yup.string()
        .email("Invalid Email")
        .required("Email is required")
    , password: Yup.string()
        .min(6, "Password must be atleast 6 characters").
        required("Password is required")
}
const Login = () => {
    const [formValue, setFormValue] = useState();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (values) => {
        console.log("handle submit", values)
        dispatch(loginUserAction({ data: values }))
    }
    return (
        <>
            <Formik onSubmit={handleSubmit}
                initialValues={initialValues}
            >
                <Form>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <div>
                            <Field
                                as={TextField}
                                name="email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter your email"
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
                                placeholder="Enter your password"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>
                        <Button sx={{ padding: ".8rem 0rem", mt: 2 }} fullWidth type="submit"
                            variant="contained" color="primary">
                            Login
                        </Button>
                    </Box>
                </Form>
            </Formik>
            <div className="flex gap-2 items-center justify-center pt-5">
                <p className="text-sm text-gray-400">Don't have an account?</p>
                <Button sx={{ textTransform: 'none' }} onClick={() => navigate("/register")}>Register</Button>
            </div>
        </>
    )
}
export default Login