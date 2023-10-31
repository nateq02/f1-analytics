import { useFetchData } from '../hooks/useFetchData'
import { Loading } from './Loading'

function LastRaceResults() {
    const { data, isLoading } = useFetchData('./last-race-results')
    
    if (isLoading) return <Loading />
    return (
        <div className="box flex flex-col">
        <div className="sticky top-0">
          <h1 className="h1 h-1/6 mx-2">Last Race Results</h1>
        </div>
      </div>
    )
}

export { LastRaceResults }