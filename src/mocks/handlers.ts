import { http, HttpResponse } from 'msw'
import data from '../assets/data.json'
import { convertArrayToObject, updatePositionsToObject } from '../utils'

export const handlers = [

  http.get('/getdata', () => {

    let datafromLocalStorage = localStorage.getItem('data')

    if(datafromLocalStorage === null || datafromLocalStorage?.length === 0){ 

      const ObjectedData = convertArrayToObject(data)
      localStorage.setItem('data', JSON.stringify(ObjectedData))
      
      return HttpResponse.json({
        status: 'ok',
        data: data
      })
    }

    datafromLocalStorage = JSON.parse(datafromLocalStorage)
    let ArrayedObject = datafromLocalStorage && Object.values(datafromLocalStorage)

    return HttpResponse.json({
      status: 'ok',
      data: ArrayedObject
    })
  }),

  http.put('/updatepositions', async ({ request }) => {
    try {
      const payload = await request.json()

      if(!payload) return HttpResponse.json({
        status: 'ok',
        message: 'No data to update'
      })

      let datafromDB = localStorage.getItem('data')
      datafromDB = datafromDB && JSON.parse(datafromDB)

      if(!datafromDB) return HttpResponse.json({
        status: 'ok',
        message: 'Data not found in local storage, Please clear your local Storage and reload the application'
      })

        const updatedObject = updatePositionsToObject(payload, datafromDB)
        
        localStorage.setItem('data', JSON.stringify(updatedObject))
        return HttpResponse.json({
          status: 'ok',
          message: 'Data updated successfully'
        })
      

    } catch (error) {
      console.log('Error updating data:', error);
    }
   
  }),

  http.post('/createdata', async ({ request }) => {

    const data = await request.json()

    if(!data) return HttpResponse.json({
      status: 'ok',
      message: 'No data to create'
    })
    
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
