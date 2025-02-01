import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "src/content")

export async function getAllPosts() {
  const filenames = fs.readdirSync(contentDirectory)
  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, "")
      const filePath = path.join(contentDirectory, filename)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data } = matter(fileContents)
      return { slug, data }
    }),
  )
  return posts
}
