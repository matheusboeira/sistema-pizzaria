import Head from 'next/head'
import { ReactNode } from 'react'

interface PageProps {
  title: string
  children: ReactNode
}

const Page = ({ title, children }: PageProps) => {
  return (
    <>
      <Head>
        <title>{`${title} | SujeitoPizzaria`}</title>
      </Head>
      <div>{children}</div>
    </>
  )
}

export default Page
