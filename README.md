# Title
Mod 1 + Whats For Dinner?


## Table of Contents
  - [Abstract](#abstract)
  - [Technologies](#technologies)
  - [Install + Setup](#set-up)
  - [Contributors](#contributors)
	- [Wins](#wins)
	- [Challenges + Improvements](#challenges-+-Improvements)
  - [Project Specs](#project-specs)

## Abstract
- This web app was made to help users choose a dish or meal to make. The goal was to complete all itterations and every choose your own adventure!

## Technologies
  - Vanilla Javascript
  - node
  - VSCode


## Install + Setup
- This app can be accessed by cloning down this repo and opening the index.html file. Usernames and Passwords are stored inside of local storage.



## Functionality
- Login w/ User Creation & Saving (Saved with local storage) 
	- On page load the app will initialize the location where all user data will be saved (dinnerUsers) inside local storage if it has not already been 	created
	- You can either sign in w/ exsisting account info, create a new user, OR sign in as guest
	- When attempting to sign in it will check there is an existing username and password in the local storage. If there isn't the user will be alerted. 
	- Currently there is no functionality to check for duplicate usernames upon user creation. (might be added later!)

- Randomized Food
	- Users can choose from 4 different options when choosing a randomized meal
		- Side
		- Main Dish
		- Dessert
		- Entire Meal (gets one random from each section)

- Add A Recipe 
	- Users can add a recipe and will be promted with which type of recipe they would like to add. Along with this they will be promted with a text field where they can input their own custom recipe. 
	- Once the user submits their recipe it will be displayed where the cook pot image was! 


## Contributors
  - [Markus-Xavier Rossio](https://github.com/Markus-Xavier)

## Wins
- I got through a lot of what I wanted to.
- I got to research local stroage for the username and password saving
  - My code base in most parts is modular.

## Challenges + Improvements
- My commits were good in the beginning but started to become more infrequent, this is something that I plan to change in the next project.
- Due to time management issues there were a couple of bugs left in. 
- I would like to finish the login functionality and add a recipe save feature. I would also like to work with an actcual backend vs just using local storage.


## Project Specs
  - The project spec & rubric can be found [here](https://frontend.turing.edu/projects/module-1/dinner.html)
