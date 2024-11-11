import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Chart from 'react-apexcharts'
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useEffect, useState } from "react";
import SectionTitle from "../Shared/SectionTitle";
const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const [lineData, setLineData] = useState({
    booked: 0,
    delivered: 0
});

  const { data: dataChart = [], isLoading, refetch } = useQuery({
    queryKey: ['bar-chart'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bar-chart')
      return res.data;
    }
  })
  // Line chart
  const { data } = useQuery({
    queryKey: ['line-chart'],
    queryFn: async () => {
      const res = await axiosSecure.get('/line-chart')
      setLineData(res.data)
      return res.data;
    }
  })

// bar chart
  const [chartData, setChartData] = useState({
    series: [{
      name: 'Booked',
      data: []
    }],
    options: {
      chart: {
        id: 'apexchart-example',
        type: 'bar'
      },
      xaxis: {
        categories: []
      },
      title: {
        text: 'Booked By Date'
      },
      legend: {
        position: 'bottom'
      }
    }
  });

  useEffect(() => {
    if (dataChart) {
      const categories = dataChart?.slice(1).map(data => data[0]);
      const series = dataChart?.slice(1).map(data => Number(data[1]));

      setChartData({
        series: [{
          name: 'Price',
          data: series
        }],
        options: {
          chart: {
            type: 'bar',
          },
          xaxis: {
            categories: categories,
          },
        }
      });
    }
  }, [dataChart]);

// Line chart
const chartOptions = {
  chart: {
      id: 'parcel-comparison',
      toolbar: {
          show: true
      }
  },
  xaxis: {
      categories: ['Booked', 'Delivered']
  },
  dataLabels: {
      enabled: true
  },
  title: {
      text: 'Booked vs Delivered Parcels',
      align: 'center'
  }
};

const chartSeries = [
  {
      name: 'Parcels',
      data: [lineData.booked, lineData.delivered]
  }
];

  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div>
      <Helmet>
        <title>DOE Courier || Statistics</title>
      </Helmet>
      <SectionTitle heading={"Statistics"}></SectionTitle>
      <div className="grid lg:grid-cols-2  justify-center gap-6">
        <div className="shadow-2xl py-4">
          <Chart
            options={chartData.options} series={chartData.series} type="bar" width={500} height={320}
          ></Chart>
          <p className="text-center text-xl text-blue-700 font-black">Bar Chart</p>
        </div>
        <div className="shadow-2xl py-4">
          <Chart
            options={chartOptions} series={chartSeries} type="line" width={500} height={320}
          ></Chart>
          <p className="text-center text-xl text-blue-700 font-black">Line Chart</p>
        </div>
      </div>
    </div>

  );
};

export default Statistics;