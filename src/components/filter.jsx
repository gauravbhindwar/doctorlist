"use client"
import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

const Filter = ({ onFilterChange }) => {
  // Filter states
  const [experienceFilters, setExperienceFilters] = useState([]);
  const [feesFilters, setFeesFilters] = useState([]);
  const [languageFilters, setLanguageFilters] = useState([]);
  const [facilityFilters, setFacilityFilters] = useState([]);
  const [isHospitalVisit, setIsHospitalVisit] = useState(false);
  const [isOnlineConsult, setIsOnlineConsult] = useState(false);
  
  // UI states for collapsible sections
  const [showExperience, setShowExperience] = useState(true);
  const [showFees, setShowFees] = useState(true);
  const [showLanguage, setShowLanguage] = useState(true);
  const [showFacility, setShowFacility] = useState(true);
  const [showMore, setShowMore] = useState(false);
  
  // Handle experience checkbox changes
  const handleExperienceChange = (range) => {
    if (experienceFilters.includes(range)) {
      setExperienceFilters(experienceFilters.filter(item => item !== range));
    } else {
      setExperienceFilters([...experienceFilters, range]);
    }
  };
  
  // Handle fees checkbox changes
  const handleFeesChange = (range) => {
    if (feesFilters.includes(range)) {
      setFeesFilters(feesFilters.filter(item => item !== range));
    } else {
      setFeesFilters([...feesFilters, range]);
    }
  };
  
  // Handle language checkbox changes
  const handleLanguageChange = (language) => {
    if (languageFilters.includes(language)) {
      setLanguageFilters(languageFilters.filter(item => item !== language));
    } else {
      setLanguageFilters([...languageFilters, language]);
    }
  };

  // Handle facility checkbox changes
  const handleFacilityChange = (facility) => {
    if (facilityFilters.includes(facility)) {
      setFacilityFilters(facilityFilters.filter(item => item !== facility));
    } else {
      setFacilityFilters([...facilityFilters, facility]);
    }
  };
  
  // Handle visit type checkbox changes
  const handleHospitalVisitChange = () => {
    setIsHospitalVisit(!isHospitalVisit);
  };
  
  const handleOnlineConsultChange = () => {
    setIsOnlineConsult(!isOnlineConsult);
  };
  
  // Apply filters
  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        experience: experienceFilters,
        fees: feesFilters,
        languages: languageFilters,
        facilities: facilityFilters,
        isOnline: isOnlineConsult ? true : null,
        offersVisit: isHospitalVisit ? true : null
      });
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setExperienceFilters([]);
    setFeesFilters([]);
    setLanguageFilters([]);
    setFacilityFilters([]);
    setIsHospitalVisit(false);
    setIsOnlineConsult(false);
    
    if (onFilterChange) {
      onFilterChange({});
    }
  };
  
  // Update filters automatically when any filter changes
  React.useEffect(() => {
    applyFilters();
  }, [experienceFilters, feesFilters, languageFilters, facilityFilters, isHospitalVisit, isOnlineConsult]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-5">
        <h2 className="font-bold text-gray-800 text-lg">Filters</h2>
        <button 
          className="text-[#0087ba] text-sm font-medium"
          onClick={clearFilters}
        >
          Clear All
        </button>
      </div>
      
      {/* Show Doctors Near Me button */}
      <div className="mb-6">
        <button className="w-full bg-white border border-[#0087ba] text-[#0087ba] py-2 px-4 rounded-md font-medium hover:bg-blue-50 transition">
          Show Doctors Near Me
        </button>
      </div>
      
      {/* Mode of Consult */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 mb-3">Mode of Consult</h3>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="w-4 h-4 text-[#0087ba] border-gray-300 rounded focus:ring-[#0087ba]" 
              checked={isHospitalVisit}
              onChange={handleHospitalVisitChange}
            />
            <span className="ml-2 text-gray-700">Hospital Visit</span>
          </label>
          
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="w-4 h-4 text-[#0087ba] border-gray-300 rounded focus:ring-[#0087ba]" 
              checked={isOnlineConsult}
              onChange={handleOnlineConsultChange}
            />
            <span className="ml-2 text-gray-700">Online Consult</span>
          </label>
        </div>
      </div>
      
      {/* Experience Filter */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center mb-3 cursor-pointer"
          onClick={() => setShowExperience(!showExperience)}
        >
          <h3 className="font-bold text-gray-800">Experience (In Years)</h3>
          {showExperience ? <FaAngleUp /> : <FaAngleDown />}
        </div>
        
        {showExperience && (
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-[#0087ba] border-gray-300 rounded focus:ring-[#0087ba]" 
                checked={experienceFilters.includes('0-5')}
                onChange={() => handleExperienceChange('0-5')}
              />
              <span className="ml-2 text-gray-700">0-5</span>
            </label>
            
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-[#0087ba] border-gray-300 rounded focus:ring-[#0087ba]" 
                checked={experienceFilters.includes('6-10')}
                onChange={() => handleExperienceChange('6-10')}
              />
              <span className="ml-2 text-gray-700">6-10</span>
            </label>
            
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-[#0087ba] border-gray-300 rounded focus:ring-[#0087ba]" 
                checked={experienceFilters.includes('11-16')}
                onChange={() => handleExperienceChange('11-16')}
              />
              <span className="ml-2 text-gray-700">11-16</span>
            </label>
            
            {showMore && (
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                className="w-4 h-4 text-[#0087ba] border-gray-300 rounded focus:ring-[#0087ba]" 
                  checked={experienceFilters.includes('16+')}
                  onChange={() => handleExperienceChange('16+')}
                />
                <span className="ml-2 text-gray-700">16+</span>
              </label>
            )}
            
            <div className="text-[#0087ba] text-sm font-bold cursor-pointer" onClick={() => setShowMore(!showMore)}>
              {showMore ? null : '+1 More'}
            </div>
          </div>
        )}
      </div>
      
      {/* Fees Filter */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center mb-3 cursor-pointer"
          onClick={() => setShowFees(!showFees)}
        >
          <h3 className="font-bold text-gray-800">Fees (In Rupees)</h3>
          {showFees ? <FaAngleUp /> : <FaAngleDown />}
        </div>
        
        {showFees && (
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-[#0087ba] border-gray-300 rounded focus:ring-[#0087ba]" 
                checked={feesFilters.includes('100-500')}
                onChange={() => handleFeesChange('100-500')}
              />
              <span className="ml-2 text-gray-700">100-500</span>
            </label>
            
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-[#0087ba] border-gray-300 rounded focus:ring-[#0087ba]" 
                checked={feesFilters.includes('500-1000')}
                onChange={() => handleFeesChange('500-1000')}
              />
              <span className="ml-2 text-gray-700">500-1000</span>
            </label>
            
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-[#0087ba] border-gray-300 rounded focus:ring-[#0087ba]" 
                checked={feesFilters.includes('1000+')}
                onChange={() => handleFeesChange('1000+')}
              />
              <span className="ml-2 text-gray-700">1000+</span>
            </label>
          </div>
        )}
      </div>
      
      {/* Language Filter */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center mb-3 cursor-pointer"
          onClick={() => setShowLanguage(!showLanguage)}
        >
          <h3 className="font-bold text-gray-800">Language</h3>
          {showLanguage ? <FaAngleUp /> : <FaAngleDown />}
        </div>
        
        {showLanguage && (
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-[#0087ba] border-gray-300 rounded focus:ring-[#0087ba]" 
                checked={languageFilters.includes('English')}
                onChange={() => handleLanguageChange('English')}
              />
              <span className="ml-2 text-gray-700">English</span>
            </label>
          </div>
        )}
      </div>
      
      {/* Facility Filter */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center mb-3 cursor-pointer"
          onClick={() => setShowFacility(!showFacility)}
        >
          <h3 className="font-bold text-gray-800">Facility</h3>
          {showFacility ? <FaAngleUp /> : <FaAngleDown />}
        </div>
        
        {showFacility && (
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-[#0087ba] border-gray-300 rounded focus:ring-[#0087ba]" 
                checked={facilityFilters.includes('Apollo Hospital')}
                onChange={() => handleFacilityChange('Apollo Hospital')}
              />
              <span className="ml-2 text-gray-700">Apollo Hospital</span>
            </label>
            
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-[#0087ba] border-gray-300 rounded focus:ring-[#0087ba]" 
                checked={facilityFilters.includes('Other Clinics')}
                onChange={() => handleFacilityChange('Other Clinics')}
              />
              <span className="ml-2 text-gray-700">Other Clinics</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;