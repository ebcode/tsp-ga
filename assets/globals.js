num_cities = 10;

num_paths = 8;

best_ever = 0;

best_ever_route = '';

labels = 'abcdefghijklmnop'; // up to 16 cities

colors = ['red', 'green', 'purple', 'orange', 'blue', 'darkgrey', 'grey'];

cities = [];

generations = 600;

w = h = 400;

padding = 40;

c = canvas(w,h,'main_canvas');

g = c.getContext('2d');
g.strokeStyle = 'black';
g.font = "20pt sans-serif";

debug = 0;
