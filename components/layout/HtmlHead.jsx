import Head from 'next/head'

import config from '../../config'


function HtmlHead() {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>{config.author.name} - Personal Site</title>
    </Head>
  )
}

export default HtmlHead
