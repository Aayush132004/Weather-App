import React from 'react'

function TopButtons({setQuery}) {
    const cities=[
        {
            id:1,
            name:"Delhi",
        },
        {
            id:2,
            name:"Bhopal",
        },
        {
            id:3,
            name:"Mumbai",
        },
        {
            id:4,
            name:"Jabalpur",
        },
        {
            id:5,
            name:"Gwalior",
        }

    ]
  return (
    <div className="flex justify-around items-center my-6">
        {cities.map((city)=>(
         <button key={city.id} className="text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded md-transition ease-in" onClick={()=>setQuery({q: city.name})}>{city.name}</button>
        ))}
   
    </div>
  )
}

export default TopButtons
