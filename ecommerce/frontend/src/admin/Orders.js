import React, { useState, useEffect } from "react";
//import { Form, Button, Col, Row, } from "react-bootstrap";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin'
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [statusValues, setStatusValues] = useState([])

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

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then( data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setStatusValues(data);
            }
        })
    }

    useEffect(()=>{
        loadOrders();
        loadStatusValues();
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

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Aggiorna lo stato dell'ordine</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

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
                                        {showStatus(o)}
                                    </li>
                                    <li className="list-group-item">
                                        ID ordine: {o.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        Costo: ${o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        Ordinato da: {o.user.name}
                                    </li>
                                    <li className="list-group-item">
                                        Ordinato in data:{" "}
                                        {moment(o.createdAt).calendar()}
                                    </li>
                                    <li className="list-group-item">
                                        Indirizzo di consegna: {o.address}
                                    </li>
                                </ul>

                                <h3 className="mt-4 mb-4 font-italic">
                                    Numero di prodotti presenti nell'ordine:{" "}
                                    {o.products.length}
                                </h3>

                                {o.products.map((p, pIndex) => (
                                    <div
                                        className="mb-4"
                                        key={pIndex}
                                        style={{
                                            padding: "20px",
                                            border: "1px solid indigo"
                                        }}
                                    >
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)}
                                    </div>
                                ))}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Orders