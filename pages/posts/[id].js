import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/post'
import Head from 'next/head'

export async function getStaticPaths() {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)

  return {
    props: {
      postData,
    },
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className="p-10">
        <h1 className="text-3xl font-bold">{postData.title}</h1>
        <div className="mt-5 text-gray-500">{postData.date}</div>
        <div
          className="mt-5 list-decimal"
          dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }}
        />
      </article>
    </Layout>
  )
}
