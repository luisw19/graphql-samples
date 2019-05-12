# GraphQL Countries Part 5 - UI

## Pre-Requisites

1) Install Node & npm
    + Windows - https://nodejs.org/en/
    + MacOS - `brew install node`

2) Install Oracle JET CLI

    `npm install -g @oracle/ojet-cli`

## Setup

After cloning the repository and navigating to the UI folder, you will need to install the node module dependencies in order to run the application.

Install Dependencies: `ojet restore`

Start the UI: `ojet serve`

The `ojet serve` command starts the UI whilst also watching the files for changes, this allows you to make file changes without having to restart the UI.
> *Note: `ojet serve` only watches existing files, if you add a new file you will need to stop the command and re-run it.*

Select multiple countries by holding the Ctrl/Cmd key and selecting another country.

## Adding a Data Visualisation

1) Using the Oracle JET VSCode Plugin type `ojc` to insert the `oj-chart` element via a JET snippet.

2) Set the following attributes on the `oj-chart` element:

    ```properties
    id="ojchartBar"
    data="[[dataProvider]]"
    type="bar"
    orientation="vertical"
    hover-behaviour="dim"
    ```

3) Set the following attributes on the `groupTemplate` element.

    ```properties
    label-style="[[$current.depth == 1 ? {'fontWeight':'bold'} : {'fontStyle':'italic'}]]"
    ```

4) Set the following attributes on the `seriesTemplate` element.

    ```properties
    color="[[getCountryColour($current.id)]]"
    ```

5) Set the following attributes on the `itemTemplate` element.

    ```properties
    value="[[$current.data.population]]"
    series-id="[[$current.data.code]]"
    group-id="[[ ['Country Population', $current.data.name] ]]"
    ```