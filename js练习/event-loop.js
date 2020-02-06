Promise.resolve().then(()=>{
  console.log('Promise')
  setTimeout(()=>{
    console.log('setTimeout')
  },0)
})
setTimeout(() => {
    console.log('timer1')
    Promise.resolve().then(function() {
      console.log('promise1')
    })
   }, 0)
   process.nextTick(() => {
    console.log('nextTick')
    process.nextTick(() => {
      console.log('nextTick')
      process.nextTick(() => {
        console.log('nextTick')
        process.nextTick(() => {
          console.log('nextTick')
        })
      })
    })
   })
