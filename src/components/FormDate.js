// css
import "./FormDate.css";

// img
import iconArrow from "../assets/images/icon-arrow.svg";

function FormDate({ date, error, handleChange, handleSubmit }) {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__container">
        <div className="form-group">
          <label
            className={`label ${error.day.state ? "error" : ""}`}
            htmlFor="day"
          >
            Day
          </label>
          <input
            className={`input ${error.day.state ? "error" : ""}`}
            type="number"
            id="day"
            name="day"
            min="1"
            max="31"
            value={date.day}
            onChange={handleChange}
            placeholder="DD"
          />
          {error.day.state && (
            <p className="error-message">{error.day.message}</p>
          )}
        </div>
        <div className="form-group">
          <label
            className={`label ${error.month.state ? "error" : ""}`}
            htmlFor="month"
          >
            Month
          </label>
          <input
            className={`input ${error.month.state ? "error" : ""}`}
            type="number"
            id="month"
            name="month"
            min="1"
            max="12"
            value={date.month}
            onChange={handleChange}
            placeholder="MM"
          />
          {error.month.state && (
            <p className="error-message">{error.month.message}</p>
          )}
        </div>
        <div className="form-group">
          <label
            className={`label ${error.year.state ? "error" : ""}`}
            htmlFor="year"
          >
            Year
          </label>
          <input
            className={`input ${error.year.state ? "error" : ""}`}
            type="number"
            id="year"
            name="year"
            min="1900"
            max="2024"
            value={date.year}
            onChange={handleChange}
            placeholder="YYYY"
          />
          {error.year.state && (
            <p className="error-message">{error.year.message}</p>
          )}
        </div>
      </div>
      <div className="form__submit">
        <button className="submit-button" type="submit" onClick={handleSubmit}>
          <img className="submit-icon" src={iconArrow} alt="Arrow-icon" />
        </button>
      </div>
    </form>
  );
}

export default FormDate;
