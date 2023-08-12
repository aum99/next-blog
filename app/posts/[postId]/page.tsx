import getFormattedDate from "@/lib/getFormattedDate";
import { getPostData, getSortedPostData } from "@/lib/post";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateMetadata({ params }: { params: { postId: string } }) {
  const posts = getSortedPostData();
  const { postId } = params;

  const post = posts.find((post) => post.id == postId);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: post.title,
  };
}

export default async function Post({ params }: { params: { postId: string } }) {
  const posts = getSortedPostData();
  const { postId } = params;

  if (!posts.find((post) => post.id == postId)) {
    notFound();
  }

  const { title, date, contentHtml } = await getPostData(postId);

  const pubDate = getFormattedDate(date);

  return (
    <main className="px-5 prose prose-xl prose-slate dark:prose-invert mx-auto">
      <h1 className="texxt-3xl mt-4 mb-0">{title}</h1>
      <p className="mt-0">{pubDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <p>
          <Link href="/"> 👈🏻 Back To Home </Link>
        </p>
      </article>
    </main>
  );
}
