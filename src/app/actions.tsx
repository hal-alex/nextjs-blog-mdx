import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "/src/content")

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  content: string
}

export async function getAllPosts(): Promise<Post[]> {
  const fileNames = await fs.readdir(postsDirectory)
  const allPosts = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = await fs.readFile(fullPath, "utf8")

      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        content,
      }
    }),
  )

  // Sort posts by date
  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = await fs.readFile(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      content,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
