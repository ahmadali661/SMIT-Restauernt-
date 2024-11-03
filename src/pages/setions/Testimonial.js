import React from 'react';
import { BiShoppingBag } from 'react-icons/bi';
import img1 from "../../Assets/1.png";
import img2 from "../../Assets/2.png";
import img3 from "../../Assets/3.png";
import { Card, CardBody, CardTitle } from 'react-bootstrap';

export default function Testimonial() {
    return (
        <>
            <div className="container my-5">
                <div className="row text-center">
                    <h1>Testimonial</h1>
                    <h2>What our <span className='text-primary'>customers</span> are saying</h2>
                    {[img1, img2, img3].map((img, index) => (
                        <div className="col-12 col-md-6 col-lg-4 my-4 my-md-3" key={index}>
                            <Card className="h-100 bg-white text-center" style={{ border: "none", alignItems: 'center' }}>
                                <CardBody>
                                    <div className="p-4">
                                        <img src={img} className="img-fluid rounded-circle mx-3 shadow" alt={`img${index + 1}`} />
                                        <CardTitle className="text-success my-2">{`Customer ${index + 1}`}</CardTitle>
                                    </div>
                                </CardBody>
                                <p style={{ textAlign: "justify" }}>
                                    Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk...
                                </p>
                                <span className='text-center my-2' style={{ borderBottom: "4px solid red", height: "1px", width: 80 }} />
                                <h3 className="my-2">React Js</h3>
                                <p style={{ color: "grey" }}>UI Developer</p>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
