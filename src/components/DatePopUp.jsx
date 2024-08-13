import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCaretDown } from 'react-icons/fa';

const DatePopUp = ({ selectedDate, setSelectedDate, setShowAddButton }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    if (showCalendar) {
      setShowAddButton(false); // Hide Add button when calendar is opened again
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    setShowAddButton(true); // Show Add button after date selection
  };

  return (
    <div className="relative ">
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
        <div className="absolute mt-1 z-10 shadow-lg p-4">
          <Calendar
            className='w-[300px] xs:-translate-x-44 sm:-translate-x-10'
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
