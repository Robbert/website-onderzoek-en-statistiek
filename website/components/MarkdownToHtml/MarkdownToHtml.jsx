import ReactMarkdown from 'react-markdown'

import Heading from '../Heading/Heading'
import Paragraph from '../Paragraph/Paragraph'
import Blockquote from '../Blockquote/Blockquote'
import InlineImage from '../InlineImage/InlineImage'
import Link from '../Link/Link'
import List from '../List/List'
import ListItem from '../ListItem/ListItem'

const markdownToHtmlMap = {
  h1: (props) => (<Heading gutterBottom={36} {...props} />),
  h2: (props) => (<Heading gutterBottom={36} as="h2" {...props} />),
  h3: (props) => (<Heading gutterBottom={36} as="h3" {...props} />),
  h4: (props) => (<Heading gutterBottom={36} as="h4" {...props} />),
  h5: (props) => (<Heading gutterBottom={36} as="h5" {...props} />),
  p: ({ children }) => {
    // this hacky check is necessary because Strapi's default rich text editor always
    // wraps images in a paragraph. The Next image component we use return a div,
    // which means you get a div as a decendant of a paragraph. That is not valid html markup.
    if (children[0]?.type?.name === 'img'
      || (children[0]?.type === 'a' && children[0]?.props?.children[0]?.type?.name === 'img')) {
      return children[0]
    }
    return <Paragraph gutterBottom={36}>{children}</Paragraph>
  },
  blockquote: ({ node }) => (
    // this hacky code is necessary because Strapi's default rich text editor always
    // wraps text in a blockquote in a paragraph, which gets rendered with Paragraph styling.
    // This takes the text from the paragraph and puts it directly in the blockquote.
    <Blockquote gutterBottom={36}>
      {node.children[1]?.children[0]?.value}
    </Blockquote>
  ),
  img: (props) => <InlineImage {...props} />,
  a: (props) => <Link external variant="inline" target="_blank" {...props} />,
  ul: (props) => <List gutterBottom={36} variant="unordered" {...props} />,
  ol: (props) => <List gutterBottom={36} variant="ordered" {...props} />,
  li: (props) => <ListItem {...props} />,
}

const MarkdownToHtml = ({ children }) => (
  <ReactMarkdown components={markdownToHtmlMap}>
    {children}
  </ReactMarkdown>
)

export default MarkdownToHtml
