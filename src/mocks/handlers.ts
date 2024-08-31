import { http, HttpResponse } from 'msw'
import data from '../assets/data.json'

export const handlers = [

  http.get('/getdata', () => {

    // get data from local storage
    // if not found then add to the localstorage
    let datafromLocalStorage = localStorage.getItem('data')
    
    if(datafromLocalStorage === null || datafromLocalStorage?.length === 0){ 
      localStorage.setItem('data', JSON.stringify(data))
      return HttpResponse.json({
        status: 'ok',
        data: data
      })
    }

    datafromLocalStorage = JSON.parse(datafromLocalStorage)
    return HttpResponse.json({
      status: 'ok',
      data: datafromLocalStorage
    })
  }),

  http.put('/updatepositions', async ({ request }) => {
    try {
      const data = await request.json()
      // fetch data from local storage and update the data and store in the local storage
      let datafromLocalStorage = localStorage.getItem('data')
      datafromLocalStorage = datafromLocalStorage && JSON.parse(datafromLocalStorage)

      if(JSON.stringify(data) === JSON.stringify(datafromLocalStorage)){
        return HttpResponse.json({
          status: 'ok',
          message: 'No change in data'
        })
      } else  {
        localStorage.setItem('data', JSON.stringify(data))
        return HttpResponse.json({
          status: 'ok',
          message: 'Data updated successfully'
        })
      }
    } catch (error) {
      console.log('Error updating data:', error);
    }
   
  }),

  http.post('/createdata', async ({ request }) => {
    const data = await request.json()

    // validate and add the data to the local storage

    return HttpResponse.json({
      status: 'ok',
    })
  }),

  http.delete('/deletedata', async ({ request }) => {
    const id = await request.json()

    // take a list of ids and delete them

    return HttpResponse.json({
      status: 'ok',
    })
  })


]

/*
update API call,
create,
delete
*/
