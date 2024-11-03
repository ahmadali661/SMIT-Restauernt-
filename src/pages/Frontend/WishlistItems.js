import React, { useContext } from 'react';
import { ModeContext } from '../../contexts/ModeContext';
import { Image } from 'antd';

export default function WishlistItems() {
    const { wishlistProducts } = useContext(ModeContext);

    return (
        <div className="container my-3">
    <div className="row">
        <h1 className='text-center fw-bold my-2'>Your Favourite Products</h1>
        {wishlistProducts.map((item) => (
            <div className="col-12 col-md-6 col-lg-3 mt-4" key={item.id}>
                <div className="card p-2">
                    <Image src={item.url} alt={item.title} className='img-fluid custom-image' preview={false} style={{ height: 200 }} />
                    <p className="mt-2 text-grey">Khan's Kitchen</p>
                    <h4 className="mt-1">{item.title}</h4>
                    <h4 className="mt-1">{item.category}</h4>
                    <p className='text-success fs-2'>${item.price}</p>
                </div>
            </div>
        ))}
    </div>
</div>

    );
}

