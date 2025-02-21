import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Login from "../../components/Login/Login";
jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
  ToastContainer: () => <div data-testid="toast-container" />,
}));

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, "localStorage", {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  test("renders the Login form with email and password fields", () => {
    render(
      <>
        <ToastContainer />
        <Login />
      </>
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("shows an error message for invalid email format", async () => {
    const { toast } = require("react-toastify");
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "invalidemail" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
  
    expect(toast.error).toHaveBeenCalledWith("Invalid email address");
  });

  test("shows an error message for short password", async () => {
    const { toast } = require("react-toastify");
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(toast.error).toHaveBeenCalledWith("Password must be at least 6 characters long");
  });

  test("calls API and shows success toast on valid login", async () => {
    const { toast } = require("react-toastify");
    jest.spyOn(toast, "success").mockImplementation(() => {});
    
    axios.post.mockResolvedValueOnce({
      data: { token: "testToken123" },
    });
  
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
  
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("https://hive-server-tpz5.onrender.com/api/login", {
        email: "user@example.com",
        password: "password123",
      });
    });
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith("authToken", "testToken123");
    });
    expect(toast.success).toHaveBeenCalledWith("Login successful!");
  });  

  test("shows error toast for API failure", async () => {
    const { toast } = require("react-toastify");
    jest.spyOn(toast, "error").mockImplementation(() => {});
  
    axios.post.mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });
  
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
  
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("https://hive-server-tpz5.onrender.com/api/login", {
        email: "user@example.com",
        password: "password123",
      });
    });
    expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
  });
  
});