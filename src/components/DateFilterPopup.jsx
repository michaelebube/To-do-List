import React, {useRef, useState, useEffect} from 'react'
import {FaSlidersH } from 'react-icons/fa'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DateFilterPopup = ({filteredDate, setFilteredDate}) => {

    const [showCalendar, setShowCalendar] = useState(false);
      const calendarRef = useRef(null);

  const toggleFilterCalendar = () => {
    setShowCalendar(!showCalendar);
  
  };

  const handleDateFilterChange = (date) => {
    setFilteredDate(date);
  
    
  };

   const clearFilter = () => {
    setFilteredDate(null); // Reset the filter date
  };

   const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
 

  return (
    <>
    <div ref={calendarRef} className='absolute right-[160px]'>
        <div>
             <FaSlidersH style={{width: '25', height: '20'}} onClick={toggleFilterCalendar}  />
        </div>


        {showCalendar && (
        <div className="absolute mt-1 z-10 shadow-lg p-2 xs:-translate-x-64 sm:-translate-x-64 ">
          <Calendar
            className='w-[300px] '
            onChange={handleDateFilterChange}
            value={filteredDate}
            minDate={new Date()}
          />

          {filteredDate && (
            <button
              onClick={clearFilter}
              className="mt-2  bg-rose-400 text-white px-4 py-1 rounded-md "
            >
              Clear Filter
            </button>
          )}
        </div>
      )}
    </div>
        
    </>
  )
}

export default DateFilterPopup