use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :task_tracker, TaskTrackerWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :task_tracker, TaskTracker.Repo,
  username: "task_tracker2",
  password: "ji8aa7Daexuy",
  database: "task_tracker2_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
