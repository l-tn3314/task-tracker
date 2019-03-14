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
    |> cast(attrs, [:manager_id, :user_id])
    |> validate_required([:manager_id, :user_id])
    |> unique_constraint(:user_id)
  end
end
