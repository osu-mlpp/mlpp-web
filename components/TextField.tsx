type TextFieldProps = {
  type?: "text" | "number";
  name: string;
  label: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  step?: string | number;
  max?: string | number;
  min?: string | number;
};

export default function TextField({
  name,
  label,
  type = "text",
  placeholder,
  onChange,
  value,
  ...props
}: TextFieldProps) {
  return (
    <div className="mt-2 s:mt-4 m:mt-0">
      <label className="block mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
