import { InputHTMLAttributes, ChangeEventHandler } from "react";
import { FormInputLabel, Group, Input } from "./form-input.styles";

type FormInputProps = {
  label: string;
  changeHandler: ChangeEventHandler<HTMLInputElement>;
  value: string;
  type: React.HTMLInputTypeAttribute;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput = ({
  label,
  changeHandler,
  value,
  type,
  name,
}: FormInputProps) => {
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
      {label && (
        <FormInputLabel shrink={value.length ? true : false}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
