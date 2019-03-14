defmodule TaskTracker.Timeblocks.Timeblock do
  use Ecto.Schema
  import Ecto.Changeset


  schema "timeblocks" do
    field :endtime, :utc_datetime
    field :starttime, :utc_datetime
    belongs_to :task, TaskTracker.Tasks.Task

    timestamps()
  end

  defp validate_time(changeset, field_start, field_end) do
    starttime = get_field(changeset, field_start)
    endtime = get_field(changeset, field_end)

    if DateTime.diff(endtime, starttime) > 0 do
      changeset
    else
      add_error(changeset, :time_interval_error, "end time must be after start time")
    end
  end

  @doc false
  def changeset(timeblock, attrs) do
    timeblock
    |> cast(attrs, [:starttime, :endtime, :task_id])
    |> validate_required([:starttime, :endtime, :task_id])
    |> validate_time(:starttime, :endtime)
  end
end
