import React from 'react';
import useGetData from '../custom-hooks/useGetData';

import  { Container, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';

import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';

const AllProducts = () => {

  const {data: productsData, loading} = useGetData('products');

  const deleteProduct = async(id) => {
    await deleteDoc(doc(db, 'products', id));
    toast.success('Deleted!')
  }

  return <section className='table-responsive'>
    <Container>
      <Row>
        <Col lg="12">
          <table className='table'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                loading ? (
                   <h4 className='py-5 text-center fw-bold'>Loading.....</h4> ) : (
                  productsData.map(item => (
                    <tr key={item.id}>
                    <td>
                      <img src={item.imgUrl} alt="" />
                    </td>
                    <td className='f'>{item.productName}</td>
                    <td>{item.category}</td>
                    <td>${item.price}</td>
                    <td>
                      <button onClick={() => {
                        deleteProduct(item.id);
                      }}
                      className='btn btn-danger'
                      >
                        Deleted
                      </button>
                    </td>
                  </tr>
                  ))
                )
              }
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  </section>
}

export default AllProducts;