# GraphQL Countries Part 5 - UI

## Pre-Requisites

1) Install Node & npm
    + Windows - https://nodejs.org/en/
    + MacOS - `brew install node`

2) Install Oracle JET CLI

    `npm install -g @oracle/ojet-cli`

## Setup

After cloning the repository and naviagting to the UI folder, you will need to install the node module dependencies in order to run the application.

Install Dependenceis: `ojet restore`

Start the UI: `ojet serve`

The `ojet serve` command starts the UI whilst also watching the files for changes, this allows you to make file changes without having to restart the UI.
> *Note: `ojet serve` only watches existing files, if you add a new file you will need to stop the command and re-run it.*

Select multiple countries by holding the Ctrl/Cmd key and selecting another country.

## Adding a Data Visualisation

1) TODO