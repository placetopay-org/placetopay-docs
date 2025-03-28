// Extracted from https://www.hover.dev/components/boards
// Non-commercial purposes, open source documentation.

import React, { useState } from "react";
import { Trash2, Plus, Pencil, Check, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export const DragAndDrop = ({ isVisiblePDF }) => {
  return (
    <div className="h-auto w-full">
      <Board isVisiblePDF={isVisiblePDF} />
    </div>
  );
};

const Board = ({ isVisiblePDF }) => {
  const [cards, setCards] = useState(DEFAULT_CARDS);
  const [rows, setRows] = useState(['row_1', 'row_2', 'row_3', 'row_4', 'row_5', 'row_6']);

  const handleAddRow = () => {
    const newRowId = `row_${rows.length + 1}`;
    setRows([...rows, newRowId]);

    setCards((prevCards) => [...prevCards, {
      title: `Nuevo campo ${cards.length + 1}`,
      id: `${cards.length + 1}`,
      column: newRowId
    }]);
  };

  return (
    <div className="flex flex-col w-full h-auto gap-3">
      {rows.map((column) => (
        <Row
          key={column}
          column={column}
          cards={cards}
          setCards={setCards}
          rows={rows}
          setRows={setRows}
          isVisiblePDF={isVisiblePDF}
        />
      ))}
      {isVisiblePDF && (
        <div className="flex justify-center mt-4 mb-4">
          <button
            type="button"
            onClick={handleAddRow}
            className="flex items-center gap-2 px-4 py-2 rounded bg-neutral-200 hover:bg-neutral-300 transition-colors"
          >
            <span>Agregar fila</span>
            <Plus />
          </button>
        </div>
      )}
    </div>
  );
};

const Row = ({ headingColor, cards, column, setCards, rows, setRows, isVisiblePDF }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    // Get current cards in this column
    const currentColumnCards = cards.filter(c => c.column === column);
    
    // Check if the card being dragged is already in this column
    const isInternalMove = currentColumnCards.some(card => card.id === cardId);

    // Only check for max cards if it's not an internal move
    if (!isInternalMove && currentColumnCards.length >= 3) {
      setActive(false);
      return;
    }

    setActive(false);

    if (cardId) {
      let copy = [...cards];
      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;

      cardToTransfer = { ...cardToTransfer, column };
      copy = copy.filter((c) => c.id !== cardId);
      copy.push(cardToTransfer);

      setCards(copy);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    const currentColumnCards = cards.filter(c => c.column === column);

    // Only allow drag over if column has less than 3 cards
    if (currentColumnCards.length < 3) {
      setActive(true);
    }
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDeleteRow = () => {
    // Remove the row from rows array
    setRows(rows.filter(row => row !== column));

    // Remove all cards in this row
    setCards(prevCards => prevCards.filter(card => card.column !== column));
  };

  const filteredCards = cards.filter((c) => c.column === column);

  // Change the variable name from 'rows' to 'groupedCards'
  const groupedCards = filteredCards.reduce((acc, card, index) => {
    const rowIndex = Math.floor(index / 3);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(card);
    return acc;
  }, []);

  // Add this function to check if row has required cards
  const hasRequiredCards = () => {
    return filteredCards.some(card => card.required);
  };

  return (
    <div>
      <div className={`w-full shrink-0 ${isVisiblePDF ? 'border-2 border-dashed border-gray-200' : ''} px-10 rounded-lg relative`}>
        {isVisiblePDF && !hasRequiredCards() && (
          <button
            type="button"
            onClick={handleDeleteRow}
            disabled={hasRequiredCards()}
            className={`absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-sm border border-gray-200 'hover:bg-red-50'`}
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        )}

        <div
          onDrop={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`w-full transition-colors ${active ? "bg-neutral-200/50" : "bg-neutral-200/0"}`}
        >
          {groupedCards.map((row, rowIndex) => (
            <div key={rowIndex}>
              <div
                className={`grid gap-4 ${row.length === 1 ? 'grid-cols-1' :
                  row.length === 2 ? 'grid-cols-2' :
                    'grid-cols-3'
                  }`}
              >
                {/* Cards container */}
                <div className={`contents`}>
                  {row.map((c) => (
                    <Card
                      key={c.id}
                      {...c}
                      handleDragStart={handleDragStart}
                      className="w-full card-item"
                      setCards={setCards}
                      isVisiblePDF={isVisiblePDF}
                    />
                  ))}
                </div>
              </div>
              {row.length < 3 && (
                <div className="items-center ">
                  <AddCard
                    column={column}
                    setCards={setCards}
                    isVisiblePDF={isVisiblePDF}
                  />
                </div>
              )}
            </div>
          ))}
          {groupedCards.length === 0 && (
            <div className="flex justify-center p-4">
              <AddCard column={column} setCards={setCards} isVisiblePDF={isVisiblePDF}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, required, id, column, handleDragStart, className = "", setCards, isVisiblePDF }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [inputType, setInputType] = useState('text'); // Add this state
  const [options, setOptions] = useState(['Seleccione una opción', 'Opción 1', 'Opción 2', 'Opción 3']); // Add this for select options

  const handleDelete = () => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const handleEdit = () => {
    if (isEditing) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === id ? { ...card, title: editedTitle } : card
        )
      );
    }
    setIsEditing(!isEditing);
  };

  const handleTypeChange = () => {
    setInputType(inputType === 'text' ? 'select' : 'text');
  };

  return (
    <motion.div
      layout
      layoutId={id}
      draggable={!isEditing}
      onDragStart={(e) => handleDragStart(e, { title, id, column })}
      className={`cursor-grab text-gray-700 rounded active:cursor-grabbing card-item ${className}`}
    >
      <div className="flex flex-col gap-2">
        {/* Title section */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="flex-1 text-sm bg-white rounded px-2 py-1 focus:outline-none"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleEdit();
                    }
                  }}
                />
              ) : (
                <div>
                  <span className="text-sm font-medium mr-2">{title}</span>
                  {subtitle && (
                    <span className="text-xs text-gray-500 mr-2">{subtitle}</span>
                  )}
                  {required && <span className="text-red-500">*</span>}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {!required && isVisiblePDF && (
              <button
                type="button"
                onClick={handleTypeChange}
                className="text-xs text-neutral-500 hover:text-blue-500 pt-1"
              >
                <RefreshCw size={14} />
              </button>
            )}
            {isVisiblePDF && (
              <button
                type="button"
                onClick={handleEdit}
                className="text-neutral-500 hover:text-blue-500 transition-colors pt-1"
              >
                {isEditing ? <Check size={14} /> : <Pencil size={14} />}
              </button>
            )}
            {!required && isVisiblePDF && (
              <button
                type="button"
                onClick={handleDelete}
                className="text-neutral-500 hover:text-red-500 transition-colors pt-1"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {inputType === 'text' ? (
            <input
              type="text"
              className="w-full border border-gray-400 py-2 text-gray-900 outline-none focus:border-primary-300 rounded-lg"
            />
          ) : (
            <select className="w-full border border-gray-400 py-2 text-gray-900 outline-none focus:border-primary-300 rounded-lg">
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const AddCard = ({ column, isVisiblePDF, setCards, className = "" }) => {
  const [text, setText] = useState("Nuevo campo");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((pv) => [...pv, newCard]);

    setAdding(false);
  };

  return (
    <div>
      {isVisiblePDF && (
        <>
          {adding ? (
            <motion.form layout onSubmit={handleSubmit} className={className}>
              <textarea
                onChange={(e) => setText(e.target.value)}
                autoFocus
                placeholder="Agregar campo"
                className="w-full my-2 rounded bg-neutral-200 p-3 text-sm placeholder-neutral-500 focus:outline-0"
              />
              <div className="mt-1.5 flex items-center justify-end gap-1.5">
                <button
                  type="button"
                  onClick={() => setAdding(false)}
                  className="flex items-center gap-1.5 rounded bg-neutral-200 px-3 py-1.5 text-xs transition-colors hover:bg-neutral-300"
                >
                  <span>Cerrar</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center gap-1.5 rounded bg-neutral-200 px-3 py-1.5 text-xs transition-colors hover:bg-neutral-300"
                >
                  <span>Agregar</span>
                  <Plus />
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.button
              layout
              onClick={() => setAdding(true)}
              className={`flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-600 ${className}`}
            >
              <span>Agregar campo</span>
              <Plus />
            </motion.button>
          )}
        </>
      )}
    </div>
  );
};

const DEFAULT_CARDS = [
  { title: "Referencia", subtitle: "(Referencia)", required: true, id: "1", column: "row_1" },
  { title: "Descripción de pago", subtitle: "(Descripción de pago)", required: true, id: "2", column: "row_2" },
  { title: "Moneda", subtitle: "(Moneda)", required: true, id: "3", column: "row_3" },
  { title: "Monto", subtitle: "(Monto)", required: true, id: "4", column: "row_3" },
  { title: "Tipo de documento", required: false, id: "5", column: "row_4" },
  { title: "Documento del comprador", required: false, id: "6", column: "row_4" },
  { title: "Nombre del comprador", required: false, id: "7", column: "row_5" },
  { title: "Apellido del comprador", required: false, id: "8", column: "row_5" },
  { title: "Correo electrónico", required: false, id: "9", column: "row_6" },
];