# Cartesi Typescript React SQLite

The project is a React application built with Create React App and utilizes TypeScript for type safety. It is managed using npm as the package manager. The goal of the project is to create a template that streamlines the process of kickstarting new projects. The template incorporates the latest version of React and integrates with Ethers, allowing for seamless interaction with the underlying blockchain. For testing purposes, a pre-deployed demo on the Sepolia Network is available for users to explore before starting their own development.

<!-- [https://blabla](Live Demo) -->

## How this project is structure

![Cartesi project structure](https://github.com/doiim/cartesi-react-bootstrap/assets/13040410/2ab19829-997b-4964-82ca-b038f3fe2dd2)

### Front End [(github)](asdasdasdas)

A `Create React App` template that runs a `Typescript` supported app with `CSS Modules`. This app uses `Apollo Client` to update `Notices` from backend services and normal requests to call `Inspect` endpoint for fetch current state of the database. To call `Advance` inputs, the app uses `Ethers V5` to communicate with Backend EVM.

### Back End [(github)](asdasdasdas)

A `Sunodo` template machine that runs a `Typescript` node service along with `viem` to convert values from/to Hex strings. We could have switched to `Ethers` but the idea was to reduce the amount to code, and the `Sunodo` template used already have support to `viem`. The database runs `SQLite` with WASM support due to the nature of the Risc-V Node has no native support to `SQLite` bindings.

## Installation

In case you do not reach here via create-react-app, you will be required to install the dependencies

```sh
npm install
```

Before run this app it would be required to run the backend service for it. To run a local backend service for this app it is required [Sunodo](https://docs.sunodo.io/guide/introduction/what-is-sunodo).

1. [Install Sunodo](https://docs.sunodo.io/guide/introduction/installing)
2. Clone the backend repo and install it

```sh
git clone https://github.com/path-to-repo.git
cd path
sunodo build
```

## Running Locally

To run a local back end service, in a separate terminal window, just access the backend folder and run:

```sh
sunodo run
```

Runs the front end app in the development mode.

```sh
npm start
```

This will run an [anvil](https://book.getfoundry.sh/reference/anvil/) node as a local blockchain, and the GraphQL service and Inspect Service.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

This project is meant to run on [Cartesi Machine](https://docs.cartesi.io/), the tool used to run and deploy the backend to public networks was [Sunodo](https://docs.sunodo.io/guide/introduction/what-is-sunodo).

This project is based on the following repositories from Cartesi team:

- [Sunodo Typescript template project](https://github.com/sunodo/sunodo-templates/tree/main/typescript)
- [Backend SQLite Image](https://github.com/cartesi/rollups-examples/tree/main/sqlite)
- [Front-end Echo Example](https://github.com/cartesi/rollups-examples/tree/main/frontend-echo)
