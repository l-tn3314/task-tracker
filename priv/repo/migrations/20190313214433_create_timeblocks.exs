defmodule TaskTracker.Repo.Migrations.CreateTimeblocks do
  use Ecto.Migration

  def change do
    create table(:timeblocks) do
      add :starttime, :utc_datetime, null: false
      add :endtime, :utc_datetime, null: false
      add :task_id, references(:tasks, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:timeblocks, [:task_id])
    create constraint(:timeblocks, :endtime_after_starttime, check: "endtime > starttime")
  end
end
