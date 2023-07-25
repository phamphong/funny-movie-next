import { FC } from "react"

type IProps = {
  alert: Alert,
}

export const Alert: FC<IProps> = ({ alert: { message, type = "success" }, ...rest }) => {

  switch (type) {
    case "success": return (
      <div {...rest}
        className={`px-3 py-2 rounded border bg-success-bg text-success-text font-bold`}
      >
        {message}
      </div>
    );
    case "error": return (
      <div {...rest}
        className={`px-3 py-2 rounded border bg-error-bg text-error-text font-bold`}
      >
        {message}
      </div>
    );
    case "waring": return (
      <div {...rest}
        className={`px-3 py-2 rounded border bg-waring-bg text-waring-text font-bold`}
      >
        {message}
      </div>
    );
  }
}
