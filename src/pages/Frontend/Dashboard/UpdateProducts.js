import React from 'react'

export default function UpdateProducts() {
  return (
    <div className="container my-5">
    <div className="row">
        <div className="col d-flex justify-content-center align-items-center">
            <div className="card p-3 text-center bg-dark text-white" style={{width:500}}>
                <form>
                    <h2 className='mb-4'>Update Product</h2>
                    <div>
                        <input type="text" placeholder='Product Title' className='form-control my-4' name='title'/>
                    </div>
                    <div>
                        <input type="number" placeholder='Product Price' className='form-control my-4' name='price'/>
                    </div>
                    <div>
                        <input type="text" placeholder='Product Image URL' className='form-control my-4' name='imageURL'/>
                    </div>
                    <div>
                        <input type="text" placeholder='Product Category' className='form-control my-4' name='category'/>
                    </div>
                    <div>
                        <textarea type="text" placeholder='Product Description ' className='form-control my-4' name='description' style={{height:150}}/>
                    </div>
                    <div/>
                    <button className='btn btn-success w-100'>Update Product</button>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}
