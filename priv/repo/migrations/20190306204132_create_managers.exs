defmodule TaskTracker.Repo.Migrations.CreateManagers do
  use Ecto.Migration

  def change do
    create table(:managers) do
      add :manager_id, references(:users, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:managers, [:manager_id])
    create index(:managers, [:user_id])
  end
end
