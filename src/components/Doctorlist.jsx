"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaInfoCircle, FaChevronRight, FaChevronLeft, FaThumbsUp } from 'react-icons/fa'
import Filter from './filter'
import RightCard from './RightCard'

const Doctorlist = () => {
  // States
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDoctors, setTotalDoctors] = useState(0);
  
  // Fetch doctors based on filters and pagination
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      
      // Build query string from filters
      let queryParams = new URLSearchParams();
      queryParams.append('page', currentPage);
      queryParams.append('limit', 5);
      
      // Add experience filters
      if (filters.experience && filters.experience.length > 0) {
        filters.experience.forEach(exp => {
          queryParams.append('experience', exp);
        });
      }
      
      // Add fees filters
      if (filters.fees && filters.fees.length > 0) {
        filters.fees.forEach(fee => {
          queryParams.append('fees', fee);
        });
      }
      
      // Add language filters
      if (filters.languages && filters.languages.length > 0) {
        filters.languages.forEach(language => {
          queryParams.append('language', language);
        });
      }
      
      // Add facility filters
      if (filters.facilities && filters.facilities.length > 0) {
        filters.facilities.forEach(facility => {
          queryParams.append('facility', facility);
        });
      }
      
      // Add online consultation filter
      if (filters.isOnline !== null && filters.isOnline !== undefined) {
        queryParams.append('isOnline', filters.isOnline);
      }
      
      // Add hospital visit filter
      if (filters.offersVisit !== null && filters.offersVisit !== undefined) {
        queryParams.append('offersVisit', filters.offersVisit);
      }
      
      // Fetch data from API
      const response = await fetch(`/api/filter?${queryParams.toString()}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch doctors');
      }
      
      setDoctors(data.data);
      setTotalPages(data.pagination.pages);
      setTotalDoctors(data.pagination.total);
      
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Handlers for pagination
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Apply filters from the Filter component
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  };
  
  // Fetch doctors when filters or page changes
  useEffect(() => {
    fetchDoctors();
  }, [currentPage, filters]);
  
  // Function to get placeholder image for doctors without profile images
  const getPlaceholderImage = () => {
    // Generate a random number between 1-1000 to get different avatars each time
    const randomId = Math.floor(Math.random() * 1000);
    return `https://randomuser.me/api/portraits/men/${randomId % 100}.jpg`;
  };
    
  return (
    <div className=" mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left sidebar - Filters - made sticky and scrollable */}
        <div className="lg:w-1/5 lg:sticky lg:top-4 lg:self-start">
          <div className="max-h-[calc(100vh-100px)] overflow-y-auto pr-2 ml-15 pb-4 border-r border-gray-200">
            <Filter onFilterChange={handleFilterChange} />
          </div>
        </div>
        
        {/* Center - Doctor listings */}
        <div className="lg:w-2/3 w-full ">
          {/* Breadcrumb navigation */}
          <div className="text-sm mt-4 mb-4 text-gray-500">
            <span className="hover:text-[#0087ba] cursor-pointer">Home</span> &gt; <span className="hover:text-[#0087ba] cursor-pointer">Doctors</span> &gt; <span className="text-gray-700">General Physicians</span>
          </div>
          {/* Page header */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Consult General Physicians Online - Internal Medicine Specialists</h1>
            <p className="text-gray-600">({totalDoctors} doctors)</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0087ba]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-md">
              {error}
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-md">
              <h3 className="text-xl font-medium text-gray-700">No doctors found</h3>
              <p className="text-gray-500 mt-2">Try changing your filters</p>
            </div>
          ) : (
            <>
              {/* Sorting dropdown */}
              <div className="flex justify-end mb-4">
                <div className="relative inline-block">
                  <select 
                    className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 cursor-pointer text-sm text-gray-700 focus:ring-[#0087ba] focus:border-[#0087ba]"
                    defaultValue="relevance"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="experience">Experience</option>
                    <option value="fees-low-high">Fees: Low to High</option>
                    <option value="fees-high-low">Fees: High to Low</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                      <path d="M7 7l3-3 3 3m0 6l-3 3-3-3"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Doctor Cards */}
              <div className="space-y-6">
                {doctors.map((doctor) => (
                  <div key={doctor._id} className="border rounded-lg shadow-sm overflow-hidden bg-white">
                    <div className="flex flex-col md:flex-row">
                      {/* Doctor's photo */}
                      <div className="md:w-[120px] p-4 flex-shrink-0">
                        <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-gray-200 relative">
                          <Image 
                            src={doctor.profileImage || getPlaceholderImage()} 
                            alt={doctor.name}
                            width={100}
                            height={100}
                            className="object-cover w-full h-full"
                            unoptimized={true}
                          />
                        </div>
                      </div>
                      
                      {/* Doctor's details */}
                      <div className="flex-grow p-4 pt-0 md:pt-4">
                        <div className="flex items-center mb-1">
                          <h2 className="text-lg font-semibold text-gray-800">
                            Dr. {doctor.name}
                          </h2>
                          <FaInfoCircle className="text-gray-400 ml-2 text-sm" />
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{doctor.title || "General Practitioner"}</p>
                        <p className="text-sm text-purple-700 mb-1 font-semibold">
                          {doctor.experience || "5"} YEARS • {doctor.education || "MBBS, FIDM"}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">{doctor.location || "Nashik"}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{doctor.clinicName || "Apollo 24|7 Virtual Clinic"} - {doctor.clinicLocation || "Maharashtra, Nashik"}</p>
                        
                        {(doctor.rating || true) && (
                          <div className="flex items-center mt-2">
                            <FaThumbsUp className="text-green-600 mr-1" />
                            <span className="text-green-600 text-sm font-medium">{doctor.rating || "98"}%</span>
                            <span className="text-gray-400 text-xs ml-1">({doctor.patientCount || "500"}+ Patients)</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Price and consultation button */}
                      <div className=" p-4 flex flex-col items-center justify-center border-l border-gray-100">
                        {doctor.offersVisit ? (
                          <div className="w-full">
                            <div className="flex justify-between mb-2">
                              <div className="w-1/2 text-center">
                                <p className="text-xl font-bold text-gray-800">₹{doctor.fees}</p>
                              </div>
                              <div className="w-1/2 text-center">
                                <p className="text-xl font-bold text-gray-800">₹{doctor.visitFees || Math.round(doctor.fees * 0.8)}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <button className="bg-white text-[#0087ba] py-2 px-1 rounded-md font-medium border border-[#0087ba] hover:bg-[#f0f9fc] text-center">
                                <div>Consult Online</div>
                                <div className="text-xs text-green-600 font-normal">
                                  Available in 6 minutes
                                </div>
                              </button>
                              <button className="bg-[#0087ba] text-white py-2 px-1 rounded-md font-medium hover:bg-[#006d96] text-center">
                                <div>Visit Doctor</div>
                                <div className="text-xs font-normal">
                                  Available in 2 minutes
                                </div>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center w-full">
                            <div className="mb-3">
                              <p className="text-2xl font-bold text-gray-800">₹{doctor.fees}</p>
                            </div>
                            {(doctor.cashback > 0) && (
                              <div className="flex items-center justify-center mb-3">
                                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center mr-1">
                                  <span className="text-white text-xs">₹</span>
                                </div>
                                <span className="text-orange-500 text-sm">₹{doctor.cashback} Cashback</span>
                              </div>
                            )}
                            <button className="w-full bg-white text-[#0087ba] py-2 px-4 rounded-md font-medium border border-[#0087ba] hover:bg-[#f0f9fc] text-center">
                              Consult Online
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-2">
                  <button 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    <FaChevronLeft className="text-sm" />
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-md border ${currentPage === i + 1 ? 'bg-[#0087ba] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    <FaChevronRight className="text-sm" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right side - Help card */}
        <div>
          <RightCard />
        </div>
      </div>
    </div>
  );
}

export default Doctorlist