import React from 'react'
import ReactMarkdown from 'react-markdown'
import {
  Page, Text, Document, StyleSheet, Font,
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 60,
    fontFamily: 'Avenir Next',
  },
  title: {
    fontFamily: 'Avenir Next Bold',
    fontSize: 20,
    color: '#004699',
    margin: '65 0 40 0',
  },
  heading: {
    fontFamily: 'Avenir Next Bold',
    fontSize: 12,
    margin: '12 0 0 0',
  },
  paragraph: {
    fontSize: 10.5,
    margin: '12 0 6 0',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
})

Font.register({
  family: 'Avenir Next', src: '/fonts/AvenirAll/46cf1067-688d-4aab-b0f7-bd942af6efd8.ttf', fontStyle: 'normal',
})

Font.register({
  family: 'Avenir Next Bold', src: '/fonts/AvenirAll/a0f4c2f9-8a42-4786-ad00-fce42b57b148.ttf', fontStyle: 'normal', fontWeight: 700,
})

Font.registerHyphenationCallback((word) => [word])

const renderers = {
  heading: ({ children }) => <Text style={styles.heading}>{children[0]?.props?.children}</Text>,
  paragraph: ({ children }) => <Text style={styles.paragraph}>{children[0]?.props?.children}</Text>
  ,
}

const PdfDocument = ({ title, publicationSource, body }) => (
  <Document
    title={title}
    author={publicationSource}
    language="nl"
  >
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{title}</Text>
      <ReactMarkdown
        source={body}
        renderers={renderers}
      />
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => (
          `pagina ${pageNumber} van ${totalPages}`
        )}
        fixed
      />
    </Page>
  </Document>
)

export default PdfDocument
