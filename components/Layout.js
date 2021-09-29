import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Healthcare Provider Registry</title>
      </Head>
      <main>{children}</main>
    </>
  );
}
