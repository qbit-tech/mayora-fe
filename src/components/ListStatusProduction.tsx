
function ListStatusProduction() {
  return (
    <div style={{display:'flex', alignItems: 'center'}}>
      <div style={{display:'flex', alignItems: 'center'}}>
        <div style={{width:'10px', height: '10px', margin: '0 10px', background:'#9E9E9E'}}></div>
        Off
      </div>
      <div style={{display:'flex', alignItems: 'center'}}>
        <div style={{width:'10px', height: '10px', margin: '0 10px', background:'#0AC46B'}}></div>
        Running
      </div>
      <div style={{display:'flex', alignItems: 'center'}}>
        <div style={{width:'10px', height: '10px', margin: '0 10px', background:'#E7B555'}}></div>
        Start Up
      </div>
      <div style={{display:'flex', alignItems: 'center'}}>
        <div style={{width:'10px', height: '10px', margin: '0 10px', background:'#E92548'}}></div>
        Down Time
      </div>
    </div>
  )
}

export default ListStatusProduction