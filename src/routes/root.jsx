import { Outlet, useLoaderData } from 'react-router-dom'
import SearchForm from '../components/search_form'
import { getParams } from '../service'

export async function loader({ request }) {
  return getParams(request)
}

export default function Root() {
  const searchParams = useLoaderData()

  return (
    <>
      <div id="search">
        <h1>Search the Consolidated Screening List</h1>
        <div>
          <SearchForm {...searchParams} />

          {/*<Form id="search-form" role="search">*/}
          {/*  <fieldset>*/}
          {/*    <legend>*/}
          {/*      Search all <a href="https://www.trade.gov/consolidated-screening-list" target="_parent">the screening*/}
          {/*      lists</a> at one time by filling in the search boxes below.*/}
          {/*      <br />*/}
          {/*      If you get too many results, try including more information to the additional fields. If you get too few*/}
          {/*      results, try searching one field at a time.*/}
          {/*    </legend>*/}
          {/*    <label htmlFor="name">Name</label>*/}
          {/*    <div className="csl-input-hint">Search for an entity's name or one of its alternative names.</div>*/}
          {/*    <input*/}
          {/*      id="name"*/}
          {/*      aria-label="Search by name"*/}
          {/*      type="search"*/}
          {/*      name="name"*/}
          {/*    />*/}
          {/*    <div*/}
          {/*      id="search-spinner"*/}
          {/*      aria-hidden*/}
          {/*      hidden={true}*/}
          {/*    />*/}
          {/*    <div*/}
          {/*      className="sr-only"*/}
          {/*      aria-live="polite"*/}
          {/*    ></div>*/}
          {/*    <button type="submit">Search</button>*/}
          {/*  </fieldset>*/}
          {/*</Form>*/}

        </div>
      </div>
      <div id="results">
        <Outlet />
      </div>
    </>
  )
}
