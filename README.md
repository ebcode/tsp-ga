Overview
========

TSP
---

The [Traveling Salesman Problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem) (TSP) is a
classic problem in computer science. Briefly described (though click the wikipedia link for an in-depth review), 
it poses the problem of how a traveler, needing to start from, and return to, the same city,
 can plan a trip through multiple cities in the most efficient way possible.

I like this problem because it's one that most adults are familiar with, even if they haven't given it a name.
If you've ever planned a car trip through your city to hit a few different spots and return home, then
you've already solved this problem in your head. 

The problem can be solved with a [brute-force](https://en.wikipedia.org/wiki/Brute-force_search) method,
but as the numbers of cities increases, the computational cost rises exponentially.

For computer scientists, this kind of problem invites the use of [heuristic](https://en.wikipedia.org/wiki/Heuristic_\(computer_science\))
methods, where a good enough solution is acceptable, as opposed to the absolute best possible solution.

The tradeoff is one of time. If it's more important to have a good enough answer sooner, 
rather than a perfect answer later, then it's better to use a heuristic instead of brute-force. 

So, what's a heuristic method we can use to solve the TSP?

Enter ...

Genetic Algorithms
------------------

John Holland invented the [Genetic Algorithm](https://en.wikipedia.org/wiki/Genetic_algorithm) in the 1970s.
His book, *[Adaptation in Natural and Artificial Systems](https://mitpress.mit.edu/9780262581110/adaptation-in-natural-and-artificial-systems/)*,
published in 1975, lays the groundwork.

If you can describe the solution to a problem as a string of letters (for example: "AABB"), then you can combine
and rearrange those letters in a way that is analogous to sexual reproduction in plants and animals.

For simplicity's sake, let's say a person's DNA is an 8-letter string of As and Bs, and we have two people, Anne, and Bert.

Anne's DNA is all As, and looks like this: AAAAAAAA

Bert's DNA is all Bs, and looks like this: BBBBBBBB

Now Anne and Bert have a baby, Cathy. Cathy gets half of Anne's DNA, and half of Bert's DNA.

Cathy's DNA looks like this: AAAABBBB

She's got her mother's eyes, and her father's nose! :^)

### Fitness Function

Okay, so we have a string of letters, and we have an operation to take two strings and make a new string out of them.
How can a string of letters be a solution to a problem? And how do we know when we have a good enough solution?

Let's imagine a problem where a possible solution is the result of two distinct actions.
I don't know, let's say, moving forward, and stopping. I grew up in the arcades of the 80s, so... 
[Frogger](https://en.wikipedia.org/wiki/Frogger)?

To simplify the game, and to make it work with our strings of DNA, we'll take away the frog's ability 
to move left or right, and there will only be one home square
at the top of the screen, directly above the frog's starting point. We'll also get rid of the river
and logs at the top of the screen, so the frog just has to make it across the road. We'll keep the cars,
the frog still has to avoid those. Finally, we'll make it turn-based. That means the cars only
move after the frog makes a move. For the frog, "stop" is a valid move, or instruction. This way when
the frog "stops", all the cars will take a turn moving.

So, with all those adjustments, now all the frog has to do to get home safely is two things:
It has to "go" at the right time, and "stop" at the right time.

Now we have two distinct actions to match our two distinct letters in the DNA. 
"A" for "go", and "B" for "stop".
If we feed Anne's DNA to the frog as a set of instructions 
(maybe not as tasty as flies), we'll turn:

AAAAAAAA

into:

1.go 2.go 3.go 4.go 5.go 6.go 7.go 8.go 

Likewise, Bert's DNA becomes:

1.stop 2.stop 3.stop 4.stop 5.stop 6.stop 7.stop 8.stop

So obviously Bert's not going anywhere!

And Cathy's DNA becomes:

1.go 2.go 3.go 4.go 5.stop 6.stop 7.stop 8.stop 

Cathy will move four steps and then stop for four beats. To give Cathy a chance to reach the home square, 
we'll repeat her instructions after the last one. So we have a "goto" as step 9, 
which jumps back to step 1 and performs that move.

1.go 2.go 3.go 4.go 5.stop 6.stop 7.stop 8.stop [9.goto 1]

We'll add this last step 9 as an "invisible" step to all the strings, so that Anne will always go forward, and
Bert will always stay put. We'll keep Frogger's countdown timer, though, so that Bert's game won't run forever.

Now we're getting somewhere! At least, hypothetically.

Let's look at an ASCII-art interpretation of the pared-down Frogger playing field:

    ####H#60# 8
    #  <    # 7
    #>      # 6
    #    <  # 5
    # >     # 4
    #      <# 3    
    #>      # 2
    #     < # 1
    #   F   # 0
    #########  
   
1.  All the "#" symbols together represent the border of the playing field.

2.  The "H" symbol is "home", the spot the frog is trying to reach.

3.  The "60" is the countdown timer, and it will count down by one every time the frog follows an instruction in the DNA.

4.  The numbers 8-0 on the right are points. The closer the frog gets to home, the more points are awarded.

5.  The "<" character represents a car moving left. On the next time step, it moves one space left.
    
6.  The ">" character represents a car moving right. On the next time step, it moves one space right.

7.  Finally, the "F" character is the frog.

An important note about the cars: If a car moves into a border space, it is instantly teleported 
to the opposite border and moves one space into the playing field.

With this hypothetical Frogger situation firmly established, 
we can now answer the two questions posed earlier.

Q: How can a string of letters be a solution to a problem?

A: By translating letters into commands, and giving those commands to a goal-seeking agent.

Q: How do we know when we have a good enough solution?

A: By awarding points to each solution, we can compare them to determine the best one.

This last point is critical, and it's what makes the fitness function an integral part of the genetic algorithm.

Without a way to compare solutions, there could be no determination of fitness. One random solution would be
just as good (or bad) as another. It's the point system in the Frogger game that tells
us that Anne's DNA gets a better score than Bert's. 

Implementation
--------------

