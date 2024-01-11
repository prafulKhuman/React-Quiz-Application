
import React , {useEffect , useState , useRef} from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more"; 
import solidGauge from "highcharts/modules/solid-gauge"; 

highchartsMore(Highcharts);
solidGauge(Highcharts);
require("highcharts/modules/map")(Highcharts);

function Spodomeetar({score}) {
    const [ option , setOptions ] = useState(null);
    const chartRef = useRef(null);
    
    

    useEffect(() => {
        const number = parseInt(score)
        if (true) {
            const chartOptions = {
                chart: {
                    type: 'gauge',
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    height: '80%'
                },
            
                title: {
                    text: ''
                },
            
                pane: {
                    startAngle: -90,
                    endAngle: 89.9,
                    background: null,
                    center: ['38%', '65%'],
                    size: '85%'
                },
            
                // the value axis
                yAxis: {
                    min: 0,
                    max: 100,
                    tickPixelInterval: 25,
                    tickPosition: 'inside',
                    tickColor: Highcharts.defaultOptions.chart.backgroundColor || '#FFFFFF',
                    tickLength: 30,
                    tickWidth: 2,
                    minorTickInterval: null,
                    labels: {
                        distance: 20,
                        style: {
                            fontSize: '14px'
                        }
                    },
                    lineWidth: 0,
                    plotBands: [{
                        from: 0,
                        to: 100,
                        color: '#55BF3B', // green
                        thickness: 20
                    }]
                },
            
                series: [{
                    name: 'Marks',
                    data: [number],
                    tooltip: {
                        valueSuffix: ' - Obtain Score'
                    },
                    dataLabels: {
                        format: '{y} -  Obtain Score',
                        borderWidth: 0,
                        color: (
                            Highcharts.defaultOptions.title &&
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || '#333333',
                        style: {
                            fontSize: '16px'
                        }
                    },
                    dial: {
                        radius: '80%',
                        backgroundColor: 'gray',
                        baseWidth: 12,
                        baseLength: '0%',
                        rearLength: '0%'
                    },
                    pivot: {
                        backgroundColor: 'gray',
                        radius: 6
                    }
            
                }] 
            
            }
            setOptions(chartOptions);
        }
    }, [score]);

    return (<>
        <div className="spidomeeter">
            {option && (
                <HighchartsReact
                    ref={chartRef}
                    highcharts={Highcharts}
                    allowChartUpdate={true}
                    immutable={true}
                    options={option}
                />
            )}
        </div>
    </>);
}

export default Spodomeetar;