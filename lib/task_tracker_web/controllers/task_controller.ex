defmodule TaskTrackerWeb.TaskController do
  use TaskTrackerWeb, :controller

  alias TaskTracker.Tasks
  alias TaskTracker.Tasks.Task
  alias TaskTracker.Users
  alias TaskTracker.BackupAgent  

  # task report index page for given user
  def index(conn, %{"user_id" => user_id}) do
    direct_reports = Users.get_direct_reports(user_id)
    reports_tasks = Enum.flat_map(direct_reports, fn report -> 
        user = Users.get_user(report.id) 
        user.tasks
      end)
    task_ids = Enum.map(reports_tasks, fn task -> task.id end)
    tasks = Tasks.get_tasks(task_ids) # loads the user assoc
    render(conn, "index.html", tasks: tasks, header: "Task Report", show_assignment: true)
  end

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.html", tasks: tasks, header: "All Tasks", show_assignment: true)
  end

  def new(conn, _params) do
    user_id = get_session(conn, :user_id)
    emails = Users.get_direct_reports(user_id)
      |> Enum.map(fn report -> report.email end) 
    changeset = Tasks.change_task(%Task{})
    render(conn, "new.html", changeset: changeset, task: nil, emails: ["" | emails])
  end

  def create(conn, %{"task" => task_params}) do
    email = Map.get(task_params, "assign_user_email")
    task_params = Map.delete(task_params, "assign_user_email")
    
    user = TaskTracker.Users.get_user_by_email(email)
    
    case Tasks.create_task(Map.put(task_params, "user_id", user && user.id)) do
      {:ok, task} ->
        conn
        |> put_flash(:info, "Task created successfully.")
        |> redirect(to: Routes.task_path(conn, :show, task))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset, task: nil)
    end
  end

  def start_working(conn, %{"id" => id}) do
    task = Tasks.get_task(id)
    BackupAgent.put(id, DateTime.utc_now())
    redirect(conn, to: Routes.task_path(conn, :show, task))
  end

  def stop_working(conn, %{"id" => id}) do
    BackupAgent.put(id, nil)
    conn
    |> send_resp(200, "OK")
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task(id)
    task_cset = Tasks.change_task(task) 
    working_starttime = BackupAgent.get(id)
    render(conn, "show.html", task: task, working_starttime: working_starttime, changeset: task_cset)
  end

  def edit(conn, %{"id" => id}) do
    task = Tasks.get_task(id)
    changeset = Tasks.change_task(task)
    user_id = get_session(conn, :user_id)
    emails = Users.get_direct_reports(user_id)
      |> Enum.map(fn report -> report.email end) 
    cond do
      emails == [] -> render(conn, "edit.html", task: task, emails: Enum.uniq(["" | [task.user && task.user.email]]), changeset: changeset)
      task.user ->
        emails = Enum.uniq([task.user.email | emails])
        render(conn, "edit.html", task: task, emails: ["" | emails], changeset: changeset)
      true -> render(conn, "edit.html", task: task, emails: ["" | emails], changeset: changeset)
    end
  end

  defp update(conn, task, task_params) do
    case Tasks.update_task(task, task_params) do
      {:ok, task} ->
        conn
        |> put_flash(:info, "Task updated successfully.")
        |> redirect(to: Routes.task_path(conn, :show, task))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", task: task, changeset: changeset)
    end
  end
  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Tasks.get_task(id)
    changeset = Tasks.change_task(task)
    email = Map.get(task_params, "assign_user_email")
    task_params = Map.delete(task_params, "assign_user_email")
    
    user = TaskTracker.Users.get_user_by_email(email)
    update(conn, task, Map.put(task_params, "user_id", user && user.id)) 
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    {:ok, _task} = Tasks.delete_task(task)

    conn
    |> put_flash(:info, "Task deleted successfully.")
    |> redirect(to: Routes.task_path(conn, :index))
  end
end
