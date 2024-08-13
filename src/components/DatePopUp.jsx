import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCaretDown } from 'react-icons/fa';

const DatePopUp = ({ selectedDate, setSelectedDate, setShowAddButton }) => {
  const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);


  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    if (showCalendar) {
      setShowAddButton(false); 
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
   
    setShowAddButton(true); 
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
    <div ref={calendarRef} className="relative ">
        <div className='flex items-center '>
            <button
        onClick={toggleCalendar}
        className="px-3 py-1 w-1/2  bg-transparent text-black  text-sm font-medium cursor-pointer flex items-center justify-between border rounded-xl mb-1"
      >
        {selectedDate ? selectedDate.toDateString() : 'Select Date' }
        <FaCaretDown />
      </button>
     
        </div>
      

      {showCalendar && (
        <div className="absolute mt-1 z-10 shadow-lg p-2">
          <Calendar
            className='w-[300px] '
            onChange={handleDateChange}
            value={selectedDate}
            minDate={new Date()}
          />
        </div>
      )}
    </div>
  );
};

export default DatePopUp;
