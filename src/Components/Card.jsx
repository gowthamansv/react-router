import React from 'react';

const Card = ({ product, addToCart }) => {
    const handleAddProduct = () => {
        addToCart(product);
    };

    return (
        <div className="hytr flex flex-col items-center bg-white shadow-md rounded-lg p-4 m-2 w-56">
            <img src={product.image} alt={product.title} className="w-24 h-24 object-contain mb-2" />
            <p className="truncate font-semibold text-center mb-1 w-full overflow-hidden whitespace-nowrap text-gray-700">
                {product.title}
            </p>
            <p className="text-gray-800 font-medium mb-2">${product.price}</p>
            <button 
                className="text-white py-1 px-3 rounded" 
                onClick={handleAddProduct}
            >
                {product.added ? 'Added' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default Card;
