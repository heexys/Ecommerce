import { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";

//firebase
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref,  uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import { auth } from "../firebase.config";
import { storage } from "../firebase.config";
import { db } from "../firebase.config";

//style
import { toast } from "react-toastify";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import '../styles/login.css';

const Signup = () => {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const signup = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            
                const user = userCredential.user;

                const storageRef = ref(storage, `images/${Date.now() +  username}`)
                const uploadTask = uploadBytesResumable(storageRef, file)

                uploadTask.on((error) => {
                    toast.error(error.message)
                }, () => {

                    // update user profile
                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                        await updateProfile(user, {
                            displayName: username,
                            photoURL: downloadURL,
                        });

                        // store user data in firestore database
                        await setDoc(doc(db,'users', user.uid), {
                            uid: user.uid,
                            displayName: username,
                            email,
                            photoURL: downloadURL,
                            admin: false // Set admin status to false
                        });
                    });
                })

                setLoading(false)
                toast.success('Account created')
                navigate('/login')

        } catch (error) {
            setLoading(false)
            toast.error('something went wrong')
        }
    };
    
    return (
        <div>
            <Helmet title={'Signup'}>
                <section>
                    <Container>
                        <Row>
                            { loading? ( <Col lg="12" className="text-center"><h5
                                className="fw-bold" >Loading.....</h5></Col>
                            ) : (
                              <Col lg='6' className="m-auto text-center">
                                <h3 className="fw-bold mb-4">Signup</h3>

                                <Form className="auth__form" onSubmit={signup}>

                                    <FormGroup className="form__group">
                                        <input type="text" placeholder="Username"
                                        value={username} onChange={e => setUsername(e.target.value)} />
                                    </FormGroup>

                                    <FormGroup className="form__group">
                                        <input type="email" placeholder="email"
                                        value={email} onChange={e => setEmail(e.target.value)} />
                                    </FormGroup>

                                    <FormGroup className="form__group">
                                        <input type="password" placeholder="password"
                                        value={password} onChange={e => setPassword(e.target.value)} />
                                    </FormGroup>

                                    <FormGroup className="form__group">
                                        <input accept="image/*" type="file" onChange={e => setFile(e.target.files[0])} />
                                    </FormGroup>

                                    <button type="submit" className="buy__btn auth__btn">SignUp</button>
                                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                                </Form>
                            </Col>
                                )
                            }
                        </Row>
                    </Container>
                </section>
            </Helmet>
        </div>
    )
};

export default Signup;