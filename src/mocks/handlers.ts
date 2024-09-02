import { http, HttpResponse } from 'msw'
import data from '../assets/data.json'
import { convertArrayToObject, updatePositionsToObject } from '../utils'
import { DataType } from '../types/Data'

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

      // fake timer to mock an actual API and we can see a loader on the screen
      setTimeout(() => {
        console.log('executing update positions')
      },5000)

      const payload = await request.json()

      if(!payload) return HttpResponse.json({
        status: 'ok',
        message: 'No data to update'
      })

      let datafromDB = localStorage.getItem('data')
      let dataObjectfromDB = datafromDB && JSON.parse(datafromDB) as Record<number, DataType>

      if(!datafromDB) return HttpResponse.json({
        status: 'ok',
        message: 'Data not found in local storage, Please clear your local Storage and reload the application'
      })

        const updatedObject = dataObjectfromDB && updatePositionsToObject(payload, dataObjectfromDB)
        
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

    // TODO: handletype issue everywhere
    const data = await request.json() as DataType[]

    if(!data) return HttpResponse.json({
      status: 'ok',
      message: 'No data to create'
    })

    // TODO: typecheck and validate and add it to localStorage
    const ObjectedData = convertArrayToObject(data)
    localStorage.setItem('data', JSON.stringify(ObjectedData))
    
    
    return HttpResponse.json({
      status: 'ok',
      message: 'Data created successfully'
    })
  }),

  http.delete('/deletedata', async ({ request }) => {
   
    const id = await request.json()
    
    const datafromLocalStorage = localStorage.getItem('data')
     // TODO: handle type issues
    const parsedData = datafromLocalStorage && JSON.parse(datafromLocalStorage) as DataType[]

    if(!id || !parsedData) return HttpResponse.json({
      status: 'ok',
      message: !id ? 'No id provided' : 'No data to delete'
    })
    
   
    let targetIndex = Object.values(parsedData).findIndex((item: DataType) => item?.id === id)

    if(targetIndex === -1) return HttpResponse.json({
      status: 'ok',
      message: 'id not found'
    })
    delete parsedData[targetIndex]

    localStorage.setItem('data', JSON.stringify(parsedData))

    return HttpResponse.json({
      status: 'ok',
      message: "Successfully deleted"
    })
  })
]
