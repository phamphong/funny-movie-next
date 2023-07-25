import Link from "next/link"
import { Button } from "@/components/common/button"
import { FC } from "react"
import { logout, useDispatch } from "@/redux_store"

type IProps = {
  user: IUser
}

export const UserHeader: FC<IProps> = ({ user }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="hidden sm:block" data-cy="user-email">{user.email}</div>
      <div className="flex gap-2">
        <Link href={"/share"}>
          <Button data-cy="share-button" className="whitespace-nowrap">Share a movie</Button>
        </Link>
        <Button data-cy="logout-button" className="whitespace-nowrap" onClick={onLogout}>Logout</Button>
      </div>
    </div>
  )
}
