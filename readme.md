# Interactive Frontend Development Milestone Project

This website is designed to allow users to search for a travel destination and find points of interest in and around the desired location. Users will find more detailed information about each place returned such as the name, address, ratings and a link to the website.  


## UX

This project is aimed at a wide demographic of people looking to find things to do and places to see at any given location. As the demographic is large, I have attempted to keep a simple design, such that it is readable at a glance. 
I have also attempted to create the searc functionality so that, again, is it clear at a glance what users need to do without much explanation. I have attempted to keep the design of the interactive aspects of the website in line with current trends. 

### User Stories

**Map with location markers**

- As a user, I want to be able to see where the recommended places are in my chosen location (epic)
  - As a user, I want to be able to see quick, detailed information about each marked place
  - As a user, I want to be see how far each place is from each other

**Nav Bar**

- As a user, I want to be able to quickly get to each section of the page (epic)
  - As a user, I want to easily see how many sections there are on the page

**Search Bar**

- As a user, I want to be be able to search for any location easily

**Dropdown filter menu**

- As a user, I want to be able to filter the markers on the map (epic)
  - As a user, I only want to see the information I’m looking for

**Tourist attractions, Restaurants, Bars and Accommodations sections**

- As a user, I want to be able to see further information about the destinations returned from the search (epic)
  - As a user, I want to see an image of the suggested place
  - As a user, I want to see contact details for the suggested place
  - As a user, I want to be given enough information to further research the suggested place
  - As a user, I want to be able to navigate to the website of any given result, without having to leave the current page

### Planning 

Wireframes and other documentation is stored in the [Planning Folder](assets/planning)


## Features

### Existing features

- Map Section: Allows users to view markers relating to each returned place from their search. Users have full control over the map
- Welcome Secition: Users are brought straight to the welcome section. Includes search bar, prompting users to search for a city
- Search Bar (Welcome Section): Search bar on the Welcome Section allows users to search as soon as they land on the page, creating a user friendly experience
- Search Bar (Map Section): The search bar attached to the map allows users to make multiple searches without the need to navigate back to the Welcome Section
- Dropdown filter: Dropdown menu to allows users to filter between different types of places which have returned from their search. Keeps the map from getting too cluttered
- Information sections: These sections contain information about the places returned from the users search. Information includes name, address, website, phone number and ratings
- Nav bar: The nav bar is key to allowing users to navigate the single page easily and without the need to scroll through unwanted information. Links navigate to different sections of the page

### Features ideas yet to be added

- 'Click to search' feature: I wanted to implement a feature allowing users to click on the map to initiate a search in any given location
- Translation: Some search results return in characters from various languages. It would have made the user experience better had this been translated with Google Translate API
- Popular places: For ease of use, buttons containing popular places could have been added to the map section to allow users to quickly and easily search for popular cities


## Technologies Used

- [Bootstrap version 3.3.7](https://getbootstrap.com/docs/3.3/getting-started/)
  - The project uses bootstrap for a template for styling and the bootstrap grid system
- [Bootstrap JavaScript version 3.3.7](https://getbootstrap.com/docs/3.3/javascript/)
- [Bootstrap JQuery version 3.2.1.min](https://getbootstrap.com/docs/3.3/javascript/)
  - Both JavaScript and JQuery have been used for the responsive nav bar
- [Google Maps API](https://developers.google.com/maps/documentation/)
  - Google Maps API used to find place information and display the map with markers
- [Jasmine version 3.3.0](https://jasmine.github.io/)
- [jQuery](https://jquery.com/)
  - Used jQuery to implement the returned information and display where needed in the html, manipulating the DOM


## Testing

### Manual Testing

All manual testing completed on Safari and Google Chrome at both mobile and desktop size on macbook pro and iphone 7 Plus. Unable to see difference between browsers tested on.

1. Welcome section search bar:
 - Go to the Welcome Section
 - Attempted to submit an empty search field

2. Map section:
 - Go to the Map Section
 - Attempted to submit an empty search field
 - Tested use of filter button with each dropdown option
 - Attempted to scroll, pan and navigate the map

3. Info sections (Museums, bars, restaurants and hotels):
 - Go to each section using the nav bar
 - Manually scroll through each section
 - Checked that each section had placeholder text prior to search
 - Checked to ensure information loads correctly when making multiple searches
 - Checked to ensure if less than 5 places are returned, placeholder text is displayed where image should be
 - Checked to ensure that links to websites work correctly and open in a new tab

4. Responsiveness:
 - Checked to ensure page is responsive accross all devices and on all browsers
 - Used Google Chrome Developer Tools to test resolution on multiple devices
 - Used physical devices available to test different resolutions
 - Checked to ensure map and map toolbar were visible and useable at all page sizes

### Automatic Testing

I have used Jasmine to automated tests for one of the functions written. This function (noSubmit) was written to prevent the search bar attempting to submit the information when the 'enter' key was pressed. This was causing the page to reload and the Google Maps search would not completed
[Click here to view the Jasmine test](https://kash1503.github.io/interactive-frontend-development-milestone-project/jasmine-test.html)

### Encountered various bugs while testing

- Found that at smaller resolutions, the information text below the place photo would sometimes go right to the edge of the screen if the text returned was too long. This was difficult to read and caused issues with the user experience.
- Bug found whereby the place search would stop when certain information was not present within the returned array. For example if no user rating was returned, it would still attempt to write the user ratings to the page, causing an error.
- Issue found with the places details search exceeding the query per seconds causing only 10 results to show
- Encountered a bug causing all markers to display on the map when a search was run. Some would overlap, breaking the clean look of the map section
- Found that when the 'enter' button was pressed when keying a search, the page would refresh, causing the search to be incomplete


## Deployment

In order to deploy this project, regular commits were made to the Github repository and then using Github pages I was able to deploy the website. No apparent difference between development and deployed builds.

I have only used one Git branch to develop and deploy this project. [Click here to go to the website](https://kash1503.github.io/interactive-frontend-development-milestone-project/)

## Credit

### Media

- Image for the Welcome Section was taken from [Pixabay.com](https://pixabay.com/photos/manhattan-empire-state-building-336708/)

### Acknowledgments

Inspiration was taken from the following: 

- [Nomadic Matt](https://www.nomadicmatt.com/)
- [Lonely Planet.com](https://www.lonelyplanet.com/)
- [Rough Guides.com](https://www.roughguides.com/)