import React, { useState } from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
    const [quantities, setQuantities] = useState(
        cartItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
    );

    const handleQuantityChange = (productId, delta) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: Math.max(1, (prevQuantities[productId] || 1) + delta)
        }));
    };

    const calculateTotalPrice = () => {
        const total = cartItems.reduce((total, item) => 
            total + item.price * (quantities[item.id] || 1), 0
        );
        return (total * 0.9).toFixed(2); // Apply 10% discount
    };

    const totalPrice = () => {
        const total = cartItems.reduce((total, item) => 
            total + item.price * (quantities[item.id] || 1), 0
        );
        return (total);
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="relative w-full h-full mx-auto p-8 overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-4 text-gray-500">Your Cart</h2>
                <h3 className='text-red-800 mb-4'>Total Price: ${totalPrice()}</h3>
                <h2 className='text-red-800 mb-4 text-2xl'>Grand Total Price: ${calculateTotalPrice()}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {cartItems.length > 0 ? (
                        cartItems.map((product) => {
                            const quantity = quantities[product.id] || 1;
                            const totalItemPrice = (product.price * quantity).toFixed(2);

                            return (
                                <div key={product.id} className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 m-2 w-56">
                                    <img src={product.image} alt={product.title} className="w-24 h-24 object-contain mb-2" />
                                    <div className='w-40 text-center'>
                                        <p className="truncate font-semibold mb-1 overflow-hidden whitespace-nowrap text-gray-700">{product.title}</p>
                                        <p className="text-gray-700">Unit Price: ${product.price}</p>
                                        <p className="text-gray-700">Total: ${totalItemPrice}</p>

                                        <div className="flex items-center justify-center mt-2">
                                            <button 
                                                onClick={() => handleQuantityChange(product.id, -1)}
                                                className="px-2 py-1 bg-gray-200 rounded-r text-gray-700"
                                            >
                                                -
                                            </button>
                                            <span className="px-4 text-black">{quantity}</span>
                                            <button 
                                                onClick={() => handleQuantityChange(product.id, 1)}
                                                className="px-2 py-1 bg-gray-200 rounded-l text-gray-700"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button 
                                            onClick={() => removeFromCart(product.id)} 
                                            className="text-red-500 mt-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-500">Your cart is empty.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
