import { format } from "date-fns";

export default function capitalizeFirstLetter(string) {

  if (!string) {
    return ''; // Return an empty string if the input is undefined or null
  }

    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

 export const dateFormatter=(dateString)=>{
const parsedDate=new Date(dateString);
return format(parsedDate,"d MMMM yyyy h:mm a")
  }

  
 export const dateFormatterWithoutTime=(dateString)=>{
  const parsedDate=new Date(dateString);
  return format(parsedDate,"d/MM/yyyy")
    }