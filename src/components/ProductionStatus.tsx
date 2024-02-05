import { Card } from 'antd'
import moment from 'moment'
import React from 'react'
import Timeline from 'react-calendar-timeline'
import styled from 'styled-components'
import { DetailUserWithMachine } from '../data/model/machines'
import ListStatusProduction from './ListStatusProduction'

export type Item = {
    id: string;
    start_time: moment.Moment,
    end_time: moment.Moment,
    group: number;
    itemProps?: any
}

type ProductionStatusProps = {
    seletedMachine: DetailUserWithMachine,
    productionBar: Item[]
}

function ProductionStatusCard(props: ProductionStatusProps) {
  const groups = [{ id: 1, title: 'group 1' }]
  return (
    <Card size="default" title={`Production Status - ${props.seletedMachine ? props.seletedMachine.machine.name : '-'}`} extra={<ListStatusProduction/>}>
      <TabTimeline>
      <Timeline
        groups={groups}
        items={props.productionBar}
        defaultTimeStart={moment().startOf('day').hour(7)}
        defaultTimeEnd={moment().add(1, 'day').startOf('day').hour(4)}
        canMove={false}
        canChangeGroup={false}
        canResize={false}
        clickTolerance={0}
      />
    </TabTimeline>
    </Card>
  )
}

const TabTimeline = styled.div`
  pointer-events: none;

  .rct-sidebar-row-even{
    display: none;
  }
  .rct-scroll, .rct-calendar-header{
    width: 100% !important;
  }
  .rct-sidebar, .rct-horizontal-lines{
    display:none !important;
  }
  .rct-calendar-header div:first-child{
    display:none;
  }
  .rct-header-root div:first-child{
    display:none;
  }
  .rct-dateHeader{
    border: none !important;
    font-size: 10px !important;
    baackground: #fff !important;
  }
  .rct-calendar-header, .rct-day-3, .rct-vl{
    border:none !important;
  }
  .rct-header-root{
    border-bottom: none !important;
  }
  .rct-calendar-header div:nth-child(2){
    height:20px !important;
  }
`;

export default ProductionStatusCard