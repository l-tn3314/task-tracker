# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTracker.Repo.insert!(%TaskTracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias TaskTracker.Repo
alias TaskTracker.Users.User
alias TaskTracker.Users.Manager
alias TaskTracker.Tasks.Task
alias TaskTracker.Timeblocks.Timeblock

# insert users
Repo.insert!(%User{email: "test@test.com"})
Repo.insert!(%User{email: "abc@test.com"})
Repo.insert!(%User{email: "qwe@test.com"})
Repo.insert!(%User{email: "pop@test.com"})

# insert tasks
Repo.insert!(%Task{title: "some task", description: "some description"})
Repo.insert!(%Task{title: "a task", description: "a description"})

# insert timeblocks
{:ok, datetime1, 0} = DateTime.from_iso8601("2019-01-12 12:34:56Z")
{:ok, datetime2, 0} = DateTime.from_iso8601("2019-01-12 14:34:56Z")
{:ok, datetime3, 0} = DateTime.from_iso8601("2019-01-14 11:23:14Z")
{:ok, datetime4, 0} = DateTime.from_iso8601("2019-01-15 13:44:16Z")
{:ok, datetime5, 0} = DateTime.from_iso8601("2019-01-16 10:30:00Z")
{:ok, datetime6, 0} = DateTime.from_iso8601("2019-01-16 18:00:01Z")
Repo.insert!(%Timeblock{task_id: 1, starttime: datetime1, endtime: datetime2})
Repo.insert!(%Timeblock{task_id: 2, starttime: datetime3, endtime: datetime4})
Repo.insert!(%Timeblock{task_id: 2, starttime: datetime5, endtime: datetime6})

# insert manager relations
Repo.insert!(%Manager{manager_id: 1, user_id: 2})
Repo.insert!(%Manager{manager_id: 2, user_id: 3})
Repo.insert!(%Manager{manager_id: 2, user_id: 4})
