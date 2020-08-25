#!/bin/bash

set -ue

cd open-social

echo "Running sam ${INPUT_SAM_COMMAND}"
sam ${INPUT_SAM_COMMAND}

if [ "${?}" -ne 0 ]; then
    echo "Failed to run sam ${INPUT_SAM_COMMAND} command."
fi
