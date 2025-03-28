import React, { useEffect, useState } from 'react';

const ModeMicrosite = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [color, setColor] = useState('#ffffff');
  const [fieldCounter, setFieldCounter] = useState(9);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    setPopupVisible(true);

    const handleClickOutside = (event) => {
      if (event.target.id === 'popup') {
        setPopupVisible(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const closePopup = () => {
    setPopupVisible(false);
  };

  const cambiarColor = (event) => {
    setColor(event.target.value);
  };

  const handleFieldSelection = (selectedValue) => {
    addNewRow(selectedValue);
  };

  const addNewRow = (numFields) => {
    const newFields = [];
    for (let i = 0; i < numFields; i++) {
      setFieldCounter((prevCounter) => prevCounter + 1);
      newFields.push(fieldCounter + 1);
    }
    setFields([...fields, ...newFields]);
  };

  const editLabel = (id) => {
    const newText = prompt("Edita el texto del campo:");
    if (newText !== null && newText.trim() !== "") {
      document.querySelector(`label[for="${id}"]`).innerText = newText;
    }
  };

  const deleteField = (id) => {
    setFields(fields.filter((field) => field !== id));
  };

  return (
    <div>
      {popupVisible && (
        <div id="popup" style={{ display: 'block' }}>
          <button id="close-popup" onClick={closePopup}>Close</button>
        </div>
      )}
      <input type="color" id="colorPicker" onChange={cambiarColor} />
      <div id="formFields">
        {fields.map((fieldId) => (
          <div key={fieldId} className="col-md-4">
            <div className="editable-label">
              <label htmlFor={`field${fieldId}`} className="form-label">Campo Nuevo</label>
              <button type="button" className="edit-btn bi bi-pencil" onClick={() => editLabel(`field${fieldId}`)}></button>
              <button type="button" className="delete-btn bi bi-trash" onClick={() => deleteField(fieldId)}></button>
            </div>
            <input type="text" className="w-full border-gray-300 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus-within:s-ring focus:border-primary-300 rounded-lg" id={`field${fieldId}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModeMicrosite;