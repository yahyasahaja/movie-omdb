# OMDB Movie

---

I'm using **React JS** (using typescript) as a framework to develop this app. Implementing SPA client side rendering bootstrapped by CRA

## Project Structure

- ``src/components`` contains all shared components
- ``src/store`` contains all stores, could be represented as ViewModel
- ``src/screens`` contains all the screens inside this app, structured by route logic

## Libraries
- For the UI, I'm using `material-ui`. But just one component: ProgressBar.
- Styling using `styled-components`.
- State management using `Redux`.

## Architecture

I'm using (Model-View-ViewModel) as an app architecture. 
- The `Model` can be found at the endpoint (will be described below)
- The `View` can be found at `screens`
- The `ViewModel` can be represented as the redux reducers itself. So all the requests can only be triggered from ViewModel. There's no way to direct interaction between Model and View

## BEST PRACTICES
- Code Splitting
- Caching. This caching method is for movie details: using `cache-and-network` caching policy. So the data keep updated while still cached.
- Unit test using jest and enzyme helpers.

## TO RUN LOCALLY
- Clone repo
- Run `yarn install`
- Run `yarn start`
