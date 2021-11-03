import { Fragment } from 'react'
import { List } from '@amsterdam/asc-ui'
import { ChevronRight } from '@amsterdam/asc-assets'

import { GridItem } from '../Grid/Grid.style'
import Heading from '../Heading/Heading'
import MarkdownToHtml from '../MarkdownToHtml/MarkdownToHtml'
import Visualisation from '../Visualisation/Visualisation'
import Link from '../Link/Link'
import { normalizeBody } from '../../lib/utils'
import * as Styled from './BodyContent.style'

const BodyContent = ({ content }) => (
  <>
    {normalizeBody(content).map((item) => {
      if (item.type === 'text') {
        return (
          <GridItem
            key={item.id}
            colStart={{ small: 1, large: 3 }}
            colRange={{ small: 4, large: 8 }}
          >
            <MarkdownToHtml>{item.text}</MarkdownToHtml>
          </GridItem>
        )
      }
      if (item.type === 'textwithlinks') {
        return (
          <Fragment key={item.id}>
            <GridItem colStart={{ small: 1, large: 3 }} colRange={{ small: 4, large: 6 }}>
              <MarkdownToHtml>{item.text}</MarkdownToHtml>
            </GridItem>
            <GridItem
              colStart={{ small: 1, large: 10 }}
              colRange={{ small: 4, large: 3 }}
            >
              {item.links.length > 0 && (
                <>
                  <Heading as="h2" styleAs="h5" gutterBottom={16}>Zie ook</Heading>
                  <List>
                    {item.links.map(({ name, path, title: linkTitle }) => (
                      <li key={path}>
                        <Link href={path} variant="inList">
                          <Styled.Icon size={14}>
                            <ChevronRight />
                          </Styled.Icon>
                          <Styled.ContentType>{`${name} - ${linkTitle}`}</Styled.ContentType>
                        </Link>
                      </li>
                    ))}
                  </List>
                </>
              )}
            </GridItem>
          </Fragment>
        )
      }
      if (item.type === 'visualisation') {
        return (
          <GridItem
            key={item.id}
            colStart={{ small: 1, large: 1 }}
            colRange={{ small: 4, large: 12 }}
          >
            <Visualisation {...item} />
          </GridItem>
        )
      }
      return null
    })}
  </>
)

export default BodyContent
