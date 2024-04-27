//Import React
import React from 'react'

//Import ReactDOM
import ReactDOM from 'react-dom/client'

//Import master component
import { App } from './App.tsx'

//Import global stylesheet
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(

	<React.StrictMode>

		<App/>

	</React.StrictMode>,

)
