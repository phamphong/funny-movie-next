import { selectNotifyList, selectUser, useSelector } from "@/redux_store"
import Link from "next/link"
import { UserHeader } from "@/components/user/userHeader";
import { LoginRegisterForm } from "@/components/user/loginRegisterForm";
import { Notification } from "./notification";

export const Header = () => {
  const userInfo = useSelector(selectUser);
  const notifyList = useSelector(selectNotifyList);

  return (
    <header>
      <div className="flex flex-wrap items-center justify-between max-w-6xl m-auto p-4 border-b-2 border-black mb-2">
        <nav>
          <Link href="/">
            <div className="text-2xl font-bold">Funny Movie</div>
          </Link>
        </nav>
        {userInfo ?
          <UserHeader user={userInfo} />
          :
          <LoginRegisterForm />
        }
      </div>
      <div className='fixed max-w-full z-50 right-0 bottom-0 p-2 flex flex-col-reverse gap-2 items-end'>
        {notifyList.map((noti, index) =>
          <Notification notify={noti} key={index} />
        )}
      </div>
    </header>
  )
}
