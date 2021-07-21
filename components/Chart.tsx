import React, { ChangeEvent, useEffect, useState } from 'react'
import { LineChart, Line, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { Score } from ".."

type ChartProps = {
  data: Score[];
  emptyBtnHandler?: () => void;
}

export default function Chart({ data, emptyBtnHandler }: ChartProps) {
  const [yDatakey, setYDatakey] = useState('pp')
  const [xDatakey, setXDatakey] = useState('rank_score')
  const [allDatakeys, setAllDatakeys] = useState<string[]>([])

  useEffect(() => {
    if (data.length === 0) {
      return
    }

    const keys = []

    for (const key in data[0]) {
      if (Object.prototype.hasOwnProperty.call(data[0], key)) {
        keys.push(key)
      }
    }

    setAllDatakeys(keys)
  }, [data])

  function handleDatakeyChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setYDatakey(event.target.value)
  }

  function handleXDatakeyChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setXDatakey(event.target.value)
  }

  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl">Chart</h3>

        <div className="flex flex-wrap gap-6">
          { allDatakeys.length > 0 && (
            <div>
              <label htmlFor="yDatakey" className="mr-2 mb-2">Y Axis</label>
              <div className="select-field">
                <select id="yDatakey" value={yDatakey} onChange={handleDatakeyChange}>
                  { allDatakeys.map(key => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          { allDatakeys.length > 0 && (
            <div>
              <label htmlFor="xDatakey" className="mr-2 mb-2">X Axis</label>
              <div className="select-field">
                <select id="xDatakey" value={xDatakey} onChange={handleXDatakeyChange}>
                  { allDatakeys.map(key => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      { data.length === 0 && (
        <div>
          <p className="mb-4">No scores found.</p>
          <button className="btn" onClick={emptyBtnHandler}>Try an example map</button>
        </div>
      )}
      { data.length > 0 && (
        <ResponsiveContainer width='100%' aspect={16.0/9.0}>
          <LineChart height={400} data={data}>
            <Line type="monotone" dataKey={yDatakey} stroke="#8884d8" />
            <XAxis dataKey={xDatakey} />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      )}
    </section>
  )
}