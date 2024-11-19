import { useState, useEffect } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { addToCart } from '../cartSlice';
import { Container, Row, Col, Form } from 'react-bootstrap';

import "./style.css"

const Shop = () => {
    const [mydata, setMydata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const dispatch = useDispatch();

    const loadData = async () => {
        try {
            const api = "https://react-e-comm-data-live.vercel.app";
            const response = await axios.get(api);
            setMydata((response.data).shopping);

            console.log((response.data).shopping)

            setFilteredData((response.data).shopping);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const cartDataAdd = (item) => {
        dispatch(addToCart({ ...item, qnty: 1 }));
    };

    const handleFilterChange = () => {
        let filtered = mydata;

        if (category) {
            filtered = filtered.filter(item => item.category === category);
        }

        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            filtered = filtered.filter(item => item.price >= min && item.price <= max);
        }

        setFilteredData(filtered);
    };

    useEffect(() => {
        handleFilterChange();
    }, [category, priceRange, mydata]); // Add dependencies here

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handlePriceRangeChange = (e) => {
        setPriceRange(e.target.value);
    };

    return (
        <Container fluid className="shop-container">
            <Row>
                <Col md={3} className="filter-column">
                    <h3>Filters</h3>
                    <Form>
                        <Form.Group controlId="categorySelect">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" value={category} onChange={handleCategoryChange} className="filter-select">
                                <option value="">All</option>
                                <option value="men">Menswear</option>
                                <option value="women">Womenswear</option>
                                <option value="kids">Kidswear</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="priceRangeSelect" className="mt-3">
                            <Form.Label>Price Range</Form.Label>
                            <Form.Control as="select" value={priceRange} onChange={handlePriceRangeChange} className="filter-select">
                                <option value="">All</option>
                                <option value="100-499">100 - 499</option>
                                <option value="500-1499">500 - 1499</option>
                                <option value="1500-6000">1500 - 6000</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={9} className="product-column">
                    <h1>New Arrival</h1>
                    <div id="cardData" className="card-container">
                        {filteredData.map((item) => (
                             <Card key={item.id} className="product-card">
                             <img src={item.image} className="product-image" alt={item.name} />
                             <Card.Body>
                                 <Card.Title>{item.name} for {item.category}</Card.Title>
                                 <Card.Text className="card-details">
                                     {item.description}
                                     <br />
                                     <span className="product-price">Price: {item.price}</span>
                                 </Card .Text>
                                 <Button
                                     variant="primary"
                                     onClick={() => cartDataAdd(item)}
                                     className="add-to-cart-btn"
                                 >
                                     Add to cart
                                 </Button>
                             </Card.Body>
                         </Card>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;