import React from 'react';
import { Col, Row, Typography, Space, Badge, Table, TableColumnsType } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const { Text } = Typography;

interface OeeVsTargetTabProps {
  key: React.Key;
  date: string;
  '10 Mar': string;
  '09 Mar': string;
  '08 Mar': string;
  '07 Mar': string;
  '06 Mar': string;
  '05 Mar': string;
  '04 Mar': string;
}

const OeeVsTargetTab: React.FC = () => {

  const options = {
    chart: {
      zoomType: 'xy',
      marginTop: 50,
    },
    title: {
      text: '',
      align: 'left'
    },
    credits: {
      enabled: false
    },
    // subtitle: {
    //     text: 'Source: ' +
    //         '<a href="https://www.yr.no/nb/historikk/graf/5-97251/Norge/Troms%20og%20Finnmark/Karasjok/Karasjok?q=2021"' +
    //         'target="_blank">YR</a>',
    //     align: 'left'
    // },
    xAxis: [{
      categories: [
        '10 Mar', '09 Mar', '08 Mar', '07 Mar', '06 Mar', '05 Mar', '04 Mar'
      ],
      crosshair: true
    }],
    yAxis: [{ // Primary yAxis
      labels: {
        format: '{value}',
        style: {
          color: Highcharts.getOptions().colors
        }
      },
      title: {
        text: '',
        // Actual
        style: {
          color: Highcharts.getOptions().colors
        }
      }
    }, { // Secondary yAxis
      title: {
        text: '',
        // Target
        style: {
          color: Highcharts.getOptions().colors
        }
      },
      opposite: true
    }],
    tooltip: {
      shared: true
    },
    legend: {
      align: 'right',
      verticalAlign: 'top',
      // y: -20,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend?.backgroundColor || // theme
        'rgba(255,255,255,0.25)'
    },
    series: [{
      name: 'Actual',
      type: 'column',
      data: [
        0.91, 0.96, 0.92, 0.96, 0.91, 0.91, 0.96
      ],
    }, {
      name: 'Target',
      type: 'line',
      data: [
        0.91, 0.91, 0.91, 0.91, 0.91, 0.91, 0.91
      ],
      color: 'red',
    }]
  };


  const columns: TableColumnsType<OeeVsTargetTabProps> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      responsive: ['md', 'lg', 'xl'],
    },
    {
      title: '10 Mar',
      dataIndex: '10 Mar',
      key: '10 Mar',
      responsive: ['md', 'lg', 'xl'],
    },
    {
      title: '09 Mar',
      dataIndex: '09 Mar',
      key: '09 Mar',
      responsive: ['md', 'lg', 'xl'],
    },
    {
      title: '08 Mar',
      dataIndex: '08 Mar',
      key: '08 Mar',
      responsive: ['md', 'lg', 'xl'],
    },
    {
      title: '07 Mar',
      dataIndex: '07 Mar',
      key: '07 Mar',
      responsive: ['md', 'lg', 'xl'],
    },
    {
      title: '06 Mar',
      dataIndex: '06 Mar',
      key: '06 Mar',
      responsive: ['md', 'lg', 'xl'],
    },
    {
      title: '05 Mar',
      dataIndex: '05 Mar',
      key: '05 Mar',
      responsive: ['md', 'lg', 'xl'],
    },
    {
      title: '04 Mar',
      dataIndex: '04 Mar',
      key: '04 Mar',
      responsive: ['md', 'lg', 'xl'],
    },
  ]

  const dataSources = [
    {
      key: '1',
      date: 'Target',
      '10 Mar': "90%",
      '09 Mar': "90%",
      '08 Mar': "90%",
      '07 Mar': "90%",
      '06 Mar': "90%",
      '05 Mar': "90%",
      '04 Mar': "90%",
    },
    {
      key: '2',
      date: 'OEE',
      '10 Mar': "89.3%",
      '09 Mar': "89.3%",
      '08 Mar': "89.3%",
      '07 Mar': "89.3%",
      '06 Mar': "89.3%",
      '05 Mar': "89.3%",
      '04 Mar': "89.3%",
    },
    {
      key: '3',
      date: 'AV',
      '10 Mar': "89.3%",
      '09 Mar': "89.3%",
      '08 Mar': "89.3%",
      '07 Mar': "89.3%",
      '06 Mar': "89.3%",
      '05 Mar': "89.3%",
      '04 Mar': "89.3%",
    },
    {
      key: '4',
      date: 'PE',
      '10 Mar': "89.3%",
      '09 Mar': "89.3%",
      '08 Mar': "89.3%",
      '07 Mar': "89.3%",
      '06 Mar': "89.3%",
      '05 Mar': "89.3%",
      '04 Mar': "89.3%",
    },
    {
      key: '5',
      date: 'QR',
      '10 Mar': "89.3%",
      '09 Mar': "89.3%",
      '08 Mar': "89.3%",
      '07 Mar': "89.3%",
      '06 Mar': "89.3%",
      '05 Mar': "89.3%",
      '04 Mar': "89.3%",
    },
  ];

  return (

    <React.Fragment>

      {[1, 2].map((index) => (

        <Row gutter={24} style={{ padding: 12 }}>

          <Col span={10} className='gutter-row' style={{ height: 'auto', width: 'auto', backgroundColor: 'white', borderRadius: 10, margin: "0px 25px 0px 0px" }}>
            <Row className='p-0' style={{ borderBottom: "1px solid rgba(5, 5, 5, 0.16)", padding: 15 }}>
              <Row>
                <Text style={{ fontWeight: 'bold' }}>LINE 1</Text>
              </Row>
            </Row>

            <Row style={{ padding: "20px 15px 20px 15px" }}>
              <Col span={24}>
                <Row>
                  <Table dataSource={dataSources} columns={columns} pagination={false} />
                </Row>
              </Col>
            </Row>


          </Col>

          <Col span={13} className='gutter-row' style={{ height: 'auto', width: 'auto', backgroundColor: 'white', borderRadius: 10 }}>

            <Row className='p-0' style={{ borderBottom: "1px solid rgba(5, 5, 5, 0.16)", padding: 15 }}>
              <Row>
                <Text style={{ fontWeight: 'bold' }}>Production Output VS Target</Text>
              </Row>
            </Row>

            <Row style={{ padding: 10 }}>
              <Col span={24}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={options}
                />
              </Col>
            </Row>
          </Col>

        </Row>

      ))}

    </React.Fragment>
  );
};

export default OeeVsTargetTab;

