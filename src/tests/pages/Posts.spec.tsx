import { render, screen } from "@testing-library/react";
import Posts, { getServerSideProps } from "../../pages/posts";
import { getPrismicClient } from "../../services/prismic";

const posts = [
  {
    slug: "my-new-post",
    title: "My New Post",
    content: "Post content",
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
      getByType: jest.fn().mockResolvedValueOnce(
        {results: [{
            uid: "my-new-post", // Adicionar o mesmo UID
            data: {
              title: [{ type: "heading", text: "My New Post" }],
              content: [{ type: "paragraph", text: "Post except" }],
            },
            last_publication_date: "03-22-2023",
          }]}
      ),
    } as any);

    const response = await getServerSideProps();

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My New Post",
              excerpti: "Post except",
              updatedAt: "22 de março de 2023",
            },
          ],
        },
      })
    );
  });
});
