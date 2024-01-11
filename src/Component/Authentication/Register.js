/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { REGISTER_MUTATION } from '../../ApolloClient/Authentication/LogonApollo';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import './style.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';

function Register() {
    // const navigate = useNavigate();
    const [addUser] = useMutation(REGISTER_MUTATION);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character'
                ),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
        }),
        onSubmit: (values, action) => {

            addUser({ variables: { username: values.email, password: values.password } })
                .then(() => {

                    toast.success('Registretion Successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    // navigate('/login');
                    action.resetForm({
                        values: {
                            email: '',
                            password: '',
                            confirmPassword: ''

                        }
                    });
                })
                .catch((error) =>{
                    toast.error(error.message, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                });
        },
    });

    return (
        <>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Create an account</p>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        id="form3Example3"
                                        name="email"
                                        className={`form-control form-control-lg ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                        placeholder="Enter a valid email address"
                                        {...formik.getFieldProps('email')}
                                    />
                                    {formik.touched.email && formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example4">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="form3Example4"
                                        name="password"
                                        className={`form-control form-control-lg ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                        placeholder="Enter password"
                                        {...formik.getFieldProps('password')}
                                    />
                                    {formik.touched.password && formik.errors.password && <div className="invalid-feedback">{formik.errors.password}</div>}
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example5">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="form3Example5"
                                        name="confirmPassword"
                                        className={`form-control form-control-lg ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                                        placeholder="Confirm password"
                                        {...formik.getFieldProps('confirmPassword')}
                                    />
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                        <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                                    )}
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                        disabled={!formik.isValid}
                                    >
                                        Register
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Already have an account? <span className="link-danger"> <Link to="/Login"> Login </Link></span>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                    <div>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="#!" className="text-white">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </section>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light"
            />
        </>
    );
}

export default Register;