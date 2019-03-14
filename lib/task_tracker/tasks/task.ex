defmodule TaskTracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completed, :boolean, default: false
    field :description, :string
    field :time_spent, :integer, default: 0
    field :title, :string
    belongs_to :user, TaskTracker.Users.User
    has_many :timeblocks, TaskTracker.Timeblocks.Timeblock

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
#    |> validate_increments(:time_spent, 15)
    |> validate_number(:user_id, greater_than: 0, message: "User email does not exist")
  end
end
