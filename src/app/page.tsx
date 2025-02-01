import Link from "next/link"
import { getAllPosts } from "./actions"
import styles from "./page.module.css"

export default async function Home() {
  const posts = await getAllPosts()
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            {post.slug}{" "}
          </Link>
        ))}
      </main>
    </div>
  )
}
