import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/app/actions"
import { MDXRemote } from "next-mdx-remote/rsc"
import styles from "./styles.module.css"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

interface PostProps {
  params: Promise<{ slug: string }>
}

export default async function Post({ params }: PostProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <h1>{post.title}</h1>
        <time>{new Date(post.date).toLocaleDateString()}</time>
        <p className={styles.description}>{post.description}</p>
      </div>
      <div className={styles.content}>
        <MDXRemote source={post.content} />
      </div>
    </article>
  )
}

