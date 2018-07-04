
function main() {
    const ctx = 'theThis'

    const firstPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Efter 1 sec...')
            resolve('kalle')
        }, 1000)
    })

    Promise.all([firstPromise]).then((results) => {
        console.log('results: ', results)
        console.log('this.ctx: ', this.ctx);
    }.bind(this)).catch((e) => {
        console.log('Error: ', e)
    })
}

main()
