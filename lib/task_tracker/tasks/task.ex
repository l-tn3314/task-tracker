defmodule TaskTracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completed, :boolean, default: false
    field :description, :string
    field :time_spent, :integer, default: 0
    field :title, :string
    #field :user_id, :id
    belongs_to :user, TaskTracker.Users.User

    timestamps()
  end

  defp validate_increments(changeset, field, increments) do
    val = get_field(changeset, field)
    if rem(val, increments) != 0 do
      add_error(changeset, field, "must be in increments of " <> Integer.to_string(increments))
    else
      changeset
    end
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :completed, :time_spent, :user_id])
    |> validate_required([:title, :description, :completed, :time_spent])
    |> validate_increments(:time_spent, 15)
  end
end
