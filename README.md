# TaskTracker
There are two main entities in Task Tracker: Users and Tasks.

*Users*: email
- in this simple model, users only need an email to register an account
- each email is unique; that is, there can be at most one account per email 
(otherwise there is no way to differentiate between accounts when logging in with only an email)
- a user can also have zero to many tasks assigned to them

*Tasks*: title, description, time_spent, completed, user_id
- a task can be created with a title and description
- time_spent is in intervals of 15 minutes, and defaulted to 0
- completed is defaulted to false
- user_id is a relation to Users
- a task can also have a user assigned to it (or be unassigned)

*Editing tasks*: there are constraints enforced when editing tasks
- time_spent could have been displayed in hours + 15 minute intervals, but for this simple app it is
shown using only one unit (minutes)
- editing the assigned user email is an input box rather than a dropdown. The idea behind this is that
users should not have (easy) access/knowledge of all other users in the system.

*General*
- after registering, the user is automatically logged in (assumption that user wants to use the
system since they are signing up for it)
- a logged in user is always shown the tasks assigned to them
- ^the above is different from another view the user could see -- a view of all tasks



## Phoenix

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
