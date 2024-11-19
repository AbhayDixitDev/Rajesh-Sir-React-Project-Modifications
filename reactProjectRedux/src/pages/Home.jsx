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

const Home = () => {
    const [mydata, setMydata] = useState([]);
    const dispatch = useDispatch();

    const loadData = async () => {
        try {
            const api = "http://localhost:3000/shopping";
            const response = await axios.get(api);
            setMydata(response.data);
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
                    <img src={ban1} width="100%" height="200" alt="First slide" />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={ban2} width="100%" height="200" alt="Second slide" />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={ban3} width="100%" height="200" alt="Third slide" />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <h1>New Arrival</h1>
            <div id="cardData">
                {mydata.map((item) => (
                    <Card key={item.id} style={{ width: "380px", marginTop: "10px" }}>
                        <img src={item.image} style={{ height: "300px" }} alt={item.name} />
                        <Card.Body>
                            <Card.Title>{item.name} for {item.category}</Card.Title>
                            <Card.Text>
                                {item.description}
                                <br />
                                <span style={{ color: 'red', fontWeight: 'bold' }}>Price: {item.price}</span>
                            </Card.Text>
                            <Button variant="primary" onClick={() => cartDataAdd(item)}>Add to cart</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default Home;