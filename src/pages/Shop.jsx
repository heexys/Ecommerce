import { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import { Container, Row, Col } from "reactstrap";
import '../styles/shop.css'

import ProductsList from "../components/UI/ProductsList";
import useGetData from "../custom-hooks/useGetData";


const Shop = () => {

    const {data: products, loading} = useGetData('products')
    const [productsData, setProductsData] = useState(products);

    useEffect(() => {
        if (!loading) {
            setProductsData(products);
        }
    }, [loading, products]);

    const handleFilter = e => {
        const filterValue = e.target.value;

        if (filterValue === '') {
            setProductsData(products);
            return;
        }

        const filteredProducts = products.filter(
            item => item.category === filterValue
        );

        setProductsData(filteredProducts);
    };

    const handleSearch = e => {
        const searchTerm = e.target.value.toLowerCase();

        const filterValue = document.querySelector(".filter__widget select").value;

        if (filterValue) {
            const searchedProducts = products.filter(
                item => item.productName.toLowerCase().includes(searchTerm) && item.category === filterValue
            );

            setProductsData(searchedProducts);
        } else {
            const searchedProducts = products.filter(
                item => item.productName.toLowerCase().includes(searchTerm)
            );

            setProductsData(searchedProducts);
        }
    };  

    return (
            <Helmet title={'Shop'}>
                <CommonSection title="products" />

                <section>
                    <Container>
                        <Row>
                            <Col lg="3" md='6'>
                                <div className="filter__widget">
                                    <select onChange={handleFilter}>
                                        <option value="">Filter By Category</option>
                                            <option value="sofa">Sofa</option>
                                            <option value="mobile">Mobile</option>
                                            <option value="chair">Chair</option>
                                            <option value="watch">Watch</option>
                                            <option value="wireless">Wireless</option>
                                    </select>
                                </div>
                            </Col>
                            <Col lg="3" md='6' className="text-end">
                                <div className="filter__widget">
                                    <select>
                                        <option>Sort By</option>
                                            <option value="ascending">Ascending</option>
                                            <option value="descending">Descending</option>
                                    </select>
                                </div>
                            </Col>
                            <Col lg="6" md='12'>
                                <div className="search__box">
                                    <input type="text" placeholder="Search....." onChange={handleSearch} />
                                    <span><i class="ri-search-line"></i></span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="pt-0">
                    <Container>
                       {loading ? (
                        <h1 className="text-center fs-4">Loading...</h1>
                    ) : (
                        <Row>
                            {productsData.length === 0 ? (
                                <h1 className="text-center fs-4">No products are found!</h1>
                            ) : (
                                <ProductsList data={productsData} />
                            )}
                        </Row>
                    )}
                    </Container>
                </section>
            </Helmet>            
            )
};

export default Shop;