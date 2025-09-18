(function(){
  const primary = '#5b7cfa';
  const primary2 = '#8aa2ff';

  function makeGradient(ctx){
    const g = ctx.createLinearGradient(0,0,0,240);
    g.addColorStop(0, 'rgba(91,124,250,0.35)');
    g.addColorStop(1, 'rgba(91,124,250,0)');
    return g;
  }

  window.FMCharts = {
    revenue: function(canvas){
      const ctx = canvas.getContext('2d');
      const gradient = makeGradient(ctx);
      return new Chart(ctx, {
        type:'line',
        data:{
          labels:['T2','T3','T4','T5','T6','T7','CN'],
          datasets:[{
            data:[2.1,2.3,1.9,2.6,3.1,2.8,2.2],
            borderColor: primary,
            backgroundColor: gradient,
            tension:.35,
            fill:true,
            borderWidth:3,
            pointRadius:0
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          plugins:{legend:{display:false}, tooltip:{enabled:true}},
          scales:{
            x:{ grid:{display:false}, ticks:{color:'#94a3b8'} },
            y:{ beginAtZero:false, grid:{color:'#eef2f7'}, ticks:{color:'#94a3b8', callback:v=>v+'m'} }
          }
        }
      });
    },
    hours: function(canvas){
      const ctx = canvas.getContext('2d');
      return new Chart(ctx, {
        type:'bar',
        data:{
          labels:['6h','9h','12h','14h','16h','18h','20h','22h'],
          datasets:[{
            data:[4,12,28,20,18,36,32,10],
            backgroundColor:'rgba(91,124,250,0.65)',
            borderRadius:8,
            borderSkipped:false
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          plugins:{legend:{display:false}},
          scales:{ x:{ grid:{display:false}, ticks:{color:'#94a3b8'} }, y:{ beginAtZero:true, grid:{color:'#eef2f7'}, ticks:{color:'#94a3b8'} } }
        }
      });
    }
  }
})();

