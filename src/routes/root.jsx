import { Outlet, useLoaderData, useNavigation } from 'react-router-dom'
import './root.scss'

import SearchForm from '../components/search_form'
import { getParams } from '../service'

export async function loader({ request }) {
  return getParams(request)
}

export default function Root() {
  const searchParams = useLoaderData()

  return (
    <>
      <main className="explorer__content">
        <h1 id="Header-1">Search the Consolidated Screening List</h1>
        <SearchForm {...searchParams} />
        <Outlet />
      </main>
    </>
  )
}
