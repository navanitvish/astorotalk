import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import translations from '../../components/translations/translations';

const KundaliMatchingForm = () => {
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December",
  ];
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
  const years = Array.from({ length: 100 }, (_, i) => 2024 - i);
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
  const meridiem = ["AM", "PM"];

  // State object for both boy and girl details
  const [formData, setFormData] = useState({
    boy: {
      name: '',
      birthDate: { month: '', day: '', year: '' },
      birthTime: { hour: '', minute: '', second: '', meridiem: '' },
      placeOfBirth: '',
      dontKnowBirthTime: false,
    },
    girl: {
      name: '',
      birthDate: { month: '', day: '', year: '' },
      birthTime: { hour: '', minute: '', second: '', meridiem: '' },
      placeOfBirth: '',
      email: '',
      dontKnowBirthTime: false,
    },
  });

  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  // Handle changes in input fields
  const handleInputChange = (e, person) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [person]: {
        ...prevData[person],
        [name]: value,
      },
    }));
  };

  const handleDateChange = (e, person, field) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [person]: {
        ...prevData[person],
        birthDate: {
          ...prevData[person].birthDate,
          [name]: value,
        },
      },
    }));
  };

  const handleTimeChange = (e, person, field) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [person]: {
        ...prevData[person],
        birthTime: {
          ...prevData[person].birthTime,
          [name]: value,
        },
      },
    }));
  };

  const handleCheckboxChange = (e, person) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [person]: {
        ...prevData[person],
        dontKnowBirthTime: checked,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as sending formData to the server
    console.log(formData);
  };

  return (
    <div className=" bg-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Boy Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    {t.BoyName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.boy.name}
                    placeholder="Enter Name"
                    onChange={(e) => handleInputChange(e, 'boy')}
                    className="w-full p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    {t.BirthDate} <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      name="month"
                      value={formData.boy.birthDate.month}
                      onChange={(e) => handleDateChange(e, 'boy', 'birthDate')}
                      className="p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                    >
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      name="day"
                      value={formData.boy.birthDate.day}
                      onChange={(e) => handleDateChange(e, 'boy', 'birthDate')}
                      className="p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                    >
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <select
                      name="year"
                      value={formData.boy.birthDate.year}
                      onChange={(e) => handleDateChange(e, 'boy', 'birthDate')}
                      className="p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    {t.BirthTime} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <div className="grid grid-cols-4 gap-2 flex-grow">
                      <select
                        name="hour"
                        value={formData.boy.birthTime.hour}
                        onChange={(e) => handleTimeChange(e, 'boy', 'birthTime')}
                        className="p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                      >
                        {hours.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                      <select
                        name="minute"
                        value={formData.boy.birthTime.minute}
                        onChange={(e) => handleTimeChange(e, 'boy', 'birthTime')}
                        className="p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                      >
                        {minutes.map((minute) => (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                      <select
                        name="second"
                        value={formData.boy.birthTime.second}
                        onChange={(e) => handleTimeChange(e, 'boy', 'birthTime')}
                        className="p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                      >
                        {minutes.map((second) => (
                          <option key={second} value={second}>
                            {second}
                          </option>
                        ))}
                      </select>
                      <select
                        name="meridiem"
                        value={formData.boy.birthTime.meridiem}
                        onChange={(e) => handleTimeChange(e, 'boy', 'birthTime')}
                        className="p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                      >
                        {meridiem.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="ml-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.boy.dontKnowBirthTime}
                          onChange={(e) => handleCheckboxChange(e, 'boy')}
                          className="form-checkbox text-pink-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {t.DontKnowBirthTime}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    {t.PlaceOfBirth} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="placeOfBirth"
                    value={formData.boy.placeOfBirth}
                    placeholder="New Delhi, India"
                    onChange={(e) => handleInputChange(e, 'boy')}
                    className="w-full p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              {/* Right Column - Girl Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    {t.GirlName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.girl.name}
                    placeholder="Enter Name"
                    onChange={(e) => handleInputChange(e, 'girl')}
                    className="w-full p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    {t.BirthDate} <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      name="month"
                      value={formData.girl.birthDate.month}
                      onChange={(e) => handleDateChange(e, 'girl', 'birthDate')}
                      className="p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                    >
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      name="day"
                      value={formData.girl.birthDate.day}
                      onChange={(e) => handleDateChange(e, 'girl', 'birthDate')}
                      className="p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                    >
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <select
                      name="year"
                      value={formData.girl.birthDate.year}
                      onChange={(e) => handleDateChange(e, 'girl', 'birthDate')}
                      className="p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    {t.BirthTime} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <div className="grid grid-cols-4 gap-2 flex-grow">
                      <select
                        name="hour"
                        value={formData.girl.birthTime.hour}
                        onChange={(e) => handleTimeChange(e, 'girl', 'birthTime')}
                        className="p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                      >
                        {hours.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                      <select
                        name="minute"
                        value={formData.girl.birthTime.minute}
                        onChange={(e) => handleTimeChange(e, 'girl', 'birthTime')}
                        className="p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                      >
                        {minutes.map((minute) => (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                      <select
                        name="second"
                        value={formData.girl.birthTime.second}
                        onChange={(e) => handleTimeChange(e, 'girl', 'birthTime')}
                        className="p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                      >
                        {minutes.map((second) => (
                          <option key={second} value={second}>
                            {second}
                          </option>
                        ))}
                      </select>
                      <select
                        name="meridiem"
                        value={formData.girl.birthTime.meridiem}
                        onChange={(e) => handleTimeChange(e, 'girl', 'birthTime')}
                        className="p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                      >
                        {meridiem.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="ml-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.girl.dontKnowBirthTime}
                          onChange={(e) => handleCheckboxChange(e, 'girl')}
                          className="form-checkbox text-pink-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {t.DontKnowBirthTime}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    {t.PlaceOfBirth} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="placeOfBirth"
                    value={formData.girl.placeOfBirth}
                    placeholder="New Delhi, India"
                    onChange={(e) => handleInputChange(e, 'girl')}
                    className="w-full p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    {t.Email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.girl.email}
                    placeholder="Enter Email"
                    onChange={(e) => handleInputChange(e, 'girl')}
                    className="w-full p-2 border border-pink-200 rounded focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-8 py-2 rounded-full font-medium transition-colors"
              >
                {t.GetReport}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KundaliMatchingForm;
