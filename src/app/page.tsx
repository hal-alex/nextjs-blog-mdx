import Link from "next/link"
import styles from "./page.module.css"
import { getAllPosts } from "./actions" // Updated import path

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to my MDX Blog</h1>
      <div className={styles.posts}>
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className={styles.postLink}
          >
            <article className={styles.post}>
              <h2>{post.title}</h2>
              <div className={styles.postMeta}>
                <time>{new Date(post.date).toLocaleDateString()}</time>
                <p>{post.description}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}
