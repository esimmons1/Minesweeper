Minesweeper
===========

By Ellis Simmons - Spring 2025? 
Made with Java (Swing)  

What is this?
-------------
This is a custom version of the classic Minesweeper game I built in Java.  
The idea was just to recreate the OG game but with my own twist, and learn more about GUI stuff and logic handling along the way.

What it does:
-------------
- Generates a grid of tiles with random mines.  
- You click to reveal a tile.  
- Numbers show how many mines are around.  
- You can flag tiles if you think there's a mine underneath.  
- Game ends if you hit a mine (boom).  
- You win if you reveal all the safe tiles.

How it works:
-------------
- Uses Java and Swing to build the UI.  
- Mouse input is used to reveal or flag tiles.  
- Recursive flood-fill algorithm clears empty areas.  
- Mine and neighbor counts are calculated at start.

Game versions & mine counts:
----------------------------
Minesweeper Game available at:  
https://esimmons1.github.io/Minesweeper  

- Easy: 10 mines  
- Medium: 40 mines  
- Hard: 99 mines

Why I made it:
--------------
Honestly just wanted to see if I could pull off a working Minesweeper clone from scratch.  
Was a fun logic puzzle to get right and helped me get better with event-driven stuff in Java.

Stuff you can tweak:
--------------------
- Grid size and number of mines are easy to change in code.  
- Colors, tile sizes, and font styling can be tweaked to match your aesthetic.  
- Wouldn’t be hard to add features like a timer, mine counter, or difficulty levels.

---
As per usual, if you're going to steal or use it at least credit me please. Thank you for reading and have a nice day.
