# TaskTracker
There are two main entities in Task Tracker: Users and Tasks.

**Users**: email
- in this simple model, users only need an email to register an account
- each email is unique; that is, there can be at most one account per email 
(otherwise there is no way to differentiate between accounts when logging in with only an email)
- a user can also have zero to many tasks assigned to them

*Managers*
- managers are users
- managers are represented through a relations table, Managers, which has fields manager_id and user_id
- a user has at most one manager
- a user can manage many users
- a user cannot manage themselves
- managers can assign tasks to their underlings; an underling can only be assigned a task from their manager
- it is possible for A to manage B and B to manage A; this is so that both B and A can be assigned tasks (since only their managers can assign them tasks) if they are co-highest in the managerial hierarchy
- there is no UI for adding/modifying managers; this should be done by an admin+dba (data is seeded in `seeds.exs`, eg: `abc@test.com` is a manager)
- all users have access to a Task Report, which shows the tasks assigned to their underlings; if a user has no underlings, then the Task Report is empty

**Tasks**: title, description, [time_spent], completed, user_id, timeblocks
- a task can be created with a title and description
- ~~time_spent is in intervals of 15 minutes, and defaulted to 0~~
- completed is defaulted to false
- user_id is a relation to Users
- a task can also have a user assigned to it (or be unassigned)
- a task can have zero to many timeblocks

**Timeblocks**: task_id, starttime, endtime
- a timeblock belongs to a task
- starttime and endtime are UTC format
- endtime must be after starttime

**Non-logged-in users**
- they are limited in what they can view
- they can choose to either log in, register, or only view tasks (no editing/deleting)

**Editing tasks & their timeblocks**: there are constraints enforced when editing tasks
- time spent could have been displayed in hours & minutes, but for this simple app it is
shown using only one unit (minutes); it is calculated by summing the difference of endtime and starttime for all timeblocks belonging to a task
- editing the assigned user email is a dropdown of underlings' emails (or unassign), since a task can only be assigned to a user by their manager

**Profile page**
- a user can access their profile by clicking on "My account"
- email, manager + link to their profile (if applicable), direct reports + links to their profiles (if applicable)

**General**
- after registering, the user is automatically logged in (assumption that user wants to use the
system since they are signing up for it)
- a logged in user is always shown the tasks assigned to them
- ^the above is different from another view the user could see -- a view of all tasks (and a task report)
- for a task (show) page, there is also an option to start/stop working on the task - this creates a timeblock for the task
- ^the above action is not limited to only the user assigned to a task; it's possible that an unassigned/assigned task be worked on by multiple people



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
