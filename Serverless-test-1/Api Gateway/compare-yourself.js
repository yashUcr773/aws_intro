async function getAll() {
    const res = await fetch('https://wht3e0fp16.execute-api.us-west-2.amazonaws.com/dev/', { method: 'get' })
    const data = await res.json()
    console.log(data)
}

async function postData() {
    const res = await fetch('https://wht3e0fp16.execute-api.us-west-2.amazonaws.com/dev/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: 'Name-' + Math.round(Math.random() * 10) % 10,
            age: Math.round(Math.random() * 100) % 100,
            income: Math.round(Math.random() * 10000) % 10000,
            height: Math.round(Math.random() * 1000) % 1000,
            userId: '' + Math.round(Math.random() * 10) % 10 + "-" + Date.now()
        })
    })
    console.log(res)
    const data = await res.json()
    console.log(data)
}

// getAll()
postData()