defmodule TaskTrackerWeb.Router do
  use TaskTrackerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TaskTrackerWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/register", PageController, :index
    get "/tasks", PageController, :index
    # get "/tasks/:id", PageController, :index # not accessible without being logged in
    # get "/taskCreate", PageController, :index # not accessible without being logged in
  end

  # Other scopes may use custom stacks.
  scope "/api", TaskTrackerWeb do
    pipe_through :api

    resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]
    post "/auth", AuthController, :authenticate
  end
end
