defmodule TaskTracker.Users do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false
  alias TaskTracker.Repo

  alias TaskTracker.Users
  alias TaskTracker.Users.User
  alias TaskTracker.Users.Manager

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  def get_user(id) do
    Repo.one from u in User,
      where: u.id == ^id,
      preload: [:tasks, tasks: :timeblocks]
  end

  def get_user_by_email(email) do
    Repo.get_by(User, email: email)
  end

  def get_manager_of(id) do
    manager_relation = Repo.get_by(Manager, user_id: id)
    if manager_relation do
      Users.get_user!(manager_relation.manager_id)
    else
      nil
    end
  end

  def get_direct_reports(id) do
    reports_ids_query = from m in Manager,
        where: m.manager_id == ^id
    reports_ids = Repo.all(reports_ids_query)
    |> Enum.map(fn report -> report.user_id end)

    reports_query = from u in User,
        where: u.id in ^reports_ids
    Repo.all(reports_query)
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end

  alias TaskTracker.Users.Manager

  @doc """
  Returns the list of managers.

  ## Examples

      iex> list_managers()
      [%Manager{}, ...]

  """
  def list_managers do
    Repo.all(Manager)
  end

  @doc """
  Gets a single manager.

  Raises `Ecto.NoResultsError` if the Manager does not exist.

  ## Examples

      iex> get_manager!(123)
      %Manager{}

      iex> get_manager!(456)
      ** (Ecto.NoResultsError)

  """
  def get_manager!(id), do: Repo.get!(Manager, id)

  @doc """
  Creates a manager.

  ## Examples

      iex> create_manager(%{field: value})
      {:ok, %Manager{}}

      iex> create_manager(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_manager(attrs \\ %{}) do
    %Manager{}
    |> Manager.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a manager.

  ## Examples

      iex> update_manager(manager, %{field: new_value})
      {:ok, %Manager{}}

      iex> update_manager(manager, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_manager(%Manager{} = manager, attrs) do
    manager
    |> Manager.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Manager.

  ## Examples

      iex> delete_manager(manager)
      {:ok, %Manager{}}

      iex> delete_manager(manager)
      {:error, %Ecto.Changeset{}}

  """
  def delete_manager(%Manager{} = manager) do
    Repo.delete(manager)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking manager changes.

  ## Examples

      iex> change_manager(manager)
      %Ecto.Changeset{source: %Manager{}}

  """
  def change_manager(%Manager{} = manager) do
    Manager.changeset(manager, %{})
  end
end
