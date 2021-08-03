import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, } from "react-bootstrap";
import { isAuthenticated } from "../auth";
import { createProduct, getCategories, listOrders } from './apiAdmin'
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([])

    const {user, token} = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then( data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setOrders(data);
            }
        })
    }

    useEffect(()=>{
        loadOrders();
    },[])

    const showOrdersLength = () => {
        if(orders.length > 0){
            return (
                <h1 className="text-danger display-2"> Ordini totali : {orders.length}</h1>
            )
        } else {
            return <h1 className="text-danger">No orders</h1>;
        }
        };

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                {showOrdersLength()}
                {orders.map((o, oIndex) => {
                    return (
                        <div className="mt-5" key={oIndex} style={{borderBottom: '5px solid indigo'}}>
                            <h2 className="mt-5">
                                <span className="bg-primary">Order ID: {o._id}</span>
                            </h2>

                            <ul className="list-group mb-2">
                                    
                                    <li className="list-group-item">
                                        Transaction ID: {o.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        Amount: ${o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered by: {o.user.name}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered on:{" "}
                                        {moment(o.createdAt).calendar()}
                                    </li>
                                    <li className="list-group-item">
                                        Delivery address: {o.address}
                                    </li>
                                </ul>

                                <h3 className="mt-4 mb-4 font-italic">
                                    Total products in the order:{" "}
                                    {o.products.length}
                                </h3>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Orders