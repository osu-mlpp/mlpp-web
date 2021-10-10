import React, { useEffect, useState } from 'react'
import { LineChart, Line, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { Score } from ".."

type ChartProps = {
  rawData: Score[];
  emptyBtnHandler?: () => void;
}

type Accumulator = {
  sum: number;
  count: number;
}

type KeyPoint = {
  x: number;
  y: number;
}

export default function Chart({ rawData, emptyBtnHandler }: ChartProps) {
  const [minAcc, setMinAcc] = useState(0.97)
  const [minCombo, setMinCombo] = useState(50)
  const [maxMisses, setMaxMisses] = useState(1)
  const [granularity, setGranularity] = useState(500)
  const [graphData, setGraphData] = useState<KeyPoint[]>([])

  useEffect(() => {
    if (rawData.length === 0) {
      setGraphData([])
      return
    }

    const data: Accumulator[] = []

    const ratio =  1 / ((rawData[0].count300 + rawData[0].count100 + rawData[0].count50 + rawData[0].countmiss) * 6)

    for (const score of rawData) {
      const index = Math.round(score.rank_score / granularity)

      const acc = (score.count300*6 + score.count100*2 + score.count50) * ratio
      const value =
        (
          acc >= minAcc
          && score.maxcombo >= minCombo
          && (maxMisses < 0 || score.countmiss <= maxMisses)
        ) ? 1 : 0

      const x: Accumulator = data[index] ? data[index] : { sum: 0, count: 0 }
      data[index] = { sum: x.sum + value, count: x.count + 1 }
    }
    const newGraphData: KeyPoint[] = []

    for (const i in data) {
      const index = Number(i);
      if(index == 0) {
        continue
      }
      newGraphData.push({x: index*granularity, y: data[i].sum / data[i].count})
    }

    setGraphData(newGraphData)
  }, [rawData, minAcc, minCombo, maxMisses])

  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl">Chart</h3>
      </div>
      { rawData.length === 0 && (
        <div>
          <p className="mb-4">No scores found.</p>
          <button className="btn" onClick={emptyBtnHandler}>Try an example map</button>
        </div>
      )}
      { graphData.length > 0 && (
        <ResponsiveContainer width='100%' aspect={16.0/9.0}>
          <LineChart height={400} data={graphData}>
            <Line type="monotone" dataKey={"y"} stroke="#8884d8" />
            <XAxis dataKey={"x"} />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      )}
    </section>
  )
}