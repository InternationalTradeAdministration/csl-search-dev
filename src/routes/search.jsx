import { useLoaderData, useNavigation } from 'react-router-dom'
import { getResponse, getParams, areParamsValid } from '../service.js'
import Item from '../components/Result/Item.jsx'
import Spinner from '../components/Spinner/Spinner'
import Pages from '../components/Result/Pages.jsx'
import '../components/Result/Result.scss'

export async function loader({ request }) {
  const searchParams = getParams(request)
  return getResponse(searchParams)
    .then(response => ({ ...response, query: searchParams }))
}

export default function Search() {
  console.log('searching')
  const navigation = useNavigation()

  const searching = navigation.state === 'loading'

  const { query, results, total } = useLoaderData()
  console.log(`total: ${total}`)
  console.log(`searching: ${searching}`)

  const statsLabel = total === 1 ? `${total} result.` : `${total} results.`

  const pagesProps = {
    query,
    current: Math.ceil((query.offset ? query.offset : 0) / 10) + 1,
    displayed: 5,
    total: Math.min(Math.ceil(total / 10), 99)
  };

  return (
    <div className="explorer__result">
      { searching ? (
        <Spinner active={true} />
      ) : (
        results.length ? (
            <>
              <p className="explorer__result__label">{statsLabel}</p>
              {results.map((result) => (
                <Item key={result.id} result={result} />
              ))}
              <Pages {...pagesProps} />
            </>
          ) : (
            <p className="explorer__result__label">No result.</p>
          )
      )}
    </div>
  )
}
