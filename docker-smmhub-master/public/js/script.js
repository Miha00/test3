
window.onload = function() {
    const buttonAnalysis = document.getElementById('analysis')
    const analysisContainer = document.getElementById('analysisContainer')
    const buttonSubmit = document.getElementById('submit')
    let counter = 30

    buttonAnalysis.addEventListener('click', async () => {
        const spanText = (counter) => `Осталось ${counter} секунд смотрите в камеру`
        const span = document.createElement('span');
        span.innerText = spanText(counter)
        analysisContainer.append(span)
        const webgazerInstance = await webgazer.setRegression('ridge') /* currently must set regression and tracker */
            .setTracker('TFFacemesh')
            .begin()

        const interval = setInterval(() => {
            console.log('interval')
            counter--
            span.innerText = spanText(counter)
            if (counter <= 0) {
                webgazer.end()
                clearInterval(interval)
                analysisContainer.removeChild(span)
                counter = 30
            }
        }, 1000)
    })


    buttonSubmit.addEventListener('click', () => {
        const isAcr = document.getElementById('isAcr').checked
        const isPeriod = document.getElementById('isPeriod').checked
        const isFamily = document.getElementById('isFamily').checked
        const age = document.getElementById('age').value
        const job = document.getElementById('job').value
        const rank = document.getElementById('rank').value

        if (!+age || !+job || !+rank) {
            alert('Введите возраст, звание и отрасль кампании')
            return
        }

        if (+age === 4) {
            alert('Вы не проходите по возрасту, Вас точно не призовут.')
            return
        }

        if (isFamily) {
            alert('Вы подходите под пункт с количеством детей, Вас точно не призовут.')
            return
        }

        let result = 0

        if (isPeriod) result += 0.3
        if (isAcr) result += 0.15
        if (+age < 4) result += 0.1

        alert(`Уверенность что Вы попадете под мобилизацию ${result * 100}%`)
    })
}

