import React from 'react'

export default function SearchBar({Search}) {
  return (
    <>
  <div className="relative">
        <input type="text" id="small_outlined" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-CREAM appearance-none dark:text-white dark:border-gray-600 dark:focus:border-MAROON focus:outline-none focus:ring-0 focus:border-MAROON peer" placeholder=" "  onChange={Search}/>
        <label htmlFor="small_outlined" className="absolute text-sm text-CUSTOM_BLACK dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 origin-[0] bg-gray-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-MAROON peer-focus:dark:text-MAROON peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3.5 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Search</label>
    </div>
</>
  )
}
