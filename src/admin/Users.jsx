import React from "react";
import { Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import useGetData from "../custom-hooks/useGetData";

const Users = () => {
    const { data: usersData, loading } = useGetData('users');

    const deleteUser = async (id) => {
        await deleteDoc(doc(db, 'users', id))
        toast.success('user deleted!')
    }

    const toggleAdminStatus = async (id, currentAdminStatus) => {
        const updatedAdminStatus = !currentAdminStatus;
        await updateDoc(doc(db, 'users', id), { admin: updatedAdminStatus });
        toast.success(`Admin status ${updatedAdminStatus ? 'enabled' : 'disabled'} for user.`);
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        <h4 className="fw-bold">Users</h4>
                    </Col>
                    <Col lg="12" className="pt-5">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Admin</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <h5 className="pt-5 fw-bold">Loading.....</h5>
                                    ) : (
                                        usersData?.map((user) => (
                                            <tr key={user.uid}>
                                                <td>
                                                    <img src={user.photoURL} alt="" />
                                                </td>
                                                <td>{user.displayName}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={user.admin}
                                                        onChange={() =>
                                                            toggleAdminStatus(user.uid, user.admin)
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => deleteUser(user.uid)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Users;
