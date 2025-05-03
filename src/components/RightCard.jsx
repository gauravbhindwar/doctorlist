"use client"
import React from 'react'
import Image from 'next/image'
import { FaPhone } from 'react-icons/fa'
import colabimage from '../../public/doctor-colab.jpg'
 
const RightCard = () => {  
  return (
    <div className="bg-[#0b2540] text-white rounded-lg p-6 w-55 mt-15 ml-10 mr-15">
      <div className="flex flex-col">
        {/* Doctor images at the top */}
        <div className="flex justify-center mb-4">
          <div className="flex -space-x-4">
  
            <Image
              src={colabimage}
              alt="Doctor" 
              width={64}
              height={64}
              className="object-cover w-full h-full"
              unoptimized={true}
            />
          </div>
        </div>
        
        {/* Help text */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-2">Need help consult the right doctor?</h3>
          <p className="text-sm text-gray-300">
            Call +91-8040245807 to book instantly
          </p>
        </div>
        
        {/* Call button */}
        <button className="bg-white text-[#0087ba] py-3 rounded-md flex items-center justify-center font-semibold hover:bg-gray-100 transition">
          <FaPhone className="mr-2" />
          Call now
        </button>
      </div>
    </div>
  )
}

export default RightCard