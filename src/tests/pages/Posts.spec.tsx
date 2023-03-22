import { render, screen } from "@testing-library/react";
import { getStaticProps } from "../../pages";
import Posts from "../../pages/posts";
import { getPrismicClient } from "../../services/prismic";

const posts = [
  {
    slug: "my-new-post",
    title: "My New Post",
    content: "<p>Post excerpt</p>",
    updatedAt: "26 de Março",
    excerpti: "Post except",
  },
];

jest.mock("../../services/prismic");

describe("Post page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        uid: "my-new-post", // Adicionar o mesmo UID
        data: {
          title: [{ type: "heading", text: "My new post" }],
          content: [{ type: "paragraph", text: "Post content" }],
        },
        last_publication_date: "03-22-2023",
      }),
    } as any);

    const response = await getStaticProps({
        previewData: undefined,
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My New Post",
              excerpti: "Post except",
              updatedAt: "22 de Março de 2023",
            },
          ],
        },
      })
    );
  });
});