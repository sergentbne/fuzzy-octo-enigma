import React, { useState } from 'react';
import './App.css';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

function App() {
	  const [currentMonth, setCurrentMonth] = useState(new Date());
	  const [selectedDate, setSelectedDate] = useState(null);
	  const [showTimePicker, setShowTimePicker] = useState(false);
	  const [timeRange, setTimeRange] = useState({ start: '09:00', end: '17:00' });
	  const [input1, setInput1] = useState('');
	  const [input2, setInput2] = useState('');

	  const monthStart = startOfMonth(currentMonth);
	  const monthEnd = endOfMonth(currentMonth);
	  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

	  const handleDateClick = (day) => {
		      setSelectedDate(day);
		      setShowTimePicker(true);
		    };

	  const handleTimeChange = (e, type) => {
		      setTimeRange({ ...timeRange, [type]: e.target.value });
		    };

	  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
	  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

	  return (
		      <div className="app">
		        <h1>Calendar Time Picker</h1>
		        
		        <div className="input-container">
		          <input
		            type="text"
		            placeholder="Input 1"
		            value={input1}
		            onChange={(e) => setInput1(e.target.value)}
		            className="input-box"
		          />
		          <input
		            type="text"
		            placeholder="Input 2"
		            value={input2}
		            onChange={(e) => setInput2(e.target.value)}
		            className="input-box"
		          />
		        </div>

		        <div className="calendar-container">
		          <div className="calendar-header">
		            <button onClick={prevMonth}>&lt;</button>
		            <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
		            <button onClick={nextMonth}>&gt;</button>
		          </div>

		          <div className="calendar-grid">
		            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
				                <div key={day} className="calendar-day-header">{day}</div>
				              ))}

		            {monthDays.map(day => {
				                const isSelected = selectedDate && isSameDay(day, selectedDate);
				                return (
							              <div
							                key={day.toString()}
							                className={`calendar-day ${
										                  !isSameMonth(day, currentMonth) ? 'other-month' : ''
										                } ${isSelected ? 'selected' : ''}`}
							                onClick={() => handleDateClick(day)}
							              >
							                {format(day, 'd')}
							              </div>
							            );
				              })}
		          </div>
		        </div>

		        {showTimePicker && selectedDate && (
				        <div className="time-picker">
				          <h3>Select Time Range for {format(selectedDate, 'MMMM d, yyyy')}</h3>
				          <div className="time-inputs">
				            <div>
				              <label>Start Time:</label>
				              <input
				                type="time"
				                value={timeRange.start}
				                onChange={(e) => handleTimeChange(e, 'start')}
				              />
				            </div>
				            <div>
				              <label>End Time:</label>
				              <input
				                type="time"
				                value={timeRange.end}
				                onChange={(e) => handleTimeChange(e, 'end')}
				              />
				            </div>
				          </div>
				          <button 
				            className="save-button"
				            onClick={() => {
						                  alert(`Time range ${timeRange.start} to ${timeRange.end} saved for ${format(selectedDate, 'MMMM d, yyyy')}`);
						                  setShowTimePicker(false);
						                }}
				          >
				            Save
				          </button>
				        </div>
				      )}
		      </div>
		    );
}

export default App;
