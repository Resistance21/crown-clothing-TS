import { FormInputLabel, Group, Input } from "./form-input.styles.jsx";

const FormInput = ({ label, changeHandler, value, type, name }) => {
  return (
    <Group>
      <Input
        className="form-input"
        required
        type={type}
        onChange={changeHandler}
        name={name}
        value={value}
      />
      {label && <FormInputLabel shrink={value.length}>{label}</FormInputLabel>}
    </Group>
  );
};

export default FormInput;
