import React from 'react'

function ShortBanner({title,products}) {


  return (
    <div>
        <div className="w-full h-[650px] p-3">
          <div className="bg-white p-7 rounded-lg shadow-lg">
            <div className="flex">
              <h1 className="text-2xl font-semibold mb-5 text-gray-700">
                {title}
              </h1>
            </div>
            <div className=" grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4">
              {products.map((items, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-2 flex flex-col overflow-hidden justify-center items-center">
                  <img
                    src={items.image}
                    alt={items.title}
                    className="w-48 h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />

                  <h2 className="text-lg font-semibold mt-2 text-gray-700">
                    {items.title}
                  </h2>
                  <p className="text-lg text-orange-600 font-bold mt-2">
                    {items.des}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default ShortBanner