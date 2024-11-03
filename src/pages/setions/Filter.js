// import React from 'react'
// import { Select } from 'antd';
// import { useContext } from 'react';
// import { OrderContext } from '../../contexts/OrderContext';

// export default function Filter() {
//   const  {searchKey,setSearchKey} = useContext(OrderContext)
//   return (
//     <>
//       <Select
//       size='large'
//     showSearch
//     placeholder="Select a product category"
//     optionFilterProp="label"
//     name = "searchKey"
//     value = {searchKey}
//     onChange={(e)=>setSearchKey(e.target.value)}
//     options={[
//       {
//         value: 'Jacket',
//         label: 'Jacket',
//       },
//       {
//         value: 'Shirt',
//         label: 'Shirt',
//       },
//       {
//         value: 'Mobile',
//         label: 'Mobile',
//       },
//     ]}
//   />
//     </>
//   )
// }
 




import React, { useContext } from 'react';
import { Select, Input, Button } from 'antd';
import { ModeContext } from '../../contexts/ModeContext';

export default function Filter({ selectedCategory, setSelectedCategory }) {
    const { searchKey, setSearchKey, filterPrice, setFilterPrice } = useContext(ModeContext);

    const handleResetFilters = () => {
        setSearchKey('');
        setSelectedCategory('');
        setFilterPrice('');
    };

    return (
        <div>
            <Input
                placeholder="Search products"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                style={{ marginBottom: '16px' }}
            />
           
            <Button type="primary" onClick={handleResetFilters}>
                Reset
            </Button>
        </div>
    );
}



