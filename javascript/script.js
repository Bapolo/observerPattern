document.addEventListener("DOMContentLoaded", () => 
{
    class Observado
    {
        constructor()
        {
            this.observadores = []
        }

        addObservador(observador)
        {

            this.tocarEfeitoSonoro("./efeitosSonoros/efeitoCriar.mp3")
            this.observadores.push(observador)
            
        }

        removeObservador()
        {
            if (this.observadores.length > 0)
            {
                this.tocarEfeitoSonoro("./efeitosSonoros/efeitoRemover.wav")
                this.observadores.pop()            
            }
            
        }

        notificarObservadores(notificacao)
        {
            if (this.observadores.length >  0)
            {
                this.observadores.forEach((observador) =>
                {
                    observador.receberNotificacaoDoObservado(notificacao)
                })
            }           
        }

        getObservadores()
        {
            return this.observadores
        }

        tocarEfeitoSonoro(srcDoSom)
        {
            const efeitoSonoro = new Audio(srcDoSom) 

            efeitoSonoro.play()
        }

    }

    class Observador{
        
        constructor()
        {
            this.observadorQuadrado = 5          

            this.positionX = Math.round(Math.random() * (canvas.width - this.observadorQuadrado))

            this.positionY = Math.round(Math.random() * (canvas.height - this.observadorQuadrado))

            this.cor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${ Math.floor(Math.random() * 256)})`

            this.speed = 10
            this.direction = Math.round(Math.random() * 3)
        }

        getX()
        {
            return this.positionX
        }

        getY()
        {
            return this.positionY
        }

        receberNotificacaoDoObservado(notificacao)
        {
            this.correr()            
        }

        correr()
        {
            if (this.direction === 0)
            {
                this.positionX -= this.speed

                if (this.positionX <= 0)
                {
                    this.direction = 1
                }
            }
            
            if (this.direction === 1)
            {
                this.positionX += this.speed

                if (this.positionX >= canvas.width - this.observadorQuadrado)
                {
                    this.direction = 0
                }
            }
            
            if (this.direction === 2)
            {
                this.positionY -= this.speed

                if (this.positionY <= 0)
                {
                    this.direction = 3
                }
            }
            
            if (this.direction === 3)
            {
                this.positionY += this.speed

                if (this.positionY >= canvas.height - this.observadorQuadrado)
                {
                    this.direction = 2
                }
            }
            
            

            if (this.positionX < 0)
            {
                this.positionX = 0
            }
            
            if (this.positionX > canvas.width - this.observadorQuadrado)
            {
                this.positionX = canvas.width - this.observadorQuadrado
            }

            if (this.positionY < 0)
            {
                this.positionY = 0
            }
            
            if (this.positionY > canvas.height - this.observadorQuadrado)
            {
                this.positionY = canvas.height - this.observadorQuadrado
            }
           

        } 

    }

    const objectoObservado = new Observado()

    document.querySelector("#btnCriarObservador").addEventListener("click", () =>
    {
        const observador = new Observador()
        objectoObservado.addObservador(observador)
       
    })

    document.querySelector("#btnEliminarObservador").addEventListener("click", () => 
    {
        objectoObservado.removeObservador()
    })

    document.querySelector("#btnNotificar").addEventListener("click", () => 
    {
        objectoObservado.notificarObservadores("Corram")
    })
    
    const canvas = document.querySelector("#canvas")
    const context = canvas.getContext("2d")   

    function draw()
    {
        const observadores = objectoObservado.getObservadores()
        
        if (observadores.length >= 0)
        {
            context.clearRect(0, 0, canvas.width, canvas.height)

            for (let contador = 0; contador < (observadores.length); contador++)
            {
                
                context.beginPath()
                context.rect(parseInt(observadores[contador].positionX), observadores[contador].positionY, observadores[contador].observadorQuadrado, observadores[contador].observadorQuadrado)
                context.fillStyle = observadores[contador].cor
                context.fill()
            }
        }
        
        window.requestAnimationFrame(draw)        
    }

    draw()   
    
})
