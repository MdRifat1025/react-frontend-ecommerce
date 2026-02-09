import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

export default function Cart() {
    const [items, setItems] = useState([]);

    const loadCart = async () => {
        const res = await axiosInstance.get("cart/");
        setItems(res.data.items);
    };

    useEffect(() => {
        loadCart();
    }, []);

    const updateQty = async (id, qty) => {
        await axiosInstance.patch(`cart/item/${id}/`, {
            quantity: qty,
        });
        loadCart();
    };

    const removeItem = async (id) => {
        await axiosInstance.delete(`cart/item/${id}/`);
        loadCart();
    };

    return (
        <div className="container mt-4">
            <h2>Your Cart</h2>

            {items.map(item => (
                <div
                    key={item.id}
                    className="d-flex justify-content-between align-items-center border p-2 mb-2"
                >
                    <div>
                        <strong>{item.product_name}</strong>
                        <div>৳ {item.price}</div>
                    </div>

                    <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => updateQty(item.id, e.target.value)}
                        style={{ width: "70px" }}
                    />

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeItem(item.id)}
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}
