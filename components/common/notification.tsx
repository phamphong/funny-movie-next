import { FC } from "react"

type IProps = {
  notify: INotify
}

export const Notification: FC<IProps> = ({ notify: { title, subTitle } }) => {

  return (
    <div
      className={`max-w-xs px-3 py-2 rounded border bg-white text-black animate-slite-to-left`}
    >
      <h3 className="font-bold">{title}</h3>
      {!!subTitle &&
        <p className="text-xs">{subTitle}</p>
      }
    </div>
  )
}
