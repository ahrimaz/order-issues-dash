import { useState, useEffect } from 'react';

const PriceList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {products.map((product) => (
                <div key={product._id.$oid} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h2 className="text-lg font-semibold mb-2">{product.product}</h2>
                    <p className="text-gray-500">Direct Price: {product.directPrice.$numberDecimal}</p>
                    <p className="text-gray-500">LC Price: {product.lcPrice.$numberDecimal}</p>
                    <p className="text-gray-500">VPP Price: {product.vppPrice.$numberDecimal}</p>
                    <p className="text-gray-500">VUP Price: {product.vupPrice.$numberDecimal}</p>
                </div>
            ))}
        </div>
    );
};

export default PriceList;