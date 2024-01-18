import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RESET_MUTATION } from '../../ApolloClient/Authentication/LogonApollo';
import { useMutation } from '@apollo/client';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';

function ResetPassword(props) {

    const [updateUser] = useMutation(RESET_MUTATION);



    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Old Password is required'),
        newPassword: Yup.string()
            .required('New Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    return (
        <>
            <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            oldPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // Handle form submission logic here
                            updateUser({ variables: { id: (localStorage.getItem("USER_ID")).toString(), oldPassword : values.oldPassword , password: values.newPassword } })
                                .then(() => {
                                    resetForm();
                                    props.onHide();
                                    toast.success('Password Reset Successfully', {
                                        position: "top-right",
                                        autoClose: 1000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });


                                })
                                .catch((error) => {
                                    resetForm();
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
                                })


                        }}
                    >
                        {({ isValid, isSubmitting }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="oldPassword" className="form-label">
                                        Old Password
                                    </label>
                                    <Field type="password" className="form-control" id="oldPassword" name="oldPassword" />
                                    <ErrorMessage name="oldPassword" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newPassword" className="form-label">
                                        New Password
                                    </label>
                                    <Field type="password" className="form-control" id="newPassword" name="newPassword" />
                                    <ErrorMessage name="newPassword" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">
                                        Confirm Password
                                    </label>
                                    <Field type="password" className="form-control" id="confirmPassword" name="confirmPassword" />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={!isValid || isSubmitting}>
                                    <span>Submit</span>
                                </button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>


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

export default ResetPassword;
