#!/bin/bash

VENV_NAME=berlin-1110

if [ ! -d "$VENV_NAME" ]; then
    echo "+ Creating virtual environment $VENV_NAME..."
    python3 -m venv $VENV_NAME
fi

echo "+ Activating virtual environment $VENV_NAME..."
source $VENV_NAME/bin/activate

pip install --upgrade pip

if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
else
    echo "- No requirements.txt file found. Skipping package installation."
fi

# Start your Python application or run any other desired commands
# For example:
# python my_app.py

#deactivate
