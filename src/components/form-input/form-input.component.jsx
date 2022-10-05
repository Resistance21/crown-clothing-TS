import "./form-input.styles.scss";

const FormInput = ({ label, changeHandler, value, type, name }) => {
  return (
    <div className="group">
      <input
        className="form-input"
        required
        type={type}
        onChange={changeHandler}
        name={name}
        value={value}
      />
      {label && (
        <label className={`${value.length ? "shrink" : null} form-input-label`}>
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
