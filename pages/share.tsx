import { Alert } from "@/components/common/alert";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { shareMovie, useDispatch } from "@/redux_store";
import { validateYoutubeURL } from "@/utils/validateYoutubeURL";
import { unwrapResult } from "@reduxjs/toolkit";
import { FormEventHandler, useState } from "react";

export default function Other() {
  const dispatch = useDispatch();

  const [alert, setAlert] = useState<Alert>();

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries()) as ShareMovieRequest;
    if (validateYoutubeURL(formJson.url)) {
      setAlert(undefined);
      dispatch(shareMovie(formJson))
        .then(unwrapResult)
        .then(val => {
          setAlert({
            message: 'The movie has been shared successfully!',
            type: 'success'
          })
        })
        .catch(reason => {
          if (reason.message === "Duplicate movie") {
            setAlert({
              message: 'Fail! Duplicate movie.',
              type: 'error'
            })
          }
        })
    } else {
      setAlert({
        message: 'URL is not valid!',
        type: 'error'
      })
    }
  }

  return <section className="h-screen flex items-center justify-center">
    <div className="border rounded-lg p-6 relative">
      <span className="absolute bg-white px-3 -top-3 font-bold">Share a Youtube movie</span>
      <form className="flex flex-col gap-4"
        onSubmit={onSubmit}
      >
        <div className="flex gap-4 items-center">
          <label htmlFor="url">Youtube URL:</label>
          <Input data-cy="share-input" className="flex-1" name="url" required />
        </div>
        {alert &&
          <Alert data-cy="share-alert" alert={alert} />
        }
        <div>
          <Button data-cy="share-submit" className="w-full" htmlType="submit">Share</Button>
        </div>
      </form>
    </div>
  </section>
}
