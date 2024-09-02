
# SORTING BLOCKS
Sortable blocks that can sorted via drag and drop. Users can view the images in fullscreen by clicking anywhere on the block and esc for exiting the full screen

## Setting up and running it locally via Docker
1. git clone https://github.com/aayushi1995/zania-test.git
2. cd zania-test
3. Start your docker app
3. Run this command in your terminal `docker-compose up -d`
4. Run this command in your terminal  `docker exec -it zania-test sh`
5. `yarn install`
6. `yarn dev`
7. Open the browser and go to the url `http://localhost:8000/`

## SORTING BLOCKs behaviour: 
1. User can click on the blocks and view the thumbnail image fullscreen, upon clicking esc it escapes the fullscreen mode.
2. User can drag and drop blocks around to sort the list. Dragging functionality gets activated after clicked state of 250ms. You can perform drag and drop function as shown in the link below.
https://www.loom.com/share/c1ae63d7b65f49b18db823d8a96b134a?sid=f7a28615-8a18-43ab-922b-12aad032a55d
3. UI will be updated Optimistically every 5 seconds if any changes are done. If no changes are done. it doesnt update.

### Future Scope 
 
1. Better handling of the update API. 
2. Better Placeholder UI when any Error occurs in the UI

### Code structure
1. /assets has data.json
2. /components  for modular code structure where only pure components are placed which only interacts with the UI
3. /pages  has Homepage.jsx which ties the component with the real time data via hooks.
4. /hooks has useData.ts which ensures, data fetching, loading, save last state of the data and updating the data every 5 seconds. All the logic related to our data is placed in this hook for better code abstraction, useDragAndDrop.ts has all the logic related to the drag and drop of the blocks. This hook does all the intital setup and function calls required for the dnd-kit library and then returns 2 components to be used in the HomePage.tsx
5. /mocks has handler.ts which has all our API's among those 2 are functional apis `/getdata` and 
`/updatepositions`. I have 
6. /types has all the types file.
7. /utils has all the basic array manipulation functions.

### Libraries used
1. @dnd-kit for drag and drop
2. @tailwind for css
3. @mswjs for handling for api
