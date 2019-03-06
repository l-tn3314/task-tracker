defmodule TaskTrackerWeb.ManagerController do
  use TaskTrackerWeb, :controller

  alias TaskTracker.Users
  alias TaskTracker.Users.Manager

  def index(conn, _params) do
    managers = Users.list_managers()
    render(conn, "index.html", managers: managers)
  end

  def new(conn, _params) do
    changeset = Users.change_manager(%Manager{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"manager" => manager_params}) do
    case Users.create_manager(manager_params) do
      {:ok, manager} ->
        conn
        |> put_flash(:info, "Manager created successfully.")
        |> redirect(to: Routes.manager_path(conn, :show, manager))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    manager = Users.get_manager!(id)
    render(conn, "show.html", manager: manager)
  end

  def edit(conn, %{"id" => id}) do
    manager = Users.get_manager!(id)
    changeset = Users.change_manager(manager)
    render(conn, "edit.html", manager: manager, changeset: changeset)
  end

  def update(conn, %{"id" => id, "manager" => manager_params}) do
    manager = Users.get_manager!(id)

    case Users.update_manager(manager, manager_params) do
      {:ok, manager} ->
        conn
        |> put_flash(:info, "Manager updated successfully.")
        |> redirect(to: Routes.manager_path(conn, :show, manager))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", manager: manager, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    manager = Users.get_manager!(id)
    {:ok, _manager} = Users.delete_manager(manager)

    conn
    |> put_flash(:info, "Manager deleted successfully.")
    |> redirect(to: Routes.manager_path(conn, :index))
  end
end
