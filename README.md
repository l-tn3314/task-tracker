# TaskTracker
There are two main entities in Task Tracker: Users and Tasks.

**Users**: email, password
- in this model, users need an email and password to register an account
- each email is unique; that is, there can be at most one account per email 
(otherwise there is no way to differentiate between accounts when logging in with an email)
- a user can also have zero to many tasks assigned to them
- the password is hashed before being stored in the db

**Tasks**: title, description, time_spent, completed, user_id
- a task can be created with a title and description
- time_spent is in intervals of 15 minutes, and defaulted to 0
- completed is defaulted to false
- user_id is a relation to Users
- a task can also have a user assigned to it (or be unassigned)

**Non-logged-in users**
- they are limited in what they can view
- they can choose to either log in, register, or only view tasks (no editing/deleting)

**Editing tasks**: there are constraints enforced when editing tasks
- time spent could have been displayed in hours & minutes, but for this simple app it is
shown using only one unit (minutes)
- editing the assigned user email is a dropdown of emails (or unassign) of all other registered users
- 15-minute interval validation is done on the client side (buttons are grayed out when fields are not valid), so that we don't need to wait for a roundtrip with the server since we already know the constraints

**General**
- after registering, the user is automatically logged in (assumption that user wants to use the
system since they are signing up for it)
- a logged in user is has the option to edit/delete tasks
- when a task is being created/edited, the cache containing the users for the dropdown is updated to the latest so that an up-to-date list of users can be used
- when a task is successfully created/edited/deleted, the cache containing all tasks is updated so that an up-to-date list of tasks can be shown
- navigating away from the page (including refreshing) logs the user out -- navigating away is interpreted to be that the user is done with the task tracker and is thus logged out

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
