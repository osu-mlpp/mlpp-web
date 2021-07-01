type TextFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
}

export default function TextField({ name, label, placeholder, ...props }: TextFieldProps) {
  return (
    <div className="mt-2 s:mt-4 m:mt-0">
      <label className="block mb-2" htmlFor={name}>{ label }</label>
      <input type="text" name={name} id={name} placeholder={placeholder} {...props}/>
    </div>
  )
}