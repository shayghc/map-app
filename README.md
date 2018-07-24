[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Neighbourhood Maps
---
## Description

This repo contains the code for the Neighbourhood Maps, Google API project for the React portion of the Udacity FEND course. The app displays several navy related places of interest in Portsmouth, UK. The city has a long history associated with the Royal Navy.

## Quickstart

Follow these steps to open the app in your default browser.

1. Clone the repo
2. cd into the build directory and run `npm install`
3. Run `npm run build`
4. Run `npm install -g serve`
5. Run `serve -s build`
6. Open a new browser tab and enter 'localhost:5000' in the address bar then press enter.

## API Connection errors

If the fetch API call to the Google Maps API does not return a response of 200 then a modal will pop up to advise checking the internet connection. This can be tested by deleting characters from the API call in index.html (just remember to put them back afterwards!).

The information for the infowindows is retrieved by an API call to the FourSquare API. A modal will pop up to inform of any issue regarding connection to the FourSquare API, again advising to check the internet connectivity.

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

Built on top of the [starter template](https://github.com/udacity/reactnd-project-myreads-starter).

## Usage

The sidebar (nav) will start closed on smaller screens to provide more real-estate for the map view. The text input can be used to filter the POIs available for view. The sidebar items will be prefixed by an alphabetical character that corresponds with its associated marker on the map.

Clicking on a sidebar item will activate the marker and open an info window which will display address information from FourSquare, a third-party API. A subsequent click will close the window. On smaller screens, opening an info window will close the sidebar.

For users not using a mouse, the items can be activated by tabbing to the item and pressing enter. As with the mouse click, a second 'enter' will close the info window.

When the sidebar is hidden it can be revealed by clicking/pressing 'enter' on the 'hamburger' menu icon.

## Contributing

Always happy to collaborate. If you have any questions or even comments to offer regarding coding approaches for more effective/concise code please reach out via [email](mailto:sghconnolly@gmail.com).

## Credits

Thank you to the team that created [SweetAlert2](https://sweetalert2.github.io/#examples) to enable getting away from the default browser alert modals.

API References:
  *[Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial)
  *[FourSquare API](https://developer.foursquare.com/)

## License
This code is distributed under the [MIT license](https://opensource.org/licenses/MIT).
