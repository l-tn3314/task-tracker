#!/bin/bash

export MIX_ENV=prod
export PORT=4796

echo "Stopping old copy of app, if any..."

_build/prod/rel/task_tracker/bin/task_tracker stop || true

echo "Starting app..."

# Start to run in background from shell.
#_build/prod/rel/task_tracker/bin/task_tracker start

# Foreground for testing and for systemd
_build/prod/rel/task_tracker/bin/task_tracker foreground


