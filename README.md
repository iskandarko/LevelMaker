An early build of a web application designed to demonstrate the level concepts of a game being developed.

Currently the folowing features are available:
1. Uploading custom levels from JSON files using UPLOAD LEVEL button.
2. Navigating throught the levels using WASD buttons on the keyboard.
3. Level image.
4. Level minimap.
5. Level details information.
6. Demo mode.

Levels JSON file structure* (one level per file):
[
    { "x": INT, "y": INT, "img": "IMG_URL_STRING", "details": "DETAILS_STRING" },
    {...},
    {...},
    {...},
    ...
]

*Also see level-1.json in the root folder as an example.
