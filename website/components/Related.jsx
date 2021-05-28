import Link from 'next/link'
import { Heading } from '@amsterdam/asc-ui'

import { flattenFeatureList } from '../lib/utils'

const Related = ({ data }) => {
  if (!data) return null

  const relatedItems = flattenFeatureList([data]).map((item) => (
    <li key={item.slug}>
      <Link key={item.slug} href={item.path}>
        <a>
          {item.name}
          :
          {' '}
          {item.title}
        </a>
      </Link>
    </li>
  ))

  const relatedLinks = data.links.map((item) => (
    <li key={item.url}>
      <a href={item.url}>
        link:
        {' '}
        {item.text}
      </a>
    </li>
  ))

  return (
    <>
      <Heading forwardedAs="h2">Gerelateerd</Heading>
      <ul>
        {relatedItems}
        {relatedLinks}
      </ul>
    </>
  )
}

export default Related
