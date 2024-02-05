import React from 'react';
import { Col, Row, Typography, Space, Badge } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
HighchartsMore(Highcharts);
SolidGauge(Highcharts);


const { Text } = Typography;

const OeeTab: React.FC = () => {
  const options = {
    chart: {
      type: 'gauge',
      height: '300', // Set the height as needed
    },
    title: null,
    pane: {
      center: ['50%', '50%'],
      size: '80%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor:
          Highcharts.defaultOptions.legend?.backgroundColor || '#EEE',
        innerRadius: '70%',
        outerRadius: '100%',
        shape: 'arc',
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickLength: 0,
      tickWidth: 0,
      minorTickInterval: null,
      labels: {
        distance: 20,
        style: {
          fontSize: '14px'
        },
        formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
          return this.value + '%';
        },
      },
      tickPositions: [
        0,
        90,
        100,
      ],
      plotBands: [
        {
          from: 0,
          to: 90,
          color: '#DF5353', // red
          thickness: '30%',
        },
        {
          from: 90,
          to: 100,
          color: '#55BF3B', // green
          thickness: '30%',
        },
      ]
    },
    plotOptions: {
      gauge: {
        dataLabels: {
          y: 30,
          borderWidth: 0,
          useHTML: true,
        },
      },
      dial: {
        baseLength: "0%",
        baseWidth: 5,
        radius: "90%",
        rearLength: "100%",
        topWidth: 1
      }
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'OEE',
        data: [88.81], // Set your actual data here
        dataLabels: {
          format:
            // '<div style="text-align:center"><span style="font-size:25px;color:' +
            // ('black' || 'black') +
            // '">{y}%</span>' +
            // '<span style="font-size:12px;color:silver">% OEE</span></div>',
            '<div style="text-align:center"><span style="font-size:25px;color:black">OEE </span><span style="font-size:25px;color:' +
            ('red' || 'red') +
            '"> {y}%</span>' +
            '</div>',

        },
        tooltip: {
          valueSuffix: ' %',
        },
        dial: {
          radius: '80%',
          backgroundColor: 'black',
          baseWidth: 12,
          baseLength: '0%',
          rearLength: '0%'
        },
        pivot: {
          backgroundColor: 'black',
          radius: 6
        }
      },
    ],
  };

  return (

    <React.Fragment>

      {[1, 2].map((index) => (

        <Row gutter={24} style={{ padding: 12 }}>

          <Col span={24} className='gutter-row' style={{ height: 'auto', width: 'auto', backgroundColor: 'white', borderRadius: 10 }}>

            <Row className='p-0' style={{ padding: 15 }}>
              <Col span={12}>
                <Row>

                  <Col span={6} style={{ borderRight: "2px solid rgba(5, 5, 5, 0.16)" }}>
                    <Row>
                      <Text type="secondary" style={{ fontSize: 20 }}>Type</Text>
                    </Row>

                    <Row className=''>
                      <Text style={{ fontSize: 40, fontWeight: "bold" }}>LINE 1</Text>
                    </Row>
                  </Col>

                  <Col span={5} style={{ paddingRight: 10, paddingLeft: 10, borderRight: "2px solid rgba(5, 5, 5, 0.16)" }}>
                    <Row style={{ justifyContent: 'center' }}>
                      <Text type="secondary" style={{ fontSize: 20 }}>
                        Target
                      </Text>
                    </Row>

                    <Row style={{ justifyContent: 'center' }}>
                      <Text style={{ fontSize: 40, fontWeight: "bold" }}>
                        90%
                      </Text>
                    </Row>
                  </Col>

                  <Col span={13} style={{ paddingLeft: 30 }}>
                    <Row style={{ justifyContent: 'left' }}>
                      <Text type="secondary" style={{ fontSize: 20 }}>
                        Date
                      </Text>
                    </Row>

                    <Row style={{ justifyContent: 'left' }}>
                      <Text style={{ fontSize: 40, fontWeight: "bold" }}>
                        10 Mar 2021
                      </Text>
                    </Row>
                  </Col>

                </Row>
              </Col>
            </Row>

            <Row style={{ padding: 0 }}>
              {[1, 2, 3, 4].map((index) => (
                <Col span={6}>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                  />
                </Col>
              ))}
            </Row>
          </Col>

        </Row>

      ))}



    </React.Fragment>
  );
};

export default OeeTab;
