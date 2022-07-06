import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <div id="overlay-post"></div>
        <div id="backdrop-post"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}