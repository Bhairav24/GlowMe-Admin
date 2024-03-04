import React from 'react'

const AVATAR=({gender})=> {
  return (
    
<div className="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 object-center">
<svg className="absolute w-12 h-12 text-gray-400 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
</div>

  )
}



export const SelectAvatar=({gender})=>{


   
  switch(gender){
    case 'Male'&& 'male':
      return  <img className="w-12 h-12 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="../src/images/avatar.svg" alt="Bordered avatar"/>;
    case 'Female' && 'female':
      return <img className="w-12 h-12 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="../src/images/avatar.svg" alt="Bordered avatar"/>;

      default:
       return  <img className="w-12 h-12 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="../src/images/avatar.svg" alt="Bordered avatar"/>;
    


  }
  
 
}


export const PartnerAvatar=()=>{
  return(
  
  
  <div>
  
  
  <img className="w-12 h-12 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="../src/images/avatar.svg" alt="Bordered avatar"/>
  </div>
  )}

export default AVATAR;
