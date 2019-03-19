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
alias TaskTracker.Tasks.Task

pwhash = Argon2.hash_pwd_salt("pass123")

Repo.insert!(%User{email: "test@test.com", password_hash: pwhash})
Repo.insert!(%User{email: "abc@test.com", password_hash: pwhash})
Repo.insert!(%User{email: "qwe@test.com", password_hash: pwhash})

Repo.insert!(%Task{title: "some task", description: "some task description"})
Repo.insert!(%Task{title: "another task", description: "another task description"})
