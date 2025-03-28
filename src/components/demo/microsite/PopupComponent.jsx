import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';  // Import the default styles

export function PopupComponent({ buttonLabel, content }) {
  return (
    <Popup trigger={<button className="button">{buttonLabel}</button>} modal>
      {(close) => (
        <div className="modal popup-scrollable">
          <button className="close" onClick={close}>
            &times;
          </button>
          {content}
        </div>
      )}
    </Popup>
  );
};