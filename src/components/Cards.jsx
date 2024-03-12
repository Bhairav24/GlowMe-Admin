import React from 'react'


export default function Cards({data,edit}) {

  return (

    
    
<div className="max-w-xs h-66  font-heading hover:shadow-lg transition bg-white border mx-10 my-10 border-gray-200 rounded-lg shadow-MAROON  dark:bg-gray-800 dark:border-gray-700">
  <div className="relative ">
    <img
      className="rounded-t-lg object-cover h-48 w-96"
      src={data.image}
      alt={data.name}
    />
    <div className="absolute top-0 right-0 mt-2 mr-2">
      {/* EditMenu component */}
    </div>
  </div>
  <div className="p-5">
    <span>
      <h5 className="mb-2 text-2xl font-bold tracking-tight uppercase text-gray-900 dark:text-white">{data.name}</h5>
    </span>
    <button className="btn mt-2 h-8 w-24 text-white bg-MAROON dark:text-gray-400" onClick={edit}>Edit</button>
  </div>
</div>

  )
}
