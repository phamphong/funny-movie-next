import { FC, ChangeEventHandler, HTMLInputTypeAttribute } from "react"

type IProps = {
  placeholder?: string,
  className?: string,
  defaultValue?: string | number,
  required?: boolean,
  onChange?: ChangeEventHandler<HTMLInputElement>,
  htmlType?: HTMLInputTypeAttribute,
  name: string,
}

export const Input: FC<IProps> = ({
  name,
  placeholder, defaultValue, className,
  onChange, required, htmlType, ...rest
}) => {

  return <input
    {...rest}
    id={name}
    name={name}
    type={htmlType}
    required={required}
    placeholder={placeholder}
    onChange={onChange}
    defaultValue={defaultValue}
    className={`px-3 py-2 rounded border border-blue-600 ${className ?? ""}`}
  />
}
