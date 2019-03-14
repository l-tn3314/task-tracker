defmodule TaskTracker.Repo.Migrations.CreateManagers do
  use Ecto.Migration

  def change do
    create table(:managers) do
      add :manager_id, references(:users, on_delete: :delete_all), null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:managers, [:manager_id])
    create unique_index(:managers, [:user_id])
    create constraint(:managers, :cannot_manage_self, check: "manager_id != user_id")
  end
end
