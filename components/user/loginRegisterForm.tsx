import { loginOrRegister, useDispatch } from "@/redux_store"
import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import { FormEventHandler } from "react"

export const LoginRegisterForm = () => {

  const dispatch = useDispatch();

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries()) as IUser;
    dispatch(loginOrRegister(formJson));
  }

  return (
    <form className="flex gap-2"
      onSubmit={onSubmit}
    >
      <Input data-cy="login-email" name="email" placeholder="email" required htmlType="email" />
      <Input data-cy="login-password" name="password" placeholder="password" required htmlType="password" />
      <Button data-cy="login-button" htmlType="submit" >Login</Button>
    </form>
  )
}
