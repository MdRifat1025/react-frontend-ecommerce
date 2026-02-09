import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        a = axiosInstance.get("products/")
        console.log(a)
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    const addToCart = async (productId) => {
        try {
            await axiosInstance.post("cart/", {
                product: productId,
                quantity: 1,
            });
            alert("Added to cart");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Products</h2>

            <div className="row">
                {products.map(product => (
                    <div className="col-md-4 mb-3" key={product.id}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5>{product.name}</h5>
                                <p>৳ {product.price}</p>
                                <button
                                    className="btn btn-dark"
                                    onClick={() => addToCart(product.id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
