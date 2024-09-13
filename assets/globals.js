num_cities = 8;

num_paths = 7;

best_ever = 0;

best_ever_route = '';

labels = 'abcdefghijklmnop'; // up to 16 cities

colors = ['red', 'green', 'purple', 'orange', 'blue', 'darkgrey', 'grey'];

cities = [];

w = h = 400;

padding = 20;

c = canvas(w,h,'main_canvas');

g = c.getContext('2d');
g.strokeStyle = 'black';
g.font = "20pt sans-serif";

debug = 0;
