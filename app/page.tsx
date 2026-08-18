import { getHotPosts } from "@/lib/reddit";

export default async function Home() {
  const posts = await getHotPosts("programming");

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      <h1>The Subreddit Vibe Check</h1>

      <p>
        Reddit API test — r/programming
      </p>

      <h2>
        Posts received: {posts.length}
      </h2>

      <div>
        {posts.map((post) => (
          <article
            key={post.id}
            style={{
              padding: "20px 0",
              borderBottom: "1px solid #ddd",
            }}
          >
            <h3>{post.title}</h3>

            <p>
              👍 {post.score} &nbsp;•&nbsp;
              💬 {post.comments} &nbsp;•&nbsp;
              u/{post.author}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}