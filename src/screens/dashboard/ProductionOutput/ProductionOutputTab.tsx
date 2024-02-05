import React from 'react';
import { Col, Row, Typography, Space, Badge } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const { Text } = Typography;

const ProductionOutputTab: React.FC = () => {

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
                '07', '08', '09', '10', '11', '12',
                '13', '14', '15', '16', '17', '18',
                '19', '20', '21', '22', '23', '00',
                '01', '02', '03', '04', '05', '06'
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
                // Target
                style: {
                    color: Highcharts.getOptions().colors
                }
            }
        }, { // Secondary yAxis
            title: {
                text: '',
                // Actual
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
            name: 'Target',
            type: 'column',
            data: [
                300, 400, 500, 600, 700, 800,
                900, 1000, 1100, 1200, 1300, 1400,
                1500, 1600, 1700, 0, 0, 0,
                0, 0, 0, 0, 0, 0
            ],
        }, {
            name: 'Actual',
            type: 'spline',
            data: [
                300, 400, 500, 600, 700, 800,
                900, 1000, 1100, 1200, 1300, 1400,
                1500, 1600, 1700, 0, 0, 0,
                0, 0, 0, 0, 0, 0
            ],
            color: 'red',
        }]
    };

    return (

        <React.Fragment>

            {[1, 2].map((index) => (

                <Row gutter={24} style={{ padding: 12 }}>

                    <Col span={8} className='gutter-row' style={{ height: 'auto', width: 'auto', backgroundColor: 'white', borderRadius: 10, margin: "0px 25px 0px 0px" }}>
                        <Row className='p-0' style={{ borderBottom: "1px solid rgba(5, 5, 5, 0.16)", padding: 15 }}>
                            <Row>
                                <Text style={{ fontWeight: 'bold' }}>Production Planning</Text>
                            </Row>
                        </Row>

                        <Row style={{ padding: "20px 15px 20px 15px" }}>
                            <Col span={24}>
                                <Row>
                                    <Text type="secondary" style={{ fontSize: 20 }}>Type</Text>
                                </Row>

                                <Row className='' style={{ borderBottom: "2px solid rgba(5, 5, 5, 0.16)" }}>
                                    <Text style={{ fontSize: 40, fontWeight: "bold" }}>LINE 1</Text>
                                </Row>
                            </Col>
                        </Row>

                        <Row style={{ padding: "0px 15px 20px 15px" }}>
                            <Col span={24}>
                                <Row>
                                    <Col span={12}>
                                        <Row>
                                            <Text type="secondary" style={{ fontSize: 20 }}>Target</Text>
                                        </Row>
                                        <Row>
                                            <Text style={{ fontSize: 40, fontWeight: "bold" }}>2500</Text>
                                        </Row>
                                    </Col>

                                    <Col span={12}>
                                        <Row>
                                            <Text type="secondary" style={{ fontSize: 20 }}>Actual</Text>
                                        </Row>
                                        <Row>
                                            <Text style={{ fontSize: 40, fontWeight: "bold" }}>1650</Text>
                                            <CaretDownOutlined style={{ fontSize: 30, color: "#d9534f", marginLeft: 10 }} />
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>

                            <Col span={24}>
                                <Row>
                                    <Col span={12}>
                                        <Row>
                                            <Text type="secondary" style={{ fontSize: 20 }}>Differential</Text>
                                        </Row>
                                        <Row>
                                            <Text style={{ fontSize: 40, fontWeight: "bold", color: "#d9534f" }}>850</Text>
                                        </Row>
                                    </Col>

                                    <Col span={12}>
                                        <Row>
                                            <Text type="secondary" style={{ fontSize: 20 }}>Status</Text>
                                        </Row>
                                        <Row>
                                            {/* <Badge count="Running" style={{ backgroundColor: "#5cb85c", width: "200%", height: "200%", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} /> */}
                                            <div style={{ backgroundColor: "#5cb85c", width: "60%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 50, margin: "15px 0px 10px 0px" }}>
                                                <Text style={{ fontSize: 20, color: "white" }}>Running</Text>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>



                    </Col>

                    <Col span={14} className='gutter-row' style={{ height: 'auto', width: 'auto', backgroundColor: 'white', borderRadius: 10 }}>

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

export default ProductionOutputTab;