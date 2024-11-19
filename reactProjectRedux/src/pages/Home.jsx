import { useState, useEffect } from 'react';
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
import ban1 from "../images/b1.jpg";
import ban2 from "../images/b2.jpg";
import ban3 from "../images/b3.jpg";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { addToCart } from '../cartSlice';
import "./style.css"

const Home = () => {
    const [mydata, setMydata] = useState([]);
    const dispatch = useDispatch();

    const loadData = async () => {
        try {
            const api = "https://react-e-comm-data-live.vercel.app";
            const response = await axios.get(api);
            setMydata((response.data).shopping);
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

    return (
        <>
            <Carousel>
                <Carousel.Item>
                <img src={ban1} style={{ width: "33%", display: 'inline-block', margin: '0 auto' }} height="200"  />
                <img src={ban2} style={{ width: "33%", display: 'inline-block', margin: '0 auto' }} height="200"  />
                <img src={ban3} style={{ width: "33%", display: 'inline-block', margin: '0 auto' }} height="200"  />
                </Carousel.Item>
                <Carousel.Item>
                <img src={ban2} style={{ width: "33%", display: 'inline-block', margin: '0 auto' }} height="200"  />
                <img src={ban1} style={{ width: "33%", display: 'inline-block', margin: '0 auto' }} height="200"  />                
                <img src={ban3} style={{ width: "33%", display: 'inline-block', margin: '0 auto' }} height="200"  />
                </Carousel.Item>
                <Carousel.Item>
                <img src={ban3} style={{ width: "33%", display: 'inline-block', margin: '0 auto' }} height="200"  />
                <img src={ban2} style={{ width: "33%", display: 'inline-block', margin: '0 auto' }} height="200"  />
                <img src={ban1} style={{ width: "33%", display: 'inline-block', margin: '0 auto' }} height="200"  />     
                </Carousel.Item>
            </Carousel>

            <h1>New Arrival</h1>
            <div id="cardData" className="card-container" >
                {mydata.map((item) => (
                    <Card key={item.id} className="product-card">
                        <img src={item.image} className="product-image" alt={item.name} />
                        <Card.Body>
                            <Card.Title>{item.name} for {item.category}</Card.Title>
                            <Card.Text className="card-details">
                                {item.description}
                                <br />
                                <span className="product-price">Price: {item.price}</span>
                            </Card.Text>
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
        </>
    );
};

export default Home;