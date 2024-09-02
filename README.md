
# SORTING BLOCKS
Sortable blocks that can sorted via drag and drop. Users can view the images in fullscreen by clicking anywhere on the block and esc for exiting the full screen.
Deployed at https://zania-test-one.vercel.app/

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
 
1. Better handling of the update API, just passing the changed data should handle the data properly.
2. Better Placeholder UI when any Error occurs in the UI
3. Drag and Drop functinalities in case of diagonally swapping the elements.
4. Preloading individual images for the first time.


### Code structure
1. /assets has data.json
2. /components  for modular code structure where only pure components are placed which only interacts with the UI
3. /pages  has Homepage.jsx which ties the component with the real time data via hooks.
4. /hooks has useData.ts which ensures, data fetching, loading, save last state of the data and updating the data every 5 seconds. All the logic related to our data is placed in this hook for better code abstraction, useDragAndDrop.ts has all the logic related to the drag and drop of the blocks. This hook does all the intital setup and function calls required for the dnd-kit library and then returns 2 components to be used in the HomePage.tsx
5. /mocks has handler.ts which has all our API's among those 2 are functional apis `/getdata` and 
`/updatepositions`. I have 
6. /types has all the types file.
7. /utils has all the basic array manipulation functions.


### System Design
1. The data stored in the state is an array of objects because dndkit library takes an array of objects and then gives an array of objects back on dragging and dropping of the blocks.
2. I change the value of the positions key in each of the object and gives them correct positions.
3. I update the state and the currentData.ref with the updated array of objects.
4. I have used `dataRef` because setinterval took the stale copy of state and kept calling update API with the stale state data due to closures.
5. Since refs arent directly linked to components rendering cycle, we can use ref for storing the consistent data states across renders.
6. I have added a delay of `250ms` on the dragging element because onDrag was preventing `onClick` event from happening because of event bubbling hence addding a delay in emitting `onDrag` event helps us use both the events seamlessly.
7. I have created another that `initialDataStateRef` ref for remembering the last updated data state and time for comparing the data before the update API call to prevent unneccessary updates.
8. I have stored the data in key value pairs in the Localstorage to help us do faster updation. 
I was initially sending only the elements whose positions have changed. for example the array of elements that got changed would be 
```
[{
    id: 'data-0',
    position: 3
},
{
    id: 'data-3',
    position: 0
}
]
```
and then again recreate the Object to store the updated positions in the localstorage.
It was working fine but it caused edge case bugs on diagonal drag and drop of elements, so for now I send the entire array with updated positions to the BE and it isnt causing any issues.


### Libraries used
1. @dnd-kit for drag and drop
2. @tailwind for css
3. @mswjs for handling for api
