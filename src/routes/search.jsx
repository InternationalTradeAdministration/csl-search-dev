import { useLoaderData } from 'react-router-dom'
import { getEntries, getParams } from '../service.js'

export async function loader({ request }) {
  const searchParams = getParams(request)
  return getEntries(searchParams)

}

export default function Search() {
  const { results } = useLoaderData()

  return (
    <>
      {results.length ? (
        <div>
          {results.map((entry) => (
            <div key={entry.name}>
              <h4>{entry.name}</h4>
              <table>
                <tbody>
                <tr>
                  <td>Source</td>
                  <td>{entry.source}</td>
                </tr>
                <tr>
                  <td>Type</td>
                  <td>{entry.type}</td>
                </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p>No results</p>
      )}
    </>
  )
}
