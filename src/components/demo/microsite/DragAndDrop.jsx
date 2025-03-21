import * as React from "react";
import { List, arrayMove } from "react-movable";
import { Pencil, Trash, Plus } from "lucide-react";

export const handleFieldSelection = (e, fields, setFields, fieldCounter, setFieldCounter) => {
  const numFields = parseInt(e.target.value);
  if (!isNaN(numFields)) {
    const newFields = Array(numFields).fill(null).map((_, index) => ({
      id: `field_${fieldCounter + index}`,
      label: `Campo ${fieldCounter + index}`,
      type: "text",
    }));
    setFieldCounter(fieldCounter + numFields);
    setFields([...fields, { id: `row_${fieldCounter}`, columns: newFields }]);
  }
};

export function DragAndDrop({ isVisiblePDF, fields, setFields, fieldCounter, setFieldCounter }) {
  const protectedFields = ["reference", "payment_description", "currency", "amount"];

  const handleEdit = (id) => {
    const newLabel = prompt("Ingrese el nuevo nombre del campo:");
    if (newLabel) {
      setFields(fields.map(field => {
        if (field.id === id) {
          return { ...field, label: newLabel };
        } else if (field.columns) {
          return {
            ...field,
            columns: field.columns.map(col => col.id === id ? { ...col, label: newLabel } : col)
          };
        }
        return field;
      }));
    }
  };

  const handleDelete = (id) => {
    setFields(fields.map(field => {
      if (field.id === id) {
        return null;
      } else if (field.columns) {
        return {
          ...field,
          columns: field.columns.filter(col => col.id !== id)
        };
      }
      return field;
    }).filter(Boolean));
  };

  return (
    <List
      values={fields}
      onChange={({ oldIndex, newIndex }) =>
        setFields(arrayMove(fields, oldIndex, newIndex))
      }
      renderList={({ children, props, isDragged }) => (
        <div {...props} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children}
        </div>
      )}
      renderItem={({ value, props, isDragged, isSelected }) => {
        if (value.columns) {
          return (
            <div
              {...props}
              key={props.key}
              style={{
                ...props.style,
                padding: "0.3rem",
                cursor: isDragged ? "grabbing" : "grab",
                borderRadius: "0.5rem",
                backgroundColor: isDragged || isSelected ? "#EEE" : "#FFF",
                zIndex: isDragged ? 1000 : "auto",
                display: "grid",
                gridTemplateColumns: `repeat(${value.columns.length}, 1fr)`,
                gap: "8px",
                width: "100%",
              }}
              className="col-span-2"
            >
              {value.columns.map((field) => (
                <div key={field.id} className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                  </div>
                  <div className="flex items-center gap-2">
                    {field.type === "select" ? (
                      <select
                        id={field.id}
                        className="w-full border border-gray-400 py-0 text-gray-900 outline-none focus:border-primary-300 rounded-lg h-10 flex items-center"
                      >
                        {field.options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        className="w-full border border-gray-400 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary-300 rounded-lg"
                        id={field.id}
                      />
                    )}
                    {isVisiblePDF && (
                      <button type="button" onClick={() => handleEdit(field.id)} className="text-blue-500">
                        <Pencil size={16} />
                      </button>
                    )}
                    {isVisiblePDF && !protectedFields.includes(field.id) && (
                      <button type="button" onClick={() => handleDelete(field.id)} className="text-red-500">
                        <Trash size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        } else {
          const isFullWidth =
            value.id === "reference" || value.id === "payment_description" || value.id === "buyer_email";
          return (
            <div
              {...props}
              key={props.key}
              style={{
                ...props.style,
                padding: "0.3rem",
                cursor: isDragged ? "grabbing" : "grab",
                borderRadius: "0.5rem",
                backgroundColor: isDragged || isSelected ? "#EEE" : "#FFF",
                zIndex: isDragged ? 1000 : "auto",
              }}
              className={`flex flex-col ${isFullWidth ? "col-span-2" : "col-span-1"}`}
            >
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 mb-2">{value.label}</label>
                <span className="text-sm text-gray-500 mb-2">{value.subLabel}</span>
                {protectedFields.includes(value.id) && <p className="text-red-500">*</p>}
              </div>
              <div className="flex items-center gap-2">
                {value.type === "select" ? (
                  <select
                    id={value.id}
                    className="w-full border border-gray-400 py-0 text-gray-900 outline-none focus:border-primary-300 rounded-lg h-10 flex items-center"
                  >
                    {value.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    className="w-full border border-gray-400 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary-300 rounded-lg"
                    id={value.id}
                  />
                )}
                {isVisiblePDF && (
                  <button type="button" onClick={() => handleEdit(value.id)} className="text-blue-500">
                    <Pencil size={16} />
                  </button>
                )}
                {isVisiblePDF && !protectedFields.includes(value.id) && (
                  <button type="button" onClick={() => handleDelete(value.id)} className="text-red-500">
                    <Trash size={16} />
                  </button>
                )}
              </div>
            </div>
          );
        }
      }}
    />
  );
}