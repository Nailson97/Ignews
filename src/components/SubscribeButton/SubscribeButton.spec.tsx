import { render, screen, fireEvent } from "@testing-library/react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { SubscribeButton } from ".";

jest.mock("next-auth/react");

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe("SubscribeButton Component", () => {
  // a descrição do que está sendo testado
  it("renders correctely", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(
      // o render renderiza um componente de forma virtual, para ser visualizada a saída ou o que ele retorna
      <SubscribeButton />
    );

    expect(screen.getByText("Subcribe now")).toBeInTheDocument();
  });

  // a descrição do que está sendo testado
  it("redirects user to sign in when not authenticated", () => {
    const signinMocked = jest.mocked(signIn);

    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(
      // o render renderiza um componente de forma virtual, para ser visualizada a saída ou o que ele retorna
      <SubscribeButton />
    );

    const subscribeButton = screen.getByText("Subcribe now");

    fireEvent.click(subscribeButton);

    expect(signinMocked).toBeCalled();
  });

  it("redirects to posts when user already has a subscription", () => {
    const useRouterMocked = jest.mocked(useRouter);
    const useSessionMocked = jest.mocked(useSession);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
        activeSubscription: "fake-active-subscription",
      },
    } as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(
      // o render renderiza um componente de forma virtual, para ser visualizada a saída ou o que ele retorna
      <SubscribeButton />
    );

    const subscribeButton = screen.getByText("Subcribe now");

    fireEvent.click(subscribeButton);

    expect(pushMock).toBeCalledWith('/posts');
  });
});
