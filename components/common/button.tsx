import { FC, MouseEventHandler, PropsWithChildren } from "react"

type IProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>,
  className?: string,
  htmlType?: "button" | "submit" | "reset"
} & PropsWithChildren

export const Button: FC<IProps> = ({ onClick, className, children, htmlType = "button", ...rest }) => {

  return (
    <button
      {...rest}
      type={htmlType}
      className={`px-3 py-2 rounded border border-blue-600 bg-blue-500 font-bold text-white ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
