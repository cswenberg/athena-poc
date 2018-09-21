
function logTransit(app,date,user,bus,distance,json){
  return {app,date,user,bus,distance,json}
}

function logPollo(app,date,user,podcast,duration,json){
  return {app,date,user,podcast,duration,json}
}

function generateLogs() {
  names = ['Conner Swenberg','Young Kim','Austin Astorga']
  ints = [69, 420, 1738]
  floats = [1.0, 5.3, 14.2]
  podcasts = ['How do I use S3 and Athena?','What is the meaning of life?','How many licks does it take to get to the center of a tootsie pop?']

  logsTransit = []
  logsPollo = []

  for (i=0;i<10;i++) {
    rand1 = Math.floor(Math.random()*3)
    rand2 = Math.floor(Math.random()*3)
    rand3 = Math.floor(Math.random()*3)
    transit = logTransit('Ithaca Transit', Date.now(), names[rand1], ints[rand2], floats[rand3], {"eventType":"route query", "event":"query A to B"})
    pollo = logPollo('Pollo', Date.now(), names[rand3], podcasts[rand2], floats[rand1], {"description":"the important questions in life."})
    logsTransit.push(transit)
    logsPollo.push(pollo)
  }
  console.log(logsTransit)
  console.log(logsPollo)
  return {
    "transit": logsTransit,
    "pollo": logsPollo
  }
}

module.exports = {generateLogs}
