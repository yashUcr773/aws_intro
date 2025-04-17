async function callUrl() {
    const res = await fetch('http://weighted.planiva.org/')
    const data = await res.text()
    console.log(data)
}

for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        callUrl()
    }, i * 10000)
}