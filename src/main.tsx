
import App from './App'
import './index.css'
import { createRoot } from 'react-dom/client'
 
async function enableMocking() {
 
  const { worker } = await import('./mocks/browser')
 
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

const root = createRoot(document.getElementById('root') as HTMLElement)

enableMocking().then(() => {
  root.render(<App />); 
})