# UberDoku

This is a Sudoku game designed for an Uber job application.

## Technologies

In addition to HTML & CSS I used jQuery, Sass, and Jasmine for tests

## Implementation

I wanted to keep it simple, so I went ahead with the provided board. Initially I used the provided solution to check for win state but later went back and made a more robust solution checker.

The current implementation  marks up an invalid input with red text. Game state is saved to localstorage. It is reset if you complete the game and choose to restart the game.

To make the design adaptive, I used two breakpoints for mobile and tablet. Visually, these breakpoints appeared to display well on all the devices types and browsers that I checked.

## Trade-offs + Desired features

If I had more time I would have liked to implement a game board generator. I also would have liked to have more robust tests, mine are limited to functions that don't require objects from the DOM.

I decided to check for win state on every field entry because I liked the immediate feedback, but it would probably be more performant to have the user manually choose to check the solution since the board isn't even full for most of the checks.

