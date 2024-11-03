// import React from 'react'
// import { Link } from 'react-router-dom'
// import Filter from '../setions/Filter'
// import { Select } from 'antd';
// import CartSection from '../setions/CartSection';
// import Testimonial from '../setions/Testimonial';

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

// export default function Home() {
//   return (
//     <main>
//       {/* hero section */}
//       <div className="hero-section">
//         <div className="container">
//           <div className="row">
//             <div className="col text-center text-md-start">
//               <h2 className='text-black fw-bold'>WellCome To</h2>
//               <h1 className='text-black fw-bold'>AR Store</h1>
//               <h1 className='text-black fw-bold'>Sale Upto <span className='text-primary'>50%</span> on Order</h1>
//               <Link to="/product" className='btn btn-lg btn-dark mt-3'>Shop Now</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* second section */}
//       <div className="second-section">
//         <div className="container my-4">
//           <div className="row">
//             <div className="col">
//               <div className="card p-3">
//                 <h3 className="my-2">Search Your Category</h3>
//                 <Filter />
//                 <h4 className='my-3'>Filter</h4>
//                 <div className="row">
//                   <div className="col-6 mx-2">
//                     <Select
//                     className='w-100 my-2'
//                       defaultValue="lucy"
//                       style={{
//                         width: 200,
//                       }}
//                       onChange={handleChange}
//                       options={[
//                         {
//                           label: <span>Collection</span>,
//                           title: 'Collection',
//                           options: [
//                             {
//                               label: <span>Jacket</span>,
//                               value: 'Jacket',
//                             },
//                             {
//                               label: <span>Tshirt</span>,
//                               value: 'Tshirt',
//                             },
//                             {
//                               label: <span>Shoes</span>,
//                               value: 'Shoes',
//                             },
//                           ],
//                         },
//                       ]}
//                     />
//                   </div>
//                   {/* search price */}
//                   <div className="col-6 mx-2">
//                     <Select
//                     className='w-100 my-2'
//                       defaultValue="1000"
//                       style={{
//                         width: 200,
//                       }}
//                       onChange={handleChange}
//                       options={[
//                         {
//                           label: <span> Cheap</span>,
//                           title: 'Cheap',
//                           options: [
//                             {
//                               label: <span>2300</span>,
//                               value: '2300',
//                             },
//                             {
//                               label: <span>1500</span>,
//                               value: '1500',
//                             },
//                           ],
//                         },
//                         {
//                           label: <span>Expensive</span>,
//                           title: 'Expensive',
//                           options: [
//                             {
//                               label: <span>10000</span>,
//                               value: '10000',
//                             },
//                             {
//                               label: <span>12000</span>,
//                               value: '12000',
//                             },
//                           ],
//                         },
//                       ]}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* third section  */}
//       <CartSection/>
//       {/* forth section  */}
//       <div className="my-5">
//      <Testimonial/>
//      </div> 
//     </main>
//   )
// }




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Filter from '../setions/Filter';
import CartSection from '../setions/CartSection';
import Testimonial from '../setions/Testimonial';

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState('');

    return (
        <main>
            {/* hero section */}
            <div className="hero-section">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <h1 className='fw-bold text-primary'>Explore Your Taste Here!</h1>
                            <Link to="/allProducts" className='btn btn-lg btn-outline-primary mt-3'>Get Menu</Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* second section */}
            <div className="second-section">
                <div className="container my-4">
                    <div className="row">
                        <div className="col">
                            <div className="card p-3">
                                <h3 className="my-2">Search Your Category</h3>
                                <Filter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* third section  */}
            <CartSection selectedCategory={selectedCategory} />
            {/* forth section  */}
            {/* <div className="my-5">
                <Testimonial />
            </div> */}
        </main>
    );
}
