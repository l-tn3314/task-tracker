defmodule TaskTrackerWeb.TaskView do
  use TaskTrackerWeb, :view

  def total_time_spent(task) do
    total_time_sec = Enum.reduce(task.timeblocks, 0, fn timeblock, acc -> acc + DateTime.diff(timeblock.endtime, timeblock.starttime) end)
    total_time_sec
  end
end
