import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { SigninButton } from ".";

jest.mock("next-auth/react");

describe("SigninButton Component", () => {
  // a descrição do que está sendo testado
  it("renders correctely when user not authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

    render(
      // o render renderiza um componente de forma virtual, para ser visualizada a saída ou o que ele retorna
      <SigninButton />
    );

    expect(screen.getByText("Signig in with Github")).toBeInTheDocument();
  });

  // a descrição do que está sendo testado
  it("renders correctely when user is authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
      },
    } as any);

    render(
      // o render renderiza um componente de forma virtual, para ser visualizada a saída ou o que ele retorna
      <SigninButton />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
