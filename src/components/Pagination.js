import React,{useState} from 'react'

export default function Pagination({pageProp, goBack, goAhead}) {
return (
    <div className="w-full flex justify-center mb-8 ">
    <button className="p-2 border-2 border-indigo-500 text-indigo-500 border-r-0 rounded-l-xl"
     onClick={goBack}
     >Previous</button>
    <button className="p-2 border-2 border-indigo-500 text-indigo-500 border-r-0 bg-gray-300">
    {pageProp}
    </button>
    <button className="p-2 border-2 border-indigo-500 text-indigo-500 rounded-r-xl" 
    onClick={goAhead}
    >Next</button>
    </div>
  )
}
