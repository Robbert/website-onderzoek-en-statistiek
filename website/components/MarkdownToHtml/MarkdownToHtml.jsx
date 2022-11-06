import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import Heading from '../Heading/Heading'
import Paragraph from '../Paragraph/Paragraph'
import Blockquote from '../Blockquote/Blockquote'
import InlineImage from '../InlineImage/InlineImage'
import Link from '../Link/Link'
import List from '../List/List'
import Table from '../Table/Table'

const markdownToHtmlMap = {
  h1: (props) => <Heading {...props} />,
  h2: (props) => <Heading as="h2" {...props} />,
  h3: (props) => <Heading as="h3" {...props} />,
  h4: (props) => <Heading as="h4" {...props} />,
  h5: (props) => <Heading as="h5" {...props} />,
  p: ({ children }) => {
    // this hacky check is necessary because Strapi's default rich text editor always
    // wraps images in a paragraph. The Next image component we use returns a div,
    // which means you get a div as a decendant of a paragraph. That is not valid html markup.
    if (
      children[0]?.type?.name === 'img' ||
      (children[0]?.type === 'a' &&
        children[0]?.props?.children[0]?.type?.name === 'img')
    ) {
      return children[0]
    }
    return <Paragraph>{children}</Paragraph>
  },
  blockquote: ({ node }) => (
    // this hacky code is necessary because Strapi's default rich text editor always
    // wraps text in a blockquote in a paragraph, which gets rendered with Paragraph styling.
    // This takes the text from the paragraph and puts it directly in the blockquote.
    <Blockquote>{node.children[1]?.children[0]?.value}</Blockquote>
  ),
  img: (props) => <InlineImage {...props} />,
  a: (props) => <Link external variant="inline" target="_blank" {...props} />,
  ul: (props) => <List variant="unordered" {...props} />,
  ol: (props) => <List variant="ordered" {...props} />,
  table: (props) => <Table {...props} />,
}

const MarkdownToHtml = ({ children }) => (
  <div
    style={{
      '--utrecht-space-around': 1,
      '--utrecht-paragraph-margin-block-end': '40px',
      '--utrecht-heading-1-margin-block-end': '40px',
      '--utrecht-heading-2-margin-block-end': '40px',
      '--utrecht-heading-3-margin-block-end': '40px',
      '--utrecht-heading-4-margin-block-end': '40px',
      '--utrecht-heading-5-margin-block-end': '40px',
      '--utrecht-blockquote-margin-block-end': '40px',
      '--utrecht-ordered-list-margin-block-end': '40px',
      '--utrecht-unordered-list-margin-block-end': '40px',
      '--utrecht-table-margin-block-end': '40px',
    }}
  >
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownToHtmlMap}>
      {children}
    </ReactMarkdown>
  </div>
)

export default MarkdownToHtml
