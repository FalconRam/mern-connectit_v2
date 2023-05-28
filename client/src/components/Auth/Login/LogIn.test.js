import React, { useState } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logIn } from "../../../actions/auth";
import { findLoginFormErrors } from "../../../errorHandling/authFormEH";
import LogIn from "./LogIn";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));
jest.mock("../../../actions/auth", () => ({
  logIn: jest.fn(),
}));
jest.mock("../../../errorHandling/authFormEH", () => ({
  findLoginFormErrors: jest.fn(),
}));

describe("LogIn component", () => {
  beforeEach(() => {
    useDispatch.mockClear();
    logIn.mockClear();
    findLoginFormErrors.mockClear();
  });

  test("renders login form", () => {
    render(<LogIn />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "LogIn" })).toBeInTheDocument();
  });

  test("submits login form with valid credentials", async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    findLoginFormErrors.mockReturnValue({});
    const mockHistory = { push: jest.fn() };
    useHistory.mockReturnValue(mockHistory);
    logIn.mockResolvedValue();

    const MockLoginComponent = () => {
      const [isLoginLoading, setIsLoginLoading] = useState(false);
      const [isAuth, setIsAuth] = useState(true);
      return (
        <LogIn
          setIsLoginLoading={setIsLoginLoading}
          isLoginLoading={isLoginLoading}
          setIsAuth={setIsAuth}
          isAuth={isAuth}
        />
      );
    };

    render(<MockLoginComponent />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "testpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: "LogIn" }));

    expect(mockDispatch).toHaveBeenCalledWith(
      logIn({ email: "test@gmail.com", password: "testpass" }, mockHistory)
    );

    expect(screen.getByTestId("loader-mini")).toBeInTheDocument();

    await waitFor(() => {
      mockHistory.push('/');
    });
  
    expect(mockHistory.push).toHaveBeenCalledTimes(1);

  });

  test("Displays form errors for Fields are empty", async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    findLoginFormErrors.mockReturnValue({
      email: "Please enter your Email.",
      password: "Please enter your Password.",
    });

    render(<LogIn />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: "LogIn" }));

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(screen.getByText("Please enter your Email."));
    expect(screen.getByText("Please enter your Password."));
  });

});
