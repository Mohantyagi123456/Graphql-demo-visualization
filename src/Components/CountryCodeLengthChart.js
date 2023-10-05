import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const CountryCodeLengthChart = ({ allData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null;

    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };

    const createOrUpdateChart = () => {
      destroyChart();

      const codeLengthCount = {};
      allData.forEach((country) => {
        const codeLength = country.code.length;
        codeLengthCount[codeLength] = (codeLengthCount[codeLength] || 0) + 1;
      });

      const labels = Object.keys(codeLengthCount).map((length) => `${length} characters`);
      const data = Object.values(codeLengthCount);

      const ctx = chartRef.current;
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Number of Countries",
              data: data,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)", 
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Count",
              },
            },
          },
          responsive: true,
        },
      });
    };

    createOrUpdateChart(); 
    return destroyChart;
  }, [allData]);

  return <canvas ref={chartRef} width="400" height="200"></canvas>;
};

export default CountryCodeLengthChart;
