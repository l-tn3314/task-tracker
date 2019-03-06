defmodule TaskTracker.Users.Manager do
  use Ecto.Schema
  import Ecto.Changeset


  schema "managers" do
    field :manager_id, :id
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(manager, attrs) do
    manager
    |> cast(attrs, [])
    |> validate_required([])
  end
end
