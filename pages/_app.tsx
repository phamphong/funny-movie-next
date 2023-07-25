import { AppProps } from 'next/app'
import { getUserInfo, selectUser, uiSlice, useDispatch, wrapper } from '@/redux_store'
import '@/styles/globals.css'
import { Header } from '@/components/common/header'
import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { pushNotify } from '@/redux_store/slices/uiSlice/thunks'
import { useSelector } from 'react-redux'

const WrappedApp = ({ Component, pageProps }: AppProps) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const swRef = useRef<Worker>();

  useEffect(() => {
    dispatch(getUserInfo());
    if (window.Worker) {
      const worker = new Worker("/ws.js");
      swRef.current = worker;
      worker.addEventListener("message", ({ data }) => {
        if (data.message = "new_movie") {
          dispatch(pushNotify({
            title: data.data.title,
            subTitle: `Shared by: ${data.data.user_email}`
          }))
        }
      });
    }
  }, [dispatch])

  useEffect(() => {
    if (user?.email && swRef.current) {
      swRef.current.postMessage({
        type: "user_logged_in",
      })
    }
  }, [user?.email])
  return (
    <>
      <Head>
        <title>Funny Movie</title>
        <meta name="description" content="Movie sharing platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <main className='max-w-4xl m-auto px-2'>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default wrapper.withRedux(WrappedApp)
